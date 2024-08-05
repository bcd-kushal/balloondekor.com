import { LoadingSVG } from "./svgs";

export const LoadingSkeletion = ({
  searchWord
}: {
  searchWord: string;
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-3 flex-col animate-pulse">
      <span className="animate-spin">
        <LoadingSVG
          dimensions={28}
          stroke="#12121275"
        />
      </span>
      <span className="text-sm text-[#12121275]">
        Loading results for &apos;{searchWord}
        &apos;
      </span>
    </div>
  );
};
