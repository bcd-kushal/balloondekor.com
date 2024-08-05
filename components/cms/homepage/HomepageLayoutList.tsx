// components
import HomepageLayoutItem from "@/components/cms/homepage/HomepageLayoutItem";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

// styles
import styles from "@/components/cms/homepage/homepageLayoutList.module.css";

export default function HomepageLayoutList({
  homepageLayouts,
  onToggleActive,
  onReorder,
  onDelete
}: {
  homepageLayouts: HomepageLayoutDocument[];
  onToggleActive: (
    homepageLayoutId: string,
    isActive: boolean
  ) => void;
  onReorder: (
    homepageLayoutId1: string,
    homepageLayoutId2: string
  ) => void;
  onDelete: (homepageLayoutId: string) => void;
}) {
  return (
    <div className={styles.container}>
      {homepageLayouts.map(
        (homepageLayout, i) => (
          <HomepageLayoutItem
            key={homepageLayout._id}
            id={homepageLayout._id}
            layoutType={homepageLayout.layout}
            layout={homepageLayout}
            isActive={homepageLayout.isActive}
            onToggleActive={() => {
              onToggleActive(
                homepageLayout._id,
                !homepageLayout.isActive
              );
            }}
            onMoveUp={
              i > 0
                ? () => {
                    onReorder(
                      homepageLayouts[i - 1]._id,
                      homepageLayout._id
                    );
                  }
                : () => {}
            }
            onMoveDown={
              i < homepageLayouts.length - 1
                ? () => {
                    onReorder(
                      homepageLayouts[i + 1]._id,
                      homepageLayout._id
                    );
                  }
                : () => {}
            }
            onDelete={() => {
              onDelete(homepageLayout._id);
            }}
            isBanner={
              homepageLayout.layout === "banner"
            }
            onScreenPreviewSwitch={() => {}}
          />
        )
      )}
    </div>
  );
}
