import { COMPANY_MOBILE_NO } from "@/constants/static/mobileNo";
import {
  EmailSVG,
  OfficeSVG,
  PhoneSVG,
  TickSVG,
  WhatsappSVG
} from "@/constants/svgs/svg";
import { whatsappContactFromNav } from "@/lib/whatsapp";
import Link from "next/link";

export default function ContactUs() {
  const links = [
    {
      svg: (
        <PhoneSVG
          dimensions={36}
          className="sm:mt-[7px] sm:mb-[20px] max-sm:row-span-3 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:w-full max-sm:h-full max-sm:scale-[0.62]"
        />
      ),
      type: "link",
      title: "Call Us",
      label: (
        <span>
          +91 8910960060
          <br />
          (Mon - Sat, 10:00am - 7:30pm)
        </span>
      ),
      action: COMPANY_MOBILE_NO
    },
    {
      svg: (
        <WhatsappSVG
          dimensions={36}
          className="sm:mt-[7px] sm:mb-[20px] max-sm:row-span-3 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:w-full max-sm:h-full scale-125 max-sm:scale-[0.82]"
        />
      ),
      type: "link",
      title: "Whatsapp Us",
      label: (
        <span>
          +91 8910960060
          <br />
          (24 x 7)
        </span>
      ),
      action: whatsappContactFromNav()
    },
    {
      svg: (
        <OfficeSVG
          dimensions={36}
          className="sm:mt-[7px] sm:mb-[20px] max-sm:row-span-3 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:w-full max-sm:h-full max-sm:scale-[0.62]"
        />
      ),
      type: "info",
      title: "Office Address",
      label: (
        <span>
          EC 91, Salt Lake Sector 1 <br />{" "}
          Kolkata-64
        </span>
      )
    },
    {
      svg: (
        <EmailSVG
          dimensions={36}
          className="sm:mt-[7px] sm:mb-[20px] max-sm:row-span-3 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:w-full max-sm:h-full max-sm:scale-[0.62]"
        />
      ),
      type: "link",
      title: "Email Us",
      label: (
        <span>
          info@balloondekor.com
          <br />
          (24 x 7)
        </span>
      ),
      action: "mailto:info@balloondekor.com"
    }
  ];

  return (
    <main className="text-[16px] flex flex-col gap-[28px] items-center justify-center min-h-[calc(100dvh_-_350px)] *:sm:min-w-[500px] *:min-w-[calc(100dvw_-_24px)] my-[32px]">
      <div className="flex flex-col justify-start items-center ">
        <span className="font-medium text-[25px]">
          Contact Us
        </span>
        <span className="text-zinc-700">
          Reach out to us for any sort of queries
        </span>
      </div>

      <div className="flex max-sm:flex-col items-stretch sm:items-center justify-start sm:justify-center gap-[12px] sm:gap-[20px]">
        {links.map(
          (
            { svg, title, label, action, type },
            index
          ) =>
            type === "link" ? (
              <Link
                href={action as string}
                prefetch
                key={index}
                className="sm:w-[260px] text-zinc-800/90 cursor-pointer bg-pink-100/60 transition-colors duration-300 hover:bg-pink-200/70 border-[1px] border-pink-200/60 rounded-3xl p-6 sm:p-5 sm:pt-12 grid grid-cols-[56px_auto] sm:aspect-[1/0.9] sm:flex sm:flex-col sm:items-center sm:justify-center gap-y-[2px] gap-x-[6px] sm:gap-[3px]"
              >
                {svg}
                <div className="font-normal text-[22px] sm:text-center">
                  {title}
                </div>
                <span className="sm:h-[50px] opacity-95 sm:text-center">
                  {label}
                </span>
              </Link>
            ) : (
              <div
                key={index}
                className="sm:w-[260px] text-zinc-800/90 cursor-pointer bg-pink-100/60 transition-colors duration-300 hover:bg-pink-200/70 border-[1px] border-pink-200/60 rounded-3xl p-6 sm:p-5 sm:pt-12 grid grid-cols-[56px_auto] sm:aspect-[1/0.9] sm:flex sm:flex-col sm:items-center sm:justify-center gap-y-[2px] gap-x-[6px] sm:gap-[3px]"
              >
                {svg}
                <div className="font-normal text-[22px] sm:text-center">
                  {title}
                </div>
                <span className="sm:h-[50px] opacity-95 sm:text-center">
                  {label}
                </span>
              </div>
            )
        )}
      </div>

      <div className="flex flex-col justify-start items-start my-[12px] gap-[12px]">
        <span className="text-zinc-700 font-medium flex items-center justify-center gap-[8px]">
          <TickSVG
            dimensions={15}
            stroke="#00aa00"
          />{" "}
          Quick and friendly customer service
        </span>
        <span className="text-zinc-700 font-medium flex items-center justify-center gap-[8px]">
          <TickSVG
            dimensions={15}
            stroke="#00aa00"
          />{" "}
          Reach out anytime for prompt answers
        </span>
        <span className="text-zinc-700 font-medium flex items-center justify-center gap-[8px]">
          <TickSVG
            dimensions={15}
            stroke="#00aa00"
          />{" "}
          Reach out to know more about our
          services
        </span>
      </div>
    </main>
  );
  return (
    <main className="text-[19px] p-[12px_14px_32px_14px]">
      <h1 className="font-semibold text-[28px] pb-3">
        Contact Us
      </h1>
      <p>
        {
          "We'd love to hear from you! Whether you're planning a grand event or a small gathering, Balloondekor is here to make your celebrations extraordinary with our stunning balloon and event decorations."
        }
      </p>
      <section className="py-[22px]">
        <h2 className="font-semibold text-[22px] pb-3">
          Office Hours
        </h2>
        <p>
          {
            "Monday to Saturday: 10:00 AM - 7:30 PM"
          }
        </p>
        <p>{"Sunday: Closed"}</p>
      </section>
      <section className="pb-[14px]">
        <h2 className="font-semibold text-[22px] pb-3">
          Get in Touch
        </h2>
        <p>
          <span>Phone: </span>
          <span>
            <a href="tel:+918910960060">
              +91 8910960060
            </a>
          </span>
        </p>
        <p>
          <span>Email: </span>
          <span>
            <a href="mailto:info@balloondekor.com">
              info@balloondekor.com
            </a>
          </span>
        </p>
      </section>
    </main>
  );
}
