// libraries
import { model, models } from "mongoose";

// schemas
import {
  addonSchema,
  AddonDocument,
  AddonModel
} from "@/schemas/cms/addon";
import {
  addonCategorySchema,
  AddonCategoryDocument,
  AddonCategoryModel
} from "@/schemas/cms/addonCategory";
import {
  adminSchema,
  AdminDocument,
  AdminModel
} from "@/schemas/cms/admin";
import {
  advancePaymentSchema,
  AdvancePaymentDocument,
  AdvancePaymentModel
} from "@/schemas/cms/advancePayment";
import {
  aiTagSchema,
  AITagDocument,
  AITagModel
} from "@/schemas/cms/aiTag";
import {
  AllLeadsDocument,
  AllLeadsModel,
  allLeadsSchema
} from "@/schemas/cms/allLeads";
import {
  brandSchema,
  BrandDocument,
  BrandModel
} from "@/schemas/cms/brand";
import {
  cancellationPolicySchema,
  CancellationPolicyDocument,
  CancellationPolicyModel
} from "@/schemas/cms/cancellationPolicy";
import {
  careInfoSchema,
  CareInfoDocument,
  CareInfoModel
} from "@/schemas/cms/careInfo";
import {
  citySchema,
  CityDocument,
  CityModel
} from "@/schemas/cms/city";
import {
  colorSchema,
  ColorDocument,
  ColorModel
} from "@/schemas/cms/color";
import {
  couponSchema,
  CouponDocument,
  CouponModel
} from "@/schemas/cms/coupon";
import {
  customerSchema,
  CustomerDocument,
  CustomerModel
} from "@/schemas/cms/customer";
import {
  customizationQuestionSchema,
  CustomizationQuestionDocument,
  CustomizationQuestionModel
} from "@/schemas/cms/customizationQuestion";
import {
  deliveryDetailSchema,
  DeliveryDetailDocument,
  DeliveryDetailModel
} from "@/schemas/cms/deliveryDetail";
import {
  deliveryTypeSchema,
  DeliveryTypeDocument,
  DeliveryTypeModel
} from "@/schemas/cms/deliveryType";
import {
  DynamicPageDocument,
  DynamicPageModel,
  dynamicPageSchema
} from "@/schemas/cms/dynamicPage";
import {
  faqSchema,
  FAQDocument,
  FAQModel
} from "@/schemas/cms/faq";
import {
  folderSchema,
  FolderDocument,
  FolderModel
} from "@/schemas/cms/folder";
import {
  footerLinkSectionSchema,
  FooterLinkSectionDocument,
  FooterLinkSectionModel
} from "@/schemas/cms/footerLinkSection";
import {
  generalTagSchema,
  GeneralTagDocument,
  GeneralTagModel
} from "@/schemas/cms/generalTag";
import {
  gstSchema,
  GSTDocument,
  GSTModel
} from "@/schemas/cms/gst";
import {
  homepageLayoutSchema,
  HomepageLayoutDocument,
  HomepageLayoutModel
} from "@/schemas/cms/homepage";
import {
  imageSchema,
  ImageDocument,
  ImageModel
} from "@/schemas/cms/image";
import {
  leadSchema,
  LeadDocument,
  LeadModel
} from "@/schemas/cms/lead";
import {
  navLinkSchema,
  NavLinkDocument,
  NavLinkModel
} from "@/schemas/cms/navLink";
import {
  occasionSchema,
  OccasionDocument,
  OccasionModel
} from "@/schemas/cms/occasion";
import {
  orderSchema,
  OrderDocument,
  OrderModel
} from "@/schemas/cms/order";
import {
  orderDetailSchema,
  OrderDetailDocument,
  OrderDetailModel
} from "@/schemas/cms/orderDetail";
import {
  orderProcessingTimeSchema,
  OrderProcessingTimeDocument,
  OrderProcessingTimeModel
} from "@/schemas/cms/orderProcessingTime";
import {
  packageTagSchema,
  PackageTagDocument,
  PackageTagModel
} from "@/schemas/cms/packageTag";
import {
  pageSchema,
  PageDocument,
  PageModel
} from "@/schemas/cms/page";
import {
  productSchema,
  ProductDocument,
  ProductModel
} from "@/schemas/cms/product";
import {
  relationSchema,
  RelationDocument,
  RelationModel
} from "@/schemas/cms/relation";
import {
  reviewsSchema,
  ReviewDocument,
  ReviewModel
} from "@/schemas/cms/review";
import {
  serviceSchema,
  ServiceDocument,
  ServiceModel
} from "@/schemas/cms/service";
import {
  serviceCategorySchema,
  ServiceCategoryDocument,
  ServiceCategoryModel
} from "@/schemas/cms/serviceCategory";
import {
  serviceTypeOptionSchema,
  ServiceTypeOptionDocument,
  ServiceTypeOptionModel
} from "@/schemas/cms/serviceTypeOption";
import {
  settingSchema,
  SettingDocument,
  SettingModel
} from "@/schemas/cms/setting";
import {
  stateSchema,
  StateDocument,
  StateModel
} from "@/schemas/cms/state";
import {
  subPageSchema,
  SubPageDocument,
  SubPageModel
} from "@/schemas/cms/subPage";
import {
  trendingSchema,
  TrendingDocument,
  TrendingModel
} from "@/schemas/cms/trending";
import {
  unitSchema,
  UnitDocument,
  UnitModel
} from "@/schemas/cms/unit";
import {
  venueSchema,
  VenueDocument,
  VenueModel
} from "@/schemas/services/venue";

