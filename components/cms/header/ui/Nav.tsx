import NavLink from "@/components/cms/header/ui/NavLink";

import { NavLinkDocument } from "@/schemas/cms/navLink";

import styles from "@/components/cms/header/ui/nav.module.css";

export default function Nav({
  navLinks
}: {
  navLinks: NavLinkDocument[];
}) {
  return (
    <nav className={styles.container}>
      <div className={styles.navLinks}>
        {navLinks.map((navLink) => (
          <NavLink
            key={navLink._id}
            navLink={navLink}
          />
        ))}
      </div>
    </nav>
  );
}
