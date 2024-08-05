import {
  MediaDocument,
  ServiceDocument
} from "@/schemas/cms/service";
import { generateRandomCustomers } from "./helpers/generateRandomCustomers";
import { useCityContext } from "@/hooks/useCityContext";
import React, {
  SetStateAction,
  useEffect,
  useId,
  useState
} from "react";
import {
  CurvedUnderlineSVG,
  HalfStarSVG,
  LocationPinSVG,
  StarSVG
} from "@/constants/svgs/svg";
import { ReviewDocument } from "@/schemas/cms/review";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@radix-ui/react-icons";
import { ImageDocument } from "@/schemas/cms/image";
import Image from "next/image";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";

export default function ReviewsByCustomers({
  service
}: {
  service: ServiceDocument;
}) {
  const { cities } = useCityContext();

  const [reviewsList, setReviewsList] = useState<
    {
      customerName: string;
      location: string;
      totalRating: number;
      review: string;
    }[]
  >([]);

  const [expandedReviews, setExpandedReviews] =
    useState<number[]>([]);

  const [screenW, setScreenW] =
    useState<number>(300);

  const [reviewImages, setReviewImages] =
    useState<{ url: string; alt: string }[]>([]);

  const [showDialog, setShowDialog] =
    useState<boolean>(false);
  const [
    activePreviewIndex,
    setActivePreviewIndex
  ] = useState<number>(0);

  const reviewTrayId = useId();

  useEffect(() => {
    const reviews = generateRandomCustomers({
      limit: service.quality?.showReviews || 0,
      serviceId: service._id,
      cities: cities.map(({ name }) => name)
    });

    const serviceReviews =
      (service.quality?.review as ReviewDocument)
        ?.reviews || undefined;

    setReviewsList((prev) =>
      reviews.map((review, index) => ({
        ...review,
        review: serviceReviews
          ? serviceReviews[index]
          : ""
      }))
    );
  }, [service, cities]);

  useEffect(() => {
    setReviewImages((prev) => {
      const a = (
        (service.media as MediaDocument)
          .review as ImageDocument[]
      ).map(({ url, alt }) => ({ url, alt }));
      return [...a];
    });
  }, [service.media]);

  useEffect(() => {
    const updateWindowWidth = () => {
      setScreenW((prev) => innerWidth);
    };
    window.addEventListener(
      "resize",
      updateWindowWidth
    );
    updateWindowWidth();
    return () =>
      window.removeEventListener(
        "resize",
        updateWindowWidth
      );
  }, []);

  const handleIndexing = (index: number) => {
    setExpandedReviews((prev) => {
      let st = prev;
      if (prev.includes(index)) {
        const x = st.indexOf(index);
        st = [
          ...st.slice(0, x),
          ...st.slice(x + 1, st.length)
        ];
      } else {
        st = [...st, index];
      }

      return st;
    });
  };

  const handleReviewsScroll = (
    dir: "left" | "right"
  ) => {
    const tray = document.getElementById(
      reviewTrayId
    ) as HTMLElement;

    const currOffset = tray.scrollLeft;

    tray.scrollTo({
      left:
        currOffset +
        (dir === "left" ? -1 : 1) *
          (screenW * 0.65),
      behavior: "smooth"
    });
  };

  return (
    <>
      {reviewsList.length ? (
        <>
          {/* TITLE ==================================== */}
          <div className="w-full relative mt-[60px] text-[25px] font-medium capitalize sm:pl-4 mb-[25px] flex items-center justify-start max-sm:justify-center gap-[6px]">
            <div className="relative w-fit gap-[6px] flex sm:pl-[32px]">
              <span className="">Customer</span>
              <span className="text-pink-600">
                Reviews
              </span>
              <span className="absolute -top-[8px] -translate-x-[calc(100%_+_10px)] text-[56px] leading-none text-pink-500">
                “
              </span>
              <span className="absolute -bottom-[8px] right-0 top-auto translate-y-[calc(50%_-_7px)]  translate-x-[calc(100%_+_10px)] text-[56px] leading-none text-pink-500">
                ”
              </span>
            </div>
          </div>
          <div
            className={`max-[1210px]:px-4 w-full mb-[14px] grid grid-cols-1 ${reviewImages.length > 0 ? `sm:grid-cols-[1fr_3fr]` : `sm:grid-cols-1`} gap-[5px] sm:gap-[14px] md:pl-[10px] `}
          >
            {/* IMAGE REVIEWS ============================================== */}
            {reviewImages &&
            reviewImages.length > 0 ? (
              <div>
                <div
                  className={`max-[1210px]:px-4 w-full mb-[14px] grid gap-4 sm:gap-[10px] grid-cols-3 min-[450px]:grid-cols-6 sm:grid-cols-2 min-[1100px]:grid-cols-3`}
                >
                  <div className="min-h-6 min-w-36 bg-pink-400">
                    {JSON.stringify(reviewImages)}
                  </div>
                  {reviewImages
                    .filter(
                      (_, index) =>
                        index <
                        (screenW > 640 ? 9 : 6)
                    )
                    .map(
                      ({ url, alt }, index) => (
                        <div
                          className="aspect-square bg-neutral-200 flex items-center justify-center relative overflow-hidden rounded-xl cursor-pointer"
                          key={index}
                          onClick={() => {
                            setShowDialog(
                              (prev) => true
                            );
                            setActivePreviewIndex(
                              (prev) => index
                            );
                          }}
                        >
                          <Image
                            src={url}
                            alt={alt}
                            className="object-center w-full h-full object-cover"
                            height={250}
                            width={250}
                            unoptimized
                            draggable={false}
                          />

                          {reviewImages.length >
                            (screenW > 640
                              ? 9
                              : 6) &&
                          index ===
                            Math.min(
                              screenW > 640
                                ? 8
                                : 5,
                              reviewImages.length -
                                1
                            ) ? (
                            <div className="w-full h-full flex items-center justify-center z-10 bg-black/40 absolute text-white font-semibold text-[18px]">
                              +
                              {reviewImages.length -
                                (screenW > 640
                                  ? 9
                                  : 6) +
                                1}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      )
                    )}
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* TEXT REVIEWS ============================================== */}
            <div
              className={
                reviewImages.length > 0
                  ? "sm:pl-[14px] sm:border-l-[1.5px] sm:border-l-zinc-300"
                  : ""
              }
            >
              <div
                id={reviewTrayId}
                className={`flex relative items-stretch justify-start gap-[20px] overflow-x-scroll mb-[14px] text-[16px] scrollbar-hide p-[12px] px-0 max-sm:w-[calc(100dvw_-_24px)]  ${reviewImages.length > 0 ? `w-[867px] max-[1200px]:w-[calc(75dvw_-_28px)]` : "w-full max-[1200px]:w-[calc(100dvw_-_28px)]"}`}
              >
                {/* left button ------------------------- */}
                <div
                  className="sticky top-1/2 aspect-square h-fit -translate-y-1/2 left-0 rounded-full cursor-pointer flex items-center border-[1.5px] border-neutral-300 justify-center bg-white p-[8px] text-slate-900 transition-all duration-300 hover:bg-neutral-200 max-sm:mr-[-41px]"
                  onClick={() =>
                    handleReviewsScroll("left")
                  }
                >
                  <ChevronLeftIcon />
                </div>

                {/* reviews map -------------------------- */}
                {reviewsList.map(
                  (
                    {
                      customerName,
                      location,
                      totalRating,
                      review
                    },
                    index
                  ) => (
                    <div
                      className="rounded-2xl grid grid-cols-[36px_auto] gap-[10px] border-[1px] border-neutral-200 p-7 max-[330px]:min-w-[calc(calc(100dvw_-_60px)_/_1.05)] max-[400px]:min-w-[calc(calc(100dvw_-_60px)_/_1.25)] max-sm:min-w-[calc(calc(100dvw_-_60px)_/_2)] max-[1000px]:min-w-[calc(calc(100dvw_-_60px)_/_3)] max-[1200px]:min-w-[calc(calc(100dvw_-_60px)_/_4)] min-[1200px]:min-w-[282px]"
                      style={{
                        boxShadow:
                          "0 0 10px 5px #12121212"
                      }}
                      key={index}
                    >
                      {/* badge ------------- */}
                      <span className="flex items-start justify-center">
                        <div className="aspect-square rounded-full w-full text-white bg-gradient-to-br from-pink-300/90 to-pink-700/80 flex items-center justify-center text-center">
                          {customerName[0].toUpperCase()}
                        </div>
                      </span>

                      <div className="flex flex-col justify-start gap-[2px]">
                        {/* name ------------- */}
                        <span className="font-medium text-[18px] line-clamp-1">
                          {customerName}
                        </span>
                        {/* rating ------------- */}
                        <span className="flex items-center justify-start gap-[8px]">
                          <span className="text-[14px] text-amber-600 font-semibold bg-amber-100 rounded-xl px-1 py-0.5 w-[34px] my-1.5 flex items-center justify-center">
                            {totalRating % 1 ===
                            0.5
                              ? totalRating
                              : `${totalRating}.0`}
                          </span>
                          <div className="grid *:row-start-1 *:col-start-1">
                            <span className="flex items-center gap-[2px] justify-start">
                              {Array.from({
                                length: 5
                              }).map(
                                (_, index) => (
                                  <StarSVG
                                    fill="#ccc"
                                    stroke="#ccc"
                                    key={index}
                                  />
                                )
                              )}
                            </span>
                            <span className="flex items-center gap-[2px] justify-start">
                              {Array.from({
                                length:
                                  Math.floor(
                                    totalRating
                                  )
                              }).map(
                                (_, index) => (
                                  <StarSVG
                                    fill="#f4b02b"
                                    stroke="#f4b02b"
                                    key={index}
                                  />
                                )
                              )}
                              {totalRating % 1 ===
                              0.5 ? (
                                <HalfStarSVG
                                  fill="#f4b02b"
                                  stroke="#f4b02b"
                                />
                              ) : (
                                <></>
                              )}
                            </span>
                          </div>
                        </span>

                        {/* textarea + read more -------------- */}
                        <span
                          className={`mt-[3px] text-[15px] text-zinc-700 ${index === 0 ? (expandedReviews.includes(index) ? "line-clamp-2 cursor-pointer" : "") : expandedReviews.find((review) => review === index) ? "" : "line-clamp-2 cursor-pointer"}`}
                          onClick={() =>
                            handleIndexing(index)
                          }
                        >
                          {review}
                        </span>

                        {(index === 0 &&
                          !expandedReviews.includes(
                            0
                          )) ||
                        expandedReviews.find(
                          (review) =>
                            review === index
                        ) ? (
                          <></>
                        ) : review?.length ||
                          0 > 52 ? (
                          <span
                            className="text-[14px] text-zinc-500 mb-[3px] cursor-pointer"
                            onClick={() =>
                              handleIndexing(
                                index
                              )
                            }
                          >
                            Read more
                          </span>
                        ) : (
                          <></>
                        )}

                        {/* location ------------- */}
                        <span className="flex items-center justify-start gap-[6px] mt-2 text-zinc-600 text-[14px]">
                          <LocationPinSVG
                            dimensions={15}
                          />{" "}
                          <span>
                            {" "}
                            {location}{" "}
                          </span>
                        </span>
                      </div>
                    </div>
                  )
                )}

                {/* right button ------------------------- */}
                <div
                  className="sticky top-1/2 -translate-y-1/2 aspect-square h-fit right-0 rounded-full cursor-pointer flex items-center border-[1.5px] border-neutral-300 justify-center bg-white p-[8px] text-slate-900 transition-all duration-300 hover:bg-neutral-100"
                  onClick={() =>
                    handleReviewsScroll("right")
                  }
                >
                  <ChevronRightIcon />
                </div>
              </div>
            </div>
          </div>
          {/* IMAGE REVIEWS ============================================== */}
          {/* {reviewImages.filter(
            (_, index) => index <= 12
          ).length > 0 ? (
            <div
              className={`max-[1210px]:px-4 w-full mb-[14px] grid gap-4 sm:gap-[10px] grid-cols-4 min-[500px]:grid-cols-6 min-[750px]:grid-cols-8 min-[1000px]:grid-cols-10 min-[1200px]:grid-cols-12 lg:pl-[10px]`}
            >
              {reviewImages.map(
                ({ url, alt }, index) => (
                  <div
                    className="aspect-square bg-neutral-200 flex items-center justify-center relative overflow-hidden rounded-xl cursor-pointer"
                    key={index}
                    onClick={() => {
                      setShowDialog(
                        (prev) => true
                      );
                      setActivePreviewIndex(
                        (prev) => index
                      );
                    }}
                  >
                    <Image
                      src={url}
                      alt={alt}
                      className="object-center w-full h-full object-cover"
                      height={250}
                      width={250}
                      unoptimized
                      draggable={false}
                    />
                  </div>
                )
              )}
            </div>
          ) : (
            <></>
          )} */}
        </>
      ) : (
        <></>
      )}

      {/* ===[ POPUP DIALOG ]======================================= */}
      <Dialog
        open={showDialog}
        onOpenChange={() =>
          setShowDialog((prev) => !prev)
        }
      >
        <DialogContent className="p-0 bg-transparent rounded-none focus:outline-none outline-none border-none min-w-fit">
          <ImagePreviewModal
            images={reviewImages}
            currIndex={activePreviewIndex}
            setCurrIndex={setActivePreviewIndex}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const ImagePreviewModal = ({
  images,
  currIndex,
  setCurrIndex
}: {
  images: { url: string; alt: string }[];
  currIndex: number;
  setCurrIndex: React.Dispatch<
    SetStateAction<number>
  >;
}) => {
  return (
    <div className="p-6 rounded-3xl bg-white flex flex-col-reverse sm:max-h-[calc(80dvh_+_30px)] sm:grid sm:grid-cols-[90px_auto] gap-[12px] sm:min-w-[550px] sm:w-[calc(80dvh_+_132px)] outline-none">
      {/* LEFT SIDE SCROLLABLE ---------------------------- */}
      <div className="flex max-sm:max-w-[85dvw] sm:flex-col sm:items-stretch justify-start overflow-x-scroll sm:overflow-y-scroll scrollbar-hide sm:h-[80dvh] gap-[10px] *:relative *:h-[90px] *:rounded-2xl *:overflow-hidden *:flex *:items-center *:justify-center *:cursor-pointer *:max-sm:min-w-[68px]">
        {images.map(({ url, alt }, index) => (
          <div
            key={index}
            onClick={() =>
              setCurrIndex((prev) => index)
            }
            className={`border-[2.5px] aspect-square sm:w-[90px] sm:h-[90px] ${index === currIndex ? " border-pink-600" : "border-transparent"}`}
          >
            <Image
              src={url}
              alt={alt}
              className="object-center w-full h-full object-cover"
              height={250}
              width={250}
              unoptimized
              priority
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* RIGHT SIDE BIG IMAGE ------------------------ */}
      <div className="aspect-square max-sm:min-w-[80dvw] sm:min-h-[80dvh] rounded-3xl overflow-hidden flex items-center justify-center relative">
        <Image
          src={images[currIndex].url}
          alt={images[currIndex].alt}
          className="object-center w-full h-full object-cover"
          height={1000}
          width={1000}
          unoptimized
          priority
          draggable={false}
        />

        {/* left right navigator buttons ------- */}
        <div
          className="rounded-full bg-transparent text-white p-[10px] transition-all duration-300 cursor-pointer hover:bg-black/40 absolute top-1/2 -translate-y-1/2 left-[5px]"
          onClick={() =>
            setCurrIndex(
              (prev) =>
                (prev - 1 < 0
                  ? images.length - 1
                  : prev - 1) % images.length
            )
          }
        >
          <ChevronLeftIcon
            width={20}
            height={20}
            strokeWidth={10}
          />
        </div>
        <div
          className="rounded-full bg-transparent text-white p-[10px] transition-all duration-300 cursor-pointer hover:bg-black/40 absolute top-1/2 -translate-y-1/2 right-[5px]"
          onClick={() =>
            setCurrIndex(
              (prev) => (prev + 1) % images.length
            )
          }
        >
          <ChevronRightIcon
            width={20}
            height={20}
            strokeWidth={10}
          />{" "}
        </div>
      </div>
    </div>
  );
};
