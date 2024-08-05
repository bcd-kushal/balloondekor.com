import {
  CartDetailsType,
  CouponType
} from "../types";

export const cartDetails: CartDetailsType[] = [
  {
    serviceId: "60bd0360a8b17f44e8c5e575",
    serviceName: "Flower Bouquet   ykegfyaeu",
    serviceImage: {
      alt: "Flower bouquet",
      url: "https://balloondekorrrr.vercel.app/detailsImgMain1.webp"
    },
    pricePerUnit: 300,
    totalUnits: 2,
    eventDate: new Date(),
    eventTime: "14:00 - 16:00",
    instruction: "random data",
    addons: [
      {
        id: "60bd0360a8b17f44e8c5e381",
        label: "Chocolate cake",
        amount: 1,
        price: 749,
        image: {
          alt: "chocolate cake",
          url: "https://7eventzz.vercel.app/p1.webp"
        }
      }
    ]
  },

  {
    serviceId: "60bd0360a8b17f44e8c5e576",
    serviceName: "White roses",
    serviceImage: {
      alt: "White roses",
      url: "https://7eventzz.vercel.app/f3.webp"
    },
    pricePerUnit: 79,
    totalUnits: 13,
    eventDate: new Date(),
    eventTime: "9:00 - 11:00",
    addons: []
  },

  {
    serviceId: "60bd0360a8b17f44e8c5e577",
    serviceName: "Gift Mini Pack",
    serviceImage: {
      alt: "Mini pack",
      url: "https://balloondekorrrr.vercel.app/dynamic-10.webp"
    },
    pricePerUnit: 1499,
    totalUnits: 1,
    eventDate: new Date(),
    eventTime: "14:00 - 16:00",
    addons: [
      {
        id: "60bd0360a8b17f44e8c5e38a",
        label: "Chocolate cake",
        amount: 1,
        price: 749,
        image: {
          alt: "chocolate cake",
          url: "https://7eventzz.vercel.app/p1.webp"
        }
      },
      {
        id: "60bd0360a8b17f44e8c5e38b",
        label: "Chocolate cake",
        amount: 1,
        price: 749,
        image: {
          alt: "chocolate cake",
          url: "https://7eventzz.vercel.app/p1.webp"
        }
      },
      {
        id: "60bd0360a8b17f44e8c5e38c",
        label: "Chocolate cake",
        amount: 1,
        price: 749,
        image: {
          alt: "chocolate cake",
          url: "https://7eventzz.vercel.app/p1.webp"
        }
      }
    ]
  }
];

export const couponData: Array<CouponType> = [
  {
    couponId: "C001",
    couponCode: "BALLOON24",
    discount: 0.15,
    discountType: "percentage",
    maxCap: 100,
    minReqAmount: 0
  },
  {
    couponId: "C002",
    couponCode: "GET125",
    discount: 125,
    discountType: "flat",
    maxCap: 125,
    minReqAmount: 0
  },
  {
    couponId: "C003",
    couponCode: "JAX410",
    discount: 410,
    discountType: "flat",
    maxCap: 410,
    minReqAmount: 0
  },
  {
    couponId: "C004",
    couponCode: "LUCKY30",
    discount: 0.3,
    discountType: "percentage",
    maxCap: 450,
    minReqAmount: 5000
  }
];

export const couponsData = [
  {
    label: "30% OFF upto ₹75",
    condition: "Save ₹75 with this code",
    code: "BALLOON24",
    details: [
      "Frill Ribbons",
      "50 Balloons On Ceiling",
      "Traveling Expenses"
    ]
  },
  {
    label: "Flat ₹125 OFF",
    condition:
      "Add items worth ₹50 more to unlock",
    code: "GET125",
    details: [
      "Frill Ribbons",
      "50 Balloons On Ceiling",
      "Traveling Expenses"
    ]
  },
  {
    label: "30% OFF upto ₹75",
    condition: "Save ₹75 with this code",
    code: "BALLOON24",
    details: [
      "Frill Ribbons",
      "50 Balloons On Ceiling",
      "Traveling Expenses"
    ]
  },
  {
    label: "Flat ₹125 OFF",
    condition:
      "Add items worth ₹50 more to unlock",
    code: "GET125",
    details: [
      "Frill Ribbons",
      "50 Balloons On Ceiling",
      "Traveling Expenses"
    ]
  }
];
