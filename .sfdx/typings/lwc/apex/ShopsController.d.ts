declare module "@salesforce/apex/ShopsController.getShops" {
  export default function getShops(): Promise<any>;
}
declare module "@salesforce/apex/ShopsController.getFilteredShops" {
  export default function getFilteredShops(param: {searchText: any}): Promise<any>;
}
declare module "@salesforce/apex/ShopsController.insertShops" {
  export default function insertShops(param: {s: any, addr: any}): Promise<any>;
}
declare module "@salesforce/apex/ShopsController.getStates" {
  export default function getStates(param: {objectName: any, fieldName: any}): Promise<any>;
}
declare module "@salesforce/apex/ShopsController.deleteShop" {
  export default function deleteShop(param: {recId: any}): Promise<any>;
}
declare module "@salesforce/apex/ShopsController.updateShop" {
  export default function updateShop(param: {s: any, addr: any}): Promise<any>;
}
