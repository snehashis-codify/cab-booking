import { Id, ImageType } from "./type";

interface CardListObjType {
  id: Id;
  name: CardType;
  card_image: ImageType;
}
type CardType = "Mastercard" | "Visa" | "Apple Pay" | "GPay" | "Cash";
export type CardList = Array<CardListObjType>;
