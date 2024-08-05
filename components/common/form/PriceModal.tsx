import { useEffect, useState } from "react";

import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Input from "@/components/common/form/Input";
import InputSection from "@/components/common/form/InputSection";

import {
  CityPriceDocument,
  PriceDocument
} from "@/schemas/cms/service";

import styles from "@/components/common/form/priceModal.module.css";

export default function PriceModal({
  initialValue,
  showCityPrice,
  onClose,
  onDone
}: {
  initialValue: PriceDocument;
  showCityPrice?: boolean;
  onClose: () => void;
  onDone: (value: PriceDocument) => void;
}) {
  const [baseMrp, setBaseMrp] = useState<number>(
    initialValue?.base?.mrp || NaN
  );
  const [basePrice, setBasePrice] =
    useState<number>(
      initialValue?.base?.price || NaN
    );

  const [
    showCityPriceForm,
    setShowCityPriceForm
  ] = useState<boolean>(showCityPrice || false);

  const [cityPrice, setCityPrice] = useState<
    CityPriceDocument[]
  >(initialValue?.cities || []);

  const [reset, setReset] =
    useState<boolean>(false);

  const handleReset = () => {
    setReset(true);
    onDone({} as PriceDocument);
  };

  const handleDone = () => {
    const price = {
      base: {
        mrp: baseMrp,
        price: basePrice
      },
      cities: cityPrice
    } as PriceDocument;

    onDone(price);
    onClose();
  };

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  return (
    <Backdrop
      verticalPosition="center"
      horizontalPosition="center"
      onClick={() => {}}
    >
      <section className={styles.priceModal}>
        <h5 className={styles.heading}>price</h5>
        <section className={styles.inputs}>
          <section
            className={styles.scrollContainer}
          >
            <InputSection
              variant="section"
              sectionType="nested"
            >
              <InputSection
                variant="section"
                sectionType="root"
                heading="base price"
              >
                <InputSection
                  variant="layout"
                  layoutColumn="double"
                >
                  <Input
                    title="MRP"
                    name="baseMRP"
                    isRequired={true}
                    hasSubmitted={false}
                    showError={false}
                    errorMessage="base mrp is required"
                    variant="number"
                    decimal
                    defaultValue={baseMrp}
                    resetValue={reset}
                    setValue={setBaseMrp}
                  />
                  <Input
                    title="price"
                    name="basePrice"
                    isRequired={true}
                    hasSubmitted={false}
                    showError={false}
                    errorMessage="base price is required"
                    variant="number"
                    decimal
                    defaultValue={basePrice}
                    resetValue={reset}
                    setValue={setBasePrice}
                  />
                </InputSection>
              </InputSection>
              <InputSection
                variant="section"
                sectionType="root"
                heading="city wise price"
                showToggle
                toggleValue={showCityPriceForm}
                onToggle={setShowCityPriceForm}
              >
                <Input
                  title=""
                  name="cityPrice"
                  isRequired={false}
                  hasSubmitted={false}
                  showError={false}
                  errorMessage=""
                  variant="cityPrice"
                  defaultValues={cityPrice}
                  resetValue={reset}
                  setValues={setCityPrice}
                />
              </InputSection>
            </InputSection>
          </section>
        </section>
        <section
          className={styles.actionsContainer}
        >
          <section className={styles.left}>
            <Button
              type="danger"
              label="reset"
              variant="normal"
              onClick={handleReset}
            />
          </section>
          <section className={styles.right}>
            <Button
              type="secondary"
              label="close"
              variant="normal"
              onClick={onClose}
            />
            <Button
              type="primary"
              label="done"
              variant="normal"
              onClick={handleDone}
            />
          </section>
        </section>
      </section>
    </Backdrop>
  );
}
