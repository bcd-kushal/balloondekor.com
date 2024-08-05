/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import {
  FormEvent,
  useEffect,
  useState
} from "react";
import { useRouter } from "next/navigation";

// hooks
import {
  ConfigType,
  useFormContext
} from "@/hooks/useFormContext";
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import Input from "@/components/common/form/Input";
import FormActions from "@/components/common/form/FormActions";

// fetchAPIs
import {
  addProduct,
  updateProduct
} from "@/fetchAPIs/cms/product";

import { getServiceCategories } from "@/fetchAPIs/cms/serviceCategory";
import { getOrderProcessingTimes } from "@/fetchAPIs/cms/orderProcessingTime";
import { getDeliveryDetails } from "@/fetchAPIs/cms/deliveryDetail";
import { getCareInfos } from "@/fetchAPIs/cms/careInfo";
import { getColors } from "@/fetchAPIs/cms/color";
import { getCancellationPolicies } from "@/fetchAPIs/cms/cancellationPolicy";
import { getFAQs } from "@/fetchAPIs/cms/faq";
import { getGeneralTags } from "@/fetchAPIs/cms/generalTag";
import { getPackageTags } from "@/fetchAPIs/cms/packageTag";
import { getOccasions } from "@/fetchAPIs/cms/occasion";
import { getRelations } from "@/fetchAPIs/cms/relation";
import { getBrands } from "@/fetchAPIs/cms/brand";
import { getProducts } from "@/fetchAPIs/cms/product";
import { getAddons } from "@/fetchAPIs/cms/addon";
import { getAITags } from "@/fetchAPIs/cms/aiTag";
import { getReviews } from "@/fetchAPIs/cms/review";

import { OptionType } from "@/types/cms/form";
// types
import {
  MetaDocument,
  ProductDocument
} from "@/schemas/cms/product";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";
import { OrderProcessingTimeDocument } from "@/schemas/cms/orderProcessingTime";
import { ColorDocument } from "@/schemas/cms/color";
import { DeliveryDetailDocument } from "@/schemas/cms/deliveryDetail";
import { CareInfoDocument } from "@/schemas/cms/careInfo";
import { CancellationPolicyDocument } from "@/schemas/cms/cancellationPolicy";
import { FAQDocument } from "@/schemas/cms/faq";
import { GeneralTagDocument } from "@/schemas/cms/generalTag";
import { PackageTagDocument } from "@/schemas/cms/packageTag";
import { OccasionDocument } from "@/schemas/cms/occasion";
import { RelationDocument } from "@/schemas/cms/relation";
import { BrandDocument } from "@/schemas/cms/brand";
import { AddonDocument } from "@/schemas/cms/addon";
import { AITagDocument } from "@/schemas/cms/aiTag";
import { ReviewDocument } from "@/schemas/cms/review";
import { ImageDocument } from "@/schemas/cms/image";

import {
  ResponseDataType,
  PaginationResponseDataType
} from "@/types/cms/api";

// styles
import styles from "@/components/cms/product/productForm.module.css";

