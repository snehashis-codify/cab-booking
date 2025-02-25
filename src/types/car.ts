import { Id, ImageType } from "./type";

interface CarListObjType {
  id: Id;
  car_type: CarType;
  car_price: number;
  car_image: ImageType;
}

type CarType = "Economy" | "MiniVan" | "Comfort" | "Luxury" | "Electric";
export type CarList = Array<CarListObjType>;
