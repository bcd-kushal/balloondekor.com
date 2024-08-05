// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface AuthMethodsDocument
  extends Document {
  mail: boolean;
  otp: boolean;
  whatsapp: boolean;
  google: boolean;
}

export interface AuthSettingDocument
  extends Document {
  default: "mail" | "otp" | "whatsapp";
  methods: AuthMethodsDocument;
}

export interface SettingDocument
  extends Document {
  auth: AuthSettingDocument;
  callback: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SettingModel
  extends Model<SettingDocument> {}

// schemas
export const authMethodsSchema =
  new Schema<AuthMethodsDocument>({
    mail: {
      type: Boolean,
      required: true,
      default: true
    },
    otp: {
      type: Boolean,
      required: true,
      default: true
    },
    whatsapp: {
      type: Boolean,
      required: true,
      default: true
    },
    google: {
      type: Boolean,
      required: true,
      default: true
    }
  });

export const authSettingSchema =
  new Schema<AuthSettingDocument>({
    default: {
      type: String,
      enum: ["mail", "otp", "whatsapp"],
      required: true,
      default: "mail"
    },
    methods: {
      type: authMethodsSchema,
      required: true
    }
  });

export const settingSchema = new Schema<
  SettingDocument,
  SettingModel
>(
  {
    auth: {
      type: authSettingSchema,
      required: true
    },
    callback: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  { timestamps: true }
);
