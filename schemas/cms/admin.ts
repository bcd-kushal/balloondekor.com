// libraries
import {
  Document,
  Model,
  Schema
} from "mongoose";

// types
export interface PermissionsDocument
  extends Document {
  preset: [boolean, boolean, boolean, boolean];
  category: [boolean, boolean, boolean, boolean];
  orderManagement: [
    boolean,
    boolean,
    boolean,
    boolean
  ];
  customerManagement: [
    boolean,
    boolean,
    boolean,
    boolean
  ];
  adminManagement: [
    boolean,
    boolean,
    boolean,
    boolean
  ];
  productManagement: [
    boolean,
    boolean,
    boolean,
    boolean
  ];
  imageManagement: [
    boolean,
    boolean,
    boolean,
    boolean
  ];
  settings: [boolean, boolean, boolean, boolean];
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminDocument extends Document {
  userName: string;
  password: string;
  answer: string;
  isSuperAdmin: boolean;
  // permissions: PermissionsDocument;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminModel
  extends Model<AdminDocument> {}

// schemas
const permissionsSchema =
  new Schema<PermissionsDocument>(
    {
      preset: {
        type: [
          Boolean,
          Boolean,
          Boolean,
          Boolean
        ],
        required: true
      },
      category: {
        type: [
          Boolean,
          Boolean,
          Boolean,
          Boolean
        ],
        required: true
      },
      orderManagement: {
        type: [
          Boolean,
          Boolean,
          Boolean,
          Boolean
        ],
        required: true
      },
      customerManagement: {
        type: [
          Boolean,
          Boolean,
          Boolean,
          Boolean
        ],
        required: true
      },
      adminManagement: {
        type: [
          Boolean,
          Boolean,
          Boolean,
          Boolean
        ],
        required: true
      },
      productManagement: {
        type: [
          Boolean,
          Boolean,
          Boolean,
          Boolean
        ],
        required: true
      },
      imageManagement: {
        type: [
          Boolean,
          Boolean,
          Boolean,
          Boolean
        ],
        required: true
      },
      settings: {
        type: [
          Boolean,
          Boolean,
          Boolean,
          Boolean
        ],
        required: true
      }
    },
    {
      timestamps: true
    }
  );

export const adminSchema = new Schema<
  AdminDocument,
  AdminModel
>(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password is too short"]
    },
    answer: {
      type: String,
      required: true
    },
    isSuperAdmin: {
      type: Boolean,
      required: true
    },
    // permissions: {
    //   type: permissionsSchema,
    //   required: true
    // },
    isDeleted: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);
