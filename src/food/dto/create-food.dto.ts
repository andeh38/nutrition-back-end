import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateFoodDto {
  @IsNotEmpty()
  foodName: string;
}
