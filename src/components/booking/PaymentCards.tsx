import { cardsList } from "@/constants/constant";
import { Id } from "@/types/type";
import { useState } from "react";

function PaymentCards() {
  const [selectedPaymentId, setSelectedPaymentId] = useState<Id>(0);
  return (
    <div>
      <h2 className="font-semibold">Payment Methods</h2>
      <div className="grid grid-cols-5 mt-2 pl-2">
        {cardsList.map((card) => (
          <div
            key={card.id}
            className={`w-[50px] border-[1px] flex items-center justify-center rounded-md cursor-pointer hover:scale-110 transition-all hover:border-yellow-400 ${selectedPaymentId === card.id ? "border-yellow-500 border-[2px]" : null}`}
            onClick={() => setSelectedPaymentId(card.id)}
          >
            <img
              src={card.card_image.path}
              alt={card.card_image.name}
              width={45}
              height={55}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentCards;
