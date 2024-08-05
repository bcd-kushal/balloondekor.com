export const convertTo12HrsFormat = (
  str: string
) => {
  const hr = parseInt(str.split(":")[0]);
  const min = parseInt(str.split(":")[1]);

  if (hr < 12)
    return `${hr}${min === 0 ? "" : `:${min}`}am`;
  if (hr > 12)
    return `${hr - 12}${min === 0 ? "" : `:${min}`}pm`;
  if (min !== 0) return `${hr}:${min}pm`;
  return `${hr}noon`;
};
