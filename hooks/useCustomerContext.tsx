/* eslint-disable react-hooks/exhaustive-deps */

"use client";

/*
DATA FLOW
i. Not Logged In & No Local Cart Items
  -> handleGetCartItemsFromLocalStorage

  -> handleGetCustomer

ii. Not Logged In & Local Cart Items
  -> handleGetCartItemsFromLocalStorage
  --> handleUpdateCartItemsLocal

  -> handleGetCustomer

iii. Logged In, No Cart & No Local Cart Items
  -> handleGetCartItemsFromLocalStorage

  -> handleGetCustomer
  --> handleProcessCustomerData

iv. Logged In, Cart, No Local Cart Items & No Cloud Cart Items
  -> handleGetCartItemsFromLocalStorage

  -> handleGetCustomer
  --> handleProcessCustomerData
  ---> handleUpdateCart

v. Logged In, Cart, No Local Cart Items & Cloud Cart Items
  -> handleGetCartItemsFromLocalStorage

  -> handleGetCustomer
  --> handleProcessCustomerData
  ---> handleUpdateCart
  ----> handleUpdateCartItemsCloud
  -----> handleUpdateCartItemsCloudJSON
  ------> handleUpdateCartItemsLocalJSON

  -----> handleUpdateCartItemsLocal
*/

// libraries
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

// hooks
import { useCityContext } from "./useCityContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// utils
import { getCustomerAuthCookie } from "@/cookies/frontend/auth";
import {
  getLocalStorage,
  setLocalStorage
} from "@/lib/localStorage";

// fetch
import {
  logout,
  passwordCheckRegistrationStatus,
  passwordRegister,
  passwordLogin,
  sendOTP,
  resendOTP,
  verifyOTP,
  verifyGoogle,
  sendWhatsappOTP,
  resendWhatsappOTP,
  verifyWhatsappOTP
} from "@/fetchAPIs/frontend/auth";
import {
  addCart,
  getCart,
  getCartServices,
  updateCart
} from "@/fetchAPIs/frontend/cart";
import {
  getCustomer,
  updateCustomer,
  updateCustomerPassword
} from "@/fetchAPIs/frontend/customer";
import { getOrders } from "@/fetchAPIs/frontend/order";

