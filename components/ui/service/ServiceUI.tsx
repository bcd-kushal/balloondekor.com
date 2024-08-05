// components
import BreadCrumbs from "@/components/frontend/Breadcrumbs";
import Gallery from "@/components/client/service/Gallery";
import Info from "@/components/ui/service/info/Info";

// styles
import styles from "@/components/ui/service/serviceUI.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import {
  CustomVariantDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import Services from "../serviceCategory/Services";
import HowItWorks from "./scraps/howItWorks/HowItWorks";
import ReviewsByCustomers from "./scraps/reviewsByCustomers/ReviewsByCustomers";

export default function ServiceUI({
  slugs,
  service,
  suggestions,
  showSuggestions,
  showAddonsModal,
  referenceVariant,
  customVariant,
  navigateService,
  onChangeShowSuggestions,
  onChangeShowAddonsModal,
  onChangeReferenceVariant,
  onChangeCustomVariant
}: {
  slugs: string[];
  service: ServiceDocument;
  suggestions: ServiceDocument[];
  showSuggestions: boolean;
  showAddonsModal: boolean;
  referenceVariant?: ServiceDocument;
  customVariant?: CustomVariantDocument;
  navigateService: {
    prev: string;
    next: string;
  };
  onChangeShowSuggestions: (
    showSuggestions: boolean
  ) => void;
  onChangeShowAddonsModal: (
    showAddonsModal: boolean
  ) => void;
  onChangeReferenceVariant: (
    referenceVariant?: ServiceDocument
  ) => void;
  onChangeCustomVariant: (
    customVariant?: CustomVariantDocument
  ) => void;
}) {
  return (
    <main className={styles.container}>
      <BreadCrumbs
        slugs={
          (
            service?.category as ServiceCategoryDocument
          )?.slug
            ? [
                (
                  service?.category as ServiceCategoryDocument
                )?.slug,
                ...slugs
              ]
            : slugs
        }
      />
      <section className={styles.details}>
        <Gallery
          images={
            referenceVariant
              ? [
                  referenceVariant.media
                    .primary as ImageDocument,
                  ...(referenceVariant.media
                    .gallery as ImageDocument[])
                ]
              : customVariant &&
                  customVariant.image
                ? [
                    customVariant.image as ImageDocument
                  ]
                : [
                    service.media
                      .primary as ImageDocument,
                    ...(service.media
                      .gallery as ImageDocument[])
                  ]
          }
          suggestions={suggestions}
          onShowSuggestion={() => {
            onChangeShowSuggestions(true);
          }}
        />
        <Info
          service={service}
          referenceVariant={referenceVariant}
          customVariant={customVariant}
          onChangeReferenceVariant={
            onChangeReferenceVariant
          }
          onChangeCustomVariant={
            onChangeCustomVariant
          }
          onShowAddons={() => {
            onChangeShowAddonsModal(true);
          }}
          heading="make it extra special!"
          addons={
            referenceVariant
              ? referenceVariant.addons
              : service.addons
          }
          navigateService={navigateService}
        />
      </section>

      {/* REVIEWS ============================================================= */}
      <ReviewsByCustomers service={service} />

      {/* SUGGESTIONS ======================================================= */}
      {Boolean(suggestions.length) && (
        <>
          <div className="w-full mt-[28px] sm:mt-[40px] text-[25px] font-medium capitalize pl-4">
            Similar Packages
          </div>
          <section className="px-[1rem]">
            <Services
              services={suggestions.slice(
                0,
                Math.min(8, suggestions.length)
              )}
            />
          </section>
        </>
      )}

      {/* HOW IT WORKS ======================================================== */}
      <HowItWorks />
    </main>
  );
}
