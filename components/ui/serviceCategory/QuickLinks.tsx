// components
import RelatedCategory from "./RelatedCategory";

// styles
import styles from "@/components/ui/serviceCategory/quickLinks.module.css";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { LinkImageDocument } from "@/schemas/cms/serviceCategory";
import QuickLinkItem from "./QuickLinkItem";
import QuickLinkWithImg from "./QuickLinkWithImg";

export default function QuickLinks({
  quickLinks,
  title
}: {
  quickLinks: LinkImageDocument[];
  title?: string;
}) {
  return (
    <>
      {/* {title ? (
        <div className={styles.title}>
          {title}
        </div>
      ) : (
        <></>
      )} */}

      <div
        className={`sticky mt-[10px] top-0 sm:-translate-y-[2px] ${styles.quickLinksRow}`}
      >
        {title ? (
          <div className="h-full text-[14px] pl-1 leading-tight sm:text-[16px] ">
            {title}
          </div>
        ) : (
          <></>
        )}
        {quickLinks.map(
          ({ _id, label, url, image }) =>
            image ? (
              // quick link with image ====================
              <QuickLinkWithImg
                key={_id}
                name={label}
                slug={url}
                icon={
                  image
                    ? (image as ImageDocument)
                    : undefined
                }
              />
            ) : (
              // no image quick link here ================
              <QuickLinkItem
                key={_id}
                name={label}
                slug={url}
              />
            )
        )}
      </div>
    </>
  );
}
