import {
  BalloonsSVG,
  CrossCalendarSVG,
  INRSVG,
  PenSVG,
  SmileSVG,
  SparklesSVG
} from "@/constants/svgs/svg";

export default function HowItWorks() {
  const infoData: {
    svg: JSX.Element;
    label: string | JSX.Element;
  }[] = [
    {
      svg: (
        <BalloonsSVG
          stroke="#ab2777"
          fill="#ab2777"
          dimensions={34}
        />
      ),
      label: (
        <span>
          Select your <b>Decoration</b> Package
        </span>
      )
    },
    {
      svg: (
        <CrossCalendarSVG
          stroke="#ab2777"
          dimensions={24}
          className="max-sm:scale-[0.85]"
        />
      ),
      label: (
        <span>
          Select <b>Date</b> and <b>Time</b> Slot
        </span>
      )
    },
    {
      svg: (
        <PenSVG
          stroke="#ab2777"
          dimensions={24}
          className="max-sm:scale-[0.85]"
        />
      ),
      label: (
        <span>
          Select Add-ons <b>(Optional)</b>
        </span>
      )
    },
    {
      svg: (
        <INRSVG
          stroke="#ab2777"
          dimensions={24}
          className="max-sm:scale-[0.85]"
        />
      ),
      label: (
        <span>
          <b>Confirm</b> and Pay Advance
        </span>
      )
    },
    {
      svg: (
        <SmileSVG
          stroke="#ab2777"
          dimensions={26}
          className="max-sm:scale-[0.85]"
        />
      ),
      label: (
        <span>
          Sit back while our <b>Decorators</b>{" "}
          work their Magic
        </span>
      )
    }
  ];

  return (
    <section
      className="max-sm:rounded-3xl max-sm:flex max-sm:flex-col max-sm:left-1/2 max-sm:max-w-[calc(100dvw_-_28px)] max-sm:pb-[18px] max-sm:pt-[4px] max-sm:mt-[20px] max-sm:shadow-[0_0_10px_5px_#ab277720]"
      // style={{
      //   boxShadow: "0 0 10px 5px #ab277720"
      // }}
    >
      <div className="w-full mt-[18px] text-center text-[25px] font-medium capitalize pl-4 mb-[17px] sm:mb-[25px] flex items-center justify-center gap-[6px]">
        <span>How</span>
        <span>It</span>
        <span className="text-pink-600">
          Works
        </span>
        {/* How It Works{" "} */}
        <SparklesSVG
          dimensions={22}
          stroke="#f4b02b"
          fill="#f4b02b"
          className="ml-[4px]"
        />
      </div>

      {/* MOBILE LAYOUT ------------------------------------------------------- */}
      <div className="grid grid-cols-[50px_auto] gap-x-6 text-[16px] sm:text-[18px] w-full max-[1199px]:px-9 sm:hidden">
        {infoData.map(({ svg, label }, index) => (
          <>
            <div
              className="grid *:row-start-1 *:col-start-1 relative "
              key={`${index}_1`}
            >
              <span className="z-10 max-sm:scale-105 rounded-full p-[10px] bg-neutral-200 text-pink-950 w-fit h-fit relative left-1/2 -translate-x-1/2 top-[30px] -translate-y-1/2">
                {index === 0 ? (
                  <BalloonsSVG
                    stroke="#ab2777"
                    fill="#ab2777"
                    dimensions={24}
                  />
                ) : (
                  svg
                )}
              </span>
              <div className="grid grid-rows-[37.5px_minmax(37.5px,auto)] z-0">
                <span className="flex items-stretch justify-center">
                  <span
                    className={`${index === 0 ? "bg-transparent" : "bg-neutral-300"} w-[1.5px]`}
                  />
                </span>
                <span className="flex items-stretch justify-center">
                  <span
                    className={`${index === infoData.length - 1 ? "bg-transparent" : "bg-neutral-300"} w-[2px]`}
                  />
                </span>
              </div>
            </div>

            <span
              className="pt-[18px]"
              key={`${index}_2`}
            >
              {label}
            </span>
          </>
        ))}
      </div>

      {/* DESKTOP LAYOUT ------------------------------------------------------ */}
      <div className="max-sm:hidden w-full grid grid-cols-5 max-w-[970px] mt-5 items-start relative">
        <div className="h-[0px] border-neutral-200 border-t-[3px] border-dashed w-4/5 absolute left-1/2 -translate-x-1/2 top-[28px] z-0 grid *:row-start-1 *:col-start-1">
          {/* <div className="bg-fuchsia-600 w-0"></div> */}
        </div>
        {infoData.map(({ svg, label }, index) => (
          <div
            className="group grid grid-rows-[60px_auto] gap-y-4 z-20"
            key={`${index}_3`}
          >
            <span className="grid *:row-start-1 *:col-start-1">
              <span className="grid grid-rows-2">
                <span></span>
                <span></span>
              </span>
              <span className="grid *:row-start-1 *:col-start-1">
                <span className="rounded-full w-[60px] h-[60px] place-self-center bg-pink-600/30 z-0 transition-all duration-300 group-hover:scale-125"></span>
                <span className="rounded-full w-[60px] h-[60px] flex items-center justify-center place-self-center bg-neutral-200 z-10">
                  {svg}
                </span>
              </span>
            </span>
            <div
              className={`text-[15px] ${index === infoData.length - 1 ? "px-[0px]" : "px-[14px]"}  text-center text-zinc-700`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
