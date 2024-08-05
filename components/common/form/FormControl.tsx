// libraries
import { ReactNode } from "react";
import {
  ConfigType,
  FormContextProvider
} from "../../../hooks/useFormContext";

export default function FormControl({
  config,
  children
}: {
  config: ConfigType;
  children: ReactNode;
}) {
  return (
    <FormContextProvider config={config}>
      {children}
    </FormContextProvider>
  );
}
