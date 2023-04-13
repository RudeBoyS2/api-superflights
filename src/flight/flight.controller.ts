import { PassengerService } from './../passenger/passenger.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { FlightService } from "./flight.service";
import { FlightDTO } from "./dto/flight.dto";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags("Flights")
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller("api/v1/flight")
export class FlightController {
  constructor(private readonly flightService: FlightService, private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() FlightDTO: FlightDTO) {
    return this.flightService.create(FlightDTO);
  }

  @Get()
  getAll() {
    return this.flightService.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.flightService.getById(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() FlightDTO: FlightDTO) {
    return this.flightService.update(id, FlightDTO);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.flightService.delete(id);
  }

  @Post(":flightId/passenger/:passengerId")
  async addPassenger(
    @Param("flightId") flightId: string,
    @Param("passengerId") passengerId: string
  ) {
    const passenger = await this.passengerService.getById(passengerId);

    if (!passenger) throw new HttpException("Passenger not found", HttpStatus.NOT_FOUND);

    return this.flightService.addPassenger(flightId, passengerId);
  }
}
