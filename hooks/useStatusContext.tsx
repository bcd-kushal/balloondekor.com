"use client";

// libraries
import {
  ReactNode,
  createContext,
  useContext,
  useState
} from "react";
// import { v4 as uuid } from "uuid";

// constants
import { STATUS_TIMEOUT } from "@/constants/common/status";

// types
import { StatusType } from "@/types/cms/common";
import { toast } from "@/components/ui/use-toast";

type StatusContextValueType = {
  statusList: StatusType[];
  addStatus: (status: StatusType[]) => void;
  dismissStatus: (statusId: string) => void;
};

// context
const StatusContext = createContext<
  StatusContextValueType | undefined
>(undefined);

const returnVariantType = (
  type: StatusType["type"]
): {
  title: string;
  variant:
    | "success"
    | "destructive"
    | "warning"
    | "default";
} => {
  switch (type) {
    case "success":
      return {
        title: "Success!",
        variant: "success"
      };
    case "error":
      return {
        title: "Error",
        variant: "destructive"
      };
    case "warning":
      return {
        title: "Warning!",
        variant: "warning"
      };
    default:
      return {
        title: "Heads up",
        variant: "default"
      };
  }
};

// context provider
export function StatusContextProvider({
  children
}: {
  children: ReactNode;
}) {
  // states
  const [statusList, setStatusList] = useState<
    StatusType[]
  >([]);

  // handlers
  const handleAddStatus = (
    status: StatusType[]
  ): void => {
    for (let { type, message } of status) {
      // const id = uuid();
      const x = returnVariantType(type);

      toast({
        title: x.title,
        description: message,
        variant: x.variant
      });
    }
  };

  const handleDismissStatus = (
    statusId: string
  ): void => {
    setStatusList((prevStatusList) =>
      prevStatusList.filter(
        ({ _id }) => _id !== statusId
      )
    );
  };

  // context value
  const statusContextValue: StatusContextValueType =
    {
      statusList,
      addStatus: handleAddStatus,
      dismissStatus: handleDismissStatus
    };

  return (
    <StatusContext.Provider
      value={statusContextValue}
    >
      {children}
    </StatusContext.Provider>
  );
}

// hook
export const useStatusContext =
  (): StatusContextValueType => {
    const context = useContext(StatusContext);

    if (!context) {
      throw new Error(
        "useStatusContext must be used within a StatusContextProvider"
      );
    }

    return context;
  };
