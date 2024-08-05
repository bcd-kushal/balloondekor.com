import Image from "next/image";

import styles from "@/components/ui/city/searchCity.module.css";
import { SearchSVG } from "@/constants/svgs/svg";

export default function SearchCity({
  keyword,
  onChangeKeyword
}: {
  keyword: string;
  onChangeKeyword: (keyword: string) => void;
}) {
  return (
    <section
      className={`group ${styles.container}`}
    >
      <label className={styles.search}>
        <SearchSVG
          dimensions={18}
          stroke="#0005"
          className="group-hover:stroke-[#0007]"
        />
        <input
          className={styles.searchInput}
          type="text"
          name="Search"
          placeholder="Search City"
          spellCheck={false}
          value={keyword}
          onChange={(e) => {
            onChangeKeyword(`${e.target.value}`);
          }}
        />
      </label>
    </section>
  );
}
