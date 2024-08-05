export const isRouteAllowed = (
  allowedRoutes: string[],
  currPath: string
) => {
  if (allowedRoutes.includes(currPath))
    return true;

  for (let i = 0; i < allowedRoutes.length; i++) {
    if (currPath.startsWith(allowedRoutes[i]))
      return true;
  }

  return false;
};
