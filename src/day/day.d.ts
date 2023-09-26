import { foodInterface } from "src/typeorm/day.entity";

export interface foodDetailsInterface {
  calories: Array<foodInterface>;
  protein: Array<foodInterface>;
  fat: Array<foodInterface>;
  carbohydrate: Array<foodInterface>;
}
