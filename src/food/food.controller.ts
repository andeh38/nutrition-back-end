import {
  ClassSerializerInterceptor,
  UseInterceptors,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { FoodService } from "./food.service";
import { CreateFoodDto } from "./dto/create-food.dto";
import { UpdateFoodDto } from "./dto/update-food.dto";
import searchFoodQuery from "./searchFoodQuery";

@Controller("food")
@UseInterceptors(ClassSerializerInterceptor)
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  createFood(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.createFood(createFoodDto);
  }

  @Get("search/?")
  findByName(@Query() params: searchFoodQuery) {
    return this.foodService.findFoodByName(params);
  }

  @Get()
  findAll() {
    return this.foodService.findAll();
  }

  @Get(":id")
  findOneFood(@Param("id") id: string) {
    return this.foodService.findFoodById(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.update(+id, updateFoodDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.foodService.remove(+id);
  }
}
