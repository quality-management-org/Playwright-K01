export type PaymentMethod =
  | "Bank Transfer"
  | "Cash on Delivery"
  | "Credit Card"
  | "Buy Now Pay Later"
  | "Gift Card";
export type GiftCard = {
  giftCardNumber: string;
  validationCode: string;
};
export const giftCard = {
  giftCardNumber: "1234567890123456",
  validationCode: "1A2B",
};