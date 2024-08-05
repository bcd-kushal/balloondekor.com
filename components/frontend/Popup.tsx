"use client";

import { setCookie } from "@/cookies/oneTimePopup/cookies";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent
} from "../ui/dialog";
import Image from "next/image";
import { DOMAIN } from "@/constants/frontend/apiRoute";
import { usePathname } from "next/navigation";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { whatsappContactFromNav } from "@/lib/whatsapp";
import Link from "next/link";
import { COMPANY_MOBILE_NO } from "@/constants/static/mobileNo";
import { getSettings } from "@/fetchAPIs/cms/settings";
import { SettingDocument } from "@/schemas/cms/setting";

const POPUP_TIMEOUT = 30 * 1000;

export default function Popup() {
  const currPath = usePathname();
  const {
    customer: {
      data: { info }
    }
  } = useCustomerContext();

  const [isVisited, setIsVisited] = useState<
    boolean | undefined
  >(undefined);
  const [showPopup, setShowPopup] =
    useState<boolean>(false);
  const [inputValue, setInputValue] =
    useState<string>("");
  const [isPermittedRoute, setIsPermittedRoute] =
    useState<boolean>(false);
  const [adminNotDisabled, setAdminNotDisabled] =
    useState<boolean>(false);

  const handleRequestCallback = async (
    formData: FormData
  ) => {
    const mobileNumber = formData.get(
      "mobile"
    ) as string;
    if (mobileNumber.length === 10) {
      const url = `${DOMAIN}/api/frontend/lead`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contactNumber: mobileNumber
        })
      });
      setShowPopup((prev) => false);
    }
  };

  const handleInputField = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputNumber: string = e.target.value;
    setInputValue((prev) =>
      inputNumber.substring(0, 10)
    );
  };

  useEffect(() => {
    getSettings()
      .then((res) => {
        const showCallback = (
          res.data as SettingDocument
        ).callback;
        setAdminNotDisabled(
          (prev) => showCallback
        );
      })
      .catch((err) => console.error(err));

    fetch("/api/cookie").then(async (data) => {
      const res = await data.json();
      setIsVisited((prev) =>
        res === "false" ? false : true
      );
    });
  }, []);

  useEffect(
    () =>
      setIsPermittedRoute((prev) =>
        checkIsPermittedRoute(currPath)
      ),
    [currPath]
  );

  useEffect(() => {
    if (isVisited === false) {
      setCookie({ val: "true" });
      let timeout = setTimeout(() => {
        setShowPopup((prev) => true);
      }, POPUP_TIMEOUT);
      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisited, POPUP_TIMEOUT]);

  return (
    <>
      {isPermittedRoute &&
      info === null &&
      adminNotDisabled ? (
        <Dialog
          open={showPopup}
          onOpenChange={() =>
            setShowPopup((prev) => !prev)
          }
        >
          <DialogContent
            className="min-w-fit min-h-fit p-0 outline-none bg-white "
            style={{ borderRadius: "12px" }}
          >
            <section className="pt-[32px] pb-[24px] px-[28px] rounded-lg bg-transparent min-w-[300px] flex flex-col items-stretch justify-start text-[16px]">
              <span className="text-[24px] sm:text-[32px] font-semibold text-[#121212]">
                Request a call back
              </span>
              <span className="text-[14px] sm:text-[16px] text-[#12121280] mt-2 sm:mt-0 sm:max-w-[80%]">
                We will send you event decoration
                suggestions within seconds
              </span>
              <form
                action={handleRequestCallback}
              >
                <div
                  className={`relative group focus-within:border-sky-400 w-full rounded-xl flex items-center justify-stretch border-[1.5px] transition-all duration-300 h-fit mb-5 mt-8 ${inputValue.length % 10 === 0 ? "border-black/30 hover:border-black/70" : "border-[#aa000080]"}`}
                >
                  <label
                    htmlFor="mobileNumber"
                    className=" w-fit h-full flex items-center justify-center border-r-[1.5px] px-5 tracking-wider border-black/30 group-hover:border-black/70 duration-300 transition-all"
                  >
                    +91
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    required={false}
                    id="mobileNumber"
                    placeholder="Enter mobile number"
                    value={inputValue}
                    onChange={handleInputField}
                    className="px-5 py-4 text-[16px] bg-transparent outline-none w-full"
                  />
                  <span className="absolute w-fit capitalize right-4 top-1/2 -translate-y-1/2 text-[13px] text-red-500">
                    {inputValue.length % 10 === 0
                      ? ""
                      : "Invalid number"}
                  </span>
                </div>
                <input
                  name="Submit"
                  type="submit"
                  className="py-3 px-10 relative left-1/2 -translate-x-1/2 rounded-lg text-white bg-[#ff9500] transition-all duration-300 w-fit mt-3 mb-1 cursor-pointer"
                />
              </form>

              <div className="flex items-center justify-center w-full gap-8 mt-5 *:flex *:items-center *:justify-center *:gap-2">
                <Link
                  prefetch
                  href={whatsappContactFromNav()}
                >
                  <Image
                    src={
                      "/icons/whatsapp-icon.svg"
                    }
                    alt="WhatsApp Icon"
                    width={22}
                    height={22}
                  />
                  <span className="text-[13px]">
                    Whatsapp
                  </span>
                </Link>
                <Link
                  prefetch
                  href={COMPANY_MOBILE_NO}
                  className="cursor-pointer"
                >
                  <Image
                    src={"/icons/call-icon.svg"}
                    alt="Call Icon"
                    width={18}
                    height={18}
                  />
                  <span className="text-[13px]">
                    Call us
                  </span>
                </Link>
              </div>
            </section>
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
}

const checkIsPermittedRoute = (
  currPath: string
) => {
  const UNPERMITTED_ROUTES = ["/cart"];
  return UNPERMITTED_ROUTES.reduce(
    (isPermitted, route) =>
      (isPermitted = !(
        isPermitted || currPath.includes(route)
      )),
    false
  );
};
