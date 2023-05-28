export interface ProductNote {
  note_title: string; // 註記描述
  use_money: number; // 影響金額
  is_food_consumption: boolean; // 是否消耗食材
  food_consumption_list: Array<FoodConsumption>; // 食材清單 [{id:1, food_name:'澳洲牛舌', quantity:200, unit:'克'}]
}

export interface FoodConsumption {
  id: string;
  consumption_quantity: number; // 消耗數量
}
