/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import Image from "next/image";

import Backdrop from "../Backdrop";
import Button from "../Button";
import Input from "./Input";

import { OptionType } from "@/types/cms/form";

import styles from "@/components/common/form/referenceVariantCategoryEditor.module.css";
import {
  ReferenceVariantCategoryDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import { ImageDocument } from "@/schemas/cms/image";
import { Schema } from "mongoose";
import {
  AddImgSVG,
  CrossSVG,
  NoImageSVG
} from "@/constants/svgs/svg";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

export default function ReferenceVariantCategoryEditor({
  isSelf,
  isLast,
  isRequired,
  defaultValue,
  services,
  serviceCategoryOptions,
  onDelete,
  setValue,
  addAnotherNewCard
}: {
  isSelf: boolean;
  isLast: boolean;
  isRequired: boolean;
  defaultValue: ReferenceVariantCategoryDocument;
  services: ServiceDocument[];
  serviceCategoryOptions: OptionType[];
  onDelete: () => void;
  setValue: (
    reference: ReferenceVariantCategoryDocument
  ) => void;
  addAnotherNewCard: () => void;
}) {
  const [label, setLabel] = useState<string>(
    defaultValue.label || ""
  );
  const [reference, setReference] = useState<
    ServiceDocument | undefined
  >(
    (defaultValue.reference as ServiceDocument) ||
      undefined
  );

  const [showModal, setShowModal] =
    useState<boolean>(false);

  const [serviceCategory, setServiceCategory] =
    useState<string>("all");
  const [searchKeyword, setSearchKeyword] =
    useState<string>("");

  const [
    resetServiceCategory,
    setResetServiceCategory
  ] = useState<boolean>(false);
  const [
    resetSearchKeyword,
    setResetSearchKeyword
  ] = useState<boolean>(false);

  const [searchResults, setSearchResults] =
    useState<ServiceDocument[]>([]);

  const handleSearch = () => {
    const filtered =
      !serviceCategory ||
      serviceCategory === "all"
        ? services
        : services.filter(
            ({ category, categories }) => {
              const res =
                (
                  category as ServiceCategoryDocument
                )._id.toString() ===
                  serviceCategory ||
                categories
                  .map((category) =>
                    (
                      category as Schema.Types.ObjectId
                    ).toString()
                  )
                  .includes(serviceCategory);

              console.log(category);

              return res;
            }
          );

    const searched = filtered.filter(({ name }) =>
      name
        .toLowerCase()
        .includes(searchKeyword.toLowerCase())
    );

    setSearchResults(searched);
  };

  const handleReset = () => {
    setResetServiceCategory(true);
    setResetSearchKeyword(true);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [services, serviceCategory, searchKeyword]);

  useEffect(() => {
    setResetSearchKeyword(true);
  }, [serviceCategory]);

  useEffect(() => {
    if (resetServiceCategory) {
      setResetServiceCategory(false);
    }
  }, [resetServiceCategory]);

  useEffect(() => {
    if (resetSearchKeyword) {
      setResetSearchKeyword(false);
    }
  }, [resetSearchKeyword]);

  useEffect(() => {
    setValue({
      ...defaultValue,
      label,
      reference: reference?._id || ""
    } as ReferenceVariantCategoryDocument);
  }, [label, reference]);

  return (
    <div
      className={`relative flex flex-col items-stretch justify-start gap-3 w-fit`}
    >
      <section
        className={styles.previewContainer}
        onClick={
          isSelf
            ? () => {}
            : () => {
                setShowModal(true);
              }
        }
      >
        {reference ? (
          <Image
            className={`${styles.image} ${styles.animationZoomIn}`}
            src={
              (
                reference.media
                  .primary as ImageDocument
              )?.url || ""
            }
            alt={
              (
                reference.media
                  .primary as ImageDocument
              )?.defaultAlt ||
              (
                reference.media
                  .primary as ImageDocument
              )?.alt ||
              ""
            }
            width={150}
            height={150}
          />
        ) : (
          <div
            className={`border-dashed border-[3px] w-full h-full ${isRequired && !reference ? "border-[#d58888]" : "border-zinc-400"} rounded-xl flex items-center justify-center`}
          >
            <AddImgSVG dimensions={30} />
          </div>
        )}
        {reference ? (
          <div className={styles.priceContainer}>
            <span className={styles.price}>
              {`₹ ${reference.price.base.price}`}
            </span>
          </div>
        ) : (
          <></>
        )}
      </section>
      <span className="w-[160px] overflow-hidden">
        <Input
          title=""
          name="label"
          placeholder="label"
          isRequired={false}
          hasSubmitted={
            isSelf
              ? false
              : reference
                ? true
                : false
          }
          showError={
            isSelf
              ? false
              : Boolean(
                  (isRequired && !label) ||
                    (reference && !label)
                )
          }
          errorMessage=""
          variant="text"
          defaultValue={
            label ? label : isSelf ? "base" : ""
          }
          setValue={setLabel}
          disabled={isSelf ? true : false}
          className="w-fit border-none"
        />
      </span>
      {isSelf || isLast ? (
        <></>
      ) : (
        <span
          onClick={onDelete}
          className="rounded-full cursor-pointer bg-red-600 text-white p-[4px] absolute -top-3 -right-3"
        >
          <CrossSVG dimensions={14} />
        </span>
      )}
      {showModal ? (
        <Backdrop
          onClick={() => {}}
          verticalPosition="center"
          horizontalPosition="center"
        >
          <div
            className={styles.selectionContainer}
          >
            <section className={styles.header}>
              <h5 className={styles.heading}>
                select service
              </h5>
            </section>
            <section
              className={styles.searchSection}
            >
              <Input
                title="categories"
                name="categories"
                isRequired={false}
                hasSubmitted={false}
                showError={false}
                errorMessage=""
                variant="dropdown"
                defaultValue={serviceCategory}
                options={serviceCategoryOptions}
                resetValue={resetServiceCategory}
                setValue={(value) => {
                  setServiceCategory(
                    value as string
                  );
                }}
              />
              <Input
                title="search"
                name="search"
                placeholder="search"
                isRequired={false}
                hasSubmitted={false}
                showError={false}
                errorMessage=""
                variant="text"
                defaultValue={searchKeyword}
                resetValue={resetSearchKeyword}
                setValue={setSearchKeyword}
              />
              <div className={styles.reset}>
                <Button
                  type="secondary"
                  label="reset"
                  variant="normal"
                  onClick={handleReset}
                />
              </div>
            </section>
            <section
              className={styles.addonsSection}
            >
              {searchResults.length ? (
                <div className={styles.addons}>
                  {searchResults.map(
                    (service) => (
                      <section
                        key={service._id}
                        className={
                          styles.previewContainer
                        }
                        onClick={() => {
                          setReference(service);
                          setShowModal(false);
                          addAnotherNewCard();
                        }}
                      >
                        <Image
                          className={`${styles.image} ${styles.animationZoomIn}`}
                          src={
                            (
                              service.media
                                .primary as ImageDocument
                            ).url
                          }
                          alt={
                            (
                              service.media
                                .primary as ImageDocument
                            ).defaultAlt ||
                            (
                              service.media
                                .primary as ImageDocument
                            ).alt
                          }
                          width={160}
                          height={160}
                        />
                        <div
                          className={
                            styles.priceContainer
                          }
                        >
                          <span
                            className={
                              styles.name
                            }
                          >
                            {service.name.length >
                            12
                              ? `${service.name.slice(0, 12)}...`
                              : service.name}
                          </span>
                          <span
                            className={
                              styles.price
                            }
                          >
                            {`₹ ${service.price.base.price}`}
                          </span>
                        </div>
                      </section>
                    )
                  )}
                </div>
              ) : (
                <div
                  className={
                    styles.noResultContainer
                  }
                >
                  <span
                    className={styles.noResult}
                  >
                    no service
                  </span>
                </div>
              )}
            </section>
            <section
              className={styles.actionsSection}
            >
              <Button
                type="secondary"
                label="close"
                variant="normal"
                onClick={() => {
                  setShowModal(false);
                }}
              />
            </section>
          </div>
        </Backdrop>
      ) : (
        <></>
      )}
    </div>
  );
}