// types
type ModelsType = {
  Addons: AddonModel;
  AddonCategories: AddonCategoryModel;
  Admins: AdminModel;
  AdvancePayments: AdvancePaymentModel;
  AllLeads: AllLeadsModel;
  AITags: AITagModel;
  Brands: BrandModel;
  CareInfos: CareInfoModel;
  CancellationPolicies: CancellationPolicyModel;
  Cities: CityModel;
  Colors: ColorModel;
  Coupons: CouponModel;
  Customers: CustomerModel;
  CustomizationQuestions: CustomizationQuestionModel;
  DeliveryDetails: DeliveryDetailModel;
  DeliveryTypes: DeliveryTypeModel;
  DynamicPages: DynamicPageModel;
  FAQs: FAQModel;
  FooterLinkSections: FooterLinkSectionModel;
  Folders: FolderModel;
  GeneralTags: GeneralTagModel;
  GSTs: GSTModel;
  HomepageLayouts: HomepageLayoutModel;
  Images: ImageModel;
  Leads: LeadModel;
  NavLinks: NavLinkModel;
  Occasions: OccasionModel;
  Orders: OrderModel;
  OrderDetails: OrderDetailModel;
  OrderProcessingTimes: OrderProcessingTimeModel;
  PackageTags: PackageTagModel;
  Pages: PageModel;
  Products: ProductModel;
  Relations: RelationModel;
  Reviews: ReviewModel;
  Services: ServiceModel;
  ServiceCategories: ServiceCategoryModel;
  ServiceTypeOptions: ServiceTypeOptionModel;
  Settings: SettingModel;
  States: StateModel;
  SubPages: SubPageModel;
  Trendings: TrendingModel;
  Units: UnitModel;
  Venues: VenueModel;
};

