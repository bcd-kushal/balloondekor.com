"use client";

import Link from "next/link";

import styles from "@/components/frontend/breadcrumbs.module.css";
import { ChevronRightIcon } from "@radix-ui/react-icons";

export default function BreadCrumbs({
  slugs = []
}: {
  slugs: string[];
}) {
  const links = slugs.map((slug) => ({
    label: slug.split("-").join(" "),
    path: slug
  }));

  const totalLinks = links.length;

  return (
    <section className={styles.container}>
      <Link
        href="/"
        className={styles.link}
      >
        Home
      </Link>
      {links.map(({ label }, i) => (
        <span
          key={i}
          className={styles.route}
        >
          <span>
            <ChevronRightIcon
              width={12}
              height={12}
              stroke="#aaa"
            />
          </span>
          {i === totalLinks - 1 ? (
            <span
              key={i}
              className={`text-[#71717a] p-[6px_6px_6px_0] whitespace-nowrap select-none text-[14px] -translate-y-[1px] flex items-center justify-center capitalize`}
            >
              {label}
            </span>
          ) : (
            <Link
              key={i}
              className={styles.link}
              href={`/${links
                .slice(0, i + 1)
                .map(({ path }) => path)
                .join("/")}`}
            >
              {label}
            </Link>
          )}
        </span>
      ))}
    </section>
  );
}
