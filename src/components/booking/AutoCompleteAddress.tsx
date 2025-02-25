import { MapPin } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useReducer, useState } from "react";
import { fetchAddressList } from "@/lib/features/maps/mapSlice";
import {
  SourceAddressAction,
  SourceAddressActionKind,
  SourceAddressState,
} from "@/types/map";
const sourceAddressReducer = (
  state: SourceAddressState,
  action: SourceAddressAction
): SourceAddressState => {
  const { type, payload } = action;
  switch (type) {
    case SourceAddressActionKind.SOURCEADDRESSONCHANGE:
      return { addressVal: payload, isAddressChange: payload !== "" };

    case SourceAddressActionKind.SOURCEADDRESSONCLICK:
      return { addressVal: payload, isAddressChange: !state.isAddressChange };
  }
};
function AutoCompleteAddress() {
  const dispatch = useAppDispatch();
  const { addressList } = useAppSelector((state) => state.map);
  const [sourceAddress, dispatchSourceAddressChange] = useReducer(
    sourceAddressReducer,
    {
      addressVal: "",
      isAddressChange: false,
    }
  );
  const [destinationAddress, setDestinationAddress] = useState<string>("");
  const [destinationChange, setDestinationChange] = useState<boolean>(false);
  useEffect(() => {
    const debounceAddressFunc = setTimeout(() => {
      if (sourceAddress.addressVal !== "") {
        dispatch(fetchAddressList({ sourceAddress: sourceAddress.addressVal }));
      }
      if (destinationAddress !== "") {
        dispatch(fetchAddressList({ sourceAddress: destinationAddress }));
      }
    }, 1000);
    return () => clearTimeout(debounceAddressFunc);
  }, [sourceAddress.addressVal, destinationAddress, dispatch]);

  return (
    <div>
      <div className="mt-4 space-y-4">
        <div className="space-y-2 relative">
          <Label htmlFor="from">Where From?</Label>
          <div className="relative">
            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="from"
              placeholder="Enter pickup location"
              className="pl-8"
              value={sourceAddress.addressVal}
              onChange={(e) =>
                dispatchSourceAddressChange({
                  type: SourceAddressActionKind.SOURCEADDRESSONCHANGE,
                  payload: e.target.value,
                })
              }
            />
          </div>
          {addressList.length > 0 && sourceAddress.isAddressChange && (
            <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-10">
              {addressList.map((data, idx) => (
                <h2
                  key={idx}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    dispatchSourceAddressChange({
                      type: SourceAddressActionKind.SOURCEADDRESSONCLICK,
                      payload: data.full_address
                        ? data.full_address
                        : data.name,
                    })
                  }
                >
                  {data.full_address ? data.full_address : data.name}
                </h2>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="to">Where To?</Label>
          <div className="relative">
            <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="to"
              placeholder="Enter destination"
              className="pl-8"
              value={destinationAddress}
              onChange={(e) => {
                setDestinationAddress(e.target.value);
                setDestinationChange(true);
              }}
            />
          </div>
          {addressList.length > 0 && destinationChange && (
            <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-10">
              {addressList.map((data, idx) => (
                <h2
                  key={idx}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDestinationAddress(
                      data.full_address ? data.full_address : data.name
                    );
                    setDestinationChange(false);
                  }}
                >
                  {data.full_address ? data.full_address : data.name}
                </h2>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AutoCompleteAddress;
