import { Button } from "../ui/button";
import AutoCompleteAddress from "./AutoCompleteAddress";
import Cars from "./Cars";
import PaymentCards from "./PaymentCards";

function Booking() {
  const screenHeight = window.innerHeight * 0.8;
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold tracking-tight">Booking</h2>
      <div
        className="border-[1px] p-5 rounded-md"
        style={{ height: screenHeight }}
      >
        <AutoCompleteAddress />
        <Cars />
        <PaymentCards />
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 rounded-md mt-4">
          Book
        </Button>
      </div>
    </div>
  );
}

export default Booking;
