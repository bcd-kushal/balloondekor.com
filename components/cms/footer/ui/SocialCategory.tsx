import SocialInfo from "@/components/cms/footer/ui/SocialInfo";

import styles from "@/components/cms/footer/ui/socialCategory.module.css";

export default function SocialCategory({
  socialCategory: { title, infos }
}: {
  socialCategory: {
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
  };
}) {
  return (
    <section className={styles.container}>
      <div className={styles.socialCategoryTitle}>
        {title}
      </div>
      <div className={styles.socialInfos}>
        {infos.map((socialInfo) => (
          <SocialInfo
            key={socialInfo._id}
            socialInfo={socialInfo}
          />
        ))}
      </div>
    </section>
  );
}