// FORM CONTROL CONFIGURATION
export function getProductFormConfig({
  productName,
  isCorporate,
  serviceCategoryId,
  baseMrp,
  basePrice,
  orderProcessingID,
  baseColor,
  primary,
  gallery,
  reviewImages,
  video,
  packageIncludes,
  packageExcludes,
  deliveryDetailsID,
  careInfoID,
  cancellationRefundPolicy,
  faq,
  productDetails,
  metaTitle,
  metaTags,
  metaDescription,
  normalTags,
  packageTags,
  occasions,
  relations,
  brand,
  rating,
  totalReviewCount,
  showReviewCount,
  reviewCategory,
  isBestSellers,
  similarPackages,
  aiTagKeyword,
  popularAddon,
  generalAddon
}: Partial<ProductDocument>): ConfigType {
  return {
    productName: {
      isRequired: true,
      type: "text",
      defaultValue: productName || ""
    },
    isCorporate: {
      type: "boolean",
      isRequired: false,
      defaultValue: isCorporate as boolean
    },
    serviceCategoryId: {
      type: "checkbox",
      isRequired: true,
      defaultValue: serviceCategoryId || []
    },
    baseMrp: {
      isRequired: true,
      type: "number",
      defaultValue: baseMrp ? baseMrp : NaN
    },
    basePrice: {
      isRequired: true,
      type: "number",
      defaultValue: basePrice ? basePrice : NaN
    },
    orderProcessingID: {
      isRequired: true,
      type: "dropdown",
      defaultValue: orderProcessingID || ""
    },
    baseColor: {
      type: "checkbox",
      isRequired: false,
      defaultValue: baseColor || []
    },
    primary: {
      type: "selectImage",
      isRequired: true,
      defaultValue: primary
        ? [primary as ImageDocument]
        : []
    },
    gallery: {
      type: "selectImage",
      isRequired: false,
      defaultValue: gallery
        ? (gallery as ImageDocument[])
        : []
    },
    reviewImages: {
      type: "selectImage",
      isRequired: false,
      defaultValue: reviewImages
        ? (reviewImages as ImageDocument[])
        : []
    },
    video: {
      isRequired: false,
      type: "text",
      defaultValue: video || ""
    },
    packageIncludes: {
      isRequired: true,
      type: "text",
      defaultValue: packageIncludes || ""
    },
    packageExcludes: {
      isRequired: true,
      type: "text",
      defaultValue: packageExcludes || ""
    },
    deliveryDetailsID: {
      isRequired: true,
      type: "dropdown",
      defaultValue: deliveryDetailsID || ""
    },
    careInfoID: {
      isRequired: true,
      type: "dropdown",
      defaultValue: careInfoID || ""
    },
    cancellationRefundPolicy: {
      isRequired: true,
      type: "dropdown",
      defaultValue: cancellationRefundPolicy || ""
    },
    faq: {
      isRequired: true,
      type: "dropdown",
      defaultValue: faq || ""
    },
    productDetails: {
      isRequired: false,
      type: "text",
      defaultValue: productDetails || ""
    },
    metaTitle: {
      isRequired: true,
      type: "text",
      defaultValue: metaTitle || ""
    },
    metaTags: {
      isRequired: true,
      type: "text",
      defaultValue: metaTags || ""
    },
    metaDescription: {
      isRequired: true,
      type: "text",
      defaultValue: metaDescription || ""
    },
    normalTags: {
      isRequired: true,
      type: "checkbox",
      defaultValue: normalTags || []
    },
    packageTags: {
      isRequired: true,
      type: "checkbox",
      defaultValue: packageTags || []
    },
    occasions: {
      isRequired: false,
      type: "checkbox",
      defaultValue: occasions || []
    },
    relations: {
      isRequired: false,
      type: "checkbox",
      defaultValue: relations || []
    },
    brand: {
      isRequired: false,
      type: "dropdown",
      defaultValue: brand || ""
    },
    rating: {
      isRequired: true,
      type: "number",
      defaultValue: rating ? rating : NaN
    },
    totalReviewCount: {
      isRequired: true,
      type: "number",
      defaultValue: totalReviewCount
        ? totalReviewCount
        : NaN
    },
    showReviewCount: {
      isRequired: true,
      type: "number",
      defaultValue: showReviewCount
        ? showReviewCount
        : NaN
    },
    reviewCategory: {
      isRequired: true,
      type: "dropdown",
      defaultValue: reviewCategory || ""
    },

    // isBestSellers: {
    //   type: "checkbox",
    //   isRequired: false,
    //   defaultValue:
    //     [...(isBestSellers ? ["true"] : [])] || []
    // },
    isBestSellers: {
      type: "boolean",
      isRequired: false,
      defaultValue: isBestSellers as boolean
    },
    similarPackages: {
      isRequired: false,
      type: "checkbox",
      defaultValue: similarPackages || []
    },
    aiTagKeyword: {
      isRequired: false,
      type: "checkbox",
      defaultValue: aiTagKeyword || []
    },
    popularAddon: {
      isRequired: true,
      type: "checkbox",
      defaultValue: popularAddon || []
    },
    generalAddon: {
      isRequired: true,
      type: "checkbox",
      defaultValue: generalAddon || []
    }
  };
}

