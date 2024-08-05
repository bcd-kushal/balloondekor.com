// components
import Button from "@/components/common/Button";
import Limit from "@/components/cms/Limit";

// styles
import styles from "./pageHeader.module.css";

// export
export default function PageHeader({
  heading,
  addBtnLabel,
  addBtnSlug,
  limit,
  disableLimit,
  disableSidebar,
  setLimit,
  toggleShowSidebar
}: {
  heading: string;
  addBtnLabel: string;
  addBtnSlug: string;
  limit: number;
  disableLimit?: boolean;
  disableSidebar?: boolean;
  setLimit: (limit: number) => void;
  toggleShowSidebar: () => void;
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        {heading}
      </h1>
      <div className={styles.controls}>
        <Button
          type="primary"
          label={addBtnLabel}
          variant="link"
          href={`/cms/${addBtnSlug}/add`}
          iconSrc="/icons/white-plus.svg"
        />
        {disableLimit ? (
          <></>
        ) : (
          <Limit
            defaultValue={limit}
            setValue={setLimit}
          />
        )}
        {disableSidebar ? (
          <></>
        ) : (
          <Button
            type="icon"
            label=""
            variant="normal"
            onClick={toggleShowSidebar}
            iconSrc="/icons/filter-icon.svg"
            iconSize={30}
          />
        )}
      </div>
    </div>
  );
}
