import { DOMAIN } from "@/constants/frontend/apiRoute";

export const generateInvoicePdf = async (
  pdfParams: object
) => {
  try {
    const fetchUrl = `${DOMAIN}/api/frontend/order/invoice`;
    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pdfParams)
    });

    const blob = await response.blob();

    return blob;
  } catch (err: any) {
    console.error(
      `Error downloading invoice:`,
      err
    );
  }
};
