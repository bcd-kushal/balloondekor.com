import { Logo2 } from "@/components/cms/header/ui/Logo";
import {
  HomeSVG,
  PhoneSVG,
  WhatsappSVG
} from "@/constants/svgs/svg";
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    label: "Homepage",
    link: "/",
    svg: <HomeSVG />
  },
  { label: "Categories", link: "/", svg: <></> },
  {
    label: "Contact Us",
    link: "/contact-us",
    svg: <PhoneSVG />
  },
  {
    label: "Whatsapp",
    link: "/",
    svg: <WhatsappSVG />
  }
];

const socialLinks = [
  {
    label: "Facebook",
    url: "https://www.facebook.com/people/Balloon-Dekor/61555933685272/",
    image: {
      src: "/images/facebook.webp",
      alt: "Facebook Logo"
    }
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/balloondekor.official/",
    image: {
      src: "/images/instagram.webp",
      alt: "Instagram Logo"
    }
  },
  {
    label: "Twitter",
    url: "https://x.com/balloondekor",
    image: {
      src: "/images/twitter.webp",
      alt: "Twitter Logo"
    }
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/balloondekor-com/",
    image: {
      src: "/images/linkedin.webp",
      alt: "LinkedIn Logo"
    }
  }
];

export default function NotFoundPage() {
  return (
    <div className="h-[100dvh] flex flex-col items-stretch justify-stretch">
      <div className="relative flex flex-col items-stretch md:grid md:grid-cols-2 h-full w-[100dvw] p-[16px] sm:p-[32px]">
        <Logo2
          className="absolute sm:top-[32px] sm:left-[32px] top-[14px] left-[16px]"
          menuHandler={() => {}}
        />
        <div className="flex flex-col max-sm:translate-y-[60px] justify-center gap-[4px] text-[16px] sm:text-[18px]">
          <span className="text-zinc-900 font-semibold text-[40px] sm:text-[52px]">
            Oops...
          </span>
          <span className="text-[22px] sm:text-[28px]">
            We couldn&apos;t find the page you
            searched for
          </span>
          <span className="text-red-500 font-semibold">
            404 Error
          </span>

          <div className="flex flex-col justify-start mt-[24px] sm:mt-[32px]">
            <span className="pb-[12px]">
              Here are some helpful links instead:
            </span>
            {links.map(
              ({ label, link, svg }, i) => (
                <Link
                  href={link}
                  key={i}
                  prefetch
                  className="group flex items-center justify-start gap-[8px] transition-all duration-300 hover:text-pink-700 w-fit py-[3px]"
                >
                  •{" "}
                  <span className="group-hover:underline group-hover:underline-offset-2 ">
                    {label}
                  </span>{" "}
                </Link>
              )
            )}
          </div>
        </div>
        <div className="max-sm:absolute max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:bottom-0 max-sm:w-[260px] max-sm:right-[12px] max-sm:opacity-95 sm:translate-y-[32px] w-[400px] sm:self-end sm:justify-self-center h-fit items-end justify-center">
          <Image
            width={500}
            height={500}
            alt=""
            src={"/pngs/404.png"}
            unoptimized
          />
        </div>
      </div>
      <div className="h-[80px] sm:h-[64px] max-sm:gap-[2px] flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between bg-zinc-200 text-[14px] sm:text-[16px] px-[32px] sm:pb-[6px]">
        <span>
          <Link
            href={"/"}
            prefetch
            className="transition-all hover:underline hover:underline-offset-2"
          >
            balloondekor.com
          </Link>{" "}
          &copy; {new Date().getFullYear()}
        </span>
        <span className="flex items-center gap-4">
          <span>Follow us on:</span>
          {socialLinks.map(
            ({ image: { src, alt }, url }, i) => (
              <Link
                className={`max-sm:scale-75 flex items-center justify-center ${i === 1 ? "translate-y-[1px]" : ""}`}
                href={url}
                key={i}
                prefetch
              >
                <Image
                  src={src}
                  alt={alt}
                  width={24}
                  height={24}
                  unoptimized
                />
              </Link>
            )
          )}
        </span>
      </div>
    </div>
  );
}
