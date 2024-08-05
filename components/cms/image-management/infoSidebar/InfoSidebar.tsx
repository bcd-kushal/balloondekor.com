"use client";

// LIBRARIES
import { useState } from "react";
import Image from "next/image";
import moment from "moment";

// HOOKS
import { useImageManagementContext } from "@/hooks/useImageManagementContext";

// COMPONENTS
import Modal from "@/components/common/Modal";
import Editor from "./Editor";

// STYLES
import styles from "./infoSidebar.module.css";
import {
  BinSVG,
  CopySVG,
  CrossSVG,
  PenSVG
} from "@/constants/svgs/svg";

export default function InfoSidebar() {
  // extracting context
  const {
    image: { active, del }
  } = useImageManagementContext();

  // states
  const [showForm, setShowForm] =
    useState<boolean>(false);
  const [showModal, setShowModal] =
    useState<boolean>(false);

  if (active.val?._id) {
    const {
      _id,
      defaultAlt,
      alt,
      width,
      height,
      size,
      url,
      createdAt
    } = active.val;

    const handleDelete = () => {
      setShowModal(false);
      del(_id);
    };

    const detailsData: {
      subject: string;
      data: string;
    }[] = [
      {
        subject: "Alt text",
        data: alt || defaultAlt
      },
      {
        subject: "Upload date",
        data: moment(createdAt).fromNow()
      },
      {
        subject: "Dimensions",
        data: `${width} x ${height}`
      },
      {
        subject: "Size",
        data:
          size / 1024 > 1024
            ? `${(size / (1024 * 1024)).toFixed(2)} MB`
            : `${(size / 1024).toFixed(2)} KB`
      },
      { subject: "URL", data: url }
    ];

    const copyToClipboard = (str: string) => {
      navigator.clipboard.writeText(str);
    };

    return (
      <div
        className={`px-[64px] py-[50px] z-[900] max-w-[100%] w-full absolute max-h-full h-full overflow-hidden bg-[#12121255] backdrop-blur-sm grid place-items-center`}
      >
        <section className="max-h-full min-w-[280px] relative bg-card-primary rounded-3xl shadow-lg shadow-[#0003] p-[32px] overflow-y-scroll scrollbar-hide">
          <span
            onClick={() => active.set("")}
            className="absolute p-[10px] right-[20px] top-[20px] rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#12121235]"
          >
            <CrossSVG />
          </span>

          {showForm ? (
            <Editor
              onClose={() => setShowForm(false)}
            />
          ) : (
            <></>
          )}

          <div className="flex items-start justify-stretch gap-[24px]">
            <div className="flex flex-col justify-start gap-[16px]">
              <div
                className={`relative overflow-hidden max-w-[300px] max-h-[600px] min-w-[250px] min-h-[110px]`}
              >
                <Image
                  className={`rounded-2xl max-h-full max-w-full object-cover overflow-hidden`}
                  src={url as string}
                  alt={alt as string}
                  width={1024}
                  height={1024}
                  quality={100}
                />
              </div>
              <div className="flex items-start justify-center">
                <button
                  onClick={() =>
                    setShowModal(true)
                  }
                  className=" border-[1.5px] transition-all duration-300 flex gap-[8px] items-center text-[14px] justify-center border-red-500 text-white bg-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-[#ef444430] rounded-lg py-[8px] max-w-[220px] min-w-[180px]"
                >
                  <BinSVG /> Delete image
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-start gap-[16px]">
              <span className="text-4xl pt-[24px] pb-[8px] mt-[8px]">
                Image
              </span>
              <div
                className={`w-fit flex flex-col items-stretch justify-start odd:*:bg-[#12121210]`}
              >
                {detailsData.map(
                  (item, index) => (
                    <div
                      className={`group relative grid grid-cols-[1fr_3fr] gap-x-[20px] transition-all duration-300 hover:bg-tab-primary hover:text-white hover:shadow-lg hover:shadow-[#0075FE30] cursor-pointer rounded-lg py-[6px] items-center pl-[12px] pr-[44px]`}
                      key={index}
                    >
                      <span
                        className={`group-hover:text-white text-[14px] text-[#12121290]`}
                      >
                        {item.subject} :
                      </span>
                      <span
                        className={`text-[14px] max-w-[300px] break-words`}
                      >
                        {item.data}
                      </span>
                      {item.subject ===
                      detailsData[0].subject ? (
                        <span
                          onClick={() =>
                            setShowForm(true)
                          }
                          className="absolute cursor-pointer right-[12px] top-1/2 -translate-y-1/2"
                        >
                          <PenSVG />
                        </span>
                      ) : (
                        <></>
                      )}
                      {item.subject ===
                      detailsData[
                        detailsData.length - 1
                      ].subject ? (
                        <span
                          onClick={() =>
                            copyToClipboard(
                              item.data
                            )
                          }
                          className="absolute cursor-pointer right-[12px] top-1/2 -translate-y-1/2"
                        >
                          <CopySVG />
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            {showModal ? (
              <Modal
                title={`Delete image?`}
                onCancel={() =>
                  setShowModal(false)
                }
                onAction={handleDelete}
              />
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    );
  }
}
