import { IsString, IsNotEmpty, IsOptional } from "class-validator";

class searchFoodQuery {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;
  offset?: number;
  limit?: number;
}

export default searchFoodQuery;
