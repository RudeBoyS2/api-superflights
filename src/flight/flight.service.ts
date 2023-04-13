import { FlightDTO } from './dto/flight.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';

@Injectable()
export class FlightService {

    constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>) {}

    async create(FlightDTO: FlightDTO): Promise<IFlight> {
        const flight = new this.model(FlightDTO);
        return await flight.save();
    }
    
    async getAll(): Promise<IFlight[]> {
        return await this.model.find().populate('passengers');
    }
    
    async getById(id: string): Promise<IFlight> {
        return await this.model.findById(id).populate('passengers');
    }
    
    async update(id: string, FlightDTO: FlightDTO) {
        const updatedFlight = await this.model.findByIdAndUpdate(id, FlightDTO, { new: true });

        return { updatedFlight, message: 'Flight updated successfully' };
    }
    
    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        
        return {message: 'Flight deleted successfully'};
    }

    // Flight
    async addPassenger(flightId: string, passengerId: string) {   
        await this.model.findByIdAndUpdate(flightId, { $addToSet: { passengers: passengerId } }, { new: true }).populate('passengers');

        return { message: 'Passenger added successfully'}
    }
}
