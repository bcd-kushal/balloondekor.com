/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// hooks
import { useStatusContext } from "@/hooks/useStatusContext";

// components
import BannerEditor from "./layout/form/BannerEditor";
import CircleEditor from "./layout/form/CircleEditor";
import CollageEditor from "./layout/form/CollageEditor";
import FAQEditor from "./layout/form/FAQEditor";
import QuickLinkEditor from "./layout/form/QuickLinkEditor";
import SquareMEditor from "./layout/form/SquareMEditor";
import SquareLEditor from "./layout/form/SquareLEditor";
import TextEditor from "./layout/form/TextEditor";
import TilesEditor from "./layout/form/TilesEditor";
import SelectLayout from "./layout/SelectLayout";

// fetchAPIs
import { getHomepageLayout } from "@/fetchAPIs/cms/homepage";

// types
import { HomepageLayoutDocument } from "@/schemas/cms/homepage";
import { ResponseDataType } from "@/types/cms/api";

// styles
import styles from "@/components/cms/homepage/homepageLayoutForm.module.css";
import HomepageLayoutEditorWrapper from "./layout/form/wrapper/HomepageLayoutEditorWrapper";
import CircleForm, {
  getCircleFormConfig
} from "./layout/form/CircleForm";
import BannerForm, {
  getBannerFormConfig
} from "./layout/form/BannerForm";
import SquareMForm, {
  getSquareMFormConfig
} from "./layout/form/SquareMForm";
import SquareLForm, {
  getSquareLFormConfig
} from "./layout/form/SquareLForm";
import TilesForm, {
  getTilesFormConfig
} from "./layout/form/TilesForm";
import CollageForm, {
  getCollageFormConfig
} from "./layout/form/CollageForm";
import TextForm, {
  getTextFormConfig
} from "./layout/form/TextForm";
import FAQForm, {
  getFAQFormConfig
} from "./layout/form/FAQForm";
import QuickLinkForm, {
  getQuickLinkFormConfig
} from "./layout/form/QuickLinkForm";

export default function HomepageLayoutForm({
  id
}: {
  id?: string;
}) {
  // hooks
  const { addStatus } = useStatusContext();

  // states
  const [layout, setLayout] =
    useState<HomepageLayoutDocument>(
      {} as HomepageLayoutDocument
    );
  const [layoutType, setLayoutType] = useState<
    | ""
    | "banner"
    | "circle"
    | "square-m"
    | "square-l"
    | "tiles"
    | "collage"
    | "text"
    | "faq"
    | "quick-link"
  >("");

  const handleGetHomepageLayout = (
    layoutId: string
  ) => {
    getHomepageLayout(layoutId)
      .then((responseData: ResponseDataType) => {
        setLayout(
          responseData.data as HomepageLayoutDocument
        );
        setLayoutType(
          (
            responseData.data as HomepageLayoutDocument
          ).layout
        );
      })
      .catch((responseData: ResponseDataType) => {
        addStatus(responseData.status);
      });
  };

  /* if id is passed then retrieve current homepage layout -------------- */
  useEffect(() => {
    if (id) {
      handleGetHomepageLayout(id);
    }
  }, []);

  switch (layoutType) {
    case "banner":
      return (
        <HomepageLayoutEditorWrapper
          title="Banner"
          getFormConfig={() =>
            getBannerFormConfig(layout)
          }
        >
          <BannerForm id={layout._id} />
        </HomepageLayoutEditorWrapper>
      );

    case "circle":
      return (
        <HomepageLayoutEditorWrapper
          title="Circle"
          getFormConfig={() =>
            getCircleFormConfig(layout)
          }
        >
          <CircleForm id={layout._id} />
        </HomepageLayoutEditorWrapper>
      );

    case "square-m":
      return (
        <HomepageLayoutEditorWrapper
          title="Square (Medium)"
          getFormConfig={() =>
            getSquareMFormConfig(layout)
          }
        >
          <SquareMForm id={layout._id} />
        </HomepageLayoutEditorWrapper>
      );

    case "square-l":
      return (
        <HomepageLayoutEditorWrapper
          title="Square (Large)"
          getFormConfig={() =>
            getSquareLFormConfig(layout)
          }
        >
          <SquareLForm id={layout._id} />
        </HomepageLayoutEditorWrapper>
      );

    case "tiles":
      return (
        <HomepageLayoutEditorWrapper
          title="Tiles"
          getFormConfig={() =>
            getTilesFormConfig(layout)
          }
        >
          <TilesForm id={layout._id} />
        </HomepageLayoutEditorWrapper>
      );

    case "collage":
      return (
        <HomepageLayoutEditorWrapper
          title="Collage"
          getFormConfig={() =>
            getCollageFormConfig(layout)
          }
        >
          <CollageForm id={layout._id} />
        </HomepageLayoutEditorWrapper>
      );

    case "text":
      return (
        <HomepageLayoutEditorWrapper
          title="Text"
          getFormConfig={() =>
            getTextFormConfig(layout)
          }
        >
          <TextForm id={layout._id} />
        </HomepageLayoutEditorWrapper>
      );

    case "faq":
      return (
        <HomepageLayoutEditorWrapper
          title="FAQ"
          getFormConfig={() =>
            getFAQFormConfig(layout)
          }
        >
          <FAQForm id={layout._id} />
        </HomepageLayoutEditorWrapper>
      );

    case "quick-link":
      return (
        <HomepageLayoutEditorWrapper
          title="Quick Link"
          getFormConfig={() =>
            getQuickLinkFormConfig(layout)
          }
        >
          <QuickLinkForm id={layout._id} />
        </HomepageLayoutEditorWrapper>
      );

    default:
      return id ? (
        <div>Loading</div>
      ) : (
        <SelectLayout onSelect={setLayoutType} />
      );
  }
}
