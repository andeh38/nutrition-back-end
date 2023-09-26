import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Day, Food } from "./typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FoodModule } from "./food/food.module";
import { DayModule } from "./day/day.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      name: "day",
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: "postgres",
        name: "day",
        host: configService.get("DAY_DB_HOST"),
        port: configService.get<number>("DAY_DB_PORT"),
        username: configService.get("DAY_DB_USERNAME"),
        password: configService.get("DAY_DB_PASSWORD"),
        database: configService.get("DAY_DB_NAME"),
        entities: [Day],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: "postgres",
        host: configService.get("FOOD_DB_HOST"),
        port: configService.get<number>("FOOD_DB_PORT"),
        username: configService.get("FOOD_DB_USERNAME"),
        password: configService.get("FOOD_DB_PASSWORD"),
        database: configService.get("FOOD_DB_NAME"),
        entities: [Food],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    FoodModule,
    DayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
@Module({
  imports: [
    TypeOrmModule.forFeature([Day], "days"),
    TypeOrmModule.forFeature([Food]),
  ],
})
export class AppModule {}
