import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Food {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    name: "type",
    nullable: false,
    default: "simple",
  })
  type: string;

  @Column({
    name: "foodName",
    nullable: false,
    default: "",
  })
  foodName: string;

  @Column({
    name: "foodDescription",
    default: "",
  })
  foodDescription: string;

  @Column({
    type: "json",
    name: "ingredients",
    default: [],
  })
  ingredients: Array<Food>;

  @Column({
    name: "weight",
    type: "numeric",
    default: 100,
  })
  weight: number;

  @Column({
    name: "weightAfter",
    type: "numeric",
    default: 100,
  })
  weightAfter: number;

  @Column({
    name: "multiplier",
    type: "numeric",
    default: 1,
  })
  multiplier: number;

  @Column({
    name: "calories",
    type: "numeric",
  })
  calories: number;

  @Column({
    name: "protein",
    type: "numeric",
  })
  protein: number;

  @Column({
    name: "carbohydrate",
    type: "numeric",
  })
  carbohydrate: number;

  @Column({
    name: "fat",
    type: "numeric",
  })
  fat: number;
}
