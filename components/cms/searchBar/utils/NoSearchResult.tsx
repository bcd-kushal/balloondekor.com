import { TelescopeSVG } from "./svgs";

export const NoSearchResult = ({
  searchWord
}: {
  searchWord: string;
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-[4px] flex-col">
      <span className="pb-[4px]">
        <TelescopeSVG
          dimensions={40}
          stroke="#333"
        />
      </span>
      <span className="text-[24px] text-center">
        Oops...
      </span>
      <span className="text-[16px] text-neutral-500 text-center">
        We searched far and wide but found nothing
        for &apos;{searchWord}&apos;
      </span>
    </div>
  );
};
