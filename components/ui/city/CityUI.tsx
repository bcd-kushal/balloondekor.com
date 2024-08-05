// components
import Cities from "@/components/ui/city/Cities";
import SearchCity from "@/components/ui/city/SearchCity";
import TopCities from "@/components/ui/city/TopCities";

// styles
import styles from "@/components/ui/city/cityUI.module.css";

// types
import { CityDocument } from "@/schemas/cms/city";

export default function CityUI({
  hasSearched,
  keyword,
  cities,
  topCities,
  type,
  onToggleHasSearched,
  onSearch,
  onSelectCity
}: {
  hasSearched: boolean;
  keyword: string;
  cities: CityDocument[];
  topCities: CityDocument[];
  type: "drawer" | "dialog";
  onToggleHasSearched: () => void;
  onSearch: (keyword: string) => void;
  onSelectCity: (cityName: string) => void;
}) {
  return (
    <section className={styles.container}>
      <section className={styles.topHeading}>
        {hasSearched || keyword
          ? "All Cities"
          : "Top Cities"}
      </section>

      <SearchCity
        keyword={keyword}
        onChangeKeyword={onSearch}
      />

      <section className={styles.cities}>
        {hasSearched || keyword ? (
          <Cities
            cities={cities}
            type={type}
            onSelect={onSelectCity}
          />
        ) : (
          <TopCities
            heading="top cities"
            cities={topCities.slice(0, 6)}
            type={type}
            onSelect={onSelectCity}
          />
        )}
      </section>
      <section className={styles.actions}>
        <button
          className={styles.btnToggleList}
          onClick={onToggleHasSearched}
        >
          <span className={styles.btnLabel}>
            {`show ${
              hasSearched || keyword
                ? "top cities"
                : "all cities"
            }`}
          </span>
        </button>
      </section>
    </section>
  );
}
