import { useImageManagementContext } from "@/hooks/useImageManagementContext";

import Backdrop from "@/components/common/Backdrop";
import FormControl from "@/components/common/form/FormControl";
import Form, { getFormConfig } from "./Form";

import styles from "./editor.module.css";

type Props = {
  onClose: () => void;
};

export default function Editor(props: Props) {
  const { onClose } = props;

  const {
    image: {
      active: { val }
    }
  } = useImageManagementContext();

  let title = "update alt text";

  return (
    <Backdrop
      horizontalPosition="center"
      verticalPosition="center"
      onClick={() => {}}
    >
      <div
        className={`bg-card-primary px-[28px] py-[20px] min-w-[390px] max-[390px]:min-w-[calc(100dvw_-_32px)] rounded-3xl`}
      >
        <h3
          className={`mb-[12px] ${styles.title}`}
        >
          {title}
        </h3>
        <FormControl
          config={getFormConfig({
            alt: val?.alt || val?.defaultAlt
          })}
        >
          <Form onClose={onClose} />
        </FormControl>
      </div>
    </Backdrop>
  );
}
