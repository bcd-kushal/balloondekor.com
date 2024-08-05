import { useImageManagementContext } from "@/hooks/useImageManagementContext";

import FormControl from "@/components/common/form/FormControl";
import UploadForm, {
  getFormConfig
} from "./UploadForm";

import styles from "./uploadEditor.module.css";

type Props = {
  onClose: () => void;
};

export default function UploadEditor(
  props: Props
) {
  const { onClose } = props;

  const {
    folder: { active }
  } = useImageManagementContext();

  const title = "upload image";

  return (
    <div
      className={`h-full flex flex-col items-stretch justify-start`}
    >
      <h3
        className={`pt-[52px] py-[16px] px-[20px] mb-[20px] text-[40px] tracking-[-1.6px] font-normal text-[#121212] capitalize`}
      >
        {title}
      </h3>
      <FormControl
        config={getFormConfig({
          folderId: active.val?._id || ""
        })}
      >
        <UploadForm onClose={onClose} />
      </FormControl>
    </div>
  );
}
