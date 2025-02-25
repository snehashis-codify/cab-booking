import { carList } from "@/constants/constant";
import { Id } from "@/types/type";
import { useState } from "react";

function Cars() {
  const [selectorChange, setSelectorChange] = useState<Id>(1);
  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select Car</h2>
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {carList?.map((data) => (
          <div
            key={data.id}
            className={`m-2 p-2 bg-white shadow-lg hover:shadow-xl border-[1px] rounded-md hover:border-yellow-400 cursor-pointer ${data.id === selectorChange ? "border-[2px] border-yellow-500" : null}`}
            onClick={() => setSelectorChange(data.id)}
          >
            <img
              src={data.car_image.path}
              alt={data.car_image.name}
              width={75}
              height={90}
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <h2 className="text-[12px] text-gray-500">{data.car_type}</h2>
              <span className="float-right text-black font-medium">
                ₹{data.car_price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
