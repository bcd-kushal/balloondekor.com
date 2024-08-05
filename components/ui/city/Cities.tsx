// components
import City from "@/components/ui/city/City";

// styles
import styles from "@/components/ui/city/cities.module.css";

// types
import { CityDocument } from "@/schemas/cms/city";
import { DialogClose } from "../dialog";
import { DrawerClose } from "../drawer";

export default function Cities({
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
      <div className={styles.scrollContainer}>
        {type === "dialog" ? (
          <section className={styles.cities}>
            <DialogClose className="w-full">
              <City
                name={"All India"}
                onSelect={() => {
                  onSelect("");
                }}
              />
            </DialogClose>
            {cities.map(
              ({ _id, name, isTopCity }, i) => (
                <DialogClose
                  key={i}
                  className="w-full"
                >
                  <City
                    key={i}
                    name={name}
                    isTopCity={isTopCity}
                    onSelect={() => {
                      onSelect(name);
                    }}
                  />
                </DialogClose>
              )
            )}
          </section>
        ) : (
          <section className={styles.cities}>
            <DrawerClose className="w-full">
              <City
                name={"All India"}
                onSelect={() => {
                  onSelect("");
                }}
              />
            </DrawerClose>
            {cities.map(
              ({ _id, name, isTopCity }, i) => (
                <DrawerClose
                  key={i}
                  className="w-full"
                >
                  <City
                    key={i}
                    name={name}
                    isTopCity={isTopCity}
                    onSelect={() => {
                      onSelect(name);
                    }}
                  />
                </DrawerClose>
              )
            )}
          </section>
        )}
      </div>
    </section>
  );
}
