import { CustomerDocument } from "@/schemas/cms/customer";
import {
  CheckoutFormDataType,
  CheckoutFormFieldType,
  FormValidtyType
} from "../../../static/types";
import { SetStateAction, useEffect } from "react";
import { VenueDocument } from "@/schemas/services/venue";
import { OccasionDocument } from "@/schemas/cms/occasion";
import { CheckoutInfoDocument } from "@/schemas/cms/checkoutInfo";

export default function CheckoutFormField({
  formData,
  validations,
  venues,
  occasions,
  currentCity,
  customerInfo,
  initialContextData,
  setFormData
}: {
  formData: CheckoutFormDataType;
  validations: FormValidtyType["distinct"];
  venues: VenueDocument[];
  occasions: OccasionDocument[];
  currentCity: string | null;
  customerInfo: Partial<CustomerDocument> | null;
  setFormData: React.Dispatch<
    SetStateAction<CheckoutFormDataType>
  >;
  initialContextData: Partial<CheckoutInfoDocument> | null;
}) {
  const updateFormData = ({
    attr,
    val
  }: {
    attr: keyof CheckoutFormDataType;
    val: any;
  }) => {
    if (attr === "address")
      setFormData((prev) => ({
        ...prev,
        address: val
      }));
    else if (attr === "alternateMobile")
      setFormData((prev) => ({
        ...prev,
        alternateMobile: val
      }));
    else if (attr === "city")
      setFormData((prev) => ({
        ...prev,
        city: val
      }));
    else if (attr === "email")
      setFormData((prev) => ({
        ...prev,
        email: val
      }));
    else if (attr === "landmark")
      setFormData((prev) => ({
        ...prev,
        landmark: val
      }));
    else if (attr === "mobile")
      setFormData((prev) => ({
        ...prev,
        mobile: val
      }));
    else if (attr === "name")
      setFormData((prev) => ({
        ...prev,
        name: val
      }));
    else if (attr === "occasion")
      setFormData((prev) => ({
        ...prev,
        occasion: val
      }));
    else if (attr === "pincode")
      setFormData((prev) => ({
        ...prev,
        pincode: val
      }));
    else if (attr === "venue")
      setFormData((prev) => ({
        ...prev,
        venue: val
      }));
  };

  const isValid = (
    str: string | undefined | null
  ) =>
    str !== undefined &&
    str !== null &&
    str.length > 0;

  const CheckoutFormFields: CheckoutFormFieldType[] =
    [
      {
        title: "Name",
        variant: "text",
        required: true,
        name: "name",
        defaultValue: isValid(customerInfo?.name)
          ? customerInfo?.name || ""
          : formData.name,
        value: formData.name,
        setValue: (val) =>
          updateFormData({
            attr: "name",
            val: val
          }),
        className: "text-[18px] *:text-[16px]",
        hasError: formData.name.length
          ? !validations.validName
          : undefined
      },
      {
        title: "Email",
        variant: "text",
        required: true,
        name: "email",
        value: formData.email,
        defaultValue: isValid(
          initialContextData?.mail
        )
          ? initialContextData?.mail || ""
          : formData.email,
        setValue: (val) =>
          updateFormData({
            attr: "email",
            val: val
          }),
        className: "text-[18px] *:text-[16px]",
        hasError: formData.email.length
          ? !validations.validEmail
          : undefined
      },
      {
        title: "Address",
        variant: "longText",
        required: true,
        name: "address",
        value: formData.address,
        setValue: (val) =>
          updateFormData({
            attr: "address",
            val: val
          }),
        defaultValue: isValid(
          initialContextData?.address
        )
          ? initialContextData?.address || ""
          : formData.address,
        className: "text-[18px] *:text-[16px]",
        hasError: formData.address.length
          ? !validations.validAddress
          : undefined
      },
      {
        title: "Landmark (if any)",
        variant: "text",
        required: false,
        name: "landmark",
        value: formData.landmark,
        defaultValue: "",
        setValue: (val) =>
          updateFormData({
            attr: "landmark",
            val: val
          }),
        className: "text-[18px] *:text-[16px]"
      },
      {
        title: "Pincode",
        variant: "text",
        required: true,
        name: "pincode",
        value: formData.pincode,
        defaultValue: isValid(
          String(initialContextData?.pinCode)
        )
          ? String(initialContextData?.pinCode) ||
            ""
          : formData.pincode,
        setValue: (val) =>
          updateFormData({
            attr: "pincode",
            val: val
              .replace(/\D/g, "")
              .substring(0, 6)
          }),
        className: "text-[18px] *:text-[16px]",
        hasError: formData.pincode.length
          ? !validations.validName
          : undefined
      },
      {
        title: "City",
        variant: "text",
        required: true,
        name: "city",
        value: formData.city,
        defaultValue:
          currentCity !== null ? currentCity : "",
        disabled: true,
        setValue: (val) =>
          updateFormData({
            attr: "city",
            val: val
          }),
        className: "text-[18px] *:text-[16px]",
        hasError: formData.city.length
          ? !validations.validCity
          : undefined
      },
      {
        title: "Occasion",
        variant: "dropdown",
        required: false,
        name: "occasion",
        defaultOptionValue: JSON.stringify({
          name: "",
          _id: ""
        } as OccasionDocument),
        value: JSON.stringify(formData.occasion),
        defaultValue: initialContextData?.occasion
          ? JSON.stringify(
              initialContextData?.occasion as OccasionDocument
            )
          : JSON.stringify({
              _id: "",
              name: ""
            } as OccasionDocument),
        setValue: (val) =>
          updateFormData({
            attr: "occasion",
            val: JSON.parse(val)
          }),
        className: "text-[18px] *:text-[16px]",
        dropdownOptionPlaceholder:
          "Select occasion",
        options: occasions.map((occasion) => ({
          label: occasion.name,
          value: JSON.stringify(occasion),
          id: occasion._id
        }))
      },
      {
        title: "Decoration Venue",
        variant: "dropdown",
        required: false,
        name: "venue",
        defaultOptionValue: JSON.stringify({
          venue: "",
          _id: ""
        } as VenueDocument),
        value: JSON.stringify(formData.venue),
        defaultValue: initialContextData?.venue
          ? JSON.stringify(
              initialContextData?.venue as VenueDocument
            )
          : JSON.stringify({
              _id: "",
              venue: ""
            } as VenueDocument),
        setValue: (val) =>
          updateFormData({
            attr: "venue",
            val: JSON.parse(val)
          }),
        className: "text-[18px] *:text-[16px]",
        dropdownOptionPlaceholder:
          "Select decoration venue",
        options: venues.map((venue) => ({
          label: venue.venue,
          value: JSON.stringify(venue),
          id: venue._id
        }))
      },
      {
        title: "Mobile",
        variant: "text",
        required: true,
        name: "mobile",
        value: formData.mobile,
        defaultValue: isValid(
          String(initialContextData?.mobileNumber)
        )
          ? String(
              initialContextData?.mobileNumber
            ) || ""
          : formData.mobile,
        setValue: (val) =>
          updateFormData({
            attr: "mobile",
            val: val
              .replace(/\D/g, "")
              .substring(0, 10)
          }),
        className: "text-[18px] *:text-[16px]"
      },
      {
        title: "Alternative mobile (if any)",
        variant: "text",
        required: false,
        name: "altMobile",
        value: formData.alternateMobile,
        setValue: (val) =>
          updateFormData({
            attr: "alternateMobile",
            val: val
              .replace(/\D/g, "")
              .substring(0, 10)
          }),
        className: "text-[18px] *:text-[16px]"
      }
    ];

  return (
    <div className="sm:w-[60%] min-[1199px]:w-[720px] pb-10 sm:pb-[40px] sm:pl-[10px] min-[1199px]:pl-0 flex flex-col items-stretch justify-start gap-4 sm:pr-12 pt-8 px-[14px] ">
      {/* title */}
      <span className="capitalize text-[22px] py-2">
        User details
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12 sm:gap-y-10">
        {CheckoutFormFields.map(
          (field, index) => (
            <div
              key={index}
              className={`flex flex-col justify-start gap-3 ${field.variant === "longText" ? "sm:col-span-2" : ""}`}
            >
              {/* title --------------------------- */}
              <label
                htmlFor={field.title}
                className="text-[15px] text-gray-600 pl-2 sm:pl-0"
              >
                {field.title}{" "}
                <span
                  className={
                    field.required
                      ? "text-red-500"
                      : "hidden"
                  }
                >
                  *
                </span>
              </label>

              {/* input ----------------------------- */}
              {field.variant === "longText" ? (
                <textarea
                  name={field.name}
                  title={field.title}
                  required={field.required}
                  value={field.value}
                  /* defaultValue={
                    field.defaultValue
                  } */
                  onChange={(e) => {
                    field.setValue(
                      e.target.value
                    );
                  }}
                  draggable="false"
                  className={` text-slate-800 rounded-[14px] py-5 px-7 min-h-[90px] max-h-[150px] scrollbar-hide overflow-y-scroll transition-all duration-300 border-[1.5px] border-zinc-200 sm:border-transparent hover:border-blue-200 outline-none focus:border-blue-400 focus:outline-none   ${field.className}`}
                  style={{
                    boxShadow:
                      "0 0 16px 4px #12121210"
                  }}
                ></textarea>
              ) : field.variant === "dropdown" ? (
                <div
                  className={`group appearence-none text-slate-800 rounded-[14px] py-5 px-7 relative cursor-pointer border-[1.5px] border-zinc-200 sm:border-transparent transition-all duration-300 hover:border-blue-200 outline-none focus-within:border-blue-400 focus:outline-none   ${field.className}`}
                  style={{
                    boxShadow:
                      "0 0 16px 4px #12121210"
                  }}
                >
                  <select
                    name={field.name}
                    required={field.required}
                    title={field.title}
                    value={field.value}
                    onChange={(e) => {
                      field.setValue(
                        e.target.value
                      );
                    }}
                    className={`group-hover:cursor-pointer appearence-none w-full bg-transparent transition-all duration-300 outline-none ${field.className}`}
                  >
                    <option
                      value={
                        field.defaultOptionValue
                      }
                      disabled
                    >
                      {
                        field.dropdownOptionPlaceholder
                      }
                    </option>
                    {field.options.map(
                      (
                        { label, value },
                        index2
                      ) => (
                        <option
                          value={value}
                          key={index2}
                        >
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </div>
              ) : (
                <input
                  type={field.variant}
                  name={field.name}
                  title={field.title}
                  required={field.required}
                  value={field.value}
                  /* defaultValue={
                    field.defaultValue
                  } */
                  disabled={
                    field.disabled
                      ? field.disabled
                      : false
                  }
                  onChange={(e) => {
                    field.setValue(
                      e.target.value
                    );
                  }}
                  className={` text-slate-800 rounded-[14px] py-5 px-7 transition-all duration-300 border-[1.5px] outline-none focus:outline-none   ${field.className} ${field.hasError ? `border-red-300 hover:border-red-400 focus:bg-[#aa000008]` : "border-zinc-200 sm:border-transparent hover:border-blue-200 focus:border-blue-400"}`}
                  style={{
                    boxShadow:
                      "0 0 16px 4px #12121210"
                  }}
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
