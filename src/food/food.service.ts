import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Food } from "src/typeorm";
import { CreateFoodDto } from "./dto/create-food.dto";
import { UpdateFoodDto } from "./dto/update-food.dto";

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
  ) {}

  createFood(createFoodDto: CreateFoodDto) {
    const newFood = this.foodRepository.create(createFoodDto);
    return this.foodRepository.save(newFood);
  }

  findAll() {
    return this.foodRepository.find();
  }

  findFoodById(id: string) {
    return this.foodRepository.findOneBy({ id });
  }

  async findFoodByName(props: {
    name: string;
    offset?: number;
    limit?: number;
  }) {
    const res = await this.foodRepository
      .createQueryBuilder("food")
      .where("food.foodName ILIKE :name", { name: `%${props.name}%` })
      .getMany();
    return res;
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
