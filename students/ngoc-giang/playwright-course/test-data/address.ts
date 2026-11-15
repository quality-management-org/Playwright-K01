import { test, expect } from "@playwright/test";
type Address = {
  country: string;
  postalCode: string;
  houseNumber: number;
  street: string;
  city: string;
  state: string;
};
export const address = {
  country: "Viet Nam",
  postalCode: "1000",
  houseNumber: "12345967",
  street: "Xuan Thuy",
  city: "Ha Noi",
  state: "Cau Giay",
};
