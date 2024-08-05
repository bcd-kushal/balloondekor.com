// types
import { ProductDocument } from "@/schemas/cms/product";

// styles
import AdminTable, {
  TableDataRowType,
  tableDataType
} from "@/components/common/table/admin/Table";
import { ProductAction } from "./ProductAction";
import { useStatusContext } from "@/hooks/useStatusContext";
import {
  SwitchOffSVG,
  SwitchOnSVG
} from "@/constants/svgs/svg";
import { usePathname } from "next/navigation";

const toSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, "-");
};

export default function ProductList({
  offset,
  products,
  onToggleActive,
  onDelete
}: {
  offset: number;
  products: ProductDocument[];
  onToggleActive: (
    productId: string,
    isActive: boolean
  ) => void;
  onDelete: (productId: string) => void;
}) {
  const productsData: tableDataType = {
    header: [
      { label: "Product", span: 4 },
      { label: "Active", span: 1 },
      { label: "Actions", span: 2 }
    ],

    data: []
  };
  const { addStatus } = useStatusContext();

  const handleIncompleteToggleActive = () => {
    addStatus([
      {
        type: "warning",
        message:
          "Can't Activate Incomplete product"
      }
    ]);
  };

  const currPath = usePathname();

  const n = products.length;
  for (let i = 0; i < n; i++) {
    const product = products[i];
    const row: TableDataRowType = [];

    // name -------------------------------------
    row.push({
      label: {
        label: product?.productName,
        type: "text"
      },
      action: { action: <></>, type: "none" }
    });

    // active -------------------------------------
    row.push({
      label: {
        label: product?.isActive ? (
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
        action: () => {
          onToggleActive(
            product._id,
            !product.isActive
          );
        },
        type: "function"
      }
    });
    // actions -------------------------------------
    row.push({
      label: {
        label: (
          <ProductAction
            href={{
              editHref: `${currPath}/edit/${product?._id}`,
              viewHref: `/products/${toSlug(product?.productName)}`
            }}
            alt={""}
            onDelete={() => {
              onDelete(product?._id);
            }}
            onLinkClick={() =>
              alert("EXTERNAL CLICK")
            }
          />
        ),
        type: "svg"
      },
      action: { action: <></>, type: "component" }
    });

    productsData.data.push(row);
  }

  return (
    <>
      <AdminTable data={productsData} />
    </>
  );
}
