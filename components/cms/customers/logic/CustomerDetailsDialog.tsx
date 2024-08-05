import {
  BinSVG,
  CopySVG,
  EmailSVG,
  PenSVG,
  PhoneSVG
} from "@/constants/svgs/svg";
import { useStatusContext } from "@/hooks/useStatusContext";
import { CustomerDocument } from "@/schemas/cms/customer";
import { OrderDocument } from "@/schemas/cms/order";
import { StatusType } from "@/types/cms/common";
import moment from "moment";

const copyToClipboard = (
  addStatus: (status: StatusType[]) => void,
  str: string
) => {
  try {
    navigator.clipboard.writeText(str);
  } catch (err: any) {
    addStatus([
      {
        message: "Couldnt copy to clipboard",
        type: "error"
      }
    ]);
  } finally {
    addStatus([
      {
        message: "Copied to clipboard",
        type: "success"
      }
    ]);
  }
};

export default function CustomerDetailsDialog({
  customer
}: {
  customer: CustomerDocument | undefined;
}) {
  const { addStatus } = useStatusContext();

  if (!customer) {
    return <section>No User Selected</section>;
  }

  const {
    _id,
    mobileNumber,
    name,
    mail,
    address,
    gender,
    password,
    orders,
    createdAt
  } = customer;

  const customerData = generateCustomerDetails({
    addStatus,
    address,
    createdAt,
    gender,
    mail,
    mobileNumber: mobileNumber || "",
    name: name || "",
    orders,
    password: password || ""
  });

  return (
    <section className="bg-white p-10 pt-16 rounded-2xl flex items-start justify-stretch gap-12 text-[16px] w-[96dvw] sm:w-[85dvw] lg:w-[75dvw] max-md:max-h-[90dvh] max-h-[85dvh]">
      {/* LEFT SIDE ============================================================================================= */}
      <div className="w-[35%] max-w-[200px] flex flex-col justify-start items-center gap-4 line-clamp-2 h-full ">
        <span className="rounded-full text-[20px] w-[72px] h-[72px] aspect-square flex items-center justify-center bg-gradient-to-br from-pink-500/60 to-pink-800/70 text-white">
          {(name || "User")[0].toUpperCase()}
        </span>
        <div className="flex flex-col justify-start items-center gap-[1px]">
          <span className="font-medium text-[24px]">
            {name}
          </span>
          <span className="text-[14px] text-zinc-600">
            Registered:{" "}
            {moment(createdAt).format(
              "ddd, DD MMM 'YY"
            )}
          </span>
        </div>
        <div className="text-[14px] w-full relative flex flex-col justify-start gap-[4px] mt-2 text-zinc-700">
          <div className="relative w-[75%] left-1/2 -translate-x-1/2 grid grid-cols-[20px_auto] gap-[10px] items-center">
            <PhoneSVG dimensions={14} />
            <span className="truncate">
              +91 {mobileNumber}
            </span>
          </div>
          {mail ? (
            <div className="relative w-[75%] left-1/2 -translate-x-1/2 grid grid-cols-[20px_auto] gap-[10px] items-center">
              <EmailSVG dimensions={14} />
              <span className="truncate">
                {mail}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* RIGHT SIDE ============================================================================================= */}
      <div className="w-full grid grid-cols-[2.5fr_7fr_2fr] grid-rows-[32px] items-center *:px-[8.5px] *:py-[5.5px] border-[0.5px] border-black/15 rounded-3xl overflow-hidden">
        {customerData.map(
          ({ label, value, actions }, index) => (
            <>
              <span
                className="border-[0.5px] border-black/15 h-[37px]"
                key={`${index}_1`}
              >
                {label}
              </span>
              <span
                className="border-[0.5px] border-black/15 h-[37px]"
                key={`${index}_2`}
              >
                {value}
              </span>
              {actions}
            </>
          )
        )}
      </div>
    </section>
  );
}

function Actions({
  showCopy,
  showDelete,
  showEdit,
  handleCopy,
  handleDelete,
  handleEdit
}: {
  showCopy: boolean;
  showDelete: boolean;
  showEdit: boolean;
  handleCopy: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
}) {
  return (
    <span className="grid grid-cols-[17px_17px_17px] items-center justify-center gap-[14px] border-[0.5px] border-black/15 h-[37px]">
      {showCopy ? (
        <span
          onClick={handleCopy}
          className="cursor-pointer"
        >
          <CopySVG />
        </span>
      ) : (
        <div />
      )}
      {showEdit ? (
        <span
          onClick={handleEdit}
          className="cursor-pointer"
        >
          <PenSVG />
        </span>
      ) : (
        <div />
      )}
      {showDelete ? (
        <span
          onClick={handleDelete}
          className="cursor-pointer"
        >
          <BinSVG />
        </span>
      ) : (
        <div />
      )}
    </span>
  );
}

const generateCustomerDetails = ({
  addStatus,
  name,
  mobileNumber,
  mail,
  address,
  gender,
  password,
  orders,
  createdAt
}: {
  addStatus: (status: StatusType[]) => void;
  name: string;
  mobileNumber: string;
  mail: string | undefined;
  address: string | undefined;
  gender: string | undefined;
  password: string;
  orders: OrderDocument[] | string[];
  createdAt: Date;
}) => [
  {
    label: "Name",
    value: name,
    actions: (
      <Actions
        showCopy
        handleCopy={() =>
          copyToClipboard(addStatus, name)
        }
        showDelete
        handleDelete={() => {}}
        showEdit
        handleEdit={() => {}}
      />
    )
  },
  {
    label: "Mobile",
    value: `+91 ${mobileNumber}`,
    actions: (
      <Actions
        showCopy
        handleCopy={() =>
          copyToClipboard(addStatus, mobileNumber)
        }
        showDelete
        handleDelete={() => {}}
        showEdit
        handleEdit={() => {}}
      />
    )
  },
  {
    label: "Email",
    value: mail || "",
    actions: (
      <Actions
        showCopy={mail ? true : false}
        handleCopy={() =>
          mail
            ? copyToClipboard(addStatus, mail)
            : () => {}
        }
        showDelete
        handleDelete={() => {}}
        showEdit
        handleEdit={() => {}}
      />
    )
  },
  {
    label: "Address",
    value: address || "",
    actions: (
      <Actions
        showCopy={address ? true : false}
        handleCopy={() =>
          address
            ? copyToClipboard(addStatus, address)
            : () => {}
        }
        showDelete
        handleDelete={() => {}}
        showEdit
        handleEdit={() => {}}
      />
    )
  },
  {
    label: "Gender",
    value: gender || "",
    actions: (
      <Actions
        showCopy={gender ? true : false}
        handleCopy={() =>
          gender
            ? copyToClipboard(addStatus, gender)
            : () => {}
        }
        showDelete
        handleDelete={() => {}}
        showEdit
        handleEdit={() => {}}
      />
    )
  },
  {
    label: "Password",
    value: password || "",
    actions: (
      <Actions
        showCopy={password ? true : false}
        handleCopy={() =>
          copyToClipboard(addStatus, password)
        }
        showDelete
        handleDelete={() => {}}
        showEdit
        handleEdit={() => {}}
      />
    )
  },
  {
    label: "No. of Orders",
    value:
      orders && orders.length ? orders.length : 0,
    actions: (
      <Actions
        showCopy={
          orders && orders.length ? true : false
        }
        handleCopy={() =>
          orders
            ? copyToClipboard(
                addStatus,
                String(orders.length)
              )
            : () => {}
        }
        showDelete
        handleDelete={() => {}}
        showEdit
        handleEdit={() => {}}
      />
    )
  },
  {
    label: "Registered on",
    value: moment(createdAt).format(
      "ddd, DD MMM 'YY"
    ),
    actions: (
      <Actions
        showCopy
        handleCopy={() =>
          copyToClipboard(
            addStatus,
            moment(createdAt).format(
              "ddd, DD MMM 'YY"
            )
          )
        }
        showDelete
        handleDelete={() => {}}
        showEdit
        handleEdit={() => {}}
      />
    )
  }
];
