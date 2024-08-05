// components
import TopCity from "@/components/ui/city/TopCity";

// styles
import styles from "@/components/ui/city/topCities.module.css";

// types
import { CityDocument } from "@/schemas/cms/city";
import { ImageDocument } from "@/schemas/cms/image";
import { DialogClose } from "../dialog";
import { DrawerClose } from "../drawer";

export default function TopCities({
  heading,
  cities,
  type,
  onSelect
}: {
  heading?: string;
  cities: CityDocument[];
  type: "drawer" | "dialog";
  onSelect: (cityName: string) => void;
}) {
  return (
    <section className={styles.container}>
      <section className={styles.cities}>
        {cities.map(({ _id, name, icon }, i) =>
          type === "dialog" ? (
            <DialogClose
              key={i}
              className="w-full"
            >
              <TopCity
                name={name}
                key={i}
                icon={icon as ImageDocument}
                onSelect={() => {
                  onSelect(name);
                }}
              />
            </DialogClose>
          ) : (
            <DrawerClose
              key={i}
              className="w-full"
            >
              <TopCity
                name={name}
                key={i}
                icon={icon as ImageDocument}
                onSelect={() => {
                  onSelect(name);
                }}
              />
            </DrawerClose>
          )
        )}
      </section>
    </section>
  );
}