// types
import { AddonDocument } from "@/schemas/cms/addon";
import { CheckoutInfoDocument } from "@/schemas/cms/checkoutInfo";
import { CouponDocument } from "@/schemas/cms/coupon";
import { CustomerDocument } from "@/schemas/cms/customer";
import {
  DeliveryTypeDocument,
  TimeSlotDocument
} from "@/schemas/cms/deliveryType";
import { LineItemDocument } from "@/schemas/cms/lineItem";
import { OrderDetailDocument } from "@/schemas/cms/orderDetail";
import {
  OrderDocument,
  OrderPaymentGatewayDocument
} from "@/schemas/cms/order";
import {
  SelectedAddonDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import { CityDocument } from "@/schemas/cms/city";
import { OccasionDocument } from "@/schemas/cms/occasion";
import { VenueDocument } from "@/schemas/services/venue";
import { UpdateOrderDataType } from "@/types/payment/order";
import { useGoogleLogin } from "@react-oauth/google";

// constants
const SHOW_DATA_LOGS = false;
const SHOW_STATUS_LOGS = false;
const LOCAL_STORAGE_CART_ITEMS_KEY =
  "__balloondekor_cart__";

// context type
type CustomerContextValueType = {
  status: {
    data: {
      isLoggedIn: boolean;
      isReady: boolean;
      isCustomerReady: boolean;
      isCustomerInfoReady: boolean;
      isCartReady: boolean;
      isLocalCartReady: boolean;
      isCloudCartReady: boolean;
      isLoading: boolean;
      isCustomerLoading: boolean;
      isCartLoading: boolean;
      isLocalCartLoading: boolean;
      isCloudCartLoading: boolean;
    };
  };
  auth: {
    data: {
      password: {
        mail: string;
        registrationStatus:
          | "unchecked"
          | "registered"
          | "not-registered";
      };
      otp: {
        mobileNumber: string;
        otpStatus: "" | "send" | "resend";
      };
    };
    action: {
      password: {
        checkRegistrationStatus: (
          newMail: string
        ) => void;
        resetRegistrationStatus: () => void;
        register: (
          mobileNo: string,
          password: string
        ) => void;
        login: (password: string) => void;
        logout: () => void;
        updatePassword: ({
          currentPassword,
          newPassword
        }: {
          currentPassword: string;
          newPassword: string;
        }) => void;
      };
      otp: {
        resetOTPStatus: () => void;
        sendOTP: (mobileNo: string) => void;
        resendOTP: () => void;
        verifyOTP: (otp: string) => void;
      };
      whatsapp: {
        resetOTPStatus: () => void;
        sendOTP: (mobileNo: string) => void;
        resendOTP: () => void;
        verifyOTP: (otp: string) => void;
      };
      google: {
        login: () => void;
      };
    };
  };
  customer: {
    data: {
      id: string | null;
      info: Partial<CustomerDocument> | null;
    };
    action: {
      updateInfo: ({
        mobileNumber,
        name,
        mail,
        password,
        gender,
        address,
        pinCode
      }: {
        mobileNumber?: string;
        name?: string;
        mail?: string;
        password?: string;
        gender?: string;
        address?: string;
        pinCode?: string;
      }) => void;
    };
  };
  cart: {
    data: {
      id: string | null;
      items: LineItemDocument[];
      checkoutInfo: Partial<CheckoutInfoDocument> | null;
      appliedCoupon: CouponDocument | null;
      totalAmount: number;
      payableAmount: number;
      paymentPercentage: number;
    };
    action: {
      addCartItem: (
        cartItem: LineItemDocument
      ) => void;
      updateCartItems: (
        cartItems: LineItemDocument[]
      ) => void;
      updateCheckoutInfo: (
        checkoutInfo: CheckoutInfoDocument
      ) => void;
      updateAppliedCoupon: (
        coupon: CouponDocument | null
      ) => void;
      setTotalAmount: (
        totalAmount: number
      ) => void;
      setPayableAmount: (
        payableAmount: number
      ) => void;
      setPaymentPercentage: (
        paymentPercentage: number
      ) => void;
    };
  };
  order: {
    data: {
      orders: OrderDocument[];
    };
    action: {
      onGenerateOrder: () => void;
      onRetryPaymentOrder: (
        orderId: string,
        updateOrderData: UpdateOrderDataType
      ) => void;
    };
  };
};

// context
const CustomerContext = createContext<
  CustomerContextValueType | undefined
>(undefined);

// context provider
export function CustomerContextProvider({
  children
}: {
  children: ReactNode;
}) {
  // hooks
  const { currentCity } = useCityContext();

  const { addStatus } = useStatusContext();

  // states
  const [isMounted, setIsMounted] =
    useState<boolean>(false);

  // status states
  const [isLoggedIn, setIsLoggedIn] =
    useState<boolean>(false);

  const [isReady, setIsReady] =
    useState<boolean>(false);

  const [isCustomerReady, setIsCustomerReady] =
    useState<boolean>(false);

  const [
    isCustomerInfoReady,
    setIsCustomerInfoReady
  ] = useState<boolean>(false);

  const [isCartReady, setIsCartReady] =
    useState<boolean>(false);
  const [isLocalCartReady, setIsLocalCartReady] =
    useState<boolean>(false);
  const [isCloudCartReady, setIsCloudCartReady] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] =
    useState<boolean>(false);

  const [
    isCustomerLoading,
    setIsCustomerLoading
  ] = useState<boolean>(false);

  const [isCartLoading, setIsCartLoading] =
    useState<boolean>(false);
  const [
    isLocalCartLoading,
    setIsLocalCartLoading
  ] = useState<boolean>(false);
  const [
    isCloudCartLoading,
    setIsCloudCartLoading
  ] = useState<boolean>(false);

  // auth

  // password
  const [mail, setMail] = useState<string>("");
  const [
    registrationStatus,
    setRegistrationStatus
  ] = useState<
    "unchecked" | "registered" | "not-registered"
  >("unchecked");

  // otp
  const [mobileNumber, setMobileNumber] =
    useState<string>("");
  const [otpStatus, setOTPStatus] = useState<
    "" | "send" | "resend"
  >("");
  const [otpOrderId, setOTPOrderId] = useState<
    string | null
  >(null);

  // customer states
  const [customer, setCustomer] =
    useState<Partial<CustomerDocument> | null>(
      null
    );

  // info
  const [
    customerInfoLocal,
    setCustomerInfoLocal
  ] = useState<Partial<CustomerDocument> | null>(
    null
  );
  const [
    customerInfoDelta,
    setCustomerInfoDelta
  ] = useState<Partial<CustomerDocument> | null>(
    null
  );
  const [
    customerInfoCloud,
    setCustomerInfoCloud
  ] = useState<Partial<CustomerDocument> | null>(
    null
  );
  const [
    customerInfoLocalJSON,
    setCustomerInfoLocalJSON
  ] = useState<string>("");
  const [
    customerInfoDeltaJSON,
    setCustomerInfoDeltaJSON
  ] = useState<string>("");
  const [
    customerInfoCloudJSON,
    setCustomerInfoCloudJSON
  ] = useState<string>("");

  // cart
  const [cart, setCart] =
    useState<OrderDetailDocument | null>(null);

  // orders
  const [orders, setOrders] = useState<
    OrderDocument[]
  >([]);

  // cart states
  const [
    cartItemsLocalStorageJSON,
    setCartItemsLocalStorageJSON
  ] = useState<string>("[]");

  const [cartItemsLocal, setCartItemsLocal] =
    useState<LineItemDocument[]>([]);
  const [cartItemsCloud, setCartItemsCloud] =
    useState<LineItemDocument[]>([]);
  const [
    cartItemsLocalJSON,
    setCartItemsLocalJSON
  ] = useState<string>("[]");
  const [
    cartItemsCloudJSON,
    setCartItemsCloudJSON
  ] = useState<string>("[]");

  const [checkoutInfo, setCheckoutInfo] =
    useState<Partial<CheckoutInfoDocument> | null>(
      null
    );
  const [checkoutInfoJSON, setCheckoutInfoJSON] =
    useState<string>("");

  const [selectedCoupon, setSelectedCoupon] =
    useState<CouponDocument | null>(null);
  const [
    appliedCouponLocal,
    setAppliedCouponLocal
  ] = useState<CouponDocument | null>(null);
  const [
    appliedCouponCloud,
    setAppliedCouponCloud
  ] = useState<CouponDocument | null>(null);

  const [totalAmount, setTotalAmount] =
    useState<number>(0);
  const [payableAmount, setPayableAmount] =
    useState<number>(0);
  const [
    paymentPercentage,
    setPaymentPercentage
  ] = useState<number>(100);

  // const [logAll, setLogAll] =
  //   useState<boolean>(false);

  // utils
  // * to optimize fetching
  const getUniqueServiceIds = (
    cartItems: LineItemDocument[]
  ): string[] => {
    return Array.from(
      new Set(
        (cartItems as LineItemDocument[]).map(
          ({ service }) => service as string
        )
      )
    );
  };

  // * some fields can't be populated by DB
  const populateCartItemsCloud = (
    cartItems: LineItemDocument[]
  ): LineItemDocument[] => {
    return cartItems.map((lineItem) => {
      const populatedLineItem = {
        ...lineItem
      } as LineItemDocument;

      populatedLineItem.decorationTime.timeSlot =
        (
          lineItem.decorationTime
            .type as DeliveryTypeDocument
        ).timeSlots.find(
          ({ _id }) =>
            _id ===
            (lineItem.decorationTime
              .timeSlot as string)
        ) as TimeSlotDocument;

      populatedLineItem.eventDate = new Date(
        lineItem.eventDate as string
      );

      return populatedLineItem;
    });
  };

  // * from fetched service
  const populateCartItemsLocal = (
    cartItems: LineItemDocument[],
    services: ServiceDocument[]
  ): LineItemDocument[] => {
    return cartItems
      .filter(({ service }) =>
        services.find(
          ({ _id }) => _id === service
        )
      )
      .map((cartItem) => {
        const populatedCartItem = {
          ...cartItem
        } as LineItemDocument;

        const populatedService = services.find(
          ({ _id }) => _id === cartItem.service
        ) as ServiceDocument;

        const populatedDeliveryType =
          populatedService?.deliveryTime.deliverySlots.find(
            ({ deliveryType }) =>
              (
                deliveryType as DeliveryTypeDocument
              )._id ===
              cartItem.decorationTime?.type
          )?.deliveryType as DeliveryTypeDocument;

        const populatedTimeSlot = (
          populatedDeliveryType as DeliveryTypeDocument
        ).timeSlots.find(
          (timeSlot) =>
            (timeSlot as TimeSlotDocument)._id ===
            cartItem.decorationTime?.timeSlot
        ) as TimeSlotDocument;

        const populatedAddons =
          cartItem.addons?.map(
            (cartServiceAddon) => {
              const addon =
                populatedService?.addons.find(
                  ({ addon }) =>
                    (addon as AddonDocument)
                      ._id ===
                    cartServiceAddon.addon
                );

              cartServiceAddon.addon = (
                addon as SelectedAddonDocument
              ).addon as AddonDocument;

              return cartServiceAddon;
            }
          );

        populatedCartItem.service =
          populatedService;

        populatedCartItem.eventDate = new Date(
          cartItem.eventDate as string
        );

        populatedCartItem.decorationTime.type =
          populatedDeliveryType;

        populatedCartItem.decorationTime.timeSlot =
          populatedTimeSlot;

        populatedCartItem.addons =
          populatedAddons;

        return populatedCartItem;
      });
  };

  // * to compare as JSON & to add in DB
  const depopulateCartItems = (
    cartItems: LineItemDocument[]
  ): LineItemDocument[] => {
    return cartItems.map(
      ({
        service,
        customVariant,
        pricePerUnit,
        quantity,
        eventDate,
        decorationTime,
        instruction,
        addons
      }) =>
        ({
          service: (service as ServiceDocument)
            ._id,
          customVariant,
          pricePerUnit,
          quantity,
          eventDate,
          decorationTime: {
            type: (
              decorationTime?.type as DeliveryTypeDocument
            )._id,
            timeSlot: (
              decorationTime?.timeSlot as TimeSlotDocument
            )._id
          },
          instruction,
          addons: addons?.map(
            ({
              addon,
              pricePerUnit,
              quantity,
              customizationOption
            }) => ({
              addon: (addon as AddonDocument)._id,
              pricePerUnit,
              quantity,
              customizationOption
            })
          )
        }) as LineItemDocument
    );
  };

  // * same service at same day
  const isDuplicateCartItem = (
    firstCartItem: LineItemDocument,
    secondCartItem: LineItemDocument
  ): boolean => {
    return (
      (firstCartItem.service as ServiceDocument)
        ._id ===
        (
          secondCartItem?.service as ServiceDocument
        )._id &&
      (
        firstCartItem.eventDate as Date
      )?.toUTCString() ===
        (
          secondCartItem.eventDate as Date
        )?.toUTCString()
    );
  };

  // * by handling duplicate
  const mergeCartItems = (
    existingCartItems: LineItemDocument[],
    newCartItems: LineItemDocument[]
  ): LineItemDocument[] => {
    let filteredExistingCartItems = [
      ...existingCartItems
    ];

    newCartItems.forEach((newCartItem) => {
      filteredExistingCartItems =
        filteredExistingCartItems.filter(
          (mergedCartItem) =>
            !isDuplicateCartItem(
              mergedCartItem,
              newCartItem
            )
        );
    });

    return [
      ...newCartItems,
      ...filteredExistingCartItems
    ];
  };

  const depopulateCheckoutInfo = (
    populatedCheckoutInfo: CheckoutInfoDocument
  ): CheckoutInfoDocument => {
    const depopulatedCheckoutInfo = {
      ...populatedCheckoutInfo
    } as CheckoutInfoDocument;

    depopulatedCheckoutInfo.city =
      (
        populatedCheckoutInfo?.city as CityDocument
      )?._id || "";
    if (populatedCheckoutInfo?.occasion) {
      depopulatedCheckoutInfo.occasion =
        (
          populatedCheckoutInfo?.occasion as OccasionDocument
        )?._id || "";
    }
    if (populatedCheckoutInfo?.venue) {
      depopulatedCheckoutInfo.venue =
        (
          populatedCheckoutInfo?.venue as VenueDocument
        )?._id || "";
    }

    return depopulatedCheckoutInfo;
  };

  // handlers

  // auth handlers
  const handleLogout = (): void => {
    if (!isCustomerLoading) {
      setIsCustomerLoading(true);

      logout()
        .then(() => {
          setIsLoggedIn(false);

          setCustomer(null);

          if (checkoutInfo) {
            setCheckoutInfo(null);
          }

          if (checkoutInfoJSON) {
            setCheckoutInfoJSON("");
          }

          if (selectedCoupon) {
            setSelectedCoupon(null);
          }

          if (appliedCouponLocal) {
            setAppliedCouponLocal(null);
          }

          if (totalAmount) {
            setTotalAmount(0);
          }

          if (payableAmount) {
            setPayableAmount(0);
          }

          if (paymentPercentage !== 100) {
            setPaymentPercentage(100);
          }

          if (otpStatus) {
            setOTPStatus("");
          }

          if (
            registrationStatus !== "unchecked"
          ) {
            setRegistrationStatus("unchecked");
          }

          // setTimeout(() => {
          //   setLogAll(true);
          // }, 10000);

          addStatus([
            {
              message: "Logged Out!",
              type: "success"
            }
          ]);
        })
        .catch(() => {
          addStatus([
            {
              message: "Couldn't Log Out!",
              type: "error"
            }
          ]);
        })
        .finally(() => {
          setIsCustomerLoading(false);
        });
    }
  };

  // password auth handlers
  const handleCheckRegistrationStatus = (
    newMail: string
  ): void => {
    if (mail !== newMail) {
      setMail(newMail);
    }
    if (registrationStatus !== "unchecked") {
      setRegistrationStatus("unchecked");
    }

    if (!isCustomerLoading) {
      setIsCustomerLoading(true);

      passwordCheckRegistrationStatus({
        mail: newMail
      })
        .then((isRegistered) => {
          if (isRegistered) {
            setRegistrationStatus("registered");
          } else {
            setRegistrationStatus(
              "not-registered"
            );
          }
        })
        .catch(() => {
          addStatus([
            {
              message: "Try again!",
              type: "error"
            }
          ]);
        })
        .finally(() => {
          setIsCustomerLoading(false);
        });
    }
  };

  const handleResetRegistrationStatus =
    (): void => {
      setRegistrationStatus("unchecked");
    };

  const handlePasswordRegistration = (
    mobileNo: string,
    password: string
  ): void => {
    if (!isCustomerLoading) {
      setIsCustomerLoading(true);

      passwordRegister({
        mail,
        mobileNumber: mobileNo,
        password
      })
        .then(() => {
          handleGetCustomer();
          addStatus([
            {
              message: "Registered!",
              type: "success"
            }
          ]);
        })
        .catch(() => {
          addStatus([
            {
              message:
                "Mobile Number Is Already Registered",
              type: "error"
            }
          ]);
        })
        .finally(() => {
          setIsCustomerLoading(false);
        });
    }
  };

  const handlePasswordLogin = (
    password: string
  ): void => {
    if (!isCustomerLoading) {
      setIsCustomerLoading(true);

      passwordLogin({
        mail,
        password
      })
        .then(() => {
          setIsCustomerLoading(false);
          handleGetCustomer();
          addStatus([
            {
              message: "Successfully Logged In!",
              type: "success"
            }
          ]);
        })
        .catch(() => {
          setIsCustomerLoading(false);
          addStatus([
            {
              message: "Invalid Credentials!",
              type: "error"
            }
          ]);
        });
    }
  };

  // otp auth handlers
  const handleResetOTPStatus = (): void => {
    setOTPStatus("");
  };

  const handleSendOTP = (
    newMobileNo: string
  ): void => {
    if (mobileNumber !== newMobileNo) {
      setMobileNumber(newMobileNo);
    }
    if (otpStatus) {
      setOTPStatus("");
    }

    if (!isCustomerLoading) {
      setIsCustomerLoading(true);

      sendOTP({
        mobileNumber: newMobileNo
      })
        .then((orderId) => {
          setOTPOrderId(orderId);
          setOTPStatus("send");
        })
        .catch(() => {
          addStatus([
            {
              message: "Try again!",
              type: "error"
            }
          ]);
        })
        .finally(() => {
          setIsCustomerLoading(false);
        });
    }
  };

  const handleResendOTP = (): void => {
    if (!isCustomerLoading) {
      setIsCustomerLoading(true);

      if (otpStatus) {
        setOTPStatus("");
      }

      resendOTP({
        orderId: otpOrderId as string
      })
        .then((newOrderId) => {
          setOTPOrderId(newOrderId);
          setOTPStatus("resend");
        })
        .catch(() => {
          addStatus([
            {
              message: "Try again!",
              type: "error"
            }
          ]);
        })
        .finally(() => {
          setIsCustomerLoading(false);
        });
    }
  };

  const handleVerifyOTP = (otp: string): void => {
    if (!isCustomerLoading) {
      setIsCustomerLoading(true);

      verifyOTP({
        mobileNumber,
        orderId: otpOrderId as string,
        otp
      })
        .then(() => {
          handleGetCustomer();
          handleResetOTPStatus();
          addStatus([
            {
              message: "Logged In!",
              type: "success"
            }
          ]);
        })
        .catch(() => {
          addStatus([
            {
              message: "Incorrect OTP!",
              type: "error"
            }
          ]);
        })
        .finally(() => {
          // console.log({ isCustomerLoading });
          // if (isCustomerLoading) {
          //   console.log("inside");
          setIsCustomerLoading(false);
          // }
        });
    }
  };

  // whatsapp auth handlers

  const handleSendWhatsappOTP = (
    newMobileNo: string
  ): void => {
    if (mobileNumber !== newMobileNo) {
      setMobileNumber(newMobileNo);
    }
    if (otpStatus) {
      setOTPStatus("");
    }

    if (!isCustomerLoading) {
      setIsCustomerLoading(true);

      sendWhatsappOTP({
        mobileNumber: newMobileNo
      })
        .then((orderId) => {
          setOTPOrderId(orderId);
          setOTPStatus("send");
        })
        .catch(() => {
          addStatus([
            {
              message: "Try again!",
              type: "error"
            }
          ]);
        })
        .finally(() => {
          setIsCustomerLoading(false);
        });
    }
  };

  const handleResendWhatsappOTP = (): void => {
    if (!isCustomerLoading) {
      setIsCustomerLoading(true);

      if (otpStatus) {
        setOTPStatus("");
      }

      resendWhatsappOTP({
        orderId: otpOrderId as string
      })
        .then((newOrderId) => {
          setOTPOrderId(newOrderId);
          setOTPStatus("resend");
        })
        .catch(() => {
          addStatus([
            {
              message: "Try again!",
              type: "error"
            }
          ]);
        })
        .finally(() => {
          setIsCustomerLoading(false);
        });
    }
  };

  const handleVerifyWhatsappOTP = (
    otp: string
  ): void => {
    if (!isCustomerLoading) {
      setIsCustomerLoading(true);

      verifyWhatsappOTP({
        mobileNumber,
        orderId: otpOrderId as string,
        otp
      })
        .then(() => {
          handleGetCustomer();
          handleResetOTPStatus();
          addStatus([
            {
              message: "Logged In!",
              type: "success"
            }
          ]);
        })
        .catch(() => {
          addStatus([
            {
              message: "Incorrect OTP!",
              type: "error"
            }
          ]);
        })
        .finally(() => {
          // console.log({ isCustomerLoading });
          // if (isCustomerLoading) {
          //   console.log("inside");
          setIsCustomerLoading(false);
          // }
        });
    }
  };

  // google auth handlers
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (res) => {
      verifyGoogle(res.code)
        .then(() => {
          setIsCustomerLoading(false);
          handleGetCustomer();
          addStatus([
            {
              message: "Successfully Logged In!",
              type: "success"
            }
          ]);
        })
        .catch(() => {
          setIsCustomerLoading(false);
          addStatus([
            {
              message: "Invalid Credentials!",
              type: "error"
            }
          ]);
        });
    },
    flow: "auth-code"
  });

  // customer handlers
  const handleGetCustomer = (): void => {
    if (!isCustomerLoading) {
      setIsCustomerLoading(true);

      getCustomerAuthCookie().then(
        (customerId) => {
          if (customerId) {
            // * logged in (valid token)
            getCustomer(customerId)
              .then(({ data }) => {
                setCustomer(data);
                setIsLoggedIn(true);
              })
              .catch(() => {})
              .finally(() => {
                setIsCustomerLoading(false);
                setIsCustomerReady(true);
              });
          } else {
            // * not logged in (invalid/no token)
            setIsCustomerLoading(false);
            setIsCustomerReady(true);
            setIsCloudCartReady(true);
          }
        }
      );
    }
  };

  const handleProcessCustomerData = (): void => {
    if (customer) {
      // * on login/register
      const {
        mobileNumber: customerMobileNumber,
        name: customerName,
        mail: customerMail,
        password: customerPassword,
        gender: customerGender,
        address: customerAddress,
        pinCode: customerPinCode,
        cart: customerCart,
        orders: customerOrders
      } = customer;

      // info
      const newCustomerInfo = {
        mobileNumber: customerMobileNumber,

        ...(customerName &&
        customerName !== "User"
          ? { name: customerName }
          : {}),
        ...(customerMail
          ? { mail: customerMail }
          : {}),
        ...(customerPassword
          ? { password: customerPassword }
          : {}),
        ...(customerGender
          ? { gender: customerGender }
          : {}),
        ...(customerAddress
          ? { address: customerAddress }
          : {}),
        ...(customerPinCode
          ? { pinCode: customerPinCode }
          : {})
      };
      const newCustomerInfoJSON = JSON.stringify(
        newCustomerInfo
      );

      if (!customerInfoCloud) {
        setCustomerInfoCloud(newCustomerInfo);
        setCustomerInfoCloudJSON(
          newCustomerInfoJSON
        );
      }

      if (!customerInfoLocal) {
        setCustomerInfoLocal(newCustomerInfo);
        setCustomerInfoLocalJSON(
          newCustomerInfoJSON
        );

        setIsCustomerInfoReady(true);
      }

      // cart
      if (customerCart) {
        // * has cart
        getCart(customerCart as string).then(
          (res) => {
            setCart(
              res.data as OrderDetailDocument
            );
          }
        );
      } else if (cartItemsLocal.length) {
        // * no cart & cart items on local
        handleUpdateCartItemsLocalJSON();
      } else {
        // * no cart
        if (cart) {
          setCart(null);
        }
        if (!isCloudCartReady) {
          setIsCloudCartReady(true);
        }
      }

      // orders
      if (customerOrders?.length) {
        getOrders(
          customerOrders as string[]
        ).then((res) => {
          setOrders(res.data as OrderDocument[]);
        });
      } else {
        if (orders.length) {
          setOrders([]);
        }
      }
    } else {
      // * on logout
      if (customerInfoCloud) {
        setCustomerInfoCloud(null);
        setCustomerInfoCloudJSON("");
      }

      if (customerInfoLocal) {
        setCustomerInfoLocal(null);
        setCustomerInfoLocalJSON("");
      }

      if (cart) {
        setCart(null);
      }

      if (orders.length) {
        setOrders([]);
      }
    }
  };

  const handleUpdateCustomerInfo = ({
    mobileNumber,
    name,
    mail,
    password,
    gender,
    address,
    pinCode
  }: {
    mobileNumber?: string;
    name?: string;
    mail?: string;
    password?: string;
    gender?: string;
    address?: string;
    pinCode?: string;
  }): void => {
    setCustomerInfoDelta({
      ...customerInfoLocal,
      ...(mobileNumber ? { mobileNumber } : {}),
      ...(name ? { name } : {}),
      ...(mail ? { mail } : {}),
      ...(password ? { password } : {}),
      ...(gender ? { gender } : {}),
      ...(address ? { address } : {}),
      ...(pinCode ? { pinCode } : {})
    } as CustomerDocument);
  };

  const handleUpdateCustomerInfoDelta =
    (): void => {
      const newCustomerInfoDeltaJSON =
        JSON.stringify(customerInfoDelta);

      if (
        customerInfoDeltaJSON !==
        newCustomerInfoDeltaJSON
      ) {
        setCustomerInfoDeltaJSON(
          newCustomerInfoDeltaJSON
        );
      }
    };

  const handleUpdateCustomerInfoDeltaJSON =
    (): void => {
      if (
        customerInfoCloudJSON !==
        customerInfoDeltaJSON
      ) {
        if (isLoggedIn) {
          updateCustomer(
            customer?._id,
            customerInfoDelta as CustomerDocument
          )
            .then((res) => {
              setCustomerInfoCloudJSON(
                customerInfoDeltaJSON
              );
              setCustomerInfoLocal(
                customerInfoDelta
              );
              addStatus(res.status);
            })
            .catch((res) => {
              setCustomerInfoDelta(
                customerInfoLocal
              );
              addStatus(res.status);
            });
        }
      }
    };

  const handleUpdateCustomerInfoLocal =
    (): void => {
      setCustomerInfoLocalJSON(
        JSON.stringify(customerInfoLocal)
      );
    };

  const handleUpdatePassword = ({
    currentPassword,
    newPassword
  }: {
    currentPassword: string;
    newPassword: string;
  }): void => {
    updateCustomerPassword(
      customer?._id,
      currentPassword,
      newPassword
    );
  };

  // cart handlers

  // local cart handlers
  const handleUpdateCart = (): void => {
    if (!isCloudCartLoading) {
      setIsCloudCartLoading(true);

      if (cart) {
        if (cart.lineItems.length) {
          setCartItemsCloud(
            populateCartItemsCloud(cart.lineItems)
          );
        } else if (cartItemsLocal.length) {
          // * to add local cart items in DB
          handleUpdateCartItemsLocalJSON();
        }

        if (cart?.appliedCoupon) {
          if (
            !appliedCouponCloud &&
            !appliedCouponLocal
          ) {
            updateCart(cart?._id, customer?._id, {
              $unset: { appliedCoupon: 1 }
            } as Partial<OrderDetailDocument>);
          }
        }
      } else {
        // * after order
        if (cartItemsCloud.length) {
          setCartItemsCloud([]);
        }
        if (cartItemsLocal.length) {
          setCartItemsLocal([]);
        }
      }

      setIsCloudCartLoading(false);
      if (!isCloudCartReady) {
        setIsCloudCartReady(true);
      }
    }
  };

  const handleGetCartItemsFromLocalStorage =
    (): void => {
      if (!isLocalCartLoading) {
        setIsLocalCartLoading(true);

        let localStorageCartItems: LineItemDocument[] =
          getLocalStorage(
            LOCAL_STORAGE_CART_ITEMS_KEY
          );

        if (
          typeof localStorageCartItems ===
          "string"
        ) {
          localStorageCartItems = JSON.parse(
            localStorageCartItems
          );
        }

        if (localStorageCartItems?.length) {
          getCartServices(
            getUniqueServiceIds(
              localStorageCartItems
            )
          ).then((services) => {
            setCartItemsLocal(
              populateCartItemsLocal(
                localStorageCartItems,
                services
              )
            );

            setIsLocalCartLoading(false);
            setIsLocalCartReady(true);
          });
        } else {
          setIsLocalCartLoading(false);
          setIsLocalCartReady(true);
        }
      }
    };

  const handleAddCartItem = (
    cartItem: LineItemDocument
  ): void => {
    if (!isCartLoading) {
      setIsCartLoading(true);

      setCartItemsLocal(
        mergeCartItems(cartItemsLocal, [cartItem])
      );

      setIsCartLoading(false);
    }
  };

  const handleUpdateCartItemsLocal = (): void => {
    const newCartItemsLocalJSON = JSON.stringify(
      depopulateCartItems(
        cartItemsLocal as LineItemDocument[]
      )
    );

    if (
      newCartItemsLocalJSON !== cartItemsLocalJSON
    ) {
      setCartItemsLocalJSON(
        newCartItemsLocalJSON
      );
    }
  };

  const handleUpdateCartItemsLocalJSON =
    (): void => {
      if (isLoggedIn) {
        // * to remove local data if logged in
        if (cartItemsLocalStorageJSON !== "[]") {
          setLocalStorage(
            LOCAL_STORAGE_CART_ITEMS_KEY,
            "[]"
          );
          setCartItemsLocalStorageJSON("[]");
        }

        if (
          cartItemsCloudJSON !==
          cartItemsLocalJSON
        ) {
          // * sync cloud with local
          const newCartItems = JSON.parse(
            cartItemsLocalJSON
          );

          if (cart) {
            updateCart(cart._id, customer?._id, {
              lineItems: newCartItems
            });
          } else {
            const newCartData: Partial<OrderDetailDocument> =
              {
                customer: customer?._id,
                city: currentCity?._id,
                lineItems: newCartItems
              };

            addCart(newCartData).then(
              (cartRes) => {
                updateCustomer(customer?._id, {
                  cart: (
                    cartRes.data as OrderDetailDocument
                  )._id
                }).then((customerRes) => {
                  setCustomer(customerRes.data);
                });
              }
            );
          }
        }
      } else {
        // * to use local storage in not logged in
        setLocalStorage(
          LOCAL_STORAGE_CART_ITEMS_KEY,
          cartItemsLocalJSON
        );

        if (
          cartItemsLocalStorageJSON !==
          cartItemsLocalJSON
        ) {
          setCartItemsLocalStorageJSON(
            cartItemsLocalJSON
          );
        }
      }
    };

  // cloud cart handlers
  const handleUpdateCartItemsCloud = (): void => {
    const newCartItemsCloudJSON = JSON.stringify(
      depopulateCartItems(
        cartItemsCloud as LineItemDocument[]
      )
    );

    if (
      newCartItemsCloudJSON !== cartItemsCloudJSON
    ) {
      setCartItemsCloudJSON(
        newCartItemsCloudJSON
      );
    }
  };

  const handleUpdateCartItemsCloudJSON =
    (): void => {
      if (
        cartItemsLocalJSON !== cartItemsCloudJSON
      ) {
        // * to sync local with cloud
        if (!cartItemsLocal.length) {
          setCartItemsLocalJSON(
            cartItemsCloudJSON
          );
          setCartItemsLocal(cartItemsCloud);
        } else {
          setCartItemsLocal(
            mergeCartItems(
              cartItemsCloud,
              cartItemsLocal
            )
          );
        }
      }
    };

  const handleUpdateCheckoutInfo = (
    newCheckoutInfo: Partial<CheckoutInfoDocument>
  ): void => {
    const modifiedCheckoutInfo = {
      ...newCheckoutInfo
    };

    if (
      !(
        modifiedCheckoutInfo.occasion as OccasionDocument
      )._id
    ) {
      delete modifiedCheckoutInfo.occasion;
    }

    if (
      !(
        modifiedCheckoutInfo.venue as VenueDocument
      )._id
    ) {
      delete modifiedCheckoutInfo.venue;
    }

    setCheckoutInfo(modifiedCheckoutInfo);
    setCheckoutInfoJSON(
      JSON.stringify(
        depopulateCheckoutInfo(
          modifiedCheckoutInfo as CheckoutInfoDocument
        )
      )
    );

    if (
      !customerInfoLocal?.name ||
      !customerInfoLocal?.mail ||
      !customerInfoLocal.address
    ) {
      handleUpdateCustomerInfo({
        name:
          customerInfoLocal?.name &&
          customerInfoLocal?.name !== "User"
            ? ""
            : newCheckoutInfo.name,
        mail: customerInfoLocal?.mail
          ? ""
          : newCheckoutInfo.mail,
        address: customerInfoLocal?.address
          ? ""
          : newCheckoutInfo.address
      });
    }
  };

  const handleUpdateCheckoutInfoJSON =
    (): void => {
      if (
        checkoutInfo?.name &&
        checkoutInfo?.mobileNumber &&
        checkoutInfo?.mail &&
        checkoutInfo?.address &&
        checkoutInfo?.pinCode &&
        checkoutInfo?.city
      ) {
        updateCart(cart?._id, customer?._id, {
          checkoutInfo: JSON.parse(
            checkoutInfoJSON
          )
        });
      }
    };

  const handleUpdateSelectedCoupon = (
    coupon: CouponDocument | null
  ): void => {
    if (coupon) {
      if (selectedCoupon?._id !== coupon._id) {
        setSelectedCoupon(coupon);
      }

      if (paymentPercentage === 100) {
        setAppliedCouponLocal(coupon);
      }
    } else {
      if (selectedCoupon) {
        setSelectedCoupon(null);
      }
      if (appliedCouponLocal) {
        setAppliedCouponLocal(coupon);
      }
    }
  };

  const handleUpdateAppliedCouponLocal =
    (): void => {
      if (
        appliedCouponLocal &&
        appliedCouponCloud
      ) {
        if (
          appliedCouponCloud?._id !==
          appliedCouponLocal?._id
        ) {
          setAppliedCouponCloud(
            appliedCouponLocal
          );

          updateCart(cart?._id, customer?._id, {
            appliedCoupon: appliedCouponLocal?._id
          });
        }
      } else if (
        JSON.stringify(appliedCouponCloud) !==
        JSON.stringify(appliedCouponLocal)
      ) {
        setAppliedCouponCloud(appliedCouponLocal);

        updateCart(cart?._id, customer?._id, {
          ...(appliedCouponLocal
            ? {
                appliedCoupon:
                  appliedCouponLocal?._id
              }
            : { $unset: { appliedCoupon: 1 } })
        } as Partial<OrderDetailDocument>);
      }
    };

  // order
  const handleOrderGeneration = (): void => {
    // * to sync with DB after order
    getCustomer(customer?._id).then(
      ({ data }) => {
        setCustomer(data);
      }
    );

    if (cartItemsCloud.length) {
      setCartItemsCloud([]);
    }

    if (cartItemsLocal.length) {
      setCartItemsLocal([]);
    }

    if (checkoutInfo) {
      setCheckoutInfo(null);
    }

    if (checkoutInfoJSON) {
      setCheckoutInfoJSON("");
    }

    if (selectedCoupon) {
      setSelectedCoupon(null);
    }

    if (appliedCouponLocal) {
      setAppliedCouponLocal(null);
    }

    if (totalAmount) {
      setTotalAmount(0);
    }

    if (payableAmount) {
      setPayableAmount(0);
    }

    if (paymentPercentage !== 100) {
      setPaymentPercentage(100);
    }

    // setTimeout(() => {
    //   setLogAll(true);
    // }, 10000);
  };

  const handleRetryPayment = (
    orderId: string,
    updateOrderData: UpdateOrderDataType
  ): void => {
    const updatedOrders = orders.map((order) => {
      if (order._id === orderId) {
        const newOrder = { ...order };

        newOrder.payment.status = "completed";
        newOrder.payment.gateway = {
          name: updateOrderData.gateway,
          info: updateOrderData.gatewayResponse
        } as OrderPaymentGatewayDocument;

        return newOrder;
      }

      return order;
    }) as OrderDocument[];

    setOrders(updatedOrders);
  };

  // lifecycle hooks

  // onMount
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }

    handleGetCartItemsFromLocalStorage();
    handleGetCustomer();
  }, []);

  useEffect(() => {
    if (SHOW_STATUS_LOGS) {
      if (isMounted) {
        console.log({ isMounted });
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (SHOW_STATUS_LOGS) {
      if (isMounted) {
        console.log({ isLoggedIn });
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (SHOW_STATUS_LOGS) {
      if (isMounted) {
        console.log({ isReady });
      }
    }
  }, [isReady]);

  useEffect(() => {
    if (SHOW_STATUS_LOGS) {
      if (isMounted) {
        console.log({ isCustomerReady });
      }
    }
  }, [isCustomerReady]);

  useEffect(() => {
    if (SHOW_STATUS_LOGS) {
      if (isMounted) {
        console.log({ isCartReady });
      }
    }
  }, [isCartReady]);

  useEffect(() => {
    if (SHOW_STATUS_LOGS) {
      if (isMounted) {
        console.log({ isLocalCartReady });
      }
    }
  }, [isLocalCartReady]);

  useEffect(() => {
    if (SHOW_STATUS_LOGS) {
      if (isMounted) {
        console.log({ isCloudCartReady });
      }
    }
  }, [isCloudCartReady]);

  useEffect(() => {
    if (isMounted) {
      if (isLocalCartReady && isCloudCartReady) {
        setIsCartReady(true);
      }
    }
  }, [isLocalCartReady, isCloudCartReady]);

  useEffect(() => {
    if (isMounted) {
      if (isCustomerReady && isCartReady) {
        setIsReady(true);
      }
    }
  }, [isCustomerReady, isCartReady]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ customer });
      }
    }

    if (isMounted) {
      handleProcessCustomerData();
    }
  }, [customer]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ customerInfoCloud });
      }
    }
  }, [customerInfoCloud]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ customerInfoCloudJSON });
      }
    }
  }, [customerInfoCloudJSON]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ customerInfoDelta });
      }
    }

    if (isMounted) {
      handleUpdateCustomerInfoDelta();
    }
  }, [customerInfoDelta]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ customerInfoDeltaJSON });
      }
    }

    if (isMounted) {
      handleUpdateCustomerInfoDeltaJSON();
    }
  }, [customerInfoDeltaJSON]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ customerInfoLocal });
      }
    }

    if (isMounted) {
      handleUpdateCustomerInfoLocal();
    }
  }, [customerInfoLocal]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ customerInfoLocalJSON });
      }
    }
  }, [customerInfoLocalJSON]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ cart });
      }
    }

    if (isMounted) {
      handleUpdateCart();
    }
  }, [cart]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ cartItemsLocal });
      }
    }

    if (isMounted) {
      handleUpdateCartItemsLocal();
    }
  }, [cartItemsLocal]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ cartItemsLocalJSON });
      }
    }

    if (isMounted) {
      handleUpdateCartItemsLocalJSON();
    }
  }, [cartItemsLocalJSON]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ cartItemsCloud });
      }
    }

    if (isMounted) {
      handleUpdateCartItemsCloud();
    }
  }, [cartItemsCloud]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ cartItemsCloudJSON });
      }
    }

    if (isMounted) {
      handleUpdateCartItemsCloudJSON();
    }
  }, [cartItemsCloudJSON]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ appliedCouponCloud });
      }
    }
  }, [appliedCouponCloud]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ selectedCoupon });
      }
    }
  }, [selectedCoupon]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ appliedCouponLocal });
      }
    }

    if (isMounted) {
      handleUpdateAppliedCouponLocal();
    }
  }, [appliedCouponLocal]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ checkoutInfoJSON });
      }
    }

    if (isMounted) {
      handleUpdateCheckoutInfoJSON();
    }
  }, [checkoutInfoJSON]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ totalAmount });
      }
    }
  }, [totalAmount]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({ payableAmount });
      }
    }
  }, [payableAmount]);

  useEffect(() => {
    if (isMounted) {
      if (
        paymentPercentage !== 100 &&
        appliedCouponLocal
      ) {
        setAppliedCouponLocal(null);
      } else if (
        paymentPercentage === 100 &&
        selectedCoupon
      ) {
        setAppliedCouponLocal(selectedCoupon);
      }
    }
  }, [paymentPercentage]);

  useEffect(() => {
    if (SHOW_DATA_LOGS) {
      if (isMounted) {
        console.log({
          customerOrdersCloud: orders
        });
      }
    }
  }, [orders]);

  useEffect(() => {
    if (SHOW_STATUS_LOGS) {
      if (isMounted) {
        console.log(otpStatus);
      }
    }
  }, [otpStatus]);

  return (
    <CustomerContext.Provider
      value={{
        status: {
          data: {
            isLoggedIn,
            isReady,
            isCustomerReady,
            isCustomerInfoReady,
            isCartReady,
            isLocalCartReady,
            isCloudCartReady,
            isLoading,
            isCustomerLoading,
            isCartLoading,
            isLocalCartLoading,
            isCloudCartLoading
          }
        },
        auth: {
          data: {
            password: {
              mail,
              registrationStatus
            },
            otp: {
              mobileNumber,
              otpStatus
            }
          },
          action: {
            password: {
              checkRegistrationStatus:
                handleCheckRegistrationStatus,
              resetRegistrationStatus:
                handleResetRegistrationStatus,
              register:
                handlePasswordRegistration,
              login: handlePasswordLogin,
              logout: handleLogout,
              updatePassword: handleUpdatePassword
            },
            otp: {
              resetOTPStatus:
                handleResetOTPStatus,
              sendOTP: handleSendOTP,
              resendOTP: handleResendOTP,
              verifyOTP: handleVerifyOTP
            },
            whatsapp: {
              resetOTPStatus:
                handleResetOTPStatus,
              sendOTP: handleSendWhatsappOTP,
              resendOTP: handleResendWhatsappOTP,
              verifyOTP: handleVerifyWhatsappOTP
            },
            google: {
              login: handleGoogleLogin
            }
          }
        },
        customer: {
          data: {
            id: customer?._id,
            info: customerInfoLocal
          },
          action: {
            updateInfo: handleUpdateCustomerInfo
          }
        },
        cart: {
          data: {
            id: cart?._id,
            items: cartItemsLocal,
            checkoutInfo: checkoutInfo,
            appliedCoupon: appliedCouponLocal,
            totalAmount,
            payableAmount,
            paymentPercentage
          },
          action: {
            addCartItem: handleAddCartItem,
            updateCartItems: setCartItemsLocal,
            updateCheckoutInfo:
              handleUpdateCheckoutInfo,
            updateAppliedCoupon:
              handleUpdateSelectedCoupon,
            setTotalAmount,
            setPayableAmount,
            setPaymentPercentage
          }
        },
        order: {
          data: {
            orders
          },
          action: {
            onGenerateOrder:
              handleOrderGeneration,
            onRetryPaymentOrder:
              handleRetryPayment
          }
        }
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

// hook
export const useCustomerContext =
  (): CustomerContextValueType => {
    const customerContextNew = useContext(
      CustomerContext
    );

    if (!customerContextNew) {
      throw new Error(
        "useCustomerContext must be used within a CustomerContextProvider"
      );
    }

    return customerContextNew;
  };
