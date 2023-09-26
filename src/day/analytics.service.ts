import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Day, foodInterface } from "src/typeorm/day.entity";
@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Day)
    private readonly DayRepository: Repository<Day>,
  ) {}

  async getAnalytics({ limit }: { limit: number }) {
    const date = new Date(
      new Date().getTime() - 8.64e7 * limit,
    ).toLocaleDateString();
    const maxDate = new Date(
      new Date().getTime() + 8.64e7,
    ).toLocaleDateString();
    let res = await this.DayRepository.createQueryBuilder("day")
      .where("day.Date > :date", {
        date: date,
      })
      .andWhere("day.Date < :maxDate", {
        maxDate: maxDate,
      })
      .getMany();

    if (res.length < limit) {
      const append = [];
      for (let i = 0; i < limit - 1; i++) {
        if (
          (new Date(new Date(res[i]?.Date).getTime() + 8.64e7) || date) !==
          new Date(res[i + 1]?.Date)
        ) {
          append.push({
            id: "randomId",
            Date: res[i]
              ? new Date(
                  new Date(res[i]?.Date).getTime() + 8.64e7,
                ).toLocaleDateString()
              : new Date(
                  new Date().getTime() - 8.64e7 * limit + 8.64e7 * i,
                ).toLocaleDateString(),
            Breakfast: [],
            Brunch: [],
            Lunch: [],
            Dinner: [],
          } as {
            id: string;
            Date: string | Date;
            Breakfast: Array<foodInterface>;
            Brunch: Array<foodInterface>;
            Lunch: Array<foodInterface>;
            Dinner: Array<foodInterface>;
          });
          if (append.length + res.length >= limit) {
            break;
          }
        }
      }
      res = [...res, ...append];
    }

    const sumAll = (
      arr: Array<foodInterface>,
      result: { [key: string]: number },
    ) => {
      arr.forEach((meal) => {
        result.calories = result.calories +=
          Math.round(+meal.calories * (meal.weight / 100) * 100) / 100;
        result.protein = result.protein +=
          Math.round(+meal.protein * (meal.weight / 100) * 100) / 100;
        result.fat = result.fat +=
          Math.round(+meal.fat * (meal.weight / 100) * 100) / 100;
        result.carbohydrate = result.carbohydrate +=
          Math.round(+meal.carbohydrate * (meal.weight / 100) * 100) / 100;
      });
    };
    const result: Array<{
      date: Date | string;
      calories: number;
      protein: number;
      fat: number;
      carbohydrate: number;
    }> = [];
    res.forEach((day, i) => {
      const _res = {
        calories: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0,
      };
      sumAll(day.Breakfast, _res);
      sumAll(day.Brunch, _res);
      sumAll(day.Lunch, _res);
      sumAll(day.Dinner, _res);

      result.push({
        date: day.Date,
        ..._res,
      });
    });
    result.sort((a, b) => (a.date > b.date ? 1 : -1));
    return result;
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
}
