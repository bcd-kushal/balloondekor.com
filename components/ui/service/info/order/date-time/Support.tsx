// libraries
import Image from "next/image";

// styles
import styles from "@/components/ui/service/info/order/date-time/support.module.css";

export default function Support() {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        {
          "Need service today or unable to find preferred time or date?"
        }
      </div>
      <section className={styles.supports}>
        <article className={styles.support}>
          <Image
            src={"/icons/whatsapp-icon.svg"}
            alt="WhatsApp Icon"
            width={20}
            height={20}
          />
          <span className={styles.label}>
            whatsApp
          </span>
        </article>
        <article className={styles.support}>
          <Image
            src={"/icons/call-icon.svg"}
            alt="Call Icon"
            width={20}
            height={20}
          />
          <span className={styles.label}>
            call us
          </span>
        </article>
      </section>
    </section>
  );
}
