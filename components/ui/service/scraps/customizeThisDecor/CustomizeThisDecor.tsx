import { COMPANY_MOBILE_NO } from "@/constants/static/mobileNo";
import {
  CircleQuestionSVG,
  PhoneSVG,
  WhatsappSVG
} from "@/constants/svgs/svg";
import { whatsappContactFromNav } from "@/lib/whatsapp";
import Link from "next/link";

export default function CustomizeThisDecor() {
  return (
    <div
      className="bg-transparent text-[15px] my-[16px] sm:my-[14px] flex flex-col items-stretch justify-start rounded-2xl p-6 pb-8 max-sm:w-[calc(100dvw_-_24px)] max-sm:relative max-sm:left-1/2 max-sm:-translate-x-1/2 gap-[12px]"
      style={{
        boxShadow: "0 0 10px 5px #12121218"
      }}
    >
      <div className="grid grid-cols-[45px_auto] gap-x-4">
        <span className="flex items-center justify-center">
          <CircleQuestionSVG
            dimensions={24}
            className="-translate-y-[5px]"
          />
        </span>
        <span className="flex flex-col">
          <span className="text-[17px] font-medium text-slate-800">
            {" "}
            Want to Customize this Decoration?
          </span>
          <span className="text-black/80 text-[14px]">
            Talk with our Event Experts Now!
          </span>
        </span>
      </div>
      <div className="flex items-center justify-evenly sm:justify-start sm:pl-4 gap-[10px] sm:gap-[18px] sm:mt-2">
        <Link
          href={COMPANY_MOBILE_NO}
          prefetch
          className="rounded-full py-[7px] px-[12px] cursor-pointer text-white bg-[#f18093] font-semibold flex items-center justify-center gap-[8px] w-[48%] sm:w-[40%]"
        >
          <PhoneSVG className="scale-110" />
          <span> Call Us</span>
        </Link>
        <Link
          href={whatsappContactFromNav()}
          prefetch
          className="rounded-full py-[7px] px-[12px] cursor-pointer text-white bg-green-500/80 font-semibold flex items-center justify-center gap-[8px] w-[48%] sm:w-[40%]"
        >
          <WhatsappSVG className="scale-150" />
          <span> Whatsapp</span>
        </Link>
      </div>
    </div>
  );
}
