/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// libraries
import { useEffect, useState } from "react";

// components
import Input from "@/components/common/form/Input";

// constants
import { LIMITS } from "@/constants/cms/limit";

// styles
import styles from "@/components/cms/limit.module.css";

export default function Limit({
  defaultValue,
  setValue
}: {
  defaultValue: number;
  setValue: (value: number) => void;
}) {
  const [limit, setLimit] = useState<
    string | number
  >(defaultValue);

  // sync with outer state
  useEffect(() => {
    setValue(Number(limit));
  }, [limit]);

  return (
    <div
      className={`ml-6 text-[16px] flex items-center justify-start gap-3`}
    >
      <span>Rows:</span>
      <Input
        title=""
        name="limit"
        isRequired={true}
        hasSubmitted={false}
        showError={false}
        errorMessage=""
        variant="dropdown"
        options={LIMITS}
        defaultValue={limit}
        setValue={setLimit}
      />
    </div>
  );
}
