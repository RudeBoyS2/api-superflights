import { Injectable } from '@nestjs/common';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PassengerDTO } from './dto/passenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {

constructor(@InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>) {}

    async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
        const passenger = new this.model(passengerDTO);
        return await passenger.save();
    }
    
    async getAll(): Promise<IPassenger[]> {
        return await this.model.find().exec();
    }
    
    async getById(id: string): Promise<IPassenger> {
        return await this.model.findById(id).exec();
    }
    
    async update(id: string, passengerDTO: PassengerDTO) {
        const updatedUser = await this.model.findByIdAndUpdate(id, passengerDTO, { new: true });

        return { updatedUser, message: 'Passenger updated successfully' };
    }
    
    async delete(id: string) {
        await this.model.findByIdAndDelete(id);
        
        return {message: 'Passenger deleted successfully'};
    }

}
