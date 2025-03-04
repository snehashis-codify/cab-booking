import { MapPin } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useReducer } from "react";
import {
  fetchAddressList,
  fetchMapdataByAddress,
} from "@/lib/features/maps/mapSlice";
import {
  AddressAction,
  AdressListObj,
  DestinationAddressActionKind,
  ReducerAddressState,
  SourceAddressActionKind,
} from "@/types/map";
const sourceAddressReducer = (
  state: ReducerAddressState,
  action: AddressAction
): ReducerAddressState => {
  const { type, payload } = action;
  switch (type) {
    case SourceAddressActionKind.SOURCEADDRESSONCHANGE:
      return { addressVal: payload, isAddressChange: payload !== "" };

    case SourceAddressActionKind.SOURCEADDRESSONCLICK:
      return { addressVal: payload, isAddressChange: !state.isAddressChange };
    default:
      return {
        addressVal: "",
        isAddressChange: false,
      };
  }
};
const destinationAddressReducer = (
  state: ReducerAddressState,
  action: AddressAction
): ReducerAddressState => {
  const { type, payload } = action;
  switch (type) {
    case DestinationAddressActionKind.DESTADDRESSONCHANGE:
      return { addressVal: payload, isAddressChange: payload !== "" };

    case DestinationAddressActionKind.DESTADDRESSONCLICK:
      return { addressVal: payload, isAddressChange: !state.isAddressChange };
    default:
      return {
        addressVal: "",
        isAddressChange: false,
      };
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
  const [destinationAddress, dispatchDestinationAddressChange] = useReducer(
    destinationAddressReducer,
    {
      addressVal: "",
      isAddressChange: false,
    }
  );
  function onSourceAddressClick(data: AdressListObj) {
    dispatchSourceAddressChange({
      type: SourceAddressActionKind.SOURCEADDRESSONCLICK,
      payload: data.address,
    });
    dispatch(
      fetchMapdataByAddress({ addressType: "source", mapboxId: data.mapbox_id })
    );
  }
  function onDestAddressClick(data: AdressListObj) {
    dispatchDestinationAddressChange({
      type: DestinationAddressActionKind.DESTADDRESSONCLICK,
      payload: data.address,
    });
    dispatch(
      fetchMapdataByAddress({
        addressType: "destination",
        mapboxId: data.mapbox_id,
      })
    );
  }
  console.log("AFTRET", addressList);
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
              onChange={(e) => {
                dispatchSourceAddressChange({
                  type: SourceAddressActionKind.SOURCEADDRESSONCHANGE,
                  payload: e.target.value,
                });
                const debounceSrcAddressFunc = setTimeout(() => {
                  if (e.target.value !== "") {
                    dispatch(fetchAddressList({ address: e.target.value }));
                  }
                }, 1000);
                return () => clearTimeout(debounceSrcAddressFunc);
              }}
            />
          </div>
          {addressList.length > 0 && sourceAddress.isAddressChange && (
            <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-10 overflow-scroll">
              {addressList.map((data, idx) => (
                <h2
                  key={idx}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onSourceAddressClick(data)}
                >
                  {data.address}
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
              value={destinationAddress.addressVal}
              onChange={(e) => {
                dispatchDestinationAddressChange({
                  type: DestinationAddressActionKind.DESTADDRESSONCHANGE,
                  payload: e.target.value,
                });
                const debounceDestAddressFunc = setTimeout(() => {
                  if (e.target.value !== "") {
                    dispatch(fetchAddressList({ address: e.target.value }));
                  }
                }, 1000);
                return () => clearTimeout(debounceDestAddressFunc);
              }}
            />
          </div>
          {addressList.length > 0 && destinationAddress.isAddressChange && (
            <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-10">
              {addressList.map((data, idx) => (
                <h2
                  key={idx}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onDestAddressClick(data)}
                >
                  {data.address}
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
