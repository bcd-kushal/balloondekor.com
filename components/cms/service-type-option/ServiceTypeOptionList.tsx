// components
import ServiceTypeOptionItem from "@/components/cms/service-type-option/ServiceTypeOptionItem";

// types
import { ServiceTypeOptionDocument } from "@/schemas/cms/serviceTypeOption";

// styles
import styles from "@/components/cms/service-type-option/serviceTypeOptionList.module.css";

export default function ServiceTypeOptionList({
  offset,
  serviceTypeOptions,
  onToggleActive,
  onDelete
}: {
  offset: number;
  serviceTypeOptions: ServiceTypeOptionDocument[];
  onToggleActive: (
    serviceTypeOptionId: string,
    isActive: boolean
  ) => void;
  onDelete: (serviceTypeOptionId: string) => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>sn</div>
        <div className={styles.heading}>name</div>
        <div className={styles.heading}>
          price
        </div>
        <div className={styles.heading}>
          active
        </div>
        <div>action</div>
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.items}>
          {serviceTypeOptions.map(
            (
              { _id, name, price, isActive },
              i
            ) => (
              <ServiceTypeOptionItem
                key={_id}
                id={_id}
                srNo={offset + i + 1}
                name={name}
                price={price}
                isActive={isActive}
                onToggleActive={() => {
                  onToggleActive(_id, !isActive);
                }}
                onDelete={() => {
                  onDelete(_id);
                }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
