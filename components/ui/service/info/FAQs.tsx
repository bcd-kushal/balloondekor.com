// components
import Collapsable from "@/components/client/service/Collapsable";
import FAQ from "@/components/ui/service/info/FAQ";

// types
import { QADocument } from "@/schemas/cms/faq";

export default function FAQS({
  title,
  faqs
}: {
  title: string;
  faqs: QADocument[];
}) {
  return (
    <Collapsable
      radiusAmount="1rem 1rem 0rem 0rem"
      heading={title}
      headingIconSrc="/icons/faq-icon.svg"
      headingIconAlt="Includes Icon"
      collapseIconSrc="/icons/plus-icon.svg"
      notCollapseIconSrc="/icons/minus-icon.svg"
      collapseIconAlt="Collapse Icon"
    >
      {faqs.map((faq, i) => (
        <FAQ
          key={i}
          faq={faq}
        />
      ))}
    </Collapsable>
  );
}
