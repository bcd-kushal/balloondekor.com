export default function FormPageSkeletonLayout({
  children,
  title
}: {
  children: Readonly<React.ReactNode>;
  title?: string;
}) {
  return (
    <div
      className={`relative flex flex-col items-stretch justify-start gap-6 px-[16px] pb-[40px] overflow-y-scroll scrollbar-hide h-[calc(100dvh_-_52px)]`}
    >
      <div
        className={`flex flex-col items-stretch justify-start`}
      >
        {/* PAGE TITLE ============== */}
        <div
          className={`bg-backdrop-primary z-50 pt-[20px] pb-4 sticky top-0 flex items-center justify-between text-[26px] capitalize`}
        >
          {title}
        </div>
        {/* REMAINDER OF FORM =================== */}
        {children}
      </div>
    </div>
  );
}
