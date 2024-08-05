// COMPONENTS
import Button from "./Button";
import Backdrop from "./Backdrop";

// STYLES
import styles from "./modal.module.css";

export default function Modal({
  title,
  onCancel,
  onAction,
  triggerType
}: {
  title: string;
  onCancel: () => void;
  onAction: () => void;
  triggerType?: "normal" | "destructive";
}) {
  return (
    <Backdrop
      onClick={onCancel}
      verticalPosition="center"
      horizontalPosition="center"
    >
      <div
        className={`bg-card-primary py-[24px] px-[32px] min-w-[280px] shadow-lg rounded-xl flex flex-col items-stretch justify-between gap-3`}
      >
        <div
          className={`text-center text-[#121212] text-[24px] pb-[12px] pt-[8px]`}
        >
          <div>{title}</div>
        </div>
        <div
          className={`w-full flex items-end justify-between *:rounded-lg *:py-[8px] *:px-[12px] *:cursor-pointer *:transition-colors *:duration-300`}
        >
          <button
            onClick={onCancel}
            className="text-[#121212] text-[16px] bg-[#12121215] hover:bg-[#12121240]"
          >
            Cancel
          </button>
          <button
            onClick={onAction}
            className={`text-white text-[16px] bg-[#121212] ${triggerType === "destructive" ? "hover:bg-red-700" : "hover:bg-[#0075FE]"}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </Backdrop>
  );
}
