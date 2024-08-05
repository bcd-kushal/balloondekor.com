import {
  CrossSVG,
  PlusSVG
} from "@/constants/svgs/svg";
import {
  EditAddonType,
  HandleDeletionType,
  HandleQuantityType,
  SelectedAddonType
} from "../../../static/types";
import Image from "next/image";

export default function SelectedAddons({
  list,
  serviceId,
  relatedDate,
  setQuantity,
  handleDelete,
  handleAddMoreAddons
}: {
  list: SelectedAddonType[];
  serviceId: string;
  relatedDate: string;
  setQuantity: HandleQuantityType["addon"];
  handleDelete: HandleDeletionType["addon"];
  handleAddMoreAddons: EditAddonType;
}) {
  return (
    <>
      <section className="mt-6 border-t-[1.5px] border-black/30 w-full flex flex-col items-stretch justify-start gap-2 pt-4 ">
        <span className="mt-3 mb-1 sm:my-0 w-full flex items-center justify-between">
          <span className="font-normal text-[16px]">
            Selected addons ({list.length})
          </span>
          <span
            className="text-[15px] text-pink-800 cursor-pointer flex items-center justify-end gap-[6px]"
            onClick={() =>
              handleAddMoreAddons(
                serviceId,
                relatedDate,
                list
              )
            }
          >
            <PlusSVG />
            {list.length > 0
              ? "Add more"
              : "Add addons"}
          </span>
        </span>
        {list.length > 0 ? (
          <div className="w-full flex -mt-2 items-center justify-start gap-8 sm:gap-5 scrollbar-hide overflow-x-scroll pb-4 pt-7 sm:py-4 pl-3 *:rounded-xl *:p-4 *:flex *:flex-col *:items-stretch *:justify-start *:transition-all *:duration-300">
            {list.map(
              (
                {
                  label,
                  image,
                  price,
                  amount,
                  id
                },
                index
              ) => (
                <SelectedAddon
                  id={id}
                  amount={amount}
                  image={image}
                  label={label}
                  price={price}
                  key={index}
                  serviceId={serviceId}
                  serviceDate={relatedDate}
                  setQuantity={setQuantity}
                  handleDelete={handleDelete}
                />
              )
            )}
          </div>
        ) : (
          <></>
        )}
      </section>
    </>
  );
}

const SelectedAddon = ({
  label,
  amount,
  price,
  image,
  id: addonId,
  serviceId,
  serviceDate,
  setQuantity,
  handleDelete
}: SelectedAddonType & {
  serviceId: string;
  serviceDate: string;
  setQuantity: HandleQuantityType["addon"];
  handleDelete: HandleDeletionType["addon"];
}) => {
  return (
    <div
      className="relative group w-[117.6px] sm:w-[127.6px]"
      style={{
        boxShadow: "0 0 5px 5px #12121218"
      }}
    >
      <span
        className="rounded-full sm:opacity-0 group-hover:opacity-100 transition-all duration-150 bg-red-500 text-white grid place-items-center aspect-square w-[24px] cursor-pointer -right-[8px] -top-[8px] absolute"
        onClick={() =>
          handleDelete(
            serviceId,
            serviceDate,
            addonId
          )
        }
      >
        <CrossSVG />
      </span>
      <span className="aspect-square overflow-hidden w-[100px] sm:w-[110px] object-cover grid place-items-center rounded-xl">
        <Image
          src={image.url}
          alt={image.alt}
          width={110}
          height={110}
          unoptimized
          priority
        />
      </span>
      <span className="text-[15px] sm:text-[17px] mt-2 truncate">
        {label}
      </span>
      <span>₹ {price * amount}</span>
      <div className="w-full flex items-center justify-between mt-3  ">
        <span
          className="aspect-square w-[28px] grid place-items-center rounded-lg bg-[#12121299] transition-all duration-150 hover:bg-[#121212] text-white cursor-pointer"
          onClick={() =>
            setQuantity(
              serviceId,
              serviceDate,
              addonId,
              Math.max(1, amount - 1)
            )
          }
        >
          -
        </span>
        <span>{amount}</span>
        <span
          className="aspect-square w-[28px] grid place-items-center rounded-lg bg-[#12121299] transition-all duration-150 hover:bg-[#121212] text-white cursor-pointer"
          onClick={() =>
            setQuantity(
              serviceId,
              serviceDate,
              addonId,
              amount + 1
            )
          }
        >
          +
        </span>
      </div>
    </div>
  );
};
