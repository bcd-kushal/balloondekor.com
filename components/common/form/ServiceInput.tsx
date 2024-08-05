/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// components
import AddonEditor from "./AddonEditor";
import Button from "../Button";
import Backdrop from "../Backdrop";
import Input from "./Input";
import ServiceEditor from "./ServiceEditor";

// fetch APIs
import { getServices } from "@/fetchAPIs/cms/service";

// types
import { OptionType } from "@/types/cms/form";
import { PaginationResponseDataType } from "@/types/cms/api";
import { ServiceDocument } from "@/schemas/cms/service";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

// styles
import styles from "@/components/common/form/serviceInput.module.css";
import {
  NoImageSVG,
  PlusSVG
} from "@/constants/svgs/svg";
import { ValueNoneIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";

export default function ServiceInput({
  title,
  isRequired,
  defaultValue,
  setValue
}: {
  title: string;
  isRequired: boolean;
  defaultValue?: ServiceDocument[];
  setValue: (
    selectedServices: ServiceDocument[]
  ) => void;
}) {
  const [selectedServices, setSelectedServices] =
    useState<ServiceDocument[]>(
      defaultValue ? defaultValue : []
    );

  const [showModal, setShowModal] =
    useState<boolean>(false);

  const [services, setServices] = useState<
    ServiceDocument[]
  >([]);
  const [
    serviceCategoryOptions,
    setServiceCategoryOptions
  ] = useState<OptionType[]>([]);
  const [
    serviceSearchResults,
    setServiceSearchResults
  ] = useState<ServiceDocument[]>([]);

  const [isAllSelected, setIsAllSelected] =
    useState<boolean>(false);

  const [filter, setFilter] =
    useState<string>("");
  const [category, setCategory] =
    useState<string>("");
  const [keyword, setKeyword] =
    useState<string>("");

  const [resetFilter, setResetFilter] =
    useState<boolean>(false);
  const [resetCategory, setResetCategory] =
    useState<boolean>(false);
  const [resetKeyword, setResetKeyword] =
    useState<boolean>(false);

  const handleGetServices = () => {
    getServices({
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
          setServices(
            responseData.data as ServiceDocument[]
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

  const handleGetServiceCategoryOptions = () => {
    const serviceCategoriesSet = new Set(
      services.map(
        ({ category }) =>
          (category as ServiceCategoryDocument)
            .name
      )
    );

    const serviceCategories = Array.from(
      serviceCategoriesSet
    ).sort();

    setServiceCategoryOptions([
      { label: "all", value: "all" },
      ...serviceCategories.map(
        (serviceCategory) => ({
          label: serviceCategory,
          value: serviceCategory
        })
      )
    ]);
  };

  const handleSearchServices = () => {
    setServiceSearchResults(
      services.filter(
        ({
          _id,
          category: serviceCategory,
          name
        }) => {
          if (category && category !== "all") {
            if (
              (
                serviceCategory as ServiceCategoryDocument
              ).name.toLowerCase() !==
              category.toLowerCase()
            ) {
              return false;
            }
          }

          if (filter) {
            switch (filter) {
              case "selected":
                if (
                  !selectedServices.filter(
                    (selectedService) =>
                      selectedService._id === _id
                  ).length
                ) {
                  return false;
                }

                break;

              case "not selected":
                if (
                  selectedServices.filter(
                    (selectedService) =>
                      selectedService._id === _id
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
    );
  };

  const handleCheckAllSelected = () => {
    setIsAllSelected(
      serviceSearchResults.length ===
        serviceSearchResults.filter(({ _id }) =>
          selectedServices.find(
            ({ _id: selectedServiceId }) =>
              _id === selectedServiceId
          )
        ).length
    );
  };

  const handleSelectAll = () => {
    setSelectedServices(
      (prevSelectedServices) => [
        ...prevSelectedServices,
        ...serviceSearchResults.filter(
          ({ _id }) =>
            !prevSelectedServices.find(
              ({ _id: selectedServiceId }) =>
                _id === selectedServiceId
            )
        )
      ]
    );
  };

  const handleDeselectAll = () => {
    setSelectedServices(
      (prevSelectedServices) => [
        ...prevSelectedServices.filter(
          ({ _id }) =>
            !serviceSearchResults.find(
              ({ _id: searchedServiceId }) =>
                _id === searchedServiceId
            )
        )
      ]
    );
  };

  const handleReset = () => {
    setResetFilter(true);
    setResetCategory(true);
    setResetKeyword(true);
  };

  useEffect(() => {
    handleGetServices();
  }, []);

  useEffect(() => {
    handleSearchServices();
  }, [filter, category, keyword]);

  useEffect(() => {
    setResetKeyword(true);
  }, [category]);

  useEffect(() => {
    handleGetServiceCategoryOptions();
    handleSearchServices();
  }, [services]);

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
    setValue(selectedServices);
  }, [selectedServices]);

  useEffect(() => {
    handleCheckAllSelected();
  }, [serviceSearchResults, selectedServices]);

  return (
    <div className={`w-full `}>
      <legend
        className={`flex items-center justify-start gap-2 text-[15px] font-medium`}
      >
        <span>{title}</span>
        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}
      </legend>
      <div className={``}>
        <section
          className={`px-7 py-8 border-[1.5px] border-black/30 rounded-lg grid grid-cols-7 items-stretch gap-5`}
        >
          {selectedServices.length &&
          !showModal ? (
            selectedServices.map(
              (selectedService) => (
                <ServiceEditor
                  key={selectedService._id}
                  service={selectedService}
                  isSelected={true}
                  toggleSelect={() => {
                    setSelectedServices(
                      (prevSelectedServices) =>
                        prevSelectedServices.filter(
                          ({ _id }) =>
                            _id !==
                            selectedService._id
                        )
                    );
                  }}
                />
              )
            )
          ) : (
            <span
              className={`h-[200px] text-[16px] col-span-7 w-full flex items-center justify-center flex-col text-center capitalize gap-2`}
            >
              <ValueNoneIcon
                width={30}
                height={30}
              />
              no service selected
            </span>
          )}
        </section>
        <section
          className={styles.actionsSection}
        >
          <Dialog>
            <DialogTrigger>
              <div className="mt-4 cursor-pointer flex items-center justify-center gap-2 py-[8px] px-[12px] border-[1.5px] border-black/30 transition-all duration-300 hover:border-black/70 hover:bg-black/10 rounded-lg text-[15px]">
                <PlusSVG /> Add service
              </div>
            </DialogTrigger>
            <DialogContent className="min-w-[80dvw] px-8 py-6 max-h-[95dvh]">
              <section
                className={`pt-7 ${styles.header}`}
              >
                <h5 className={styles.heading}>
                  select services
                </h5>
              </section>
              <section
                className={`w-full grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-end gap-5`}
              >
                <span className="-translate-y-[8px]">
                  <Button
                    type="secondary"
                    label={`${isAllSelected ? "Deselect All" : "Select All"}`}
                    variant="normal"
                    onClick={
                      isAllSelected
                        ? handleDeselectAll
                        : handleSelectAll
                    }
                  />
                </span>
                <span className="-translate-y-[8px]">
                  <Input
                    title=""
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
                  title="categories"
                  name="categories"
                  isRequired={false}
                  hasSubmitted={false}
                  showError={false}
                  errorMessage=""
                  variant="dropdown"
                  defaultValue="all"
                  options={serviceCategoryOptions}
                  resetValue={resetCategory}
                  setValue={(val) => {
                    setCategory(val as string);
                  }}
                />
                <span className="-translate-y-[8px]">
                  <Button
                    type="secondary"
                    label="reset"
                    variant="normal"
                    onClick={handleReset}
                  />
                </span>
              </section>
              <section
                className={`w-full grid grid-cols-7 gap-5 max-h-[55dvh] overflow-y-scroll scrollbar-hide items-stretch`}
              >
                {serviceSearchResults.length ? (
                  serviceSearchResults.map(
                    (service) => (
                      <ServiceEditor
                        key={service._id}
                        service={service}
                        isSelected={
                          selectedServices.filter(
                            ({ _id }) => {
                              return (
                                _id ===
                                service._id
                              );
                            }
                          ).length === 1
                        }
                        toggleSelect={() => {
                          setSelectedServices(
                            (
                              prevSelectedServices
                            ) => {
                              if (
                                prevSelectedServices.filter(
                                  ({ _id }) =>
                                    _id ===
                                    service._id
                                ).length
                              ) {
                                return prevSelectedServices.filter(
                                  ({ _id }) =>
                                    _id !==
                                    service._id
                                );
                              } else {
                                return [
                                  ...prevSelectedServices,
                                  service
                                ];
                              }
                            }
                          );
                        }}
                      />
                    )
                  )
                ) : (
                  <div
                    className={
                      styles.noResultContainer
                    }
                  >
                    <span
                      className={styles.noResult}
                    >
                      no addon
                    </span>
                  </div>
                )}
              </section>
              <section
                className={styles.actionsSection}
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
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </div>
  );
}
