import { memo, useMemo } from "react";
import { capitalize } from "../../form/SearchInput";
import {
  ModalType,
  TableModalWrapperButton
} from "./TableModalWrapper";
type TriggeredActionType =
  | "function"
  | "none"
  | "component"
  | "modalButton";
type ItemActionType = {
  action: any;
  type: TriggeredActionType;
  modalType?: ModalType;
};
export type TableLabelType =
  | "svg"
  | "image"
  | "text";
export type TableDataRowType = {
  label: {
    label: string | JSX.Element;
    type: TableLabelType;
    align?: CellAlignType;
  };
  action: ItemActionType;
}[];
export type CellAlignType =
  | "left"
  | "center"
  | "right";
export type tableDataType = {
  header: {
    label: string;
    span: number;
    align?: CellAlignType;
  }[];
  data: TableDataRowType[];
  offset?: number;
};

export default function AdminTable({
  data,
  mode
}: {
  data: tableDataType;
  mode?: "frontend" | "backend";
}) {
  const rowOffset = data.offset ? data.offset : 0;
  const gridTemplateColsRatio =
    "40px " +
    data.header.reduce((acc, el) => {
      return acc + `${el.span}fr `;
    }, "");

  const handleItemAction = (
    obj: ItemActionType
  ) => {
    const actionType = obj.type;
    switch (actionType) {
      case "none":
        return () => {};
      case "function":
        return obj.action();
    }
  };

  const tableTuples = data.data.map(
    (row, index) => (
      <div
        className={
          mode && mode === "frontend"
            ? `group rounded-lg py-[8px] px-[12px] gap-[8px] grid bg-[#12121209] hover:bg-pink-300/80 transition-all duration-300 hover:shadow-lg hover:shadow-[#fe00ed15] cursor-pointer`
            : `group rounded-lg py-[8px] px-[12px] gap-[8px] grid bg-[#12121209] hover:bg-tab-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#0075FE30] cursor-pointer`
        }
        style={{
          gridTemplateColumns:
            gridTemplateColsRatio
        }}
        key={index}
      >
        <span className="pl-[5px] flex items-center text-[14px]">
          {index + 1 + rowOffset}
        </span>
        {row.map((item, index2) => (
          <MemoizedTuple
            item={item}
            index={index}
            keyIndex={index2}
            key={index2}
            onClick={() =>
              handleItemAction(item.action)
            }
          />
        ))}
      </div>
    )
  );

  return (
    <>
      <section
        className={`${mode && mode === "frontend" ? "" : "relative min-h-[200px]"}  w-full flex items-start justify-start h-full overflow-y-scroll scrollbar-hide rounded-lg`}
      >
        <div
          className={`${mode && mode === "frontend" ? "" : "relative"} grid grid-cols-1 min-w-full h-fit even:*:bg-transparent `}
        >
          {/* header ------------------------- */}
          <div
            className={`${mode && mode === "frontend" ? "bg-zinc-600 text-white" : "bg-black text-white"} sticky top-0 rounded-lg py-[12px] px-[12px] grid mb-[4px] gap-[8px]`}
            style={{
              gridTemplateColumns:
                gridTemplateColsRatio
            }}
          >
            <span className="pl-[5px] text-[14px] flex items-center">
              Sl.
            </span>
            {data.header.map((head, index) => (
              <span
                key={index}
                className={
                  index === 0
                    ? `flex items-center text-[14px] ${head.align === "left" ? "text-left justify-start" : head.align === "center" ? "text-center justify-center" : head.align === "right" ? "text-right justify-end" : "justify-start text-left"}`
                    : `flex items-center text-[14px] ${head.align === "left" ? "text-left justify-start" : head.align === "center" ? "text-center justify-center" : head.align === "right" ? "text-right justify-end" : "justify-center text-center"}`
                }
              >
                {capitalize(head.label)}
              </span>
            ))}
          </div>

          {/* table data ------------------------- */}
          {tableTuples}
        </div>
      </section>
    </>
  );
}

const MemoizedTuple = memo(Tuple);

function Tuple({
  item,
  index,
  keyIndex: index2,
  onClick
}: {
  item: {
    label: {
      label: string | JSX.Element;
      type: TableLabelType;
      align?: CellAlignType | undefined;
    };
    action: ItemActionType;
  };
  keyIndex: number;
  index: number;
  onClick: () => void;
}) {
  return item.action.type === "modalButton" ? (
    <TableModalWrapperButton
      key={index2}
      label={item.label.label}
      modalTitle="Confirm action"
      onClickTrigger={item.action.action}
      type="action"
      modalType={
        item.action.modalType
          ? item.action.modalType
          : "normal"
      }
      className={
        index2 === 0
          ? ` ${item.label.align === "left" ? "justify-start" : item.label.align === "center" ? "justify-center" : item.label.align === "right" ? "justify-end" : "justify-start"}`
          : `w-full flex items-center ${item.label.align === "left" ? "justify-start" : item.label.align === "center" ? "justify-center" : item.label.align === "right" ? "justify-end" : "justify-center"}`
      }
    />
  ) : item.action.type === "component" ? (
    <span
      className={`w-full h-full flex items-center ${item.label.align === "left" ? "justify-start" : item.label.align === "center" ? "justify-center" : item.label.align === "right" ? "justify-end" : index2 === 0 ? "justify-start" : "justify-center"} text-[14px]`}
      key={String(index2) + String(index)}
    >
      {item.label.label}
    </span>
  ) : (
    <span
      onClick={onClick}
      key={String(index2) + String(index)}
      className={
        index2 === 0
          ? ` text-[14px] flex items-center ${item.label.align === "left" ? "justify-start" : item.label.align === "center" ? "justify-center" : item.label.align === "right" ? "justify-end" : "justify-start"}`
          : `flex items-center text-[14px] ${item.label.align === "left" ? "justify-start" : item.label.align === "center" ? "justify-center" : item.label.align === "right" ? "justify-end" : "justify-center"}`
      }
    >
      {item.label.label}
    </span>
  );
}
