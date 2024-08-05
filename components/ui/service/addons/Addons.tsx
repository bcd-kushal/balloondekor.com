// components
import Addon from "@/components/ui/service/addons/Addon";

// styles
import styles from "@/components/ui/service/addons/addons.module.css";

// types
import { AddonDocument } from "@/schemas/cms/addon";
import { ImageDocument } from "@/schemas/cms/image";

export default function Addons({
  addons,
  onGetCount,
  onChangeCount
}: {
  addons: AddonDocument[];
  onGetCount: (addonId: string) => number;
  onChangeCount: (
    addonId: string,
    count: number
  ) => void;
}) {
  return (
    <section className={styles.container}>
      <div className={styles.scrollContainer}>
        <div className={styles.addons}>
          {addons.map(
            ({ _id, image, name, price }, i) => (
              <Addon
                key={i}
                image={image as ImageDocument}
                name={name}
                price={price}
                count={onGetCount(_id)}
                onChangeCount={(
                  count: number
                ) => {
                  onChangeCount(_id, count);
                }}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