// models
const MODELS: ModelsType = {
  Addons:
    models.Addon ||
    model<AddonDocument, AddonModel>(
      "Addon",
      addonSchema
    ),
  AddonCategories:
    models.AddonCategory ||
    model<
      AddonCategoryDocument,
      AddonCategoryModel
    >("AddonCategory", addonCategorySchema),
  Admins:
    models.Admin ||
    model<AdminDocument, AdminModel>(
      "Admin",
      adminSchema
    ),
  AdvancePayments:
    models.AdvancePayment ||
    model<
      AdvancePaymentDocument,
      AdvancePaymentModel
    >("AdvancePayment", advancePaymentSchema),
  AITags:
    models.AITag ||
    model<AITagDocument, AITagModel>(
      "AITag",
      aiTagSchema
    ),
  AllLeads:
    models.AllLeads ||
    model<AllLeadsDocument, AllLeadsModel>(
      "AllLeads",
      allLeadsSchema
    ),
  Brands:
    models.Brand ||
    model<BrandDocument, BrandModel>(
      "Brand",
      brandSchema
    ),
  CareInfos:
    models.CareInfo ||
    model<CareInfoDocument, CareInfoModel>(
      "CareInfo",
      careInfoSchema
    ),
  CancellationPolicies:
    models.CancellationPolicy ||
    model<
      CancellationPolicyDocument,
      CancellationPolicyModel
    >(
      "CancellationPolicy",
      cancellationPolicySchema
    ),
  Cities:
    models.City ||
    model<CityDocument, CityModel>(
      "City",
      citySchema
    ),
  Colors:
    models.Color ||
    model<ColorDocument, ColorModel>(
      "Color",
      colorSchema
    ),
  Coupons:
    models.Coupon ||
    model<CouponDocument, CouponModel>(
      "Coupon",
      couponSchema
    ),
  Customers:
    models.Customer ||
    model<CustomerDocument, CustomerModel>(
      "Customer",
      customerSchema
    ),
  CustomizationQuestions:
    models.CustomizationQuestion ||
    model<
      CustomizationQuestionDocument,
      CustomizationQuestionModel
    >(
      "CustomizationQuestion",
      customizationQuestionSchema
    ),
  DeliveryDetails:
    models.DeliveryDetail ||
    model<
      DeliveryDetailDocument,
      DeliveryDetailModel
    >("DeliveryDetail", deliveryDetailSchema),
  DeliveryTypes:
    models.DeliveryType ||
    model<
      DeliveryTypeDocument,
      DeliveryTypeModel
    >("DeliveryType", deliveryTypeSchema),
  DynamicPages:
    models.DynamicPage ||
    model<DynamicPageDocument, DynamicPageModel>(
      "DynamicPage",
      dynamicPageSchema
    ),
  FAQs:
    models.FAQ ||
    model<FAQDocument, FAQModel>(
      "FAQ",
      faqSchema
    ),
  Folders:
    models.Folder ||
    model<FolderDocument, FolderModel>(
      "Folder",
      folderSchema
    ),
  FooterLinkSections:
    models.FooterLinkSection ||
    model<
      FooterLinkSectionDocument,
      FooterLinkSectionModel
    >(
      "FooterLinkSection",
      footerLinkSectionSchema
    ),
  GeneralTags:
    models.GeneralTag ||
    model<GeneralTagDocument, GeneralTagModel>(
      "GeneralTag",
      generalTagSchema
    ),
  GSTs:
    models.GST ||
    model<GSTDocument, GSTModel>(
      "GST",
      gstSchema
    ),
  HomepageLayouts:
    models.HomepageLayout ||
    model<
      HomepageLayoutDocument,
      HomepageLayoutModel
    >("HomepageLayout", homepageLayoutSchema),
  Images:
    models.Image ||
    model<ImageDocument, ImageModel>(
      "Image",
      imageSchema
    ),
  Leads:
    models.Lead ||
    model<LeadDocument, LeadModel>(
      "Lead",
      leadSchema
    ),
  NavLinks:
    models.NavLink ||
    model<NavLinkDocument, NavLinkModel>(
      "NavLink",
      navLinkSchema
    ),
  Occasions:
    models.Occasion ||
    model<OccasionDocument, OccasionModel>(
      "Occasion",
      occasionSchema
    ),
  Orders:
    models.Order ||
    model<OrderDocument, OrderModel>(
      "Order",
      orderSchema
    ),
  OrderDetails:
    models.OrderDetail ||
    model<OrderDetailDocument, OrderDetailModel>(
      "OrderDetail",
      orderDetailSchema
    ),
  OrderProcessingTimes:
    models.OrderProcessingTime ||
    model<
      OrderProcessingTimeDocument,
      OrderProcessingTimeModel
    >(
      "OrderProcessingTime",
      orderProcessingTimeSchema
    ),
  PackageTags:
    models.PackageTag ||
    model<PackageTagDocument, PackageTagModel>(
      "PackageTag",
      packageTagSchema
    ),
  Pages:
    models.Page ||
    model<PageDocument, PageModel>(
      "Page",
      pageSchema
    ),
  Products:
    models.Product ||
    model<ProductDocument, ProductModel>(
      "Product",
      productSchema
    ),
  Relations:
    models.Relation ||
    model<RelationDocument, RelationModel>(
      "Relation",
      relationSchema
    ),
  Reviews:
    models.Reviews ||
    model<ReviewDocument, ReviewModel>(
      "Reviews",
      reviewsSchema
    ),
  Services:
    models.Service ||
    model<ServiceDocument, ServiceModel>(
      "Service",
      serviceSchema
    ),
  ServiceCategories:
    models.ServiceCategory ||
    model<
      ServiceCategoryDocument,
      ServiceCategoryModel
    >("ServiceCategory", serviceCategorySchema),
  ServiceTypeOptions:
    models.ServiceTypeOption ||
    model<
      ServiceTypeOptionDocument,
      ServiceTypeOptionModel
    >(
      "ServiceTypeOption",
      serviceTypeOptionSchema
    ),
  Settings:
    models.Setting ||
    model<SettingDocument, SettingModel>(
      "Setting",
      settingSchema
    ),
  States:
    models.State ||
    model<StateDocument, StateModel>(
      "State",
      stateSchema
    ),
  SubPages:
    models.SubPage ||
    model<SubPageDocument, SubPageModel>(
      "SubPage",
      subPageSchema
    ),
  Trendings:
    models.Trending ||
    model<TrendingDocument, TrendingModel>(
      "Trending",
      trendingSchema
    ),
  Units:
    models.Unit ||
    model<UnitDocument, UnitModel>(
      "Unit",
      unitSchema
    ),
  Venues:
    models.Venue ||
    model<VenueDocument, VenueModel>(
      "Venue",
      venueSchema
    )
};

// export
export default MODELS;
