import Input from "@/components/common/form/Input";
import { PresetSVG } from "@/constants/svgs/svg";
import { useStatusContext } from "@/hooks/useStatusContext";
import {
  CouponDiscountDocument,
  CouponDocument
} from "@/schemas/cms/coupon";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { useRouter } from "next/navigation";
import {
  SetStateAction,
  useEffect,
  useState
} from "react";
import { allFieldsComplete } from "../helpers/allFieldsComplete";
import { getCleanCouponData } from "../helpers/getCleanCouponData";
import {
  addCoupon,
  updateCoupon
} from "@/fetchAPIs/cms/coupon";
import { ResponseDataType } from "@/types/cms/api";

export type CouponFormDataType = {
  code: string;
  minAmount: number;
  maxAvailability: number;
  applicableCategories: string[];
} & (
  | { type: "free-delivery" }
  | ({
      type: "discount";
      description: string;
    } & (
      | {
          variant: "flat";
          flatAmount: number;
        }
      | {
          variant: "percentage";
          percentage: number;
          maxDiscount: number;
        }
    ))
);

export default function CouponForm({
  coupon,
  couponId,
  categories,
  setCoupon
}: {
  coupon: CouponDocument;
  couponId: string | undefined;
  categories: ServiceCategoryDocument[];
  setCoupon: React.Dispatch<
    SetStateAction<CouponDocument>
  >;
}) {
  const { addStatus } = useStatusContext();

  const [couponType, setCouponType] = useState<
    "discount" | "free-delivery"
  >("free-delivery");

  const [couponVariant, setCouponVariant] =
    useState<"flat" | "percentage" | null>(null);

  const [categoryOptions, setCategoryOptions] =
    useState<{ label: string; value: string }[]>(
      categories.map(({ name, _id }) => ({
        label: name,
        value: _id
      }))
    );

  const [amounts, setAmounts] = useState<{
    flatAmount: number;
    percentage: number;
    maxDiscount: number;
  }>({
    flatAmount: couponId
      ? coupon.type === "free-delivery"
        ? 0
        : (
              coupon.discount as CouponDiscountDocument
            ).type === "fixed"
          ? (
              coupon.discount as CouponDiscountDocument
            ).amount || 0
          : 0
      : 0,
    maxDiscount: couponId
      ? coupon.type === "free-delivery"
        ? 0
        : (
              coupon.discount as CouponDiscountDocument
            ).type === "fixed"
          ? 0
          : (
              coupon.discount as CouponDiscountDocument
            ).amount || 0
      : 0,
    percentage: couponId
      ? coupon.type === "free-delivery"
        ? 0
        : (
              coupon.discount as CouponDiscountDocument
            ).type === "fixed"
          ? 0
          : (
              coupon.discount as CouponDiscountDocument
            ).percentage || 0
      : 0
  });

  // -----------------------

  const [couponData, setCouponData] =
    useState<CouponFormDataType>({
      applicableCategories: couponId
        ? (
            coupon.applicableCategories as ServiceCategoryDocument[]
          ).map(({ _id }) => _id)
        : [],
      code: "",
      maxAvailability: 1,
      type: "free-delivery",
      minAmount: 0
    });

  const [couponDesc, setCouponDesc] =
    useState<string>(
      couponId ? coupon.description || "" : ""
    );

  const router = useRouter();

  const handleFormCompletion = () => {
    if (!allFieldsComplete(couponData)) {
      addStatus([
        {
          message: "All fields are not filled up",
          type: "error"
        }
      ]);
      return;
    }

    const cleanCouponData: CouponDocument =
      getCleanCouponData(couponData);

    if (couponId) {
      updateCoupon(
        couponId,
        cleanCouponData
      ).then((resData: ResponseDataType) => {
        addStatus(resData.status);
      });

      router.push("/cms/presets/coupons");
      return;
    }

    addCoupon(cleanCouponData).then(
      (resData: ResponseDataType) => {
        addStatus(resData.status);
      }
    );
    router.push("/cms/presets/coupons");
  };

  useEffect(() => {
    if (couponType === "free-delivery")
      setCouponVariant((prev) => null);
    setCouponData((prev) => {
      if (couponType === "free-delivery") {
        const newData: CouponFormDataType = {
          code: prev.code,
          maxAvailability: prev.maxAvailability,
          minAmount: prev.minAmount,
          applicableCategories:
            prev.applicableCategories,
          type: "free-delivery"
        };

        return newData;
      }

      const newData: CouponFormDataType = {
        code: prev.code,
        maxAvailability: prev.maxAvailability,
        minAmount: prev.minAmount,
        applicableCategories:
          prev.applicableCategories,
        type: "discount",
        description:
          prev.type === "discount"
            ? prev.description
            : "",
        variant: "flat",
        flatAmount: 0
      };

      return newData;
    });
  }, [couponType]);

  useEffect(() => {
    setCouponData((prev) => {
      if (prev.type === "free-delivery")
        return prev;
      if (prev.variant === couponVariant)
        return prev;

      if (couponVariant === "flat") {
        const newData: CouponFormDataType = {
          code: prev.code,
          maxAvailability: prev.maxAvailability,
          minAmount: prev.minAmount,
          applicableCategories:
            prev.applicableCategories,
          type: "discount",
          description: prev.description,
          variant: "flat",
          flatAmount: amounts.flatAmount
        };
        return newData;
      }

      if (couponVariant === "percentage") {
        const newData: CouponFormDataType = {
          code: prev.code,
          maxAvailability: prev.maxAvailability,
          minAmount: prev.minAmount,
          applicableCategories:
            prev.applicableCategories,
          type: "discount",
          description: prev.description,
          variant: "percentage",
          maxDiscount: amounts.maxDiscount,
          percentage: amounts.percentage
        };
        return newData;
      }

      return prev;
    });
  }, [couponVariant, amounts]);

  useEffect(() => {
    setCategoryOptions((prev) =>
      categories.map(({ name, _id }) => ({
        label: name,
        value: _id
      }))
    );
  }, [categories]);

  // update coupon data form state
  useEffect(
    () =>
      setCouponData((prev) => ({
        ...prev,
        description:
          couponDesc && couponDesc.length
            ? couponDesc
            : ""
      })),
    [couponDesc]
  );

  return (
    <div className="pl-[8px] flex flex-col justify-start items-stretch gap-[20px] pb-[40px]">
      {/* COUPON CODE AND MINIMUM ORDER AMOUNT ========================== */}
      <div className="grid grid-cols-2 gap-[20px]">
        <Input
          variant="text"
          errorMessage=""
          defaultValue={
            couponId ? coupon.code : ""
          }
          hasSubmitted={false}
          isRequired
          name="couponCode"
          setValue={(val: string) => {
            setCouponData((prev) => ({
              ...prev,
              code:
                val && val.length ? val || "" : ""
            }));
          }}
          showError={false}
          title="Coupon Code"
          className="text-[17px] translate-y-[1.5px]"
        />

        <Input
          variant="number"
          errorMessage=""
          hasSubmitted={false}
          isRequired
          name="minAmount"
          placeholder="Default is 0"
          defaultValue={
            couponId
              ? coupon.minimumOrderAmount
              : 0
          }
          setValue={(val: number) => {
            setCouponData((prev) => ({
              ...prev,
              minAmount: val || 0
            }));
          }}
          showError={false}
          title="Minimum Required Amount"
          className="text-[17px]"
        />
      </div>

      {/* COUPON TYPE =============================================== */}
      <div className="rounded-2xl flex flex-col justify-start text-[16px] overflow-hidden border-[1px] border-zinc-300">
        {/* header ............................. */}
        <div className="bg-slate-200 px-[12px] py-[4px] flex items-center justify-start gap-[12px]">
          <span>Coupon Type:</span>
          <Input
            variant="dropdown"
            errorMessage=""
            defaultValue={
              couponId ? coupon.type : ""
            }
            hasSubmitted={false}
            isRequired
            name="couponType"
            setValue={(val: string | number) => {
              setCouponType((prev) =>
                String(val) !== ""
                  ? (String(val) as
                      | "discount"
                      | "free-delivery")
                  : prev
              );
            }}
            showError={false}
            title=""
            className="text-[17px]"
            options={[
              {
                label: "Free Delivery",
                value: "free-delivery"
              },
              {
                label: "Discount",
                value: "discount"
              }
            ]}
          />
          {couponType === "discount" ? (
            <>
              <span>and Variant:</span>
              <Input
                variant="dropdown"
                errorMessage=""
                defaultValue={
                  couponId
                    ? coupon.type ===
                      "free-delivery"
                      ? ""
                      : coupon.discount?.type ===
                          "fixed"
                        ? "flat"
                        : "percentage"
                    : ""
                }
                hasSubmitted={false}
                isRequired
                name="couponVariant"
                setValue={(
                  val: string | number
                ) => {
                  setCouponVariant((prev) =>
                    String(val) !== ""
                      ? (String(val) as
                          | "flat"
                          | "percentage")
                      : prev
                  );
                }}
                showError={false}
                title=""
                className="text-[17px]"
                options={[
                  {
                    label: "Flat",
                    value: "flat"
                  },
                  {
                    label: "Percentage",
                    value: "percentage"
                  }
                ]}
              />
            </>
          ) : (
            <></>
          )}
        </div>

        {couponType === "discount" ? (
          /* according to choice input fields ........................ */

          <div className="px-[12px] py-[14px] grid grid-cols-2 justify-start gap-[10px]">
            <div className="flex flex-col justify-start gap-[14px] border-r-[1.5px] border-zinc-400 pr-[10px]">
              {couponVariant === "flat" ? (
                <Input
                  variant="number"
                  errorMessage=""
                  hasSubmitted={false}
                  isRequired
                  name="flatAmount"
                  defaultValue={
                    amounts.flatAmount
                  }
                  setValue={(val: number) => {
                    setAmounts((prev) => ({
                      ...prev,
                      flatAmount: val || 0
                    }));
                    setCouponData((prev) => {
                      if (
                        prev.type ===
                          "discount" &&
                        prev.variant === "flat"
                      )
                        return {
                          ...prev,
                          flatAmount: val || 0
                        };
                      return prev;
                    });
                  }}
                  showError={false}
                  title="Flat Discount Amount"
                  className="text-[17px]"
                />
              ) : couponVariant ===
                "percentage" ? (
                <>
                  <Input
                    variant="number"
                    errorMessage=""
                    hasSubmitted={false}
                    isRequired
                    name="percentage"
                    defaultValue={
                      couponId
                        ? coupon.type ===
                          "free-delivery"
                          ? amounts.percentage
                          : (
                                coupon.discount as CouponDiscountDocument
                              ).type === "fixed"
                            ? amounts.percentage
                            : (
                                coupon.discount as CouponDiscountDocument
                              ).percentage ||
                              amounts.percentage
                        : amounts.percentage
                    }
                    setValue={(val: number) => {
                      setAmounts((prev) => ({
                        ...prev,
                        percentage: val || 0
                      }));
                      setCouponData((prev) => {
                        if (
                          prev.type ===
                            "discount" &&
                          prev.variant ===
                            "percentage"
                        )
                          return {
                            ...prev,
                            percentage: val || 0
                          };
                        return prev;
                      });
                    }}
                    showError={false}
                    title="Percentage (out of 100)"
                    className="text-[17px]"
                  />
                  <Input
                    variant="number"
                    errorMessage=""
                    hasSubmitted={false}
                    isRequired
                    name="maxDiscount"
                    defaultValue={
                      couponId
                        ? (
                            coupon.discount as CouponDiscountDocument
                          ).amount
                        : amounts.maxDiscount
                    }
                    setValue={(val: number) => {
                      setAmounts((prev) => ({
                        ...prev,
                        maxDiscount: val || 0
                      }));
                      setCouponData((prev) => {
                        if (
                          prev.type ===
                            "discount" &&
                          prev.variant ===
                            "percentage"
                        )
                          return {
                            ...prev,
                            maxDiscount: val || 0
                          };
                        return prev;
                      });
                    }}
                    showError={false}
                    title="Maximum Discount Applicable"
                    className="text-[17px]"
                  />
                </>
              ) : (
                <div className=" h-full flex flex-col items-center justify-center gap-[10px]">
                  <PresetSVG dimensions={24} />
                  <span>
                    {" "}
                    Select Variant to proceed
                  </span>
                </div>
              )}
            </div>
            <Input
              variant="longText"
              errorMessage=""
              defaultValue={couponDesc}
              hasSubmitted={false}
              isRequired={false}
              name="couponDesc"
              setValue={(val: string) =>
                setCouponDesc((prev) => val || "")
              }
              showError={false}
              title="Description"
              className="text-[17px]"
              isList
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* APPLICABLE CATEGORIES & MAX AVAILABILITY ========================== */}
      <div className="grid grid-cols-2 gap-[20px]">
        <Input
          variant="number"
          errorMessage=""
          defaultValue={
            couponId ? coupon.limitPerCustomer : 1
          }
          hasSubmitted={false}
          isRequired
          name="maxAvailability"
          placeholder="Default is 1"
          setValue={(val: number) => {
            setCouponData((prev) => ({
              ...prev,
              maxAvailability: val || 0
            }));
          }}
          showError={false}
          title="Max Availability Per Customer"
          className="text-[17px]"
        />

        <div></div>
      </div>

      <Input
        variant="advance-checkbox"
        errorMessage=""
        hasSubmitted={false}
        isRequired
        name="applicableCategories"
        showError={false}
        title="Applicable Categories"
        className="text-[17px]"
        setValues={(values: string[]) => {
          setCouponData((prev) => ({
            ...prev,
            applicableCategories: values
          }));
        }}
        defaultValues={
          couponData.applicableCategories
        }
        options={categoryOptions}
      />

      <div className="flex items-center justify-end gap-[12px] px-[8px]">
        <div
          onClick={() => router.back}
          className="py-[7px] px-[16px] rounded-xl font-medium text-[16px] border-[1.5px] border-slate-800 transition-colors duration-300 hover:bg-slate-100 cursor-pointer"
        >
          Cancel
        </div>
        <div
          onClick={handleFormCompletion}
          className="py-[7px] px-[16px] rounded-xl font-medium text-[16px] text-white border-[1.5px] border-black bg-black transition-colors duration-300 hover:bg-tab-primary hover:border-[#0075fe] cursor-pointer"
        >
          {couponId ? "Update" : "Create"}
        </div>
      </div>
    </div>
  );
}
