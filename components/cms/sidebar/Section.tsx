// LIBRARIES
import { ReactNode } from "react";

// HOOKS
import { ConfigType } from "../../../hooks/useFormContext";

// COMPONENTS
import FormControl from "@/components/common/form/FormControl";

// STYLES
import styles from "./section.module.css";

// TYPES
type Props = {
  heading: string;
  config: ConfigType;
  children: ReactNode;
};

// EXPORT
export default function Section(props: Props) {
  // destructuring props
  const { heading, config, children } = props;

  // RETURN COMPONENT
  return (
    <section className={styles.container}>
      <h4 className={`${styles.heading}`}>
        {heading}
      </h4>
      <FormControl config={config}>
        {children}
      </FormControl>
    </section>
  );
}
