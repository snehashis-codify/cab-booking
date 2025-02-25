export interface MapSliceState {
  latitude: number | null;
  longitude: number | null;
  addressList: Array<AdressListObj>;
  error: null | string;
  loadingAddressList: boolean;
}
export enum SourceAddressActionKind {
  SOURCEADDRESSONCLICK = "SOURCEADDRESSONCLICK",
  SOURCEADDRESSONCHANGE = "SOURCEADDRESSONCHANGE",
}
export interface SourceAddressAction {
  type: SourceAddressActionKind;
  payload: string;
}
export interface SourceAddressState {
  addressVal: string;
  isAddressChange: boolean;
}
interface AdressListObj {
  full_address?: string;
  name: string;
  address?: string;
}
