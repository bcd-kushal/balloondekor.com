import styles from "@/components/ui/serviceCategory/contents.module.css";

export default function Contents({
  content
}: {
  content: string;
}) {
  return (
    <section className={styles.container}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: content
        }}
      ></div>
    </section>
  );
}
