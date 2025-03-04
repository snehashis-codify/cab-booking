export interface MapSliceState {
  sourceCords: CordinatesType;
  destinationCords: CordinatesType;
  addressList: Array<AdressListObj>;
  coordinates: Array<Array<number>>;
  distance: number;
  duration: number;
  error: null | string;
  loadingAddressList: boolean;
  loadingMapdatabyId: boolean;
  loadingRouteDirection: boolean;
}
export enum SourceAddressActionKind {
  SOURCEADDRESSONCLICK = "SOURCEADDRESSONCLICK",
  SOURCEADDRESSONCHANGE = "SOURCEADDRESSONCHANGE",
}
export enum DestinationAddressActionKind {
  DESTADDRESSONCLICK = "DESTADDRESSONCLICK",
  DESTADDRESSONCHANGE = "DESTADDRESSONCHANGE",
}
export interface AddressAction {
  type: SourceAddressActionKind | DestinationAddressActionKind;
  payload: string;
}
export interface ReducerAddressState {
  addressVal: string;
  isAddressChange: boolean;
}
export interface AdressListObj {
  address: string;
  mapbox_id: string;
}
export type CordinatesType = {
  latitude: number | null;
  longitude: number | null;
};
