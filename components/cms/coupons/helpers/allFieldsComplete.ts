import { CouponFormDataType } from "../management/CouponForm";

export const allFieldsComplete = (
  data: CouponFormDataType
): boolean => {
  const { code, applicableCategories, type } =
    data;

  if (!code || code.length === 0) return false;
  if (applicableCategories.length === 0)
    return false;
  if (type === "discount") {
    const { variant } = data;
    if (variant === "flat") {
      const { flatAmount } = data;
      if (flatAmount < 1) return false;
    } else {
      const { percentage } = data;
      if (percentage < 1 || percentage > 100)
        return false;
    }
  }
  return true;
};
