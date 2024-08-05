// types
import { ImageDocument } from "@/schemas/cms/image";
import { ServiceDocument } from "@/schemas/cms/service";

// styles
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import { useStatusContext } from "@/hooks/useStatusContext";
import Image from "next/image";
import { ServiceActions } from "./ServiceActions";
import { usePathname } from "next/navigation";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

export const toSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};

export const calculateCompletionPercentage = (
  service: ServiceDocument
): number => {
  const requiredFieldCount: number = 15;
  let completedFieldCount: number = 0;

  if (service?.name) completedFieldCount += 1;

  if (service?.category) completedFieldCount += 1;

  if (service?.media?.primary)
    completedFieldCount += 1;

  if (service?.tags?.searchTags?.length)
    completedFieldCount += 1;
  if (service?.tags?.aiTags?.length)
    completedFieldCount += 1;

  if (service?.details?.includes)
    completedFieldCount += 1;
  if (service?.details?.deliveryDetails)
    completedFieldCount += 1;
  if (service?.details?.careInfo)
    completedFieldCount += 1;
  if (service?.details?.cancellationPolicy)
    completedFieldCount += 1;
  if (service?.details?.faq)
    completedFieldCount += 1;

  if (service?.meta?.title)
    completedFieldCount += 1;
  if (service?.meta?.tags)
    completedFieldCount += 1;
  if (service?.meta?.description)
    completedFieldCount += 1;

  if (service?.deliveryTime?.orderProcessingTime)
    completedFieldCount += 1;

  if (
    service?.price?.base?.mrp &&
    service?.price?.base?.price
  )
    completedFieldCount += 1;

  return Math.floor(
    (completedFieldCount / requiredFieldCount) *
      100
  );
};

export default function ServiceList({
  offset,
  services,
  onToggleActive,
  onDelete
}: {
  offset: number;
  services: ServiceDocument[];
  onToggleActive: (
    serviceId: string,
    isActive: boolean
  ) => void;
  onDelete: (serviceId: string) => void;
}) {
  const servicesData: tableDataType = {
    header: [
      { label: "Image", span: 1 },
      { label: "Name", span: 5, align: "left" },
      {
        label: "Category",
        span: 4,
        align: "left"
      },
      { label: "Done", span: 1 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 2 }
    ],

    data: [],
    offset: offset
  };
  const { addStatus } = useStatusContext();

  const handleIncompleteToggleActive = () => {
    addStatus([
      {
        type: "warning",
        message:
          "Can't Activate Incomplete Service"
      }
    ]);
  };

  const currPath = usePathname();

  const n = services.length;
  for (let i = 0; i < n; i++) {
    const service = services[i];
    const row: TableDataRowType = [];
    const completion =
      calculateCompletionPercentage(service);

    // image -------------------------------------
    row.push({
      label: {
        label: (
          <Image
            src={
              (
                service?.media
                  .primary as ImageDocument
              ).url
            }
            alt={
              (
                service?.media
                  .primary as ImageDocument
              ).alt ||
              (
                service?.media
                  .primary as ImageDocument
              ).defaultAlt
            }
            width={50}
            height={50}
            quality={10}
            className="rounded-lg aspect-square overflow-hidden object-cover"
          />
        ),
        type: "image"
      },
      action: {
        action: <></>,
        type: "none"
      }
    });
    // name -------------------------------------
    row.push({
      label: {
        label: service?.name,
        type: "text",
        align: "left"
      },
      action: { action: <></>, type: "none" }
    });
    // category -------------------------------------
    row.push({
      label: {
        label: (
          service.category as ServiceCategoryDocument
        )?.name,
        type: "text",
        align: "left"
      },
      action: { action: <></>, type: "none" }
    });
    // done -------------------------------------
    row.push({
      label: {
        label: String(completion + "%"),
        type: "text"
      },
      action: { action: <></>, type: "none" }
    });
    // active -------------------------------------
    row.push({
      label: {
        label: service?.isActive ? (
          <SwitchOnSVG
            stroke="#00aa00"
            dimensions={22}
            className="group-hover:stroke-white duration-300 transition-colors"
          />
        ) : (
          <SwitchOffSVG
            stroke="#aa0000"
            dimensions={22}
            className="group-hover:stroke-[#eeeeee98] transition-colors duration-300"
          />
        ),
        type: "svg"
      },
      action: {
        action: () =>
          completion === 100
            ? (() => {
                onToggleActive(
                  service._id,
                  !service.isActive
                );
              })()
            : handleIncompleteToggleActive,
        type: "function"
      }
    });
    // actions -------------------------------------
    row.push({
      label: {
        label: (
          <ServiceActions
            href={{
              editHref: `${currPath}/edit/${service?._id}`,
              viewHref: `/services/${toSlug(service?.name)}`
            }}
            onDelete={() => {
              onDelete(service?._id);
            }}
          />
        ),
        type: "svg"
      },
      action: { action: <></>, type: "component" }
    });

    servicesData.data.push(row);
  }

  return <AdminTable data={servicesData} />;
}
