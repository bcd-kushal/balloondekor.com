"use client";

// components
import FormControl from "@/components/common/form/FormControl";
import LoginForm, {
  getConfig
} from "@/components/cms/auth/login/LoginForm";

// styles
import styles from "@/components/cms/auth/login/loginEditor.module.css";
import {
  ArrowLeftIcon,
  DiscIcon
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function LoginEditor({
  title
}: {
  title: string;
}) {
  return (
    <div
      className={`bg-card-primary rounded-xl shadow-[0_0_6px_2px_#12121227] px-8 py-10 min-w-[425px] max-[440px]:min-w-[calc(100dvw_-_36px)]`}
    >
      <div className="flex flex-col items-stretch justify-start pb-[24px]">
        <span className="pb-[20px] flex gap-[12px] items-center justify-start">
          <Link
            className=""
            href={"/"}
          >
            <ArrowLeftIcon stroke="#aaa" />
          </Link>
          <span className=" text-[20px] text-pink-500 font-semibold">
            balloondekor
          </span>
        </span>
        <h3 className={`text-[24px] capitalize`}>
          {title}
        </h3>
        <span className="text-[12px] text-[#12121265]">
          Login in to admin panel
        </span>
      </div>
      <FormControl
        config={getConfig({
          userName: "",
          password: "",
          answer: ""
        })}
      >
        <LoginForm />
      </FormControl>
    </div>
  );
}
