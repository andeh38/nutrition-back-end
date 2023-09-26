import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Day } from "src/typeorm";
import { DayService } from "./day.service";
import { AnalyticsService } from "./analytics.service";
import { DayController } from "./day.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Day])],
  controllers: [DayController],
  providers: [DayService, AnalyticsService],
})
export class DayModule {}
