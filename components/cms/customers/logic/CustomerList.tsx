import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import {
  BinSVG,
  EyeOnSVG,
  PenSVG
} from "@/constants/svgs/svg";
import { useStatusContext } from "@/hooks/useStatusContext";
import { CustomerDocument } from "@/schemas/cms/customer";
import moment from "moment";
import { SetStateAction, useState } from "react";
import CustomerDetailsDialog from "./CustomerDetailsDialog";

export default function CustomerList({
  offset,
  customers,
  setCustomers,
  onToggleOption,
  onDelete
}: {
  offset: number;
  customers: CustomerDocument[];
  setCustomers: React.Dispatch<
    SetStateAction<CustomerDocument[]>
  >;
  onToggleOption: React.Dispatch<
    SetStateAction<boolean>
  >;
  onDelete: (id: string) => void;
}) {
  const { addStatus } = useStatusContext();

  const [
    showCustomerDetails,
    setShowCustomerDetails
  ] = useState<boolean>(false);
  const [
    customerInQuestion,
    setCustomerInQuestion
  ] = useState<CustomerDocument | undefined>(
    undefined
  );

  const tableData: tableDataType = {
    header: [
      { label: "Name", span: 3.5 },
      {
        label: "Phone",
        span: 3,
        align: "left"
      },
      { label: "Email", span: 5, align: "left" },
      {
        label: "Orders",
        span: 2.5
      },
      {
        label: "Registered on",
        span: 2.5,
        align: "left"
      },
      { label: "Details", span: 1 },
      { label: "Remove", span: 1 }
    ],
    data: [],
    offset: offset
  };

  tableData.data = customers.map(
    ({
      _id,
      mobileNumber,
      name,
      mail,
      address,
      gender,
      password,
      orders,
      createdAt
    }) => {
      const arr: TableDataRowType = [
        // NAME =====================================================
        {
          label: {
            label: name || "User",
            type: "text"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // PHONE =====================================================
        {
          label: {
            label: mobileNumber || "",
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // EMAIL =========================================================
        {
          label: {
            label: mail || "-",
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // ORDERS ===========================================================
        {
          label: {
            label: String(orders?.length || 0),
            type: "text"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // REGISTRATION =============================================================
        {
          label: {
            label: moment(createdAt).format(
              "ddd, DD MMM 'YY"
            ),
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // DETAILS =====================================================================
        {
          label: {
            label: (
              <span
                onClick={() => {
                  setShowCustomerDetails(
                    (prev) => true
                  );
                  setCustomerInQuestion((prev) =>
                    customers.find(
                      (customer) =>
                        customer._id === _id
                    )
                  );
                }}
              >
                <EyeOnSVG dimensions={14} />
              </span>
            ),
            type: "svg"
          },
          action: {
            action: <></>,
            type: "component"
          }
        },
        // REMOVE =====================================================================
        {
          label: {
            label: (
              <span>
                <BinSVG dimensions={14} />
              </span>
            ),
            type: "svg"
          },
          action: {
            action: () => onDelete(_id),
            type: "modalButton"
          }
        }
      ];

      return arr;
    }
  );

  return (
    <>
      <AdminTable data={tableData} />
      <Dialog
        open={showCustomerDetails}
        onOpenChange={() =>
          setShowCustomerDetails((prev) => !prev)
        }
      >
        <DialogContent className="p-0 bg-transparent min-w-fit min-h-fit rounded-none focus:outline-none border-none outline-none">
          <CustomerDetailsDialog
            customer={customerInQuestion}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
