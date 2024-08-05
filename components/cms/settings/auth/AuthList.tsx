// components
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";

// svgs
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";

// types
import { AuthMethodsDocument } from "@/schemas/cms/setting";
import { useStatusContext } from "@/hooks/useStatusContext";

export default function AuthList({
  authMethods,
  defaultMethod,
  onToggleActive,
  onChangeDefault
}: {
  authMethods: AuthMethodsDocument;
  defaultMethod: "mail" | "otp" | "whatsapp";
  onToggleActive: (
    method:
      | "mail"
      | "otp"
      | "whatsapp"
      | "google",
    methodState: boolean
  ) => void;
  onChangeDefault: (
    defaultMethod: "mail" | "otp" | "whatsapp"
  ) => void;
}) {
  const { addStatus } = useStatusContext();

  const authData: tableDataType = {
    header: [
      {
        label: "Method",
        span: 2,
        align: "left"
      },
      {
        label: "Active",
        span: 1
      },
      {
        label: "Default",
        span: 1
      }
    ],
    data: [],
    offset: 0
  };

  for (let i = 0; i < 4; i++) {
    const method =
      i === 0
        ? "mail"
        : i === 1
          ? "otp"
          : i === 2
            ? "whatsapp"
            : "google";

    const row: TableDataRowType = [];

    // method -------------------------------------
    row.push({
      label: {
        label: method,
        type: "text",
        align: "left"
      },
      action: { action: <></>, type: "none" }
    });

    // active -------------------------------------
    row.push({
      label: {
        label: authMethods[method] ? (
          <SwitchOnSVG
            stroke="#00aa00"
            dimensions={22}
            className="group-hover:stroke-white duration-300 transition-colors"
          />
        ) : (
          <SwitchOffSVG
            stroke="#aa0000"
            dimensions={22}
            className="group-hover:stroke-[#eeeeee98] transition-colors duration-300"
          />
        ),
        type: "svg"
      },
      action: {
        action: () => {
          if (defaultMethod !== method) {
            onToggleActive(
              method,
              !authMethods[method]
            );
          } else {
            addStatus([
              {
                type: "warning",
                message:
                  "Default Method Can't be Deactivated"
              }
            ]);
          }
        },
        type: "function"
      }
    });

    // default -------------------------------------
    row.push({
      label: {
        label:
          defaultMethod === method ? (
            <SwitchOnSVG
              stroke="#00aa00"
              dimensions={22}
              className="group-hover:stroke-white duration-300 transition-colors"
            />
          ) : (
            <SwitchOffSVG
              stroke="#aa0000"
              dimensions={22}
              className="group-hover:stroke-[#eeeeee98] transition-colors duration-300"
            />
          ),
        type: "svg"
      },
      action: {
        action: () => {
          if (method !== "google") {
            if (authMethods[method]) {
              if (defaultMethod !== method) {
                onChangeDefault(method);
              } else {
                addStatus([
                  {
                    type: "warning",
                    message:
                      "Default Auth Method Can't be Unset"
                  }
                ]);
              }
            } else {
              addStatus([
                {
                  type: "warning",
                  message:
                    "Activate Method Before Making it Default"
                }
              ]);
            }
          } else {
            addStatus([
              {
                type: "warning",
                message:
                  "Google Can't be the Default Auth Method"
              }
            ]);
          }
        },
        type: "function"
      }
    });

    authData.data.push(row);
  }

  return <AdminTable data={authData} />;
}
