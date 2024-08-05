import { UserSVG } from "@/constants/svgs/svg";
import { CheckoutInfoDocument } from "@/schemas/cms/checkoutInfo";
import { CityDocument } from "@/schemas/cms/city";
import { CouponDocument } from "@/schemas/cms/coupon";
import { DeliveryTypeDocument } from "@/schemas/cms/deliveryType";
import { LineItemDocument } from "@/schemas/cms/lineItem";
import { OccasionDocument } from "@/schemas/cms/occasion";
import {
  OrderDocument,
  OrderPaymentDocument,
  OrderPaymentGatewayDocument
} from "@/schemas/cms/order";
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";
import { VenueDocument } from "@/schemas/services/venue";
import { CalendarIcon } from "@radix-ui/react-icons";
import moment from "moment";
import Image from "next/image";
import { calculateOverallPrice } from "../utils/helpers/calculateOverallPrice";
import { getCartData } from "../utils/helpers/getCartData";
import { getCustomer } from "@/fetchAPIs/cms/customer";
import { useEffect, useState } from "react";
import { CustomerDocument } from "@/schemas/cms/customer";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import CustomerDetailsDialog from "../../customers/logic/CustomerDetailsDialog";

export default function OrderFullDataDialog({
  lineItemId,
  order
}: {
  lineItemId: string;
  order: OrderDocument;
}) {
  const {
    _id,
    id: orderId,
    payment,
    detail
  } = order;
  const {
    checkoutInfo,
    city,
    lineItems,
    appliedCoupon
  } = detail as OrderDetailDocument;
  const {
    amount,
    gateway,
    percentage,
    status: paymentStatus
  } = payment as OrderPaymentDocument;
  const {
    info: gatewayInfo,
    name: merchantName,
    _id: rzpGatewayId
  } = gateway as OrderPaymentGatewayDocument;
  const {
    // @ts-ignore
    razorpay_order_id,
    // @ts-ignore
    razorpay_payment_id,
    // @ts-ignore
    razorpay_signature
  } = gatewayInfo;

  const targetCart = lineItems.find(
    ({ _id }) => _id === lineItemId
  ) as LineItemDocument;

  const [customerDoc, setCustomerDoc] =
    useState<CustomerDocument>();
  const [
    showCustomerDetails,
    setShowCustomerDetails
  ] = useState<boolean>(false);

  useEffect(() => {
    getCustomer(
      (detail as OrderDetailDocument)
        .customer as string
    ).then((res) =>
      setCustomerDoc(
        (prev) => res.data as CustomerDocument
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===[ CHECKOUT ] ======================================
  const customerName = (
    checkoutInfo as CheckoutInfoDocument
  ).name;
  const checkoutAddress = (
    checkoutInfo as CheckoutInfoDocument
  ).address;
  const checkoutCity = (
    (checkoutInfo as CheckoutInfoDocument)
      .city as CityDocument
  ).name;
  const customerEmail = (
    checkoutInfo as CheckoutInfoDocument
  ).mail;
  const customerMobile = (
    checkoutInfo as CheckoutInfoDocument
  ).mobileNumber;
  const pincode = (
    checkoutInfo as CheckoutInfoDocument
  ).pinCode;
  const checkoutVenue =
    (
      (checkoutInfo as CheckoutInfoDocument)
        ?.venue as VenueDocument
    )?.venue || "";
  const checkoutOccasion =
    (
      (checkoutInfo as CheckoutInfoDocument)
        ?.occasion as OccasionDocument
    )?.name || "";

  // ===[ CART ] ======================================
  const eventDate = moment(
    targetCart.eventDate
  ).format("Do MMMM, YYYY (dddd)");
  const miniDate = moment(
    targetCart.eventDate
  ).format("Do MMM");
  const eventTime = (
    targetCart.decorationTime
      .type as DeliveryTypeDocument
  ).timeSlots.find(
    ({ _id }) =>
      _id === targetCart.decorationTime.timeSlot
  )?.label;

  // ===[ PRICE ] ======================================
  const pricing = calculateOverallPrice(
    lineItems,
    percentage,
    appliedCoupon as CouponDocument | undefined
  );
  const totalBaseAmount = pricing.base;
  const totalAddonsAmount = pricing.addon;
  const totalCouponDiscount = pricing.coupon
    .isApplicable
    ? pricing.coupon.discount
    : 0;
  const totalPlatformFees = 0;
  const isCouponApplied =
    pricing.coupon.isApplicable;
  const couponCode = pricing.coupon.isApplicable
    ? pricing.coupon.code
    : "-";
  const paymentPercentage = percentage;
  const totalPaidAmount =
    pricing.finalAmount.toPay;
  const totalAmountPending =
    pricing.finalAmount.raw;

  const uiDataStructure = [
    {
      title: "Delivery Details",
      rightSide: "",
      svg: <></>,
      details: [
        {
          label: "Event Date",
          value: eventDate,
          actions: ""
        },
        {
          label: "Event Time",
          value: eventTime,
          actions: ""
        },
        {
          label: "Address",
          value: checkoutAddress || "-",
          actions: ""
        },
        {
          label: "Name",
          value: customerName || "-",
          actions: ""
        },
        {
          label: "Mobile",
          value: customerMobile || "-",
          actions: ""
        },
        {
          label: "City",
          value: checkoutCity || "-",
          actions: ""
        },
        {
          label: "Pincode",
          value: String(pincode) || "0",
          actions: ""
        },
        {
          label: "Venue",
          value: checkoutVenue || "-",
          actions: ""
        },
        {
          label: "Occasion",
          value: checkoutOccasion || "-",
          actions: ""
        }
      ]
    },
    {
      title: "Payment",
      rightSide: "",
      svg: <></>,
      details: [
        {
          label: "Total base amount",
          value: `₹ ${totalBaseAmount}`,
          actions: ""
        },
        {
          label: "Total addons amount",
          value: `₹ ${totalAddonsAmount}`,
          actions: ""
        },
        {
          label: highlight1("Total amount"),
          value: highlight1(
            `₹ ${totalBaseAmount + totalAddonsAmount}`
          ),
          actions: ""
        },
        {
          label: "Amount paid",
          value:
            percentage === 100 ? (
              <span>
                ₹ {pricing.finalAmount.toPay}{" "}
                <span className="text-green-600">
                  ( {percentage}% paid )
                </span>
              </span>
            ) : (
              <span>
                ₹ {pricing.finalAmount.toPay}{" "}
                <span className="text-red-500">
                  ( {percentage}% paid )
                </span>
              </span>
            ),
          actions: ""
        },
        {
          label: "Amount pending",
          value: `₹ ${totalAmountPending}`,
          actions: ""
        },
        {
          label: "Coupon applied",
          value: isCouponApplied ? "Yes" : "No",
          actions: ""
        },
        {
          label: "Coupon code",
          value: isCouponApplied
            ? pricing.coupon.code
            : "-",
          actions: ""
        },
        {
          label: "Coupon discount",
          value: isCouponApplied
            ? `₹ ${pricing.coupon.discount}`
            : "-",
          actions: ""
        },
        {
          label: "Razorpay order id",
          value: razorpay_order_id || "",
          actions: ""
        },
        {
          label: "Razorpay payment id",
          value: razorpay_payment_id || "-",
          actions: ""
        },
        {
          label: "Razorpay signature",
          value: (
            <span className="line-clamp-1 truncate">
              {razorpay_signature || "-"}
            </span>
          ),
          actions: ""
        }
      ]
    },
    {
      title: "Customer",
      rightSide: "",
      svg: <></>,
      details: [
        {
          label: "Name",
          value: customerName || "-",
          actions: ""
        },
        {
          label: "Mobile",
          value: customerMobile || "-",
          actions: ""
        },
        {
          label: "Email",
          value: customerEmail || "-",
          actions: ""
        }
      ]
    }
  ];

  const cartFullData = getCartData({
    lineItems,
    lineItemId,
    cityId: (
      (checkoutInfo as CheckoutInfoDocument)
        .city as CityDocument
    )._id
  });

  const cartData = cartFullData.service;
  const addonsData = cartFullData.addons;

  return (
    <>
      <section className="relative sm:rounded-2xl bg-white sm:py-12 p-[12px] sm:px-10 sm:p-8 gap-10 md:gap-8 text-[16px] overflow-y-scroll scrollbar-hide outline-none w-[100dvw] sm:w-[85dvw] lg:w-[75dvw] max-sm:h-[100dvh] sm:max-h-[85dvh] flex max-sm:flex-col max-sm:items-stretch items-start max-sm:justify-start justify-stretch">
        {/* LEFT / TOP SIDE ===================================================================== */}
        <div className="flex flex-col justify-start items-center sm:w-[28%] pt-9 sm:pt-12 sticky top-0 sm:h-full">
          <div className="aspect-square rounded-xl w-[100px] max-sm:hidden overflow-hidden relative mb-[14px]">
            <Image
              src={cartFullData.serviceImg.url}
              alt={cartFullData.serviceImg.alt}
              unoptimized
              width={100}
              height={100}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <span className="font-medium text-[22px]">
            Order Details
          </span>
          <span className="text-zinc-500">
            ID: {orderId}
          </span>
          <div className="grid grid-cols-[20px_auto] max-sm:hidden items-center justify-center w-fit max-w-[70%] gap-x-[3px] gap-y-[1px] mt-[10px] text-zinc-800">
            <span className="pl-1">₹</span>
            <span className="">
              {totalBaseAmount +
                totalAddonsAmount}
            </span>
            <CalendarIcon />
            <span className="truncate">
              {miniDate}
            </span>
            <UserSVG />
            <span
              onClick={() =>
                setShowCustomerDetails(
                  (prev) => true
                )
              }
              className="truncate underline underline-offset-2 cursor-pointer transition-colors duration-300 hover:text-black"
            >
              {customerName}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE ===================================================================== */}

        <div className="flex flex-col justify-start w-full overflow-y-scroll scrollbar-hide pb-[32px]">
          {/* MOBILE ONLY LARGE FRONT IMAGE -------------------- */}
          <div>
            <div className="sm:hidden rounded-2xl overflow-hidden aspect-square w-[180px] bg-neutral-200 mb-[10px] relative left-1/2 -translate-x-1/2">
              <Image
                src={cartFullData.serviceImg.url}
                alt={cartFullData.serviceImg.alt}
                unoptimized
                width={180}
                height={180}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          {/* GENERAL DETAILS ========================================================== */}

          {uiDataStructure.map(
            (
              { title, rightSide, details },
              index1
            ) => (
              <section
                className="flex flex-col justify-start items-stretch"
                key={index1}
              >
                <div className="flex items-center justify-between mt-[20px] mb-[7px] text-[20px] font-normal">
                  <span>{title}</span>
                  <span>{rightSide}</span>
                </div>
                {details ? (
                  <div className="flex flex-col items-stretch justify-start *:transition-all *:duration-300 odd:*:bg-neutral-100">
                    {details.map(
                      ({
                        label,
                        value,
                        actions
                      }) => (
                        <>
                          <div className="px-[14px] py-[6px] rounded-xl flex items-start justify-start max-sm:gap-[7px] sm:grid sm:grid-cols-[190px_auto_150px]">
                            <span className="flex ">
                              {label}
                              <span className="max-sm:block hidden">
                                :
                              </span>
                            </span>
                            <span>{value}</span>
                            <span>{actions}</span>
                          </div>
                        </>
                      )
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </section>
            )
          )}

          {/* CART DETAILS ========================================== */}
          <section className="flex flex-col justify-start items-stretch">
            <div className="flex items-center justify-between mt-[20px] mb-[7px] text-[20px] font-normal">
              <span>Cart Details</span>
              <span>{""}</span>
            </div>
            <div className="flex flex-col items-stretch justify-start *:transition-all *:duration-300 odd:*:bg-neutral-100">
              <div className="px-[10px] max-sm:border-[1px] max-sm:border-zinc-200 sm:px-[14px] py-[10px] rounded-xl grid grid-cols-[70px_auto] sm:grid-cols-[150px_auto] gap-[14px]">
                <div className="aspect-square rounded-xl overflow-hidden relative">
                  <Image
                    src={
                      cartFullData.serviceImg.url
                    }
                    alt={
                      cartFullData.serviceImg.alt
                    }
                    unoptimized
                    width={150}
                    height={150}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col items-stretch justify-start">
                  <span className="font-medium text-[20px] my-1 line-clamp-1 ">
                    {cartFullData.serviceName}
                  </span>
                  {cartData.map(
                    ({ label, value }, index) => (
                      <span
                        className="grid grid-cols-[120px_auto] py-[1px]"
                        key={index}
                      >
                        <span>{label}:</span>
                        <span>{value}</span>
                      </span>
                    )
                  )}
                </div>
                <div className="max-sm:col-span-3 sm:col-start-2 flex flex-col justify-start gap-[12px]">
                  {/* ADDONS ============================= */}
                  {addonsData.map(
                    (
                      {
                        img: { url, alt },
                        name,
                        quantity,
                        price
                      },
                      index
                    ) => (
                      <div
                        className="bg-neutral-300/50 rounded-2xl p-[8px] sm:p-[10px] grid grid-cols-[60px_auto] sm:grid-cols-[70px_auto] items-center gap-[10px] sm:gap-[13px] sm:mt-[15px]"
                        key={index}
                      >
                        <div className="aspect-square rounded-xl overflow-hidden relative ">
                          <Image
                            alt={alt}
                            src={url}
                            unoptimized
                            width={70}
                            height={70}
                          />
                        </div>
                        <div className="grid grid-cols-[75px_auto] sm:grid-cols-[90px_auto]">
                          <span>Name</span>
                          <span className="truncate">
                            {name}
                          </span>
                          <span>Price</span>
                          <span>{price}</span>
                          <span>Quantity</span>
                          <span>{quantity}</span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* CUSTOMER DETAILS DIALOG ============================================== */}
      <Dialog
        open={showCustomerDetails}
        onOpenChange={() =>
          setShowCustomerDetails((prev) => !prev)
        }
      >
        <DialogContent className="p-0 z-[400] bg-transparent min-w-fit min-h-fit rounded-none focus:outline-none border-none outline-none">
          <CustomerDetailsDialog
            customer={customerDoc}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

function highlight1(str: string) {
  return (
    <div className="font-semibold py-1 text-[17px]">
      {str}
    </div>
  );
}
