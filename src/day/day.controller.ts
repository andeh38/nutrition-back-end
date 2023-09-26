import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from "@nestjs/common";
import { DayService } from "./day.service";
import { AnalyticsService } from "./analytics.service";
import { CreateDayDto } from "./dto/create-day.dto";
import { UpdateDayDto } from "./dto/update-day.dto";

@Controller("day")
export class DayController {
  constructor(
    private readonly dayService: DayService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Post()
  create(@Body() createDayDto: CreateDayDto) {
    return this.dayService.create(createDayDto);
  }

  @Post("search")
  findByName(@Body() date: { date: Date }) {
    return this.dayService.findDayByDate(date);
  }

  @Get()
  findAll() {
    return this.dayService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDayDto: UpdateDayDto) {
    return this.dayService.update(id, updateDayDto);
  }

  @Get("analytics/?")
  analytics(@Query() params: { limit: number }) {
    return this.analyticsService.getAnalytics(params);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.dayService.findOne(+id);
  }
}
