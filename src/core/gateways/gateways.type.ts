export enum GATEWAY_NAMESPACE {
  ORDER = 'order',
}

export enum SUBSCRIBE {
  ORDER_PRODUCT_DETAILS = 'order-product-details', // 送出訂單
  UPDATE_PRODUCT_DETAILS = 'update-product-details', // 出菜、上菜
  DELETE_PRODUCT_DETAILS = 'delete-product-details', // 退點
}
