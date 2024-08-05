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
  CrossSVG,
  EyeOnSVG,
  TickSVG
} from "@/constants/svgs/svg";
import { useStatusContext } from "@/hooks/useStatusContext";
import { AllLeadsDocument } from "@/schemas/cms/allLeads";
import { LineItemDocument } from "@/schemas/cms/lineItem";
import {
  SetStateAction,
  useEffect,
  useState
} from "react";
import LeadsCartData from "./leadsCartData/LeadsCartData";
import { CityDocument } from "@/schemas/cms/city";
import moment from "moment";
import { DOMAIN } from "@/constants/frontend/apiRoute";
import { StatusType } from "@/types/cms/common";

export default function AllLeadsList({
  offset,
  leads,
  setLeads,
  onToggleOption,
  onDelete
}: {
  offset: number;
  leads: AllLeadsDocument[];
  setLeads: React.Dispatch<
    SetStateAction<AllLeadsDocument[]>
  >;
  onToggleOption: React.Dispatch<
    SetStateAction<boolean>
  >;
  onDelete: (id: string) => void;
}) {
  const { addStatus } = useStatusContext();

  const [showCartDetails, setShowCartDetails] =
    useState<boolean>(false);
  const [
    cartDetailsInQuestion,
    setCartDetailsInQuestion
  ] = useState<Partial<LineItemDocument>[]>([]);
  const [cityInQuestion, setCityInQuestion] =
    useState<string>("");

  const tableData: tableDataType = {
    header: [
      { label: "  ", span: 1.8 },
      { label: "  ", span: 1 },
      { label: "Name", span: 5, align: "left" },
      {
        label: "Lead",
        span: 4,
        align: "left"
      },
      { label: "Cart", span: 3.6 },
      {
        label: "City",
        span: 4,
        align: "left"
      },
      {
        label: "Date",
        span: 4,
        align: "left"
      },
      { label: "Status", span: 4 },
      { label: "Actions", span: 2 }
    ],
    data: [],
    offset: offset
  };

  tableData.data = leads.map(
    ({
      _id,
      type,
      status,
      name,
      mobile,
      city,
      cartItems,
      customerId,
      updatedAt
    }) => {
      const arr: TableDataRowType = [
        // NEW / SEEN TYPE =====================================================
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
        // REGISTERED UNREGISTERED DOT =====================================================
        {
          label: {
            label:
              type === "registered" ? (
                <div className="bg-green-600 group-hover:bg-white rounded-full w-[8px] h-[8px] aspect-square" />
              ) : (
                <div className="bg-red-500 group-hover:bg-white rounded-full w-[8px] h-[8px] aspect-square" />
              ),
            type: "svg"
          },
          action: {
            action: <></>,
            type: "component"
          }
        },
        // NAME =========================================================
        {
          label: {
            label: name ? (
              <span>{name}</span>
            ) : (
              "-"
            ),
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "component"
          }
        },
        // MOBILE ===========================================================
        {
          label: {
            label: String(mobile),
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // CART =============================================================
        {
          label: {
            label:
              cartItems &&
              cartItems.length > 0 ? (
                <span>
                  <span
                    onClick={() => {
                      setShowCartDetails(true);
                      setCartDetailsInQuestion(
                        cartItems as Partial<LineItemDocument>[]
                      );
                      setCityInQuestion(
                        (city as CityDocument)
                          .name
                      );
                    }}
                    className="hidden group-hover:block"
                  >
                    <EyeOnSVG className="group-hover:stroke-white" />
                  </span>

                  <TickSVG
                    className="group-hover:hidden"
                    stroke="#16a34a"
                  />
                </span>
              ) : (
                <CrossSVG
                  className="group-hover:stroke-white/85"
                  stroke="#aa0000"
                />
              ),
            type: "text"
          },
          action: {
            action: <></>,
            type: "none"
          }
        },
        // CITY =====================================================================
        {
          label: {
            label: city ? (
              <span>
                {(city as CityDocument).name}
              </span>
            ) : (
              "-"
            ),
            type: "text",
            align: "left"
          },
          action: {
            action: <></>,
            type: "component"
          }
        },
        // DATE ====================================================================
        {
          label: {
            label: moment(updatedAt).format(
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
        // STATUS ====================================================================
        {
          label: {
            label: (
              <>
                <select
                  title="LeadStatus"
                  defaultValue={status}
                  onChange={(e) =>
                    handleLeadStatusSelection(
                      _id,
                      status,
                      e.target.value,
                      setLeads,
                      addStatus
                    )
                  }
                  className="text-black outline-none transition-all duration-300 bg-transparent py-1.5 px-1.5 border-[1px] border-neutral-300 group-hover:bg-[#0075fe] group-hover:text-white group-hover:border-white/40  rounded-lg cursor-pointer"
                >
                  <option value="">None</option>
                  <option value="interested">
                    Interested
                  </option>
                  <option value="in-progress">
                    In progress
                  </option>
                  <option value="not-interested">
                    Not interested
                  </option>
                </select>
              </>
            ),
            type: "svg"
          },
          action: {
            action: <></>,
            type: "component"
          }
        },
        // ACTION =====================================================================
        {
          label: {
            label: (
              <span
                onClick={() =>
                  handleDeleteLead(
                    _id,
                    setLeads,
                    addStatus
                  )
                }
              >
                <BinSVG
                  className="group-hover:stroke-white"
                  stroke="#000"
                />
              </span>
            ),
            type: "svg"
          },
          action: {
            action: <></>,
            type: "component"
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
        open={showCartDetails}
        onOpenChange={() =>
          setShowCartDetails(false)
        }
      >
        <DialogContent className="p-0 bg-transparent min-w-fit min-h-fit rounded-none focus:outline-none border-none outline-none">
          <LeadsCartData
            cart={cartDetailsInQuestion}
            city={cityInQuestion}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

// ==================================================================
// ==================================================================

const handleLeadStatusSelection = (
  id: string,
  currStatus: string,
  selectedStatus: string,
  setLeads: React.Dispatch<
    SetStateAction<AllLeadsDocument[]>
  >,
  addStatus: (status: StatusType[]) => void
) => {
  if (currStatus === selectedStatus) return;

  const selectedOption = selectedStatus;
  if (
    id &&
    (selectedOption === "in-progress" ||
      selectedOption === "interested" ||
      selectedOption === "not-interested")
  ) {
    fetch(
      `${DOMAIN}/api/frontend/all-leads/${id}`,
      {
        method: "POST",
        body: JSON.stringify({ selectedStatus })
      }
    )
      .then((res) => res.json())
      .then((res) => {
        const leads =
          res.data as AllLeadsDocument[];
        if (leads.length) {
          const newLeads: AllLeadsDocument[] =
            leads.filter(
              ({ status }) => status === ""
            );
          const oldLeads: AllLeadsDocument[] =
            leads.filter(
              ({ status }) => status !== ""
            );

          const updatedLeads: AllLeadsDocument[] =
            [...newLeads, ...oldLeads];

          setLeads(
            updatedLeads as AllLeadsDocument[]
          );
          addStatus([
            {
              message:
                "Lead status updated successfully",
              type: "success"
            }
          ]);
        }
      })
      .catch(() =>
        addStatus([
          {
            message:
              "Failed to update lead status",
            type: "error"
          }
        ])
      );
  }
};

const handleDeleteLead = (
  id: string,
  setLeads: React.Dispatch<
    SetStateAction<AllLeadsDocument[]>
  >,
  addStatus: (status: StatusType[]) => void
) => {
  fetch(`${DOMAIN}/api/frontend/all-leads`, {
    method: "DELETE",
    body: JSON.stringify({ id })
  })
    .then((res) => res.json())
    .then((res) => {
      const leads =
        res.data as AllLeadsDocument[];
      if (leads.length) {
        const newLeads: AllLeadsDocument[] =
          leads.filter(
            ({ status }) => status === ""
          );
        const oldLeads: AllLeadsDocument[] =
          leads.filter(
            ({ status }) => status !== ""
          );

        const updatedLeads: AllLeadsDocument[] = [
          ...newLeads,
          ...oldLeads
        ];

        setLeads(
          updatedLeads as AllLeadsDocument[]
        );
        addStatus([
          {
            message: "Lead deleted successfully",
            type: "success"
          }
        ]);
      }
    })
    .catch(() =>
      addStatus([
        {
          message: "Failed to delete lead",
          type: "error"
        }
      ])
    );
};
