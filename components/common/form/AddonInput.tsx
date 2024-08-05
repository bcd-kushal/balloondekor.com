/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

// components
import AddonEditor from "./AddonEditor";
import Button from "../Button";
import Backdrop from "../Backdrop";
import Input from "./Input";

// fetch APIs
import { getAddons } from "@/fetchAPIs/cms/addon";

// types
import { AddonDocument } from "@/schemas/cms/addon";
import { AddonCategoryDocument } from "@/schemas/cms/addonCategory";
import { OptionType } from "@/types/cms/form";
import { PaginationResponseDataType } from "@/types/cms/api";
import { SelectedAddonDocument } from "@/schemas/cms/service";

// styles
import styles from "@/components/common/form/addonInput.module.css";
import AddonSVG from "@/public/icons/addon.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function AddonInput({
  title,
  isRequired,
  defaultValue,
  setValue
}: {
  title: string;
  isRequired: boolean;
  defaultValue?: SelectedAddonDocument[];
  setValue: (
    selectedAddons: SelectedAddonDocument[]
  ) => void;
}) {
  const [selectedAddons, setSelectedAddons] =
    useState<SelectedAddonDocument[]>(
      defaultValue ? defaultValue : []
    );

  const [showModal, setShowModal] =
    useState<boolean>(false);

  const [addons, setAddons] = useState<
    AddonDocument[]
  >([]);
  const [
    addonCategoryOptions,
    setAddonCategoryOptions
  ] = useState<OptionType[]>([]);
  const [
    addonSearchResults,
    setAddonSearchResults
  ] = useState<SelectedAddonDocument[]>([]);

  const [isAllSelected, setIsAllSelected] =
    useState<boolean>(false);

  const [filter, setFilter] =
    useState<string>("");
  const [category, setCategory] =
    useState<string>("");
  const [keyword, setKeyword] =
    useState<string>("");
  // const [showSelectAll, setShowSelectAll] =
  //   useState<boolean | undefined>(undefined);

  const [resetFilter, setResetFilter] =
    useState<boolean>(false);
  const [resetCategory, setResetCategory] =
    useState<boolean>(false);
  const [resetKeyword, setResetKeyword] =
    useState<boolean>(false);

  const handleGetAddons = () => {
    getAddons({
      populate: true,
      active: true,
      offset: 0,
      limit: 0,
      sortBy: "name",
      orderBy: "asc",
      filterBy: "",
      keyword: "",
      fromDate: "",
      toDate: ""
    })
      .then(
        (
          responseData: PaginationResponseDataType
        ) => {
          setAddons(
            responseData.data as AddonDocument[]
          );
        }
      )
      .catch(
        (
          responseData: PaginationResponseDataType
        ) => {
          console.log(responseData.status);
        }
      );
  };

  const handleGetAddonCategoryOptions = () => {
    const addonCategoriesSet = new Set(
      addons.map(
        ({ category }) =>
          (category as AddonCategoryDocument).name
      )
    );

    const addonCategories = Array.from(
      addonCategoriesSet
    ).sort();

    setAddonCategoryOptions([
      { label: "all", value: "all" },
      ...addonCategories.map((addonCategory) => ({
        label: addonCategory,
        value: addonCategory
      }))
    ]);
  };

  const handleSearchAddons = () => {
    setAddonSearchResults(
      addons
        .filter(
          ({
            _id,
            category: addonCategory,
            name
          }) => {
            if (category && category !== "all") {
              if (
                (
                  addonCategory as AddonCategoryDocument
                ).name.toLowerCase() !==
                category.toLowerCase()
              ) {
                return false;
              }
            }

            if (filter) {
              switch (filter) {
                case "popular":
                  if (
                    selectedAddons.filter(
                      ({ addon }) =>
                        (addon as AddonDocument)
                          ._id === _id
                    ).length
                  ) {
                    if (
                      !selectedAddons.filter(
                        ({ addon }) =>
                          (addon as AddonDocument)
                            ._id === _id
                      )[0].isPopular
                    ) {
                      return false;
                    }
                  } else {
                    return false;
                  }

                case "selected":
                  if (
                    !selectedAddons.filter(
                      ({ addon }) =>
                        (addon as AddonDocument)
                          ._id === _id
                    ).length
                  ) {
                    return false;
                  }

                  break;

                case "not selected":
                  if (
                    selectedAddons.filter(
                      ({ addon }) =>
                        (addon as AddonDocument)
                          ._id === _id
                    ).length
                  ) {
                    return false;
                  }

                  break;

                default:
                  break;
              }
            }

            return name
              .toLowerCase()
              .includes(keyword.toLowerCase());
          }
        )
        // .slice(0, 24)
        .map(
          (addon) =>
            ({
              _id: uuid(),
              addon,
              isPopular:
                selectedAddons.filter(
                  ({ addon: selectedAddon }) =>
                    (
                      selectedAddon as AddonDocument
                    )._id === addon._id
                )[0]?.isPopular || false
            }) as SelectedAddonDocument
        )
    );
  };

  const handleCheckAllSelected = () => {
    setIsAllSelected(
      addonSearchResults.length ===
        addonSearchResults.filter(({ addon }) =>
          selectedAddons.find(
            ({ addon: selectedAddon }) =>
              (addon as AddonDocument)._id ===
              (selectedAddon as AddonDocument)._id
          )
        ).length
    );
  };

  const handleSelectAll = () => {
    setSelectedAddons((prevSelectedAddons) => [
      ...prevSelectedAddons,
      ...addonSearchResults.filter(
        ({ addon }) =>
          !prevSelectedAddons.find(
            ({ addon: prevSelectedAddon }) =>
              (addon as AddonDocument)._id ===
              (prevSelectedAddon as AddonDocument)
                ._id
          )
      )
    ]);
  };

  // const handleDeselectAll = () => {
  //   setSelectedAddons((prevSelectedAddons) => [
  //     ...prevSelectedAddons.filter(
  //       ({ _id }) =>
  //         !addonSearchResults.find(
  //           ({ _id: searchedAddonId }) =>
  //             _id === searchedAddonId
  //         )
  //     )
  //   ]);
  // };

  const handleDeselectAll = () => {
    setSelectedAddons((prevSelectedAddons) => [
      ...prevSelectedAddons.filter(
        ({ addon }) =>
          !addonSearchResults.find(
            ({ addon: searchedAddon }) =>
              (addon as AddonDocument)._id ===
              (searchedAddon as AddonDocument)._id
          )
      )
    ]);
  };

  const handleReset = () => {
    setResetFilter(true);
    setResetCategory(true);
    setResetKeyword(true);
  };

  useEffect(() => {
    handleGetAddons();
  }, []);

  useEffect(() => {
    handleSearchAddons();
  }, [filter, category, keyword]);

  useEffect(() => {
    setResetKeyword(true);
  }, [category]);

  useEffect(() => {
    handleGetAddonCategoryOptions();
    handleSearchAddons();
  }, [addons]);

  useEffect(() => {
    if (resetFilter) {
      setResetFilter(false);
    }
  }, [resetFilter]);

  useEffect(() => {
    if (resetCategory) {
      setResetCategory(false);
    }
  }, [resetCategory]);

  useEffect(() => {
    if (resetKeyword) {
      setResetKeyword(false);
    }
  }, [resetKeyword]);

  useEffect(() => {
    setValue(
      selectedAddons.map(
        ({ _id, addon, isPopular }) =>
          ({
            ...(mongoose.Types.ObjectId.isValid(
              _id
            )
              ? { _id }
              : {}),
            addon,
            isPopular
          }) as SelectedAddonDocument
      )
    );
  }, [selectedAddons]);

  useEffect(() => {
    handleCheckAllSelected();
  }, [addonSearchResults, selectedAddons]);

  return (
    <div
      className={`flex flex-col items-stretch justify-start gap-2 w-full`}
    >
      <legend
        className={`flex gap-1 items-center justify-between w-full text-[16px] font-medium capitalize`}
      >
        <span className="flex items-center justify-start gap-1">
          <span>{title}</span>
          {isRequired && (
            <span className={`text-red-500`}>
              *
            </span>
          )}
        </span>
        <Dialog>
          <DialogTrigger
            asChild
            className="w-fit"
          >
            <div className="bg-black text-white py-2 px-6 text-[14px] flex items-center justify-end gap-1 rounded-lg cursor-pointer">
              + &nbsp; Select addon
            </div>
          </DialogTrigger>
          <DialogContent className="min-w-fit ">
            <div className="px-1 pt-5 min-w-[90dvw]">
              <section className={styles.header}>
                <div className={styles.heading}>
                  select addons
                </div>
              </section>
              <section
                className={`mt-4 grid grid-cols-[1fr_2fr_2fr_4fr_1fr] w-full items-end justify-between gap-4`}
              >
                <div
                  className={`text-zinc-900 rounded-xl text-center py-[10px] px-[12px] text-[15px] -translate-y-3 cursor-pointer transition-all duration-300 border-[1.5px] ${isAllSelected === undefined || !isAllSelected ? " border-zinc-500 hover:border-black/80 hover:bg-zinc-100" : "bg-zinc-200 border-transparent"}`}
                  onClick={
                    isAllSelected
                      ? handleDeselectAll
                      : handleSelectAll
                  }
                >
                  {isAllSelected
                    ? "Deselect All"
                    : "Select All"}
                </div>
                <Input
                  title="filter"
                  name="filter"
                  isRequired={false}
                  hasSubmitted={false}
                  showError={false}
                  errorMessage=""
                  variant="dropdown"
                  defaultValue="all"
                  options={[
                    {
                      label: "all",
                      value: "all"
                    },
                    {
                      label: "popular",
                      value: "popular"
                    },
                    {
                      label: "selected",
                      value: "selected"
                    },
                    {
                      label: "not selected",
                      value: "not selected"
                    }
                  ]}
                  resetValue={resetFilter}
                  setValue={(val) => {
                    setFilter(val as string);
                  }}
                />
                <Input
                  title="addon categories"
                  name="categories"
                  isRequired={false}
                  hasSubmitted={false}
                  showError={false}
                  errorMessage=""
                  variant="dropdown"
                  defaultValue="all"
                  options={addonCategoryOptions}
                  resetValue={resetCategory}
                  setValue={(val) => {
                    setCategory(val as string);
                  }}
                />
                <span className="translate-y-[-8px]">
                  <Input
                    title="search"
                    name="search"
                    placeholder="search"
                    isRequired={false}
                    hasSubmitted={false}
                    showError={false}
                    errorMessage=""
                    variant="text"
                    defaultValue=""
                    resetValue={resetKeyword}
                    setValue={setKeyword}
                  />
                </span>
                <span className="translate-y-[-8px] ">
                  <div
                    onClick={handleReset}
                    className="bg-zinc-500 flex items-center justify-center gap-[6px] py-4 px-4 rounded-xl cursor-pointer w-full transition-all duration-300 text-center text-white hover:bg-zinc-900 text-[14px]"
                  >
                    <ReloadIcon strokeWidth={4} />
                    Reset
                  </div>
                </span>
              </section>
              <section
                className={`max-h-[60dvh] h-[60dvh] overflow-y-scroll scrollbar-hide`}
              >
                {addonSearchResults.length ? (
                  <div
                    className={`grid grid-cols-7 gap-5 items-stretch justify-start`}
                  >
                    {addonSearchResults.map(
                      (addon) => (
                        <AddonEditor
                          key={addon._id}
                          addon={addon}
                          isSelected={
                            selectedAddons.filter(
                              ({
                                addon:
                                  selectedAddon
                              }) => {
                                return (
                                  (
                                    selectedAddon as AddonDocument
                                  )._id ===
                                  (
                                    addon.addon as AddonDocument
                                  )._id
                                );
                              }
                            ).length === 1
                          }
                          isPopular={
                            selectedAddons.filter(
                              ({
                                addon:
                                  selectedAddon
                              }) => {
                                return (
                                  (
                                    selectedAddon as AddonDocument
                                  )._id ===
                                  (
                                    addon.addon as AddonDocument
                                  )._id
                                );
                              }
                            )[0]?.isPopular ||
                            false
                          }
                          toggleSelect={() => {
                            setSelectedAddons(
                              (
                                prevSelectedAddons
                              ) => {
                                if (
                                  prevSelectedAddons.filter(
                                    ({
                                      addon:
                                        prevSelectedAddon
                                    }) =>
                                      (
                                        prevSelectedAddon as AddonDocument
                                      )._id ===
                                      (
                                        addon.addon as AddonDocument
                                      )._id
                                  ).length
                                ) {
                                  return prevSelectedAddons.filter(
                                    ({
                                      addon:
                                        prevSelectedAddon
                                    }) =>
                                      (
                                        prevSelectedAddon as AddonDocument
                                      )._id !==
                                      (
                                        addon.addon as AddonDocument
                                      )._id
                                  );
                                } else {
                                  return [
                                    ...prevSelectedAddons,
                                    addon
                                  ];
                                }
                              }
                            );
                          }}
                          togglePopular={() => {
                            setSelectedAddons(
                              (
                                prevSelectedAddons
                              ) =>
                                prevSelectedAddons.map(
                                  (prevAddon) => {
                                    if (
                                      (
                                        prevAddon.addon as AddonDocument
                                      )._id ===
                                      (
                                        addon.addon as AddonDocument
                                      )._id
                                    ) {
                                      return {
                                        ...prevAddon,
                                        isPopular:
                                          !prevAddon.isPopular
                                      } as SelectedAddonDocument;
                                    }

                                    return prevAddon;
                                  }
                                )
                            );
                          }}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[16px] font-semibold capitalize">
                    no addon
                  </div>
                )}
              </section>
              <section
                className={`pt-4 ${styles.actionsSection}`}
              >
                <DialogClose>
                  <Button
                    type="primary"
                    label="done"
                    variant="normal"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  />
                </DialogClose>
              </section>
            </div>
          </DialogContent>
        </Dialog>
      </legend>
      <div
        className={`border-[1.5px] border-black/30 p-5 rounded-2xl`}
      >
        <section
          className={` max-h-[400px] overflow-y-scroll scrollbar-hide ${selectedAddons.length && !showModal ? "grid grid-cols-6 justify-start gap-5" : ""}`}
        >
          {selectedAddons.length && !showModal ? (
            selectedAddons.map(
              (selectedAddon) => (
                <AddonEditor
                  key={selectedAddon._id}
                  addon={selectedAddon}
                  isSelected={true}
                  isPopular={
                    selectedAddon.isPopular
                  }
                  toggleSelect={() => {
                    setSelectedAddons(
                      (prevSelectedAddons) =>
                        prevSelectedAddons.filter(
                          ({ _id }) =>
                            _id !==
                            selectedAddon._id
                        )
                    );
                  }}
                  togglePopular={() => {
                    setSelectedAddons(
                      (prevSelectedAddons) =>
                        prevSelectedAddons.map(
                          (prevSelectedAddon) => {
                            if (
                              prevSelectedAddon._id ===
                              selectedAddon._id
                            ) {
                              const newSelectedAddon =
                                {
                                  ...prevSelectedAddon,
                                  isPopular:
                                    !prevSelectedAddon.isPopular
                                } as SelectedAddonDocument;

                              return newSelectedAddon;
                            }

                            return prevSelectedAddon;
                          }
                        )
                    );
                  }}
                />
              )
            )
          ) : (
            <div
              className={styles.noResultContainer}
            >
              <span className={styles.noResult}>
                <Image
                  src={AddonSVG.src}
                  width={30}
                  height={30}
                  alt="AddonIcon"
                />
                no addon selected
              </span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
