export const calculateStartingDate = (
  offsetHrs: number
): Date => {
  const now = new Date();
  now.setHours(now.getHours() + offsetHrs);

  if (now.getHours() >= 24) {
    now.setDate(now.getDate() + 1);
    now.setHours(now.getHours() - 24);
  }

  return now;
};
