"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import NestedSection from "./NestedSection";

import { NavLinkDocument } from "@/schemas/cms/navLink";

import styles from "@/components/cms/header/ui/navLink.module.css";

export default function NavLink({
  navLink: { label, url, nestedSections }
}: {
  navLink: NavLinkDocument;
}) {
  const [subLinks, setSubLinks] =
    useState<boolean>(false);
  const subLinksHandler = () => {
    setSubLinks(!subLinks);
  };
  return (
    <Link
      className={styles.container}
      href={url}
    >
      {url ? (
        <div className={styles.linkContainer}>
          <div className={styles.navLink}>
            {label}
          </div>
          <span
            className={styles.controllers}
            onClick={subLinksHandler}
          >
            <Image
              src={`/icons/${subLinks ? `minus-icon` : `plus-icon`}.svg`}
              alt="plus icon"
              height={25}
              width={25}
              unoptimized
              className={styles.actionsIcon}
            />
          </span>
        </div>
      ) : (
        <div className={styles.navLink}>
          {label}
        </div>
      )}
      {nestedSections.length ? (
        <nav
          className={`${styles.nestedSections} ${subLinks ? styles.flex : ""}`}
        >
          {nestedSections.map((nestedSection) => (
            <NestedSection
              key={nestedSection._id}
              nestedSection={nestedSection}
            />
          ))}
        </nav>
      ) : (
        <></>
      )}
    </Link>
  );
}
