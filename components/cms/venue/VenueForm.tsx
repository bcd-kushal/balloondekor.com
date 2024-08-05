import Input from "@/components/common/form/Input";
import { DOMAIN } from "@/constants/frontend/apiRoute";
import {
  addVenue,
  updateVenue
} from "@/fetchAPIs/cms/venue";
import { useStatusContext } from "@/hooks/useStatusContext";
import { VenueDocument } from "@/schemas/services/venue";
import { ResponseDataType } from "@/types/cms/api";
import { StatusType } from "@/types/cms/common";
import {
  redirect,
  useRouter
} from "next/navigation";

export default function VenueForm({
  id,
  data
}: {
  id: string;
  data: VenueDocument;
}) {
  const router = useRouter();
  const { addStatus } = useStatusContext();

  const handleFormSubmit = (
    formData: FormData
  ) => {
    const newVenueName = formData.get(
      "venueName"
    ) as string;

    // update existing data ==========================================
    if (id) {
      updateVenue(id, newVenueName)
        .then((response: ResponseDataType) => {
          addStatus(response.status);
          router.replace(
            `${DOMAIN}/cms/presets/venues`
          );
        })
        .catch((err: ResponseDataType) => {
          addStatus(err.status as StatusType[]);
        });
    } else {
      // add new data ==========================================
      addVenue(newVenueName)
        .then((response: ResponseDataType) => {
          addStatus(response.status);
          router.replace(
            `${DOMAIN}/cms/presets/venues`
          );
        })
        .catch((err: ResponseDataType) => {
          addStatus(err.status as StatusType[]);
        });
    }
  };

  return (
    <form
      action={handleFormSubmit}
      className="px-[8px]"
    >
      <Input
        variant="text"
        defaultValue={
          data && data.venue ? data.venue : ""
        }
        title="Venue name"
        errorMessage=""
        hasSubmitted={false}
        isRequired={true}
        name="venueName"
        setValue={() => {}}
        showError={false}
      />
      <div className="w-full flex items-center justify-end mt-[16px] pb-[40px] gap-7">
        <div
          onClick={router.back}
          className="text-[14px] py-3 px-5 rounded-lg border-[1.5px] border-black/50 transition-all duration-300 hover:border-black/95 cursor-pointer"
        >
          Cancel
        </div>
        <input
          type="submit"
          value="Submit"
          className="text-[14px] py-3 px-5 rounded-lg transition-all duration-300 text-white bg-[#121212] cursor-pointer"
        />
      </div>
    </form>
  );
}
