import Image from "next/image";
import Link from "next/link";

import styles from "@/components/cms/header/ui/logo.module.css";

export default function Logo({
  menuHandler,
  className
}: {
  menuHandler: () => void;
  className?: string;
}) {
  return (
    <>
      <div
        className={className || styles.container}
      >
        <Link
          href="/"
          className={`max-md:w-[45dvw] ${styles.link}`}
        >
          <Image
            className="md:max-w-[178px]"
            src="/images/logo.webp"
            height={50}
            width={250}
            alt="Balloondekor Logo"
          />
        </Link>
      </div>
    </>
  );
}

export function Logo2({
  menuHandler,
  className
}: {
  menuHandler: () => void;
  className?: string;
}) {
  return (
    <>
      <div
        className={className || styles.container}
      >
        <Link
          href="/"
          className={`max-md:w-[155px] ${styles.link}`}
        >
          <Image
            className="max-md:w-[155px] max-md:mt-[12px] md:max-w-[178px]"
            src="/images/logo.webp"
            height={50}
            width={250}
            alt="Balloondekor Logo"
          />
        </Link>
      </div>
    </>
  );
}
