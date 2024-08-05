import FormControl from "@/components/common/form/FormControl";
import Backdrop from "@/components/common/Backdrop";
import FolderForm, {
  getFormConfig
} from "./FolderForm";

import { FolderDocument } from "@/schemas/cms/folder";

import styles from "./editor.module.css";

type CommonProps = {
  onClose: () => void;
};

type AddItemVariantProps = {
  variant: "add";
};

type EditItemVariantProps = {
  variant: "edit";
  defaultValue: FolderDocument;
};

type Props = CommonProps &
  (AddItemVariantProps | EditItemVariantProps);

export default function Editor(props: Props) {
  const { variant, onClose } = props;

  let title = "add folder";
  let defaultValue: Partial<FolderDocument> = {};

  if (variant === "edit") {
    title = "rename folder";
    defaultValue = props.defaultValue;
  }

  return (
    <Backdrop
      horizontalPosition="center"
      verticalPosition="center"
      onClick={() => {}}
    >
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <FormControl
          config={getFormConfig(
            defaultValue as FolderDocument
          )}
        >
          {variant === "add" ? (
            <FolderForm
              onClose={onClose}
              variant="add"
            />
          ) : (
            <FolderForm
              onClose={onClose}
              variant="edit"
              id={defaultValue._id}
            />
          )}
        </FormControl>
      </div>
    </Backdrop>
  );
}
