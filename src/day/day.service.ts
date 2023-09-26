import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDayDto } from "./dto/create-day.dto";
import { UpdateDayDto } from "./dto/update-day.dto";
import { Day } from "src/typeorm";

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day)
    private readonly DayRepository: Repository<Day>,
  ) {}
  create(createDayDto: CreateDayDto) {
    const newFood = this.DayRepository.create(createDayDto);
    return this.DayRepository.save(newFood);
  }

  findAll() {
    return this.DayRepository.find();
  }

  async findDayByDate(date: { date: Date }) {
    const res = await this.DayRepository.createQueryBuilder("day")
      .where("day.Date = :date", {
        date: date.date,
      })
      .getOne();
    if (!res) {
      const currentDate = new Date();
      currentDate.toLocaleDateString();
      const newDay = this.DayRepository.create({
        Date: date.date,
        Breakfast: [],
        Brunch: [],
        Lunch: [],
        Dinner: [],
      });
      return this.DayRepository.save(newDay);
    }
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} day`;
  }

  async update(id: string, updateDayDto: UpdateDayDto) {
    const currentDate = new Date();
    currentDate.toLocaleDateString();
    const res = await this.DayRepository.createQueryBuilder("day")
      .update(Day)
      .set({ ...updateDayDto })
      .where("day.id = :id", {
        id,
      })
      .execute();
    return res;
  }
}
