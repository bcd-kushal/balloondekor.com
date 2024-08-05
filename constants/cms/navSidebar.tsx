import {
  AdminSVG,
  CategorySVG,
  ContentsSVG,
  CustomerSVG,
  DashboardSVG,
  ImageSVG,
  OrderSVG,
  PagesSVG,
  PresetSVG,
  SettingsSVG
} from "../svgs/svg";

export type SidebarSectionsType = {
  heading: string;
  headingLinkPath: string;
  icon: JSX.Element;
  links: { label: string; path: string }[];
}[];

export const HEADING = "Admin Panel";

export const SECTIONS: SidebarSectionsType = [
  {
    heading: "dashboard",
    headingLinkPath: "/cms/dashboard",
    icon: <DashboardSVG />,
    links: []
  },
  {
    heading: "presets",
    headingLinkPath: "",
    icon: <PresetSVG />,
    links: [
      {
        label: "advance payments",
        path: "/cms/presets/advance-payments"
      },
      {
        label: "AI tags",
        path: "/cms/presets/ai-tags"
      },
      {
        label: "brands",
        path: "/cms/presets/brands"
      },
      {
        label: "cancellation policy",
        path: "/cms/presets/cancellation-policy"
      },
      {
        label: "care info",
        path: "/cms/presets/care-info"
      },
      {
        label: "cities",
        path: "/cms/presets/cities"
      },
      {
        label: "colors",
        path: "/cms/presets/colors"
      },
      {
        label: "coupons",
        path: "/cms/presets/coupons"
      },
      {
        label: "customization questions",
        path: "/cms/presets/customization-questions"
      },
      {
        label: "delivery details",
        path: "/cms/presets/delivery-details"
      },
      {
        label: "delivery types",
        path: "/cms/presets/delivery-types"
      },
      {
        label: "FAQs",
        path: "/cms/presets/faqs"
      },
      {
        label: "general tags",
        path: "/cms/presets/general-tags"
      },
      {
        label: "GSTs",
        path: "/cms/presets/gsts"
      },
      {
        label: "occasions",
        path: "/cms/presets/occasions"
      },
      {
        label: "order processing time",
        path: "/cms/presets/order-processing-time"
      },
      {
        label: "package tags",
        path: "/cms/presets/package-tags"
      },
      {
        label: "relations",
        path: "/cms/presets/relations"
      },
      {
        label: "reviews",
        path: "/cms/presets/reviews"
      },
      {
        label: "states",
        path: "/cms/presets/states"
      },
      {
        label: "units",
        path: "/cms/presets/units"
      },
      {
        label: "venues",
        path: "/cms/presets/venues"
      }
    ]
  },
  {
    heading: "categories",
    headingLinkPath: "",
    icon: <CategorySVG />,
    links: [
      {
        label: "addons",
        path: "/cms/categories/addons"
      },
      {
        label: "services",
        path: "/cms/categories/services"
      },
      {
        label: "pages",
        path: "/cms/page"
      },
      {
        label: "sub pages",
        path: "/cms/sub-page"
      }
    ]
  },
  {
    heading: "images",
    headingLinkPath: "",
    icon: <ImageSVG />,
    links: [
      {
        label: "Manage All",
        path: "/cms/images"
      },
      {
        label: "folders",
        path: "/cms/images/folders"
      },
      {
        label: "add folder",
        path: "/cms/images/folders/add"
      },
      {
        label: "add image",
        path: "/cms/images/add-image"
      }
    ]
  },
  {
    heading: "content",
    headingLinkPath: "",
    icon: <ContentsSVG />,
    links: [
      {
        label: "addons",
        path: "/cms/content/addons"
      },
      {
        label: "services",
        path: "/cms/content/services"
      }
    ]
  },
  {
    heading: "pages",
    headingLinkPath: "",
    icon: <PagesSVG />,
    links: [
      {
        label: "header",
        path: "/cms/pages/header"
      },
      {
        label: "footer",
        path: "/cms/pages/footer"
      },
      {
        label: "home",
        path: "/cms/pages/home"
      },
      {
        label: "dynamic",
        path: "/cms/pages/dynamic"
      }
    ]
  },
  {
    heading: "orders",
    headingLinkPath: "",
    icon: <OrderSVG />,
    links: [
      {
        label: "new orders",
        path: "/cms/orders/new-orders"
      },
      {
        label: "in progress",
        path: "/cms/orders/in-progress"
      },
      {
        label: "delivered",
        path: "/cms/orders/delivered"
      },
      {
        label: "failed",
        path: "/cms/orders/failed-orders"
      },
      {
        label: "cancelled",
        path: "/cms/orders/cancelled"
      }
    ]
  },
  {
    heading: "customers",
    headingLinkPath: "",
    icon: <CustomerSVG />,
    links: [
      {
        label: "all customers",
        path: "/cms/customers"
      },
      {
        label: "callbacks",
        path: "/cms/customers/callbacks"
      },
      {
        label: "leads",
        path: "/cms/customers/leads"
      },
      {
        label: "add customer",
        path: "/cms/customers/add"
      }
    ]
  },
  {
    heading: "admin",
    headingLinkPath: "",
    icon: <AdminSVG />,
    links: [
      {
        label: "update admin",
        path: "/cms/admin"
      }
      // {
      //   label: "add admin",
      //   path: "/cms/admin/add"
      // },
      // {
      //   label: "privileges",
      //   path: "/cms/admin/privileges"
      // }
    ]
  },
  {
    heading: "settings",
    headingLinkPath: "",
    icon: <SettingsSVG />,
    links: [
      {
        label: "auth",
        path: "/cms/settings/auth"
      },
      {
        label: "logo",
        path: "/cms/settings/logo"
      },
      {
        label: "socials",
        path: "/cms/settings/socials"
      },
      {
        label: "contacts",
        path: "/cms/settings/contacts"
      },
      {
        label: "trending search",
        path: "/cms/settings/trending"
      },
      {
        label: "sitemap",
        path: "/cms/settings/sitemap"
      }
    ]
  }
];
