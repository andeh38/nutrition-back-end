import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface foodInterface {
  id: string;
  foodName: string;
  foodDescription?: string;
  weight: number;
  weightAfter: number;
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  ingredients: Array<foodInterface> | [];
}

@Entity()
export class Day {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "Date",
    type: "date",
    nullable: false,
  })
  Date: Date | string;

  @Column({
    name: "Breakfast",
    type: "json",
    nullable: false,
    default: [],
  })
  Breakfast: Array<foodInterface>;

  @Column({
    name: "Brunch",
    type: "json",
    nullable: false,
    default: [],
  })
  Brunch: Array<foodInterface>;

  @Column({
    name: "Lunch",
    type: "json",
    nullable: false,
    default: [],
  })
  Lunch: Array<foodInterface>;

  @Column({
    name: "Dinner",
    type: "json",
    nullable: false,
    default: [],
  })
  Dinner: Array<foodInterface>;
}
