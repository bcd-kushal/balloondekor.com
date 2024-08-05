// components
import Care from "@/components/ui/service/info/Care";
import Delivery from "@/components/ui/service/info/Delivery";
import Details from "@/components/ui/service/info/Details";
import FAQS from "@/components/ui/service/info/FAQs";
import Header from "@/components/ui/service/info/Header";
import Order from "@/components/ui/service/info/order/Order";
import Policy from "@/components/ui/service/info/Policy";
import Price from "@/components/client/service/Price";
import Variants from "@/components/client/service/Variants";

// styles
import styles from "@/components/ui/service/info/info.module.css";

// types
import { CancellationPolicyDocument } from "@/schemas/cms/cancellationPolicy";
import { CareInfoDocument } from "@/schemas/cms/careInfo";
import { DeliveryDetailDocument } from "@/schemas/cms/deliveryDetail";
import { FAQDocument } from "@/schemas/cms/faq";
import {
  CustomVariantDocument,
  SelectedAddonDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import Buy from "./order/Buy";
import {
  useEffect,
  useRef,
  useState
} from "react";
import { useCityContext } from "@/hooks/useCityContext";
import {
  usePathname,
  useRouter
} from "next/navigation";
import Badges from "../gallery/canvas/Badges";
import { getWhatsappMessaging } from "@/lib/whatsapp";
import {
  LineItemAddonDocument,
  LineItemDecorationTimeDocument,
  LineItemDocument
} from "@/schemas/cms/lineItem";
import { convertToDate } from "../../transaction/static/utils/convertStringToDate";
import { getDecorationTime } from "@/lib/getDecorationTime";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { AddonDocument } from "@/schemas/cms/addon";
import CustomizeThisDecor from "../scraps/customizeThisDecor/CustomizeThisDecor";

export type DateTimeType = {
  date: string;
  startTime: string;
  endTime: string;
  type: string;
};

export default function Info({
  service,
  referenceVariant,
  customVariant,
  heading,
  addons,
  navigateService,
  onChangeReferenceVariant,
  onChangeCustomVariant,
  onShowAddons
}: {
  service: ServiceDocument;
  referenceVariant: ServiceDocument | undefined;
  customVariant:
    | CustomVariantDocument
    | undefined;
  heading: string;
  addons: SelectedAddonDocument[];
  navigateService: {
    prev: string;
    next: string;
  };
  onChangeReferenceVariant: (
    referenceVariant: ServiceDocument | undefined
  ) => void;
  onChangeCustomVariant: (
    customVariant:
      | CustomVariantDocument
      | undefined
  ) => void;
  onShowAddons: () => void;
}) {
  const currPath = usePathname();
  const router = useRouter();
  const { currentCity } = useCityContext();
  const {
    cart: {
      action: { addCartItem }
    }
  } = useCustomerContext();
  const priceRef = useRef<HTMLDivElement>(null);

  const [
    selectedItemPrice,
    setSelectedItemPrice
  ] = useState<number>(0);

  const [isCitySelected, setIsCitySelected] =
    useState<boolean>(false);

  const [
    isDateTimeSelected,
    setIsDateTimeSelected
  ] = useState<boolean>(false);

  const [
    refVariantSelected,
    setRefVariantSelected
  ] = useState<boolean>(false);

  const [
    customVariantSelected,
    setCustomVariantSelected
  ] = useState<boolean>(false);

  const [dateTime, setDateTime] =
    useState<DateTimeType>({
      date: "",
      endTime: "",
      startTime: "",
      type: ""
    });
  const [addonDialogOpen, setAddonDialogOpen] =
    useState<boolean>(false);
  const [selectedAddons, setSelectedAddons] =
    useState<
      {
        addonId: string;
        count: number;
        pricePerUnit: number;
      }[]
    >([]);

  const [contextCartItem, setContextCartItem] =
    useState<Partial<LineItemDocument>>({
      service: service,
      quantity: 1,
      pricePerUnit: selectedItemPrice,
      eventDate: new Date(),
      decorationTime: {
        type: "",
        timeSlot: ""
      } as LineItemDecorationTimeDocument,
      addons: []
    });

  const handleGetWhatsappMessage = (): string => {
    return getWhatsappMessaging({
      citySelected: isCitySelected,
      productName: referenceVariant
        ? referenceVariant.name
        : service.name,
      selectedDate: dateTime.date,
      selectedTime: `${dateTime.startTime} - ${dateTime.endTime}`,
      selectedDeliveryType: dateTime.type,
      productPrice: String(selectedItemPrice),
      cityName: currentCity?.name
        ? currentCity.name
        : undefined,
      currPath: currPath
    });
  };

  const checkDateTimeCitySelected = () => {
    if (
      isCitySelected &&
      dateTime.date &&
      dateTime.startTime &&
      dateTime.endTime
    ) {
      // if there are addons -------------
      if (addons && addons.length) {
        onShowAddons();
        setAddonDialogOpen((prev) => true);
      } else {
        saveCartToContext();
      }
      return;
    } else {
      function highlightSelectionsToComplete(
        className: string
      ) {
        var el = document.getElementsByClassName(
          className
        )[0] as HTMLElement;

        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });

        setTimeout(
          () =>
            el.animate(
              {
                background: "#aa000025",
                color: "#aa0000",
                borderColor: "#dd0000"
              },
              { duration: 1250 }
            ),
          500
        );
      }
      highlightSelectionsToComplete(
        "dateTimeContainer"
      );
    }
    setAddonDialogOpen((prev) => false);
  };

  const saveCartToContext = () => {
    addCartItem(
      contextCartItem as LineItemDocument
    );
    router.push("/cart");
  };

  useEffect(() => {
    setIsCitySelected((prev) =>
      currentCity?.name ? true : false
    );
  }, [currentCity]);

  useEffect(() => {
    setContextCartItem((prev) => ({
      ...prev,
      eventDate: convertToDate(dateTime.date),
      decorationTime: getDecorationTime({
        dateTime: dateTime,
        service: prev.service as ServiceDocument
      }),
      addons: selectedAddons
        .filter(({ count }) => count > 0)
        .map(
          ({ addonId, count, pricePerUnit }) =>
            ({
              addon: (
                prev.service as ServiceDocument
              ).addons
                .filter(
                  ({ addon }) =>
                    (addon as AddonDocument)
                      ._id === addonId
                )
                .map(
                  ({ addon }) =>
                    addon as AddonDocument
                )[0],
              quantity: count,
              pricePerUnit: pricePerUnit
            }) as LineItemAddonDocument
        )
    }));
  }, [dateTime, selectedAddons, service]);

  useEffect(
    () =>
      setContextCartItem((prev) => ({
        ...prev,
        pricePerUnit: selectedItemPrice
      })),
    [selectedItemPrice]
  );

  useEffect(() => {
    if (refVariantSelected) {
      setContextCartItem((prev) => ({
        ...prev,
        service: referenceVariant || service
      }));
      setRefVariantSelected((prev) => false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refVariantSelected]);

  useEffect(() => {
    if (customVariantSelected) {
      setContextCartItem((prev) => ({
        ...prev,
        customVariant:
          customVariant?._id || undefined
      }));
      setCustomVariantSelected((prev) => false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customVariantSelected]);

  return (
    <div className={styles.container}>
      <div className={styles.namePriceHolder}>
        <Header
          name={
            referenceVariant
              ? referenceVariant.name
              : service.name
          }
          rating={
            referenceVariant
              ? referenceVariant.quality.rating ||
                0
              : service.quality.rating || 0
          }
          ratingCount={
            referenceVariant
              ? referenceVariant.quality
                  .totalReviews || 0
              : service.quality.totalReviews || 0
          }
        />
        <Price
          setCurrItemPrice={setSelectedItemPrice}
          priceDetails={
            referenceVariant
              ? referenceVariant.price
              : customVariant
                ? customVariant.price
                : service.price
          }
          rating={
            referenceVariant
              ? referenceVariant.quality.rating ||
                0
              : service.quality.rating || 0
          }
          ratingCount={
            referenceVariant
              ? referenceVariant.quality
                  .totalReviews || 0
              : service.quality.totalReviews || 0
          }
          priceRef={priceRef}
        />
      </div>
      <div className={styles.detailsHolder}>
        <Details
          title="package details"
          includes={
            referenceVariant
              ? referenceVariant.details?.includes
                  ?.split("\n")
                  ?.filter((include) => include)
              : service.details?.includes
                  ?.split("\n")
                  ?.filter((include) => include)
          }
          excludes={
            referenceVariant
              ? referenceVariant.details?.excludes
                  ?.split("\n")
                  ?.filter(
                    (exclude) => exclude
                  ) || []
              : service.details?.excludes
                  ?.split("\n")
                  ?.filter(
                    (exclude) => exclude
                  ) || []
          }
        />
      </div>
      <Variants
        variants={service.variants}
        onSelectReferenceVariant={(
          referenceVariant:
            | ServiceDocument
            | undefined
        ) => {
          setRefVariantSelected((prev) => true);
          onChangeReferenceVariant(
            referenceVariant
          );
        }}
        onSelectCustomVariant={(
          customVariant:
            | CustomVariantDocument
            | undefined
        ) => {
          setCustomVariantSelected(
            (prev) => true
          );
          onChangeCustomVariant(customVariant);
        }}
      />
      {((referenceVariant &&
        Boolean(
          referenceVariant.price.cities.length
        )) ||
        Boolean(service.price.cities.length)) && (
        <Order
          service={
            referenceVariant
              ? referenceVariant
              : service
          }
          dateTime={dateTime}
          isDateTimeSelected={isDateTimeSelected}
          isCitySelected={isCitySelected}
          whatsappUrl={handleGetWhatsappMessage()}
          setDateTimeState={setIsDateTimeSelected}
          setCityState={setIsCitySelected}
          onClickBuy={onShowAddons}
          setDateTime={setDateTime}
        />
      )}

      {/* ===[ BUY BUTTON + CUSTOMIZE THIS DECOR: WHATSAPP, PHONE ]==================== */}
      <Buy
        price={selectedItemPrice}
        priceRef={priceRef}
        whatsappUrl={handleGetWhatsappMessage()}
        onClick={checkDateTimeCitySelected}
        heading={heading}
        addons={
          referenceVariant
            ? referenceVariant.addons
            : service.addons
        }
        name={
          referenceVariant
            ? referenceVariant.name
            : service.name
        }
        service={service}
        dateTime={dateTime}
        addonDialogOpen={addonDialogOpen}
        setAddonDialogOpen={setAddonDialogOpen}
        selectedAddons={selectedAddons}
        setSelectedAddons={setSelectedAddons}
        saveCart={saveCartToContext}
        navigateService={navigateService}
      />

      <CustomizeThisDecor />

      {/* ===[ REST ]==================== */}
      <div className={styles.detailsHolder}>
        <FAQS
          title="frequently asked questions"
          faqs={
            referenceVariant
              ? (
                  referenceVariant.details
                    .faq as FAQDocument
                ).faqs
              : (
                  service.details
                    .faq as FAQDocument
                ).faqs
          }
        />
        <Policy
          title="cancellation & refund policy"
          policies={
            referenceVariant
              ? (
                  referenceVariant.details
                    .cancellationPolicy as CancellationPolicyDocument
                ).content
              : (
                  service.details
                    .cancellationPolicy as CancellationPolicyDocument
                ).content
          }
        />
        <Delivery
          title="delivery details"
          details={
            referenceVariant
              ? (
                  referenceVariant.details
                    .deliveryDetails as DeliveryDetailDocument
                ).content
              : (
                  service.details
                    .deliveryDetails as DeliveryDetailDocument
                ).content
          }
        />
        <Care
          title="care info"
          infos={
            referenceVariant
              ? (
                  referenceVariant.details
                    .careInfo as CareInfoDocument
                ).content
              : (
                  service.details
                    .careInfo as CareInfoDocument
                ).content
          }
        />
        <Badges />
      </div>
    </div>
  );
}
