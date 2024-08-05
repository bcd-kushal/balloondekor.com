import { ReactNode } from "react";

import Input from "./Input";

import styles from "@/components/common/form/inputSection.module.css";

export default function InputSection(
  props:
    | ({
        variant: "section";
        sectionType: "root" | "nested";
        heading?: string;
        children: ReactNode;
      } & (
        | {
            showToggle?: false;
          }
        | {
            showToggle?: true;
            toggleValue: boolean;
            onToggle: (value: boolean) => void;
          }
      ))
    | {
        variant: "layout";
        layoutColumn:
          | "double"
          | "triple"
          | "quad";
        children: ReactNode;
      }
) {
  switch (props.variant) {
    case "section":
      const { sectionType, heading, showToggle } =
        props;

      return (
        <section
          className={`
            ${styles.section}
            ${sectionType === "root" ? styles.rootSection : ""}
            ${sectionType === "nested" ? styles.nestedSection : ""}
          `}
        >
          {heading?.trim() ? (
            <section className={styles.header}>
              {sectionType === "root" ? (
                <h4
                  className={`
                    ${styles.heading}
                    ${styles.rootSectionHeading}
                  `}
                >
                  {heading}
                </h4>
              ) : (
                <></>
              )}
              {sectionType === "nested" ? (
                <h5
                  className={`
                    ${styles.heading}
                    ${styles.nestedSectionHeading}
                  `}
                >
                  {heading}
                </h5>
              ) : (
                <></>
              )}
              {showToggle ? (
                <Input
                  title=""
                  name="showChildren"
                  isRequired={false}
                  hasSubmitted={false}
                  showError={false}
                  errorMessage=""
                  variant="boolean"
                  defaultValue={props.toggleValue}
                  setValue={props.onToggle}
                />
              ) : (
                <></>
              )}
            </section>
          ) : (
            <></>
          )}
          {showToggle ? (
            props.toggleValue ? (
              <section className={styles.inputs}>
                {props.children}
              </section>
            ) : (
              <></>
            )
          ) : (
            <section className={styles.inputs}>
              {props.children}
            </section>
          )}
        </section>
      );

    case "layout":
      const { layoutColumn } = props;

      return (
        <section
          className={`
            ${layoutColumn === "double" ? styles.double : ""}
            ${layoutColumn === "triple" ? styles.triple : ""}
            ${layoutColumn === "quad" ? styles.quad : ""}
          `}
        >
          {props.children}
        </section>
      );

    default:
      break;
  }
}
