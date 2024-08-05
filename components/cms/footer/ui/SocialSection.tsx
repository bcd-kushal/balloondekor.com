import SocialCategory from "./SocialCategory";

import styles from "@/components/cms/footer/ui/socialSection.module.css";

export default function SocialSection({
  socialSection: { heading, categories }
}: {
  socialSection: {
    _id: string;
    heading: string;
    categories: {
      _id: string;
      title: string;
      infos: {
        _id: string;
        label: string;
        url: string;
        image: {
          src: string;
          alt: string;
        };
      }[];
    }[];
  };
}) {
  return (
    <section className={styles.container}>
      <div className={styles.sectionHeading}>
        {heading}
      </div>
      <div className={styles.socialCategories}>
        {categories.map((socialCategory) => (
          <SocialCategory
            key={socialCategory._id}
            socialCategory={socialCategory}
          />
        ))}
      </div>
    </section>
  );
}
