import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PassengerService } from "./passenger.service";
import { PassengerDTO } from "./dto/passenger.dto";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags("Passengers")
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller("api/v1/passenger")
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() passengerDTO: PassengerDTO) {
    return this.passengerService.create(passengerDTO);
  }

  @Get()
  getAll() {
    return this.passengerService.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.passengerService.getById(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() passengerDTO: PassengerDTO) {
    return this.passengerService.update(id, passengerDTO);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.passengerService.delete(id);
  }
}
