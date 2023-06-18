export enum FoodItemsStatus {
  IN_USE = '0', // 使用中
  BELOW_SAFETY_STOCK = '1', // 低於安全庫存
  DISABLED = '2', // 停用
}

export interface ProductNote {
  id: string;
  note_title: string; // 註記描述
  use_money: number; // 影響金額
  is_food_consumption: boolean; // 是否消耗食材
  food_consumption_list: Array<FoodConsumption>; // 食材清單 [{id:1, food_name:'澳洲牛舌', quantity:200, unit:'克'}]
}

export interface FoodConsumption {
  id: string;
  food_name: string; // 食材名稱
  quantity: number; // 消耗數量
  unit: string; // 單位
}
