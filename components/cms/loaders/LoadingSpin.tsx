import { LoaderSVG } from "@/constants/svgs/svg";

export function LoadingPreviewComponent({
  title
}: {
  title: string;
}) {
  return (
    <div className="w-full h-full flex flex-col gap-[16px] items-center justify-center text-center animate-pulse *:text-[#12121299]">
      <LoaderSVG
        dimensions={40}
        className="animate-spin"
      />
      <span className="text-[14px]">
        Loading {title}...
      </span>
    </div>
  );
}
