import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { LeadDocument } from "@/schemas/cms/lead";
import moment from "moment";
import Input from "@/components/common/form/Input";
import { OptionType } from "@/types/cms/form";
import { capitalize } from "@/components/common/form/SearchInput";
import { updateLeadStatus } from "@/fetchAPIs/cms/lead";
import { useStatusContext } from "@/hooks/useStatusContext";
import {
  SetStateAction,
  useEffect,
  useState
} from "react";
import { BinSVG } from "@/constants/svgs/svg";

export default function LeadsList({
  offset,
  leads,
  setLeads,
  onToggleOption,
  onDelete
}: {
  offset: number;
  leads: LeadDocument[];
  setLeads: React.Dispatch<
    SetStateAction<LeadDocument[]>
  >;
  onToggleOption: React.Dispatch<
    SetStateAction<boolean>
  >;
  onDelete: (id: string) => void;
}) {
  const { addStatus } = useStatusContext();

  const statusOptions: OptionType[] = [
    "in-progress",
    "interested",
    "not-interested"
  ].map((el) => ({
    label: capitalize(el),
    value: el
  }));

  const tableData: tableDataType = {
    header: [
      { label: "  ", span: 1 },
      {
        label: "Contact number",
        span: 3,
        align: "left"
      },
      { label: "Count", span: 3 },
      {
        label: "Date",
        span: 2,
        align: "left"
      },
      {
        label: "Time",
        span: 2,
        align: "left"
      },
      { label: "Status", span: 2.5 },
      { label: "Actions", span: 1.5 }
    ],
    data: [],
    offset: offset
  };

  const handleSelectedOption = (
    id: string,
    currStatus: string,
    selectedData: string
  ) => {
    if (currStatus === selectedData) return;

    const selectedOption = selectedData;
    if (
      id &&
      (selectedOption === "in-progress" ||
        selectedOption === "interested" ||
        selectedOption === "not-interested")
    ) {
      updateLeadStatus(id, selectedOption)
        .then((data) => {
          setLeads((prev) =>
            prev.map(
              (lead) =>
                ({
                  ...lead,
                  status:
                    lead.status !==
                      selectedOption &&
                    lead._id &&
                    lead._id === id
                      ? selectedOption
                      : lead.status
                }) as LeadDocument
            )
          );
          addStatus([
            {
              type: "success",
              message: "Successfully updated"
            }
          ]);
        })
        .catch((err) =>
          addStatus([
            {
              type: "error",
              message: String(err)
            }
          ])
        );
    }
  };

  tableData.data = leads.map(
    ({
      _id,
      contactNumber,
      count,
      status,
      submittedAt
    }) => {
      const arr: TableDataRowType = [
        {
          label: {
            label: (
              <span
                className={
                  status === ""
                    ? "rounded-full bg-amber-500 text-white italic font-semibold text-[9px] flex items-center justify-center py-1 px-4"
                    : ""
                }
              >
                {status === "" ? "NEW" : ""}
              </span>
            ),
            type: "svg"
          },
          action: {
            action: <></>,
            type: "component"
          }
        },
        {
          label: {
            label: contactNumber,
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        {
          label: {
            label: String(count),
            type: "text"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        {
          label: {
            label: String(
              moment(submittedAt).format(
                "Do MMM YYYY"
              )
            ),
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        {
          label: {
            label: String(
              moment(submittedAt).format("h:mm a")
            ),
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        {
          label: {
            label: (
              <Input
                variant="dropdown"
                options={statusOptions}
                title=""
                showError={false}
                isRequired={false}
                errorMessage=""
                hasSubmitted={false}
                name="selectedOption"
                defaultValue={
                  status === "" ? "" : status
                }
                setValue={(selectedOption) =>
                  handleSelectedOption(
                    _id,
                    status,
                    String(selectedOption)
                  )
                }
                className="min-w-full transition-all duration-300 *:text-black *:group-hover:bg-blue-400 *:rounded-lg py-0 max-h-[40px] -translate-y-[7.5px]"
              />
            ),
            type: "svg"
          },
          action: {
            action: <></>,
            type: "component"
          }
        },
        {
          label: {
            label: (
              <span>
                <BinSVG />
              </span>
            ),
            type: "svg"
          },
          action: {
            action: () => {
              onDelete(_id);
            },
            type: "modalButton",
            modalType: "destructive"
          }
        }
      ];

      return arr;
    }
  );

  return <AdminTable data={tableData} />;
}
