// libraries
import Image from "next/image";

// components
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { BinActions } from "./BinActions";

// utils
import { calculateCompletionPercentage } from "@/components/cms/service/ServiceList";

// types
import { ImageDocument } from "@/schemas/cms/image";
import { ServiceDocument } from "@/schemas/cms/service";
import { ServiceCategoryDocument } from "@/schemas/cms/serviceCategory";

export default function ServiceBinList({
  offset,
  services,
  onRestore,
  onDelete
}: {
  offset: number;
  services: ServiceDocument[];
  onRestore: (serviceId: string) => void;
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
      { label: "Actions", span: 2 }
    ],

    data: [],
    offset: offset
  };

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
    // actions -------------------------------------
    row.push({
      label: {
        label: (
          <BinActions
            onRestore={() => {
              onRestore(service?._id);
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
