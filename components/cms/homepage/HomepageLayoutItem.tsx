// libraries
import Image from "next/image";
import Link from "next/link";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import Banner from "@/components/cms/homepage/layout/ui/Banner";
import Circle from "@/components/cms/homepage/layout/ui/Circle";
import Collage from "@/components/cms/homepage/layout/ui/Collage";
import FAQ from "@/components/cms/homepage/layout/ui/FAQ";
import Modal from "@/components/common/Modal";
import QuickLink from "@/components/cms/homepage/layout/ui/QuickLink";
import SquareM from "@/components/cms/homepage/layout/ui/SquareM";
import SquareL from "@/components/cms/homepage/layout/ui/SquareL";
import Tiles from "@/components/cms/homepage/layout/ui/Tiles";
import Text from "@/components/cms/homepage/layout/ui/Text";

// types
import { ReactNode, useState } from "react";
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";

// styles
import styles from "@/components/cms/homepage/homepageLayoutItem.module.css";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DesktopIcon,
  Pencil2Icon,
  ThickArrowUpIcon,
  TrashIcon
} from "@radix-ui/react-icons";
import { BinSVG } from "@/constants/svgs/svg";

export default function HomepageLayoutItem({
  id,
  layoutType,
  layout,
  isActive,
  onToggleActive,
  onMoveUp,
  onMoveDown,
  onDelete,
  onScreenPreviewSwitch,
  isBanner
}: {
  id: string;
  layoutType:
    | "banner"
    | "circle"
    | "square-m"
    | "square-l"
    | "tiles"
    | "collage"
    | "text"
    | "faq"
    | "quick-link";
  layout: HomepageLayoutDocument;
  isActive: boolean;
  isBanner: boolean;
  onToggleActive: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onScreenPreviewSwitch?: () => void;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [showModal, setShowModal] =
    useState<boolean>(false);

  // event handlers
  const handleDelete = () => {
    setShowModal(false);
    onDelete();
  };

  const renderLayout = (
    layoutType:
      | "banner"
      | "circle"
      | "square-m"
      | "square-l"
      | "tiles"
      | "collage"
      | "text"
      | "faq"
      | "quick-link",
    layout: HomepageLayoutDocument
  ): ReactNode => {
    switch (layoutType) {
      case "banner":
        return (
          <Banner
            key={layout._id}
            layout={layout}
          />
        );

      case "circle":
        return (
          <Circle
            key={layout._id}
            layout={layout}
          />
        );

      case "square-m":
        return (
          <SquareM
            key={layout._id}
            layout={layout}
          />
        );

      case "square-l":
        return (
          <SquareL
            key={layout._id}
            layout={layout}
          />
        );

      case "tiles":
        return (
          <Tiles
            key={layout._id}
            layout={layout}
          />
        );

      case "collage":
        return (
          <Collage
            key={layout._id}
            layout={layout}
          />
        );

      case "text":
        return (
          <Text
            key={layout._id}
            layout={layout}
          />
        );

      case "faq":
        return (
          <FAQ
            key={layout._id}
            layout={layout}
          />
        );

      case "quick-link":
        return (
          <QuickLink
            key={layout._id}
            layout={layout}
          />
        );

      default:
        return <></>;
    }
  };

  return (
    <div className={styles.container}>
      {showModal ? (
        <Modal
          title="Delete Layout?"
          onCancel={() => setShowModal(false)}
          onAction={handleDelete}
        />
      ) : (
        <></>
      )}
      <div className={styles.controls}>
        <ActionIcon onClick={onMoveUp}>
          <ArrowUpIcon
            width={36}
            height={36}
          />
        </ActionIcon>

        <ActionIcon onClick={onMoveDown}>
          <ArrowDownIcon
            width={36}
            height={36}
          />
        </ActionIcon>

        <ActionIcon onClick={onToggleActive}>
          <Image
            className={styles.icon}
            src={`/icons/${isActive ? "active" : "inactive"}-icon.svg`}
            alt={`${isActive ? "active" : "inactive"} icon`}
            width={40}
            height={40}
            onClick={onToggleActive}
          />
        </ActionIcon>

        <Link
          className="rounded-full p-4 transition-all duration-300 cursor-pointer text-[24px] hover:bg-black/20 flex items-center justify-center gap-3"
          href={`/cms/homepage/edit/${id}`}
        >
          <Pencil2Icon
            width={36}
            height={36}
          />
        </Link>

        <ActionIcon
          onClick={() => {
            if (!layout.isActive) {
              setShowModal(true);
            } else {
              addStatus([
                {
                  type: "error",
                  message:
                    "Active Layout Can't be Deleted"
                }
              ]);
            }
          }}
        >
          <TrashIcon
            width={36}
            height={36}
          />
        </ActionIcon>

        {isBanner ? (
          <ActionIcon
            onClick={() => {
              if (!layout.isActive) {
                setShowModal(true);
              } else {
                addStatus([
                  {
                    type: "error",
                    message:
                      "Active Layout Can't be Deleted"
                  }
                ]);
              }
            }}
          >
            <DesktopIcon
              height={36}
              width={36}
            />
          </ActionIcon>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.layoutsContainer}>
        {renderLayout(layoutType, layout)}
      </div>
    </div>
  );
}

const ActionIcon = ({
  children,
  onClick
}: {
  children: Readonly<React.ReactNode>;
  onClick: () => void;
}) => {
  return (
    <span
      className="rounded-full p-5 transition-all duration-300 cursor-pointer text-[24px] hover:bg-black/20 flex items-center justify-center gap-3"
      onClick={onClick}
    >
      {children}
    </span>
  );
};
