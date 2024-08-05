/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter } from "next/navigation";
import {
  CartDetailsType,
  CheckoutFormDataType,
  CouponType,
  DateInUseType,
  EditAddonType,
  EditCartServiceDateTimeType,
  HandleDeletionType,
  HandleInstructionManagementType,
  HandleQuantityType,
  NavigationType,
  PaymentPercentageType,
  PriceDetailsType,
  SelectedAddonType,
  UpdatingAddonsFunctionType
} from "./static/types";
import TransactionHeader from "./logic/_header/TransactionHeader";
import { useEffect, useState } from "react";
import TransactionPayment from "./logic/payment/TransactionPayment";
import TransactionCheckout, {
  formValidation
} from "./logic/checkout/TransactionCheckout";
import TransactionCart from "./logic/cart/TransactionCart";
import {
  CHECKOUT_FORMDATA_STATE_PLACEHOLDER,
  GET_COUPON_PLACEHOLDER_PARAMETER,
  MAX_TRANSACTION_DISTINCT_PAGES,
  OVERALL_PRICE_PLACEHOLDER,
  transactionProgressData
} from "./static/constants";
import { Dialog, DialogContent } from "../dialog";
import { setCookie } from "@/cookies/appliedCoupon/cookies";
import { getCoupons } from "@/fetchAPIs/cms/coupon";
import { CouponDocument } from "@/schemas/cms/coupon";
import {
  DeliverySlotDocument,
  SelectedAddonDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import SelectDate from "@/components/client/service/SelectDate";
import AddonsModal from "@/components/client/service/AddonsModal";
import moment from "moment";
import TimeSlots from "../service/info/order/date-time/TimeSlots";
import {
  DeliveryTypeDocument,
  TimeSlotDocument
} from "@/schemas/cms/deliveryType";
import { OrderProcessingTimeDocument } from "@/schemas/cms/orderProcessingTime";
import { editAddons } from "./logic/cart/functions/addons/editAddons";
import { updateAddons } from "./logic/cart/functions/addons/updateAddons";
import { calculateStartingDate } from "./static/utils/calculateStartingDate";
import { convertToDate } from "./static/utils/convertStringToDate";
import { validTimeSlots } from "./static/utils/validTimeSlots";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { useCityContext } from "@/hooks/useCityContext";
import { getCityName } from "./static/utils/getCityName";
import { formattedDateString } from "./static/utils/formattedDateString";
import { useStatusContext } from "@/hooks/useStatusContext";
import { pushCartToContext } from "./static/utils/_pushCartToContext";
import fetchCartFromContext from "./static/utils/_fetchCartFromContext";
import { getTransactionVenuesList } from "./functions/getTransactionVenuesList";
import { getTransactionOccasionsList } from "./functions/getTransactionOccasionsList";
import { checkoutFormDataToContextCheckout } from "./functions/checkoutFormDataToContextCheckout";
import { OccasionDocument } from "@/schemas/cms/occasion";
import { VenueDocument } from "@/schemas/services/venue";
import { CityDocument } from "@/schemas/cms/city";
import { getCities } from "@/fetchAPIs/frontend/city";
import { maxAdvancePaymentPercentageFromCartDetails } from "./static/utils/maxAdvancePaymentPercentage";
import { getLocalStorage } from "@/lib/localStorage";
import { handlePageIndexPersistence } from "./static/utils/handlePageIndexPersistence";
import { CheckoutInfoDocument } from "@/schemas/cms/checkoutInfo";
import { LineItemDocument } from "@/schemas/cms/lineItem";
import Auth from "../auth/Auth";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
export const LS_PAGE_INDEX_KEY = "cartIndex";

export const fetchCache = "default-cache";

const time: string = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`;

export default function Transaction() {
  /* Transaction = Cart -> Checkout -> Payment  */
  const router = useRouter();

  // ================[ CONTEXT HOOKS ]=============================================== >>
  const {
    status: {
      data: { isLoggedIn, isReady, isCartReady }
    },
    cart: {
      action: {
        updateCartItems,
        updateCheckoutInfo,
        updateAppliedCoupon,
        setTotalAmount,
        setPayableAmount,
        setPaymentPercentage:
          setContextPaymentPercentage
      },
      data: {
        items: cartDataFromContext,
        checkoutInfo: checkoutInfoFromContext,
        appliedCoupon
      }
    },
    customer: {
      data: { info: customerInfo }
    }
  } = useCustomerContext();

  const { currentCity: cityFromContext } =
    useCityContext();

  const { addStatus } = useStatusContext();

  // ================[ STATES ]=============================================== >>
  // FULL DATA ----------------------------------------
  const [cartDetails, setCartDetails] = useState<
    CartDetailsType[]
  >([]);

  const [
    cartServicesServiceDocumentData,
    setCartServicesServiceDocumentData
  ] = useState<ServiceDocument[]>([]);

  const [
    overallPriceDetails,
    setOverallPriceDetails
  ] = useState<PriceDetailsType | undefined>(
    undefined
  );

  const [
    advancePaymentPercentage,
    setAdvancePaymentPercentage
  ] = useState<number>(1);

  const [
    paymentPercentage,
    setPaymentPercentage
  ] = useState<PaymentPercentageType>({
    percentage: 1,
    type: "full"
  });

  const [checkoutFormData, setCheckoutFormData] =
    useState<CheckoutFormDataType>(
      CHECKOUT_FORMDATA_STATE_PLACEHOLDER
    );

  const [datesInUse, setDatesInUse] = useState<
    DateInUseType[]
  >([]);

  // hold the city in question ...
  const [currentCity, setCurrentCity] = useState(
    getCityName(cityFromContext)
  );

  const [cityDocs, setCityDocs] = useState<
    CityDocument[]
  >([]);

  const [cityWisePrices, setCityWisePrice] =
    useState<{ city: string; price: number }[]>(
      []
    );

  // which page is currently active(cart,checkout,payment) ...
  const [
    currTransactionPageIndex,
    setCurrTransactionPageIndex
  ] = useState<number>(0);
  // dialog containing login box ...
  const [showLoginDialog, setShowLoginDialog] =
    useState<boolean>(false);

  const [couponList, setCouponList] = useState<
    CouponType[]
  >([]);

  const [couponDocs, setCouponDocs] = useState<
    CouponDocument[]
  >([]);
  // currently applied coupon detail ...
  const [currCoupon, setCurrCoupon] = useState<
    CouponType | undefined
  >(undefined);
  // currently applied coupon detail ...
  const [
    isCouponApplicable,
    setIsCouponApplicable
  ] = useState<boolean>(true);
  // dialog to prompt if deletion is final or not ...
  const [showDialog, setShowDialog] =
    useState<boolean>(false);
  // if 'delete' is selected in dialog then this turns true ...
  const [dialogYesChosen, setDialogYesChosen] =
    useState<boolean>(false);
  // holds the item in question to be deleted, waits for dialogYesChosen state ...
  const [itemToDelete, setItemToDelete] =
    useState<
      | {
          type: "service";
          serviceId: string;
          relatedDate: string;
        }
      | {
          type: "addon";
          serviceId: string;
          addonId: string;
          relatedServiceDate: string;
        }
    >({
      type: "service",
      serviceId: "",
      relatedDate: ""
    });
  // saves the updated instruction, but doesn't set it right away ...
  const [instructionToSet, setInstructionToSet] =
    useState<{
      serviceId: string;
      relatedDate: string;
      prevInstruction: string | undefined;
      newInstruction: string | undefined;
    }>({
      serviceId: "",
      relatedDate: "",
      newInstruction: undefined,
      prevInstruction: undefined
    });
  // dialog containing instruction r/w ...
  const [
    showInstructionPopup,
    setShowInstructionPopup
  ] = useState<boolean>(false);
  // to give updates to context or not ...
  const [pushToContext, setPushToContext] =
    useState<{
      cart: boolean;
      checkoutFormData: boolean;
    }>({ cart: false, checkoutFormData: false });
  // to change date and time from cart ...
  const [
    showDateTimeDialog,
    setShowDateTimeDialog
  ] = useState<{ date: boolean; time: boolean }>({
    date: false,
    time: false
  });
  // actively working service ...
  const [
    serviceInQuestion,
    setServiceInQuestion
  ] = useState<ServiceDocument>();
  const [
    serviceInQuestionsDate,
    setServiceInQuestionsDate
  ] = useState<string>("");
  const [fullAddonsData, setFullAddonsData] =
    useState<SelectedAddonDocument[]>([]);
  const [showAddonsDialog, setShowAddonsDialog] =
    useState<boolean>(false);
  const [selectedAddons, setSelectedAddons] =
    useState<
      {
        addonId: string;
        count: number;
        pricePerUnit: number;
      }[]
    >([]);

  const [venues, setVenues] = useState<
    VenueDocument[]
  >([]);
  const [occasions, setOccasions] = useState<
    OccasionDocument[]
  >([]);
  const [platformFee, setPlatformFee] =
    useState<number>(0);

  const [cartUpdating, setCartUpdating] =
    useState<boolean>(!isReady || true);

  const [categoriesInCart, setCategoriesInCart] =
    useState<string[]>([]);

  // ======[ PAGE NAVIGATION, SAVE PAGE INDEX TO LS ]======================================== >>
  const handleNavigation: NavigationType = {
    goBack: () => {
      handlePageIndexPersistence({
        currIndex: currTransactionPageIndex,
        action: "back"
      });

      if (currTransactionPageIndex === 0)
        router.back();
      else
        setCurrTransactionPageIndex(
          (prev) => prev - 1
        );
    },
    goForward: () => {
      if (isLoggedIn)
        handlePageIndexPersistence({
          currIndex: currTransactionPageIndex,
          action: "forward"
        });

      if (currTransactionPageIndex === 0) {
        if (isLoggedIn) {
          setCurrTransactionPageIndex(
            (prev) => prev + 1
          );
        } else {
          setShowLoginDialog(() => true);
        }
      } else if (
        currTransactionPageIndex ===
        MAX_TRANSACTION_DISTINCT_PAGES - 1
      )
        alert("Reached end of payment here");
      else
        setCurrTransactionPageIndex(
          (prev) => prev + 1
        );
    }
  };

  const setPageIndexOnLoad = () => {
    const lsPageIndex = getLocalStorage(
      LS_PAGE_INDEX_KEY
    );
    if (lsPageIndex === null) {
      if (currTransactionPageIndex !== 0)
        setCurrTransactionPageIndex((prev) => 0);
    } else {
      setCurrTransactionPageIndex((prev) =>
        Number(lsPageIndex)
      );
    }
  };

  // ======[ UPDATE PLATFORM FEE, PAYMENT PERCENTAGE ]======================================== >>
  useEffect(() => {
    // calculate + update platform fees //--------------------------------
    cartDetails
      .map(({ serviceId, eventTime }) => ({
        serviceId,
        eventTime
      }))
      .forEach(({ serviceId, eventTime }) => {
        let localPlatformFee: number = 0;

        const relatedService =
          cartServicesServiceDocumentData.filter(
            ({ _id }) => _id === serviceId
          )[0];

        if (relatedService) {
          const arr =
            relatedService.deliveryTime.deliverySlots.filter(
              (slot) => {
                const filter = (
                  (slot as DeliverySlotDocument)
                    .deliveryType as DeliveryTypeDocument
                ).timeSlots.filter(
                  ({ startTime, endTime }) =>
                    startTime ===
                      eventTime.split(" - ")[0] &&
                    endTime ===
                      eventTime.split(" - ")[1]
                )[0];

                if (filter) return true;
                return false;
              }
            );

          if (arr) {
            localPlatformFee = Math.max(
              localPlatformFee,
              arr[0].price
            );
          }
        }

        setPlatformFee(
          (prev) => localPlatformFee
        );
      });

    // updating payment percentage //--------------------------------
    setAdvancePaymentPercentage((prev) =>
      maxAdvancePaymentPercentageFromCartDetails({
        serviceDocs:
          cartServicesServiceDocumentData
      })
    );

    // set categories in cart ---------------------------------------
    setCategoriesInCart((prev) => {
      const x: string[] =
        cartServicesServiceDocumentData.map(
          ({ category }) =>
            (category as ServiceCategoryDocument)
              ._id
        );
      const nonDuplicated = Array.from(
        new Set(x)
      );
      return nonDuplicated;
    });
  }, [cartServicesServiceDocumentData]);

  // ======[ UPDATE AND HANDLE CITY ]======================================== >>
  const getAllCities = () => {
    getCities().then((res) =>
      setCityDocs((prev) => res)
    );
  };

  useEffect(
    () =>
      setCurrentCity(
        getCityName(cityFromContext)
      ),
    [cityFromContext]
  );

  // ======[ SET CHECKOUT FORM DATA ]======================================== >>
  useEffect(() => {
    if (customerInfo !== null)
      setCheckoutFormData((prev) => ({
        ...prev,
        name:
          customerInfo.name &&
          customerInfo.name !== "User"
            ? customerInfo.name
            : prev.name,
        email: customerInfo.mail || prev.email,
        address:
          customerInfo.address || prev.address,
        mobile:
          customerInfo?.mobileNumber?.slice(
            3,
            13
          ) || prev.mobile
      }));
  }, [customerInfo]);

  useEffect(() => {
    setCheckoutFormData((prev) => ({
      ...prev,
      city: currentCity || ""
    }));
  }, [currentCity]);

  // ======[ PROCESS PRICE CALCULATIONS ]======================================== >>
  const handleOverallAmountCalculation = (
    data: CartDetailsType[]
  ) => {
    if (
      !data ||
      Object.prototype.toString.call(data) ===
        "[object Object]"
    )
      return;

    let totalBasePrice: number = 0;
    let totalAddonPrice: number = 0;

    data.forEach(
      ({ pricePerUnit, totalUnits, addons }) => {
        totalBasePrice +=
          totalUnits * pricePerUnit;
        if (addons.length) {
          addons.forEach(({ amount, price }) => {
            totalAddonPrice += amount * price;
          });
        }
      }
    );

    const totalAmount: number =
      totalBasePrice + totalAddonPrice;
    const couponDiscountValue: number =
      !currCoupon
        ? 0
        : ["flat", "freeDelivery"].includes(
              currCoupon.discountType
            )
          ? Math.min(
              currCoupon.maxCap,
              currCoupon.discount
            )
          : Math.min(
              currCoupon.maxCap,
              Math.ceil(
                totalAmount * currCoupon.discount
              )
            );

    const pricings: PriceDetailsType = {
      basePrices: {
        baseTotal: {
          label: "Base Total",
          amount: totalBasePrice
        },
        addonTotal: {
          label: "Addon Total",
          amount: totalAddonPrice
        },
        totalAmount: {
          label: "Total amount",
          amount: totalAmount
        }
      },
      coupon: {
        label: "Coupon",
        amount: couponDiscountValue,
        isApplicable: isCouponApplicable
      },
      finalAmount: {
        label: "Amount to pay",
        amount:
          Math.ceil(
            paymentPercentage.type === "full"
              ? totalBasePrice
              : totalBasePrice *
                  paymentPercentage.percentage
          ) +
          totalAddonPrice +
          platformFee -
          (isCouponApplicable &&
          paymentPercentage.type === "full"
            ? couponDiscountValue
            : 0),
        rawAmount:
          totalAmount +
          platformFee -
          couponDiscountValue
      }
    };
    setOverallPriceDetails((prev) => pricings);
  };

  useEffect(() => {
    handleOverallAmountCalculation(cartDetails);
  }, [
    cartDetails,
    currCoupon,
    platformFee,
    paymentPercentage,
    isCouponApplicable
  ]);

  // ======[ GET CART DETAILS + COUPON ]======================================== >>
  const handleGetCartDetails = async () => {
    const workingCartData = fetchCartFromContext({
      cartDataFromContext,
      currCartDetails: cartDetails,
      selectedCity: currentCity,
      setAdvancePaymentPercentage,
      setCityWiseServicePrice: setCityWisePrice
    });

    setCartServicesServiceDocumentData((prev) => {
      let unique = {};
      cartDataFromContext
        .map(
          ({ service }) =>
            service as ServiceDocument
        )
        .forEach((el) => {
          if ("_id" in el)
            // @ts-ignore
            unique[el._id] = el;
        });

      return Object.values(unique);
    });

    setCartDetails((prev) => workingCartData);
  };

  useEffect(() => {
    handleGetCartDetails();
    setPageIndexOnLoad();
    getAllCities();
    getTransactionVenuesList(setVenues);
    getTransactionOccasionsList(setOccasions);
    handleGetAllCoupons();
  }, []);

  useEffect(() => {
    handleGetCartDetails();
  }, [currentCity, cartDataFromContext]);

  // show loading if not already loaded...
  useEffect(() => {
    // if (isCartReady) {
    //   const timeout = setTimeout(
    //     () => setCartUpdating((prev) => false),
    //     500
    //   );

    //   return () => clearTimeout(timeout);
    // }

    setCartUpdating(!isReady);
  }, [isReady]);

  // ======[ UPDATE DATA OF SERVICE DOCUMENT IF CART DETAILS CHANGE ]======================================== >>
  useEffect(() => {
    setCartServicesServiceDocumentData((prev) => {
      let unique = {};
      cartDataFromContext
        .map(
          ({ service }) =>
            service as ServiceDocument
        )
        .forEach((el) => {
          if ("_id" in el)
            // @ts-ignore
            unique[el._id] = el;
        });

      return Object.values(unique);
    });

    setDatesInUse((prev) =>
      cartDetails.map(
        ({ serviceId, eventDate }) => ({
          serviceId: serviceId,
          date: formattedDateString(eventDate)
        })
      )
    );
  }, [cartDetails]);

  // ======[ ADD / EDIT SERVICE ADDONS ]======================================== >>
  const handleEditAddons: EditAddonType = (
    serviceId: string,
    relatedDate: string,
    selectedAddons: SelectedAddonType[]
  ) =>
    // this triggers the addons modal................................
    editAddons({
      serviceId: serviceId,
      relatedDate: relatedDate,
      selectedAddons: selectedAddons,
      cartServicesServiceDocumentData:
        cartServicesServiceDocumentData,
      setFullAddonsData: setFullAddonsData,
      setServiceInQuestion: setServiceInQuestion,
      setServiceInQuestionsDate:
        setServiceInQuestionsDate,
      setShowAddonsDialog: setShowAddonsDialog,
      setSelectedAddons: setSelectedAddons
    });

  const handleUpdatingAddons: UpdatingAddonsFunctionType =
    ({
      serviceId,
      relatedDate,
      newChosenAddonsCartWrapper
    }: {
      serviceId: string;
      relatedDate: string;
      newChosenAddonsCartWrapper: CartDetailsType;
    }): void =>
      updateAddons({
        serviceId: serviceId,
        relatedDate: relatedDate,
        newChosenAddonsCartWrapper:
          newChosenAddonsCartWrapper,
        cartDetails: cartDetails,
        setCartDetails: setCartDetails,
        setCartHasUpdate: setPushToContext
      });

  // ======[ CHANGE SERVICE DATE / TIME ]======================================== >>
  const onClickEditDateTime: EditCartServiceDateTimeType =
    {
      editDate: (
        serviceId: string,
        relatedDate: string,
        serviceName: string,
        currDate: string
      ) => {
        setServiceInQuestion(
          (prev) =>
            cartServicesServiceDocumentData.filter(
              ({ _id }) => _id === serviceId
            )[0]
        );
        setServiceInQuestionsDate(
          (prev) => relatedDate
        );

        setShowDateTimeDialog((prev) => ({
          ...prev,
          date: true
        }));
      },
      editTime: (
        serviceId: string,
        relatedDate: string,
        serviceName: string,
        currDate: string,
        currTime: string
      ) => {
        setServiceInQuestion(
          (prev) =>
            cartServicesServiceDocumentData.filter(
              ({ _id }) => _id === serviceId
            )[0]
        );
        setServiceInQuestionsDate(
          (prev) => relatedDate
        );

        setShowDateTimeDialog((prev) => ({
          ...prev,
          time: true
        }));
      }
    };

  const handleSubmitChosenDate = (
    serviceId: string,
    relatedDate: string,
    chosenDate: Date
  ) => {
    const chosenDateServiceAlreadyExists: boolean =
      datesInUse.filter(
        (dateInUse) =>
          dateInUse.date ===
            formattedDateString(chosenDate) &&
          dateInUse.serviceId === serviceId
      ).length !== 0;

    if (chosenDateServiceAlreadyExists) {
      addStatus([
        {
          message:
            "Cannot select date which is already in cart",
          type: "error"
        }
      ]);
      return;
    }

    const targetService = datesInUse.filter(
      (dateInUse) =>
        dateInUse.date === relatedDate &&
        dateInUse.serviceId === serviceId
    );

    setCartDetails((prev) =>
      prev.map((detail) =>
        detail.serviceId ===
          targetService[0].serviceId &&
        formattedDateString(detail.eventDate) ===
          targetService[0].date
          ? {
              ...detail,
              eventDate: moment(
                chosenDate
              ).format("DD MMM YYYY")
            }
          : detail
      )
    );
    setPushToContext((prev) => ({
      ...prev,
      cart: true
    }));
  };

  const handleServiceTimeUpdate = (
    timeSlotId: string
  ) => {
    const timeSlots: TimeSlotDocument[] = (
      serviceInQuestion!.deliveryTime
        .deliverySlots[0]
        .deliveryType as DeliveryTypeDocument
    ).timeSlots;

    const chosenTimeSlot: TimeSlotDocument =
      timeSlots.filter(
        ({ _id }) => _id === timeSlotId
      )[0];
    const serviceId: string =
      serviceInQuestion!._id;

    setShowDateTimeDialog((prev) => ({
      ...prev,
      time: false
    }));
    setCartDetails((prev) =>
      prev.map((detail) =>
        detail.serviceId === serviceId &&
        formattedDateString(detail.eventDate) ===
          serviceInQuestionsDate
          ? {
              ...detail,
              eventTime: `${chosenTimeSlot.startTime} - ${chosenTimeSlot.endTime}`
            }
          : detail
      )
    );
    setPushToContext((prev) => ({
      ...prev,
      cart: true
    }));
  };

  // ======[ CART / CHECKOUT FORM DATA IS UPDATED, SEND TO CONTEXT ]======================================== >>
  useEffect(() => {
    // cart -----------------------------------------
    if (pushToContext.cart) {
      const contextReadyData = pushCartToContext({
        currCartDetails: cartDetails,
        serviceDocs:
          cartServicesServiceDocumentData,
        cityWisePrices
      });
      updateCartItems(
        contextReadyData as LineItemDocument[]
      );

      setPushToContext((prev) => ({
        ...prev,
        cart: false
      }));
    }

    // checkout form -----------------------------------------
    if (pushToContext.checkoutFormData) {
      const contextReadyFormData =
        checkoutFormDataToContextCheckout({
          formData: checkoutFormData,
          cityDoc: cityDocs.filter(
            ({ name }) =>
              name.toLowerCase() ===
              currentCity?.toLowerCase()
          )[0]
        });

      updateCheckoutInfo(
        contextReadyFormData as CheckoutInfoDocument
      );

      setPushToContext((prev) => ({
        ...prev,
        checkoutFormData: false
      }));
    }
  }, [pushToContext]);

  useEffect(() => {
    if (
      overallPriceDetails &&
      currCoupon &&
      overallPriceDetails.basePrices.totalAmount
        .amount < currCoupon.minReqAmount
    ) {
      setCurrCoupon((prev) => undefined);
      return;
    }

    setTotalAmount(
      (overallPriceDetails?.basePrices.totalAmount
        .amount || 0) +
        platformFee -
        (paymentPercentage.type === "full"
          ? overallPriceDetails?.coupon.amount ||
            0
          : 0)
    );
    setPayableAmount(
      overallPriceDetails?.finalAmount.amount || 0
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overallPriceDetails]);

  useEffect(() => {
    if (
      !formValidation(checkoutFormData)
        .overallInvalid
    ) {
      setPushToContext((prev) => ({
        ...prev,
        checkoutFormData: true
      }));
    }
  }, [checkoutFormData]);

  // ======[ UPDATE PAYMENT PERCENTAGE ]======================================== >>
  // A) On Cart Update ............
  useEffect(
    () =>
      setPaymentPercentage((prev) =>
        prev.type === "full"
          ? prev
          : {
              ...prev,
              percentage:
                advancePaymentPercentage / 100
            }
      ),
    [advancePaymentPercentage]
  );

  // B) Save To Context ............
  useEffect(() => {
    setContextPaymentPercentage(
      paymentPercentage.percentage * 100
    );

    if (paymentPercentage.type !== "full")
      setIsCouponApplicable((prev) => false);
  }, [paymentPercentage]);

  // ======[ INCREASE, DECREASE ITEM QUANTITY ]======================================== >>
  const handleQuantity: HandleQuantityType = {
    service: (
      id: string,
      relatedDate: string,
      newQuantity: number
    ) => {
      setCartDetails((prev) =>
        prev.map((detail) =>
          id === detail.serviceId &&
          relatedDate ===
            formattedDateString(detail.eventDate)
            ? {
                ...detail,
                totalUnits: Math.max(
                  newQuantity,
                  1
                )
              }
            : detail
        )
      );
      setPushToContext((prev) => ({
        ...prev,
        cart: true
      }));
    },

    addon: (
      serviceId: string,
      relatedServiceDate: string,
      addonId: string,
      newQuantity: number
    ) => {
      setCartDetails((prev) =>
        prev.map((detail) =>
          serviceId === detail.serviceId &&
          relatedServiceDate ===
            formattedDateString(detail.eventDate)
            ? {
                ...detail,
                addons: detail.addons.map(
                  (addon) =>
                    addonId === addon.id
                      ? {
                          ...addon,
                          amount: Math.max(
                            newQuantity,
                            1
                          )
                        }
                      : addon
                )
              }
            : detail
        )
      );
      setPushToContext((prev) => ({
        ...prev,
        cart: true
      }));
    }
  };

  // ======[ DELETION ]======================================== >>
  const handleDeletion: HandleDeletionType = {
    service: (
      id: string,
      relatedDate: string
    ) => {
      setShowDialog((prev) => true);
      setItemToDelete((prev) => ({
        type: "service",
        serviceId: id,
        relatedDate: relatedDate
      }));
    },
    addon: (
      serviceId: string,
      relatedServiceDate: string,
      addonId: string
    ) => {
      setShowDialog((prev) => true);
      setItemToDelete((prev) => ({
        type: "addon",
        serviceId: serviceId,
        addonId: addonId,
        relatedServiceDate: relatedServiceDate
      }));
    }
  };

  useEffect(() => {
    if (!showDialog && dialogYesChosen) {
      if (itemToDelete.type === "service") {
        setCartDetails((prev) =>
          prev.filter(
            (service) =>
              !(
                service.serviceId ===
                  itemToDelete.serviceId &&
                formattedDateString(
                  service.eventDate
                ) === itemToDelete.relatedDate
              )
          )
        );
        setPushToContext((prev) => ({
          ...prev,
          cart: true
        }));
      } else if (itemToDelete.type === "addon") {
        setCartDetails((prev) =>
          prev.map((service) =>
            service.serviceId ===
              itemToDelete.serviceId &&
            formattedDateString(
              service.eventDate
            ) === itemToDelete.relatedServiceDate
              ? {
                  ...service,
                  addons: service.addons.filter(
                    (addon) =>
                      addon.id !==
                      itemToDelete.addonId
                  )
                }
              : service
          )
        );
        setPushToContext((prev) => ({
          ...prev,
          cart: true
        }));
      }
      setDialogYesChosen((prev) => false);
    }
  }, [showDialog, dialogYesChosen, itemToDelete]);

  // ======[ INSTRUCTIONS HANDLING ]======================================== >>
  const handleInstructionManagement: HandleInstructionManagementType =
    (
      serviceId: string,
      relatedDate: string,
      prevInstruction: string | undefined,
      newInstruction: string | undefined
    ) => {
      setInstructionToSet((prev) => ({
        serviceId: serviceId,
        relatedDate: relatedDate,
        newInstruction: newInstruction
          ? newInstruction.trim()
          : newInstruction,
        prevInstruction: prevInstruction
      }));
      setShowInstructionPopup((prev) => true);
    };

  useEffect(() => {
    if (
      dialogYesChosen &&
      !showInstructionPopup &&
      instructionToSet.prevInstruction !==
        instructionToSet.newInstruction
    ) {
      setCartDetails((prev) =>
        prev.map((detail) =>
          instructionToSet.serviceId ===
            detail.serviceId &&
          instructionToSet.relatedDate ===
            formattedDateString(detail.eventDate)
            ? {
                ...detail,
                instruction:
                  instructionToSet.newInstruction
              }
            : detail
        )
      );
      setPushToContext((prev) => ({
        ...prev,
        cart: true
      }));
      setDialogYesChosen((prev) => false);
    }
  }, [
    instructionToSet,
    showInstructionPopup,
    dialogYesChosen
  ]);

  // ======[ SET COUPON ]======================================== >>
  const handleSetCoupon = (
    newCoupon: CouponType | undefined
  ) => {
    setCurrCoupon((prev) => newCoupon);
  };

  const handleGetAllCoupons = () => {
    getCoupons(GET_COUPON_PLACEHOLDER_PARAMETER)
      .then((coupons) => {
        const list: CouponDocument[] = (
          coupons.data as CouponDocument[]
        ).filter(({ applicableCategories }) => {
          if (applicableCategories.length === 0)
            return true;

          const applicableCategoryIds: string[] =
            (
              applicableCategories as ServiceCategoryDocument[]
            ).map(
              ({ _id: categoryId }) => categoryId
            );

          let allowedCoupon: boolean = true;

          categoriesInCart.forEach((ctg) => {
            if (
              !applicableCategoryIds.includes(
                ctg
              ) &&
              allowedCoupon
            )
              allowedCoupon = false;
          });

          return allowedCoupon;
        });

        const couponsList: CouponType[] =
          list.map(
            ({
              _id,
              code,
              minimumOrderAmount,
              valid,
              discount,
              type,
              description
            }) => ({
              couponId: _id,
              discountType:
                type === "free-delivery"
                  ? "freeDelivery"
                  : discount?.type ===
                      "percentage"
                    ? "percentage"
                    : "flat",
              discount:
                // ===[check]===[update for free-delivery type]
                type === "free-delivery"
                  ? platformFee
                  : discount?.type ===
                      "percentage"
                    ? (discount?.percentage ||
                        0) / 100
                    : discount?.amount || 0,
              maxCap:
                type === "free-delivery"
                  ? platformFee
                  : discount?.amount || 0,
              couponCode: code,
              minReqAmount: minimumOrderAmount,
              description: description
            })
          );
        setCouponList((prev) => couponsList);
        setCouponDocs(
          (prev) =>
            coupons.data as CouponDocument[]
        );
      })
      .catch((err) => {
        // console.error(err);
      });
  };

  useEffect(() => {
    if (currCoupon && currCoupon.couponCode) {
      setCookie(currCoupon.couponCode);

      // get respective coupon document
      const relatedCouponDoc = couponDocs.find(
        ({ code }) =>
          code.toLowerCase() ===
          currCoupon.couponCode.toLowerCase()
      );

      if (relatedCouponDoc) {
        updateAppliedCoupon(relatedCouponDoc);
      }
    } else if (appliedCoupon) {
      updateAppliedCoupon(null);
    }
  }, [currCoupon]);

  useEffect(() => {
    handleGetAllCoupons();
  }, [platformFee, categoriesInCart]);

  /*
  .
  . 
  . 
  . ###########################################################################################################
  . ###########################################################################################################
  . ###########################################################################################################
  . ###########################################################################################################
  */
  // ======[ CART PAGE, CHECKOUT PAGE, PAYMENT PAGE ]======================================== >>
  const activeTransactionPage: JSX.Element[] = [
    //   0: cart ===============================
    <TransactionCart
      key={0}
      finalPrice={
        overallPriceDetails
          ? overallPriceDetails.finalAmount
              .rawAmount
          : 0
      }
      priceDetails={
        overallPriceDetails ||
        OVERALL_PRICE_PLACEHOLDER
      }
      platformFee={platformFee}
      cartDetails={cartDetails}
      currCoupon={currCoupon}
      couponList={couponList}
      handleNavigation={handleNavigation}
      handleDelete={handleDeletion}
      setQuantity={handleQuantity}
      editDateTime={onClickEditDateTime}
      cartLoading={cartUpdating}
      handleSetInstruction={
        handleInstructionManagement
      }
      editAddons={handleEditAddons}
      setCurrCoupon={handleSetCoupon}
    />,

    //   1: checkout ===============================
    <TransactionCheckout
      key={1}
      contextInitialData={checkoutInfoFromContext}
      handleNavigation={handleNavigation}
      cartDetails={cartDetails}
      currentCity={currentCity}
      platformFee={platformFee}
      venues={venues}
      occasions={occasions}
      overallPriceDetails={overallPriceDetails}
      couponApplicable={isCouponApplicable}
      advancePayPercent={advancePaymentPercentage}
      paymentPercentage={paymentPercentage}
      formData={checkoutFormData}
      customerInfo={customerInfo}
      setFormData={setCheckoutFormData}
      setCouponApplicable={setIsCouponApplicable}
      setPaymentPercentage={setPaymentPercentage}
    />,

    //   2: payment ===============================
    <TransactionPayment
      key={2}
      handleNavigation={handleNavigation}
      priceDetails={overallPriceDetails}
    />
  ];
  /*
  .
  . ###########################################################################################################
  . ###########################################################################################################
  . ###########################################################################################################
  . ###########################################################################################################
  . 
  . 
  */

  return (
    <>
      <div className="min-h-fit flex flex-col w-full relative text-[16px]">
        {/* TOP NAV BAR =========================================== */}
        <TransactionHeader
          transactionProgressData={transactionProgressData(
            currTransactionPageIndex
          )}
          handleNavigation={handleNavigation}
          currPageIndex={currTransactionPageIndex}
        />
        {/* SHOW TRANSACTION PAGE BASED ON INDEX ====================== */}
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-start justify-start sm:justify-stretch">
          {
            activeTransactionPage[
              currTransactionPageIndex
            ]
          }
        </div>
      </div>

      {/* USER LOGIN DIALOG =================================== */}
      <Auth
        showDialog={showLoginDialog}
        cart={
          cartDetails.length > 0 &&
          cartServicesServiceDocumentData.length >
            0
            ? pushCartToContext({
                currCartDetails: cartDetails,
                serviceDocs:
                  cartServicesServiceDocumentData,
                cityWisePrices
              })
            : undefined
        }
        onDialogClose={() => {
          setShowLoginDialog((prev) => false);
        }}
        nextPage={handleNavigation.goForward}
        isDialogClosed={!showLoginDialog}
      />

      {/* DELETION DIALOG =================================== */}
      <Dialog
        open={showDialog}
        onOpenChange={() => {
          setShowDialog((prev) => !prev);
        }}
      >
        <DialogContent className="min-w-fit bg-transparent border-none">
          <div className="flex flex-col items-center justify-center gap-[20px] pt-12 pb-8  sm:py-8 px-10 rounded-2xl bg-white outline-none">
            <span className="text-[20px] mb-3 sm:mb-0">
              Sure to delete ?
            </span>
            <span className="flex items-center justify-between gap-4 min-w-[270px] *:text-[16px]">
              <span
                onClick={() => {
                  setShowDialog((prev) => false);
                  setDialogYesChosen(
                    (prev) => false
                  );
                }}
                className="py-4 px-9 sm:px-5 rounded-xl border-[1.5px] border-black/30 transition-all duration-300 cursor-pointer hover:border-black/70"
              >
                Cancel
              </span>
              <span
                className="py-4 px-9 sm:px-5 rounded-xl border-[1.5px] border-red-500 transition-all duration-300 cursor-pointer hover:bg-red-500 hover:text-white text-red-500"
                onClick={() => {
                  setShowDialog((prev) => false);
                  setDialogYesChosen(
                    (prev) => true
                  );
                }}
              >
                Delete
              </span>
            </span>
          </div>
        </DialogContent>
      </Dialog>

      {/* INSTRUCTIONS DIALOG =================================== */}
      <Dialog
        open={showInstructionPopup}
        onOpenChange={() => {
          setShowInstructionPopup(
            (prev) => !prev
          );
        }}
      >
        <DialogContent className="min-w-fit bg-transparent border-none">
          <div className="flex flex-col items-center justify-center max-w-[90dvw] min-w-[85dvw] sm:min-w-fit gap-[20px] py-8 px-10 rounded-2xl bg-white outline-none">
            <span className="text-[20px] mt-2 sm:mt-0">
              Instructions
            </span>
            <textarea
              aria-label="instructionSet"
              name="instructionSet"
              placeholder="Write an instruction here..."
              onChange={(e) => {
                instructionToSet.newInstruction =
                  e.target.value
                    ? e.target.value
                    : undefined;
              }}
              className="text-[16px] min-w-full sm:min-w-[400px] outline-none border-[1.5px] border-black/20 scrollbar-hide min-h-[200px] rounded-xl p-4"
            >
              {instructionToSet.prevInstruction}
            </textarea>
            <span className="flex items-center justify-between gap-4 *:text-[16px] w-full">
              <span
                onClick={() => {
                  setShowInstructionPopup(
                    (prev) => false
                  );
                  setDialogYesChosen(
                    (prev) => false
                  );
                }}
                className="py-3 sm:py-2 px-8 sm:px-5 rounded-xl border-[1.5px] border-black/30 transition-all duration-300 cursor-pointer hover:border-black/70"
              >
                Cancel
              </span>
              <span
                className="py-3 sm:py-2 px-8 sm:px-5 rounded-xl border-[1.5px] border-pink-600 transition-all duration-300 cursor-pointer hover:bg-pink-600 hover:text-white text-pink-600"
                onClick={() => {
                  setShowInstructionPopup(
                    (prev) => false
                  );
                  setDialogYesChosen(
                    (prev) => true
                  );
                }}
              >
                Confirm
              </span>
            </span>
          </div>
        </DialogContent>
      </Dialog>

      {/* DATE DIALOG =================================== */}
      {serviceInQuestion ? (
        <Dialog
          open={showDateTimeDialog.date}
          onOpenChange={() =>
            setShowDateTimeDialog((prev) => ({
              ...prev,
              date: !prev.date
            }))
          }
        >
          <DialogContent className="w-[87dvw] sm:w-fit max-w-[90dvw] pt-10 pb-7 px-7 sm:p-7 rounded-2xl">
            <SelectDate
              heading={"Event Date"}
              isSelected={false}
              startDate={calculateStartingDate(
                (
                  serviceInQuestion.deliveryTime
                    .orderProcessingTime as OrderProcessingTimeDocument
                ).time
              )}
              selectedDate={convertToDate(
                cartDetails.filter(
                  ({ serviceId, eventDate }) =>
                    serviceId ===
                      serviceInQuestion._id &&
                    formattedDateString(
                      eventDate
                    ) === serviceInQuestionsDate
                )[0]?.eventDate ||
                  formattedDateString(new Date())
              )}
              isMobile={false}
              onSelect={(date: Date) => {}}
              inCart={true}
              handleSubmitChosenDate={
                handleSubmitChosenDate
              }
              serviceId={serviceInQuestion._id}
              prevDate={serviceInQuestionsDate}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}

      {/* TIME DIALOG =================================== */}
      {serviceInQuestion ? (
        <Dialog
          open={showDateTimeDialog.time}
          onOpenChange={() =>
            setShowDateTimeDialog((prev) => ({
              ...prev,
              time: !prev.time
            }))
          }
        >
          <DialogContent className=" w-fit max-w-[90dvw] pt-7 pr-6 py-10 rounded-2xl min-w-[300px]">
            <TimeSlots
              heading="Change time slot"
              selected=""
              onSelect={handleServiceTimeUpdate}
              timeSlots={validTimeSlots({
                startDate: calculateStartingDate(
                  (
                    serviceInQuestion.deliveryTime
                      .orderProcessingTime as OrderProcessingTimeDocument
                  ).time
                ),
                currDate:
                  cartDetails.filter(
                    ({ serviceId, eventDate }) =>
                      serviceId ===
                        serviceInQuestion._id &&
                      formattedDateString(
                        eventDate
                      ) === serviceInQuestionsDate
                  )[0]?.eventDate ||
                  formattedDateString(new Date()),
                timeSlots: (
                  serviceInQuestion.deliveryTime
                    .deliverySlots[0]
                    .deliveryType as DeliveryTypeDocument
                ).timeSlots
              })}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}

      {/* ADDONS DIALOG =================================== */}
      {serviceInQuestion ? (
        <Dialog
          open={showAddonsDialog}
          onOpenChange={() =>
            setShowAddonsDialog((prev) => !prev)
          }
        >
          <DialogContent className="p-0 min-w-fit border-none outline-none bg-transparent">
            <AddonsModal
              addons={fullAddonsData}
              heading="Add more addons"
              serviceName={serviceInQuestion.name}
              service={serviceInQuestion}
              relatedDate={serviceInQuestionsDate}
              price={
                cartDetails.filter(
                  ({ serviceId, eventDate }) =>
                    serviceId ===
                      serviceInQuestion._id &&
                    formattedDateString(
                      eventDate
                    ) === serviceInQuestionsDate
                )[0]?.pricePerUnit || 0
              }
              dateTime={(() => {
                const cartData =
                  cartDetails.filter(
                    ({ serviceId }) =>
                      serviceId ===
                      serviceInQuestion._id
                  )[0];

                const [startTime, endTime] =
                  cartData.eventTime?.split("-");

                return {
                  date: String(
                    cartData.eventDate
                  ),
                  startTime: startTime,
                  endTime: endTime,
                  type: `${parseInt(endTime.substring(0, 2)) - parseInt(startTime.substring(0, 2))} hours`
                };
              })()}
              inCart={true}
              updateAddons={handleUpdatingAddons}
              serviceTotalCount={
                cartDetails.filter(
                  ({ serviceId, eventDate }) =>
                    serviceId ===
                      serviceInQuestion._id &&
                    formattedDateString(
                      eventDate
                    ) === serviceInQuestionsDate
                )[0]?.totalUnits || 1
              }
              selectedAddonsList={selectedAddons}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
}