export default function ProductForm({
  productId
}: {
  productId?: string;
}) {
  // hooks
  const { push } = useRouter();

  const {
    defaultValue,
    resetValue,
    onReset,
    value,
    setValue,
    hasSubmitted,
    error,
    onSubmit
  } = useFormContext();

  const { addStatus } = useStatusContext();
  const [
    serviceCategoriesOptions,
    setServiceCategoriesOptions
  ] = useState<OptionType[]>([]);

  const [
    orderProcessingTimeOptions,
    setOrderProcessingTimeOptions
  ] = useState<OptionType[]>([]);

  const [baseColorOptions, setBaseColorOptions] =
    useState<OptionType[]>([]);

  const [
    deliveryDetailsOptions,
    setDeliveryDetailsOptions
  ] = useState<OptionType[]>([]);

  const [careInfosOptions, setCareInfosOptions] =
    useState<OptionType[]>([]);

  const [
    cancellationRefundPoliciesOptions,
    setCancellationRefundPoliciesOptions
  ] = useState<OptionType[]>([]);

  const [faqsOptions, setFaqsOptions] = useState<
    OptionType[]
  >([]);

  const [
    normalTagsOptions,
    setNormalTagsOptions
  ] = useState<OptionType[]>([]);

  const [
    packageTagsOptions,
    setPackageTagsOptions
  ] = useState<OptionType[]>([]);

  const [occasionsOptions, setOccasionsOptions] =
    useState<OptionType[]>([]);

  const [relationsOptions, setRelationsOptions] =
    useState<OptionType[]>([]);

  const [brandOptions, setBrandOptions] =
    useState<OptionType[]>([]);

  const [
    similarPackagesOptions,
    setSimilarPackagesOptions
  ] = useState<OptionType[]>([]);

  const [
    aiTagKeywordOptions,
    setAiTagKeywordOptions
  ] = useState<OptionType[]>([]);

  const [
    popularAddonOptions,
    setPopularAddonOptions
  ] = useState<OptionType[]>([]);

  const [
    generalAddonOptions,
    setGeneralAddonOptions
  ] = useState<OptionType[]>([]);

  const [
    reviewCategoryOptions,
    setReviewCategoryOptions
  ] = useState<OptionType[]>([]);

  // handlers
  const handleSubmit = (
    data: Partial<ProductDocument>
  ): void => {
    const transformedData = {
      ...data,
      base: {
        mrp: data.baseMrp,
        price: data.baseMrp
      },
      meta: {
        metaTitle: data.metaTitle,
        metaTags: data.metaTags,
        metaDescription: data.metaDescription
      },
      mediaType: {
        primary:
          // @ts-ignore
          (data.primary as ImageDocument[])[0] ||
          undefined,
        gallery:
          // @ts-ignore
          (data.gallery as ImageDocument[]) ||
          undefined,
        video: data.video,
        reviewImages:
          // @ts-ignore
          (data.reviewImages as ImagesDocument[]) ||
          undefined
      },
      quality: {
        rating: data.rating,
        totalReviewCount: data.totalReviewCount,
        showReviewCount: data.showReviewCount,
        reviewCategory: data.reviewCategory
      }
    } as Partial<ProductDocument>;

    if (productId) {
      updateProduct(productId, transformedData)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/product");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    } else {
      addProduct(transformedData)
        .then(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
            push("/cms/product");
          }
        )
        .catch(
          (responseData: ResponseDataType) => {
            addStatus(responseData.status);
          }
        );
    }
  };

  const handleGetServiceCategoriesOptions =
    () => {
      getServiceCategories({
        offset: 0,
        limit: 100000,
        sortBy: "",
        orderBy: "",
        filterBy: "",
        keyword: "",
        fromDate: "",
        toDate: ""
      })
        .then(
          (
            responseData: PaginationResponseDataType
          ) => {
            setServiceCategoriesOptions(
              (
                responseData.data as ServiceCategoryDocument[]
              ).map(({ _id, name }) => ({
                label: name,
                value: _id
              }))
            );
          }
        )
        .catch(
          (
            responseData: PaginationResponseDataType
          ) => {
            addStatus(responseData.status);
          }
        );
    };

  const handleGetOrderProcessingTimeOptions =
    () => {
      getOrderProcessingTimes({
        offset: 0,
        limit: 100000,
        sortBy: "label",
        orderBy: "",
        filterBy: "",
        keyword: "",
        fromDate: "",
        toDate: ""
      })
        .then(
          (
            responseData: PaginationResponseDataType
          ) => {
            setOrderProcessingTimeOptions(
              (
                responseData.data as OrderProcessingTimeDocument[]
              ).map(({ _id, label }) => ({
                label: label,
                value: _id
              }))
            );
          }
        )
        .catch(
          (
            responseData: PaginationResponseDataType
          ) => {
            addStatus(responseData.status);
          }
        );
    };

  const handleGetBaseColorOptions = () => {
    getColors({
      offset: 0,
      limit: 100000,
      sortBy: "",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setBaseColorOptions(
            (
              responseData.data as ColorDocument[]
            ).map(({ _id, name }) => ({
              label: name,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleGetDeliveryDetailsOptions = () => {
    getDeliveryDetails({
      offset: 0,
      limit: 100000,
      sortBy: "label",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setDeliveryDetailsOptions(
            (
              responseData.data as DeliveryDetailDocument[]
            ).map(({ _id, label }) => ({
              label: label,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleGetCareInfosOptions = () => {
    getCareInfos({
      offset: 0,
      limit: 100000,
      sortBy: "label",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setCareInfosOptions(
            (
              responseData.data as CareInfoDocument[]
            ).map(({ _id, label }) => ({
              label: label,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleGetCancellationRefundPoliciesOptions =
    () => {
      getCancellationPolicies({
        offset: 0,
        limit: 100000,
        sortBy: "label",
        orderBy: "",
        filterBy: "",
        keyword: "",
        fromDate: "",
        toDate: ""
      })
        .then(
          (
            responseData: PaginationResponseDataType
          ) => {
            setCancellationRefundPoliciesOptions(
              (
                responseData.data as CancellationPolicyDocument[]
              ).map(({ _id, label }) => ({
                label: label,
                value: _id
              }))
            );
          }
        )
        .catch(
          (
            responseData: PaginationResponseDataType
          ) => {
            addStatus(responseData.status);
          }
        );
    };

  const handleFaqs = () => {
    getFAQs({
      offset: 0,
      limit: 100000,
      sortBy: "category",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setFaqsOptions(
            (
              responseData.data as FAQDocument[]
            ).map(({ _id, category }) => ({
              label: category,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleNormalTags = () => {
    getGeneralTags({
      offset: 0,
      limit: 100000,
      sortBy: "label",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setNormalTagsOptions(
            (
              responseData.data as GeneralTagDocument[]
            ).map(({ _id, name }) => ({
              label: name,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handlePackageTags = () => {
    getPackageTags({
      offset: 0,
      limit: 100000,
      sortBy: "name",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setPackageTagsOptions(
            (
              responseData.data as PackageTagDocument[]
            ).map(({ _id, name }) => ({
              label: name,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleOccasionsTags = () => {
    getOccasions({
      offset: 0,
      limit: 100000,
      sortBy: "name",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setOccasionsOptions(
            (
              responseData.data as OccasionDocument[]
            ).map(({ _id, name }) => ({
              label: name,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleRelationsTags = () => {
    getRelations({
      offset: 0,
      limit: 100000,
      sortBy: "name",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setRelationsOptions(
            (
              responseData.data as RelationDocument[]
            ).map(({ _id, name }) => ({
              label: name,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleBrandTags = () => {
    getBrands({
      offset: 0,
      limit: 100000,
      sortBy: "name",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setBrandOptions(
            (
              responseData.data as BrandDocument[]
            ).map(({ _id, name }) => ({
              label: name,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleSimilarPackages = () => {
    getProducts({
      offset: 0,
      limit: 100000,
      sortBy: "productName",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setSimilarPackagesOptions(
            (
              responseData.data as ProductDocument[]
            ).map(({ _id, productName }) => ({
              label: productName,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleAiTagKeyword = () => {
    getAITags({
      offset: 0,
      limit: 100000,
      sortBy: "label",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setAiTagKeywordOptions(
            (
              responseData.data as AITagDocument[]
            ).map(({ _id, label }) => ({
              label: label,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handlePopularAddons = () => {
    getAddons({
      offset: 0,
      limit: 100000,
      sortBy: "name",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setPopularAddonOptions(
            (
              responseData.data as AddonDocument[]
            ).map(({ _id, name }) => ({
              label: name,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleGeneralAddon = () => {
    getAddons({
      offset: 0,
      limit: 100000,
      sortBy: "name",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setGeneralAddonOptions(
            (
              responseData.data as AddonDocument[]
            ).map(({ _id, name }) => ({
              label: name,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  const handleReviewCategory = () => {
    getReviews({
      offset: 0,
      limit: 100000,
      sortBy: "reviewCategory",
      orderBy: "",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setReviewCategoryOptions(
            (
              responseData.data as ReviewDocument[]
            ).map(({ _id, reviewCategory }) => ({
              label: reviewCategory,
              value: _id
            }))
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          addStatus(responseData.status);
        }
      );
  };

  useEffect(() => {
    //console.log(value["isBestSellers"]);
  }, [value["isBestSellers"]]);
  useEffect(() => {
    //console.log(value["isCorporate"]);
  }, [value["isCorporate"]]);

  useEffect(() => {
    handleGetServiceCategoriesOptions();
    handleGetOrderProcessingTimeOptions();
    handleGetDeliveryDetailsOptions();
    handleGetBaseColorOptions();
    handleGetCareInfosOptions();
    handleGetCancellationRefundPoliciesOptions();
    handleFaqs();
    handleNormalTags();
    handlePackageTags();
    handleOccasionsTags();
    handleRelationsTags();
    handleBrandTags();
    handleSimilarPackages();
    handleAiTagKeyword();
    handlePopularAddons();
    handleGeneralAddon();
    handleReviewCategory();
  }, []);

  return (
    <form
      className={`pl-[8px]`}
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) =>
        onSubmit(e, (data: any) => {
          handleSubmit(data);
        })
      }
    >
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Product Name"
          name="productName"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["productName"]}
          errorMessage={
            error["productName"]
              ? "Product Name is required"
              : " "
          }
          variant="text"
          defaultValue={
            defaultValue["productName"] as string
          }
          resetValue={resetValue["productName"]}
          setValue={setValue["productName"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Is Corporate"
          name="isCorporate"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["isCorporate"]}
          errorMessage={
            error["isCorporate"]
              ? "Is Corporate is required"
              : " "
          }
          variant="boolean"
          defaultValue={
            defaultValue["isCorporate"] as boolean
          }
          setValue={setValue["isCorporate"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="service Category"
          name="serviceCategoryId"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["serviceCategoryId"]}
          errorMessage={
            "serviceCategoryId is required"
          }
          variant="advance-checkbox"
          defaultValues={
            defaultValue[
              "serviceCategoryId"
            ] as string[]
          }
          options={serviceCategoriesOptions}
          setValues={
            setValue["serviceCategoryId"]
          }
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Base Mrp"
          name="baseMrp"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["baseMrp"]}
          errorMessage={"Base Mrp is required"}
          variant="number"
          defaultValue={
            defaultValue["baseMrp"] as number
          }
          resetValue={resetValue["baseMrp"]}
          setValue={setValue["baseMrp"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Base Price"
          name="basePrice"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["basePrice"]}
          errorMessage={"Base Price is required"}
          variant="number"
          defaultValue={
            defaultValue["basePrice"] as number
          }
          resetValue={resetValue["basePrice"]}
          setValue={setValue["basePrice"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Order Processing"
          name="orderProcessingID"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["orderProcessingID"]}
          errorMessage={
            error["orderProcessingID"]
              ? "Order Processing is required"
              : " "
          }
          variant="dropdown"
          options={orderProcessingTimeOptions}
          defaultValue={
            defaultValue[
              "orderProcessingID"
            ] as string
          }
          resetValue={
            resetValue["orderProcessingID"]
          }
          setValue={setValue["orderProcessingID"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="base Color"
          name="baseColor"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["baseColor"]}
          errorMessage={"baseColor is required"}
          variant="advance-checkbox"
          defaultValues={
            defaultValue["baseColor"] as string[]
          }
          options={baseColorOptions}
          setValues={setValue["baseColor"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Video"
          name="video"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["video"]}
          errorMessage={"Video is required"}
          variant="longText"
          defaultValue={
            defaultValue["video"] as string
          }
          resetValue={resetValue["video"]}
          setValue={setValue["video"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="primary"
          name="primary"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["primary"]}
          errorMessage={"primary is required"}
          variant="selectImage"
          defaultValue={
            defaultValue[
              "primary"
            ] as ImageDocument[]
          }
          resetValue={resetValue["primary"]}
          setValue={setValue["primary"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="gallery"
          name="gallery"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["gallery"]}
          errorMessage={"gallery is required"}
          variant="selectImage"
          defaultValue={
            defaultValue[
              "gallery"
            ] as ImageDocument[]
          }
          resetValue={resetValue["gallery"]}
          setValue={setValue["gallery"]}
          multiple
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Review Images"
          name="reviewImages"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["reviewImages"]}
          errorMessage={
            "Review Images is required"
          }
          variant="selectImage"
          defaultValue={
            defaultValue[
              "reviewImages"
            ] as ImageDocument[]
          }
          resetValue={resetValue["reviewImages"]}
          setValue={setValue["reviewImages"]}
          multiple
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Package Includes"
          name="packageIncludes"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["packageIncludes"]}
          errorMessage={
            error["packageIncludes"]
              ? "Package Includes is required"
              : " "
          }
          variant="longText"
          defaultValue={
            defaultValue[
              "packageIncludes"
            ] as string
          }
          resetValue={
            resetValue["packageIncludes"]
          }
          setValue={setValue["packageIncludes"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Package Excludes"
          name="packageExcludes"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["packageExcludes"]}
          errorMessage={
            error["packageExcludes"]
              ? "Package Excludes is required"
              : " "
          }
          variant="longText"
          defaultValue={
            defaultValue[
              "packageExcludes"
            ] as string
          }
          resetValue={
            resetValue["packageExcludes"]
          }
          setValue={setValue["packageExcludes"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Delivery Details"
          name="deliveryDetailsID"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["deliveryDetailsID"]}
          errorMessage={
            error["deliveryDetailsID"]
              ? "Delivery Details is required"
              : " "
          }
          variant="dropdown"
          options={deliveryDetailsOptions}
          defaultValue={
            defaultValue[
              "deliveryDetailsID"
            ] as string
          }
          resetValue={
            resetValue["deliveryDetailsID"]
          }
          setValue={setValue["deliveryDetailsID"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Care Info"
          name="careInfoID"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["careInfoID"]}
          errorMessage={
            error["careInfoID"]
              ? "Care Info is required"
              : " "
          }
          variant="dropdown"
          options={careInfosOptions}
          defaultValue={
            defaultValue["careInfoID"] as string
          }
          resetValue={resetValue["careInfoID"]}
          setValue={setValue["careInfoID"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Cancellation Refund Policy"
          name="cancellationRefundPolicy"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={
            error["cancellationRefundPolicy"]
          }
          errorMessage={
            error["cancellationRefundPolicy"]
              ? "Cancellation Refund Policy is required"
              : " "
          }
          variant="dropdown"
          options={
            cancellationRefundPoliciesOptions
          }
          defaultValue={
            defaultValue[
              "cancellationRefundPolicy"
            ] as string
          }
          resetValue={
            resetValue["cancellationRefundPolicy"]
          }
          setValue={
            setValue["cancellationRefundPolicy"]
          }
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="FAQ"
          name="faq"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["faq"]}
          errorMessage={
            error["faq"] ? "FAQ is required" : " "
          }
          variant="dropdown"
          options={faqsOptions}
          defaultValue={
            defaultValue["faq"] as string
          }
          resetValue={resetValue["faq"]}
          setValue={setValue["faq"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Product Details"
          name="productDetails"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["productDetails"]}
          errorMessage={
            error["productDetails"]
              ? "Product Details is required"
              : " "
          }
          variant="richText"
          defaultValue={
            defaultValue[
              "productDetails"
            ] as string
          }
          resetValue={
            resetValue["productDetails"]
          }
          setValue={setValue["productDetails"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="meta title"
          name="metaTitle"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["metaTitle"]}
          errorMessage={"metaTitle is required"}
          variant="longText"
          defaultValue={
            defaultValue["metaTitle"] as string
          }
          resetValue={resetValue["metaTitle"]}
          setValue={setValue["metaTitle"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="meta tags"
          name="metaTags"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["metaTags"]}
          errorMessage={"metaTags is required"}
          variant="longText"
          defaultValue={
            defaultValue["metaTags"] as string
          }
          resetValue={resetValue["metaTags"]}
          setValue={setValue["metaTags"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="meta description"
          name="metaDescription"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["metaDescription"]}
          errorMessage={
            "metaDescription is required"
          }
          variant="longText"
          defaultValue={
            defaultValue[
              "metaDescription"
            ] as string
          }
          resetValue={
            resetValue["metaDescription"]
          }
          setValue={setValue["metaDescription"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Normal Tags"
          name="normalTags"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["normalTags"]}
          errorMessage={"Normal Tags is required"}
          variant="advance-checkbox"
          defaultValues={
            defaultValue["normalTags"] as string[]
          }
          options={normalTagsOptions}
          setValues={setValue["normalTags"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Package Tags"
          name="packageTags"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["packageTags"]}
          errorMessage={
            "Package Tags is required"
          }
          variant="advance-checkbox"
          defaultValues={
            defaultValue[
              "packageTags"
            ] as string[]
          }
          options={packageTagsOptions}
          setValues={setValue["packageTags"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Occasions"
          name="occasions"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["occasions"]}
          errorMessage={"Occasions is required"}
          variant="advance-checkbox"
          defaultValues={
            defaultValue["occasions"] as string[]
          }
          options={occasionsOptions}
          setValues={setValue["occasions"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Relations"
          name="relations"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["relations"]}
          errorMessage={"Relations is required"}
          variant="advance-checkbox"
          defaultValues={
            defaultValue["relations"] as string[]
          }
          options={relationsOptions}
          setValues={setValue["relations"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Brand"
          name="brand"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["brand"]}
          errorMessage={
            error["brand"]
              ? "Brand is required"
              : " "
          }
          variant="dropdown"
          options={brandOptions}
          defaultValue={
            defaultValue["brand"] as string
          }
          resetValue={resetValue["brand"]}
          setValue={setValue["brand"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Rating"
          name="rating"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["rating"]}
          errorMessage={"Rating is required"}
          variant="number"
          defaultValue={
            defaultValue["rating"] as number
          }
          decimal
          resetValue={resetValue["rating"]}
          setValue={setValue["rating"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Total Review Count"
          name="totalReviewCount"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["totalReviewCount"]}
          errorMessage={
            "Total Review Count is required"
          }
          variant="number"
          defaultValue={
            defaultValue[
              "totalReviewCount"
            ] as number
          }
          resetValue={
            resetValue["totalReviewCount"]
          }
          setValue={setValue["totalReviewCount"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Show Review Count"
          name="showReviewCount"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["showReviewCount"]}
          errorMessage={
            "Show Review Count is required"
          }
          variant="number"
          defaultValue={
            defaultValue[
              "showReviewCount"
            ] as number
          }
          resetValue={
            resetValue["showReviewCount"]
          }
          setValue={setValue["showReviewCount"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="reviewCategory"
          name="reviewCategory"
          isRequired={true}
          hasSubmitted={hasSubmitted}
          showError={error["reviewCategory"]}
          errorMessage={
            error["reviewCategory"]
              ? "reviewCategory is required"
              : " "
          }
          variant="dropdown"
          options={reviewCategoryOptions}
          defaultValue={
            defaultValue[
              "reviewCategory"
            ] as string
          }
          resetValue={
            resetValue["reviewCategory"]
          }
          setValue={setValue["reviewCategory"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Is Best Sellers"
          name="isBestSellers"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["isBestSellers"]}
          errorMessage={
            error["isBestSellers"]
              ? "Is Best Sellers is required"
              : " "
          }
          variant="boolean"
          defaultValue={
            defaultValue[
              "isBestSellers"
            ] as boolean
          }
          setValue={setValue["isBestSellers"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Similar Packages"
          name="similarPackages"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["similarPackages"]}
          errorMessage={
            "Similar Packages is required"
          }
          variant="advance-checkbox"
          defaultValues={
            defaultValue[
              "similarPackages"
            ] as string[]
          }
          options={similarPackagesOptions}
          setValues={setValue["similarPackages"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Ai Tag Keyword"
          name="aiTagKeyword"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["aiTagKeyword"]}
          errorMessage={
            "Ai Ta gKeyword is required"
          }
          variant="advance-checkbox"
          defaultValues={
            defaultValue[
              "aiTagKeyword"
            ] as string[]
          }
          options={aiTagKeywordOptions}
          setValues={setValue["aiTagKeyword"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="Popular Addon"
          name="popularAddon"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["popularAddon"]}
          errorMessage={
            "Popular Addon is required"
          }
          variant="advance-checkbox"
          defaultValues={
            defaultValue[
              "popularAddon"
            ] as string[]
          }
          options={popularAddonOptions}
          setValues={setValue["popularAddon"]}
        />
      </div>
      <div
        className={`flex flex-col items-stretch justify-start gap-5`}
      >
        <Input
          title="General Addon"
          name="generalAddon"
          isRequired={false}
          hasSubmitted={hasSubmitted}
          showError={error["generalAddon"]}
          errorMessage={
            "General Addon is required"
          }
          variant="advance-checkbox"
          defaultValues={
            defaultValue[
              "generalAddon"
            ] as string[]
          }
          options={generalAddonOptions}
          setValues={setValue["generalAddon"]}
        />
      </div>
      <div className={styles.actionsContainer}>
        <section className={styles.actions}>
          <FormActions
            submitBtnLabel={
              productId ? "update" : "add"
            }
            variant="page"
            closeBtnLink="/cms/product"
          />
        </section>
      </div>
    </form>
  );
}
