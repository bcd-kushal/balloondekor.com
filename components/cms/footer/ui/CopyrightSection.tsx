import styles from "@/components/cms/footer/ui/copyrightSection.module.css";

export default function CopyrightSection() {
  return (
    <section className={styles.container}>
      <p
        className={styles.content}
      >{`Copyright © ${new Date().getFullYear()} balloondekor.com`}</p>
      <p className={styles.content}>
        All Rights Reserved.
      </p>
    </section>
  );
}
