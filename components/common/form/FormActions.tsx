// components
import Button from "../Button";

//styles
import styles from "./formActions.module.css";

//define Props
type CommonProps = {
  submitBtnLabel: string;
  closeBtnLabel?: string;
};

type PageVariantProps = {
  variant: "page";
  closeBtnLink: string;
};

type ModalVariantProps = {
  variant: "modal";
  closeBtnAction: () => void;
};

type Props = CommonProps &
  (PageVariantProps | ModalVariantProps);

export default function FormActions(
  props: Props
) {
  const {
    submitBtnLabel,
    closeBtnLabel,
    variant
  } = props;

  if (variant === "page") {
    const { closeBtnLink } = props;

    return (
      <div
        className={`w-full flex items-center justify-end gap-[12px]`}
      >
        <Button
          type="secondary"
          label={closeBtnLabel || "close"}
          variant="link"
          href={closeBtnLink}
        />
        <Button
          type="primary"
          label={submitBtnLabel}
          variant="submit"
        />
      </div>
    );
  } else if (variant === "modal") {
    const { closeBtnAction } = props;

    return (
      <div
        className={` flex gap-[12px] items-center justify-end my-[20px]`}
      >
        <Button
          type="secondary"
          label={closeBtnLabel || "close"}
          variant="normal"
          onClick={closeBtnAction}
        />
        <Button
          type="primary"
          label={submitBtnLabel}
          variant="submit"
        />
      </div>
    );
  }
}
