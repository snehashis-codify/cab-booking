import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { CarList } from "@/types/car";
import { TabContentArrType } from "@/types/tabs";
import Car1 from "../assets/images/Car1.png";
import Car2 from "../assets/images/Car2.png";
import Car3 from "../assets/images/Car3.png";
import Car4 from "../assets/images/Car4.png";
import Car5 from "../assets/images/Car5.png";
import MasterCard from "../assets/images/Mastercard.png";
import Visa from "../assets/images/visa.png";
import ApplePay from "../assets/images/Apple_Pay.png";
import GooglePay from "../assets/images/GPay.png";
import Cash from "../assets/images/Cash.png";
import { CardList } from "@/types/card";
export const tabContentArr: TabContentArrType = [
  {
    value: "signin",
    Content: LoginForm,
  },
  {
    value: "signup",
    Content: RegisterForm,
  },
];

export const carList: CarList = [
  {
    id: 1,
    car_type: "Economy",
    car_price: 173,
    car_image: {
      name: "Car 1",
      path: Car1,
    },
  },
  {
    id: 2,
    car_type: "MiniVan",
    car_price: 300,
    car_image: {
      name: "Car 2",
      path: Car2,
    },
  },
  {
    id: 3,
    car_type: "Comfort",
    car_price: 500,
    car_image: {
      name: "Car 3",
      path: Car3,
    },
  },
  {
    id: 4,
    car_type: "Luxury",
    car_price: 700,
    car_image: {
      name: "Car 4",
      path: Car4,
    },
  },
  {
    id: 5,
    car_type: "Electric",
    car_price: 900,
    car_image: {
      name: "Car 5",
      path: Car5,
    },
  },
];

export const cardsList: CardList = [
  {
    id: 1,
    name: "Mastercard",
    card_image: {
      name: "master_card",
      path: MasterCard,
    },
  },
  {
    id: 2,
    name: "Visa",
    card_image: {
      name: "visa",
      path: Visa,
    },
  },
  {
    id: 3,
    name: "Apple Pay",
    card_image: {
      name: "apple_pay",
      path: ApplePay,
    },
  },
  {
    id: 4,
    name: "GPay",
    card_image: {
      name: "google_pay",
      path: GooglePay,
    },
  },
  {
    id: 5,
    name: "Cash",
    card_image: {
      name: "cash",
      path: Cash,
    },
  },
];
