import { DOMAIN } from "@/constants/frontend/apiRoute";
import {
  getCustomerByMail,
  getCustomerByMobileNumber
} from "@/fetchAPIs/frontend/customer";
import { AllLeadsDocument } from "@/schemas/cms/allLeads";
import { CityDocument } from "@/schemas/cms/city";
import { CustomerDocument } from "@/schemas/cms/customer";
import { LineItemDocument } from "@/schemas/cms/lineItem";

const saveLeadData = (
  leadData: AllLeadsDocument
) => {
  fetch(`${DOMAIN}/api/frontend/all-leads`, {
    method: "POST",
    body: JSON.stringify(leadData)
  }).then((res) => res.json());
};

export const handleLeadData = ({
  mobile,
  cart,
  city,
  userStatus
}: HandleLeadDataType) => {
  const isEmail = mobile.includes("@");

  // SEND REGISTERED EMAIL LEAD DATA HERE ------------------------------------------------------------------
  if (isEmail) {
    getCustomerByMail(mobile).then((res) => {
      const doc =
        (res as Partial<CustomerDocument>) ||
        null;

      const leadFullData: AllLeadsDocument = {
        customerId: doc ? doc._id : undefined,
        mobile: mobile,
        name: doc ? doc.name : undefined,
        cartItems: cart,
        city: city ? city._id : undefined,
        type: doc ? "registered" : "unregistered",
        status: ""
      } as AllLeadsDocument;

      saveLeadData(leadFullData);
    });

    // SEND REGISTERED MOBILE LEAD DATA HERE ------------------------------------------------------------------
  } else {
    getCustomerByMobileNumber(mobile).then(
      (res) => {
        const doc =
          (res as Partial<CustomerDocument>) ||
          null;

        const leadFullData: AllLeadsDocument = {
          customerId: doc ? doc._id : undefined,
          mobile: mobile,
          name: doc ? doc.name : undefined,
          cartItems: cart,
          city: city ? city._id : undefined,
          type: doc
            ? "registered"
            : "unregistered",
          status: ""
        } as AllLeadsDocument;

        saveLeadData(leadFullData);
      }
    );
  }
};

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

type HandleLeadDataType = {
  cart: Partial<LineItemDocument>[] | undefined;
  mobile: string;
  city: CityDocument | undefined;
  userStatus:
    | "unchecked"
    | "registered"
    | "not-registered";
  customerInfo: Partial<CustomerDocument> | null;
};

type CustomerLeadFragmentDataType = {
  name?: string;
};
