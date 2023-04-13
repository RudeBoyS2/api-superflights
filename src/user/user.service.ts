import type { IUser } from 'src/common/interfaces/user.interface';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(USER.name) private readonly model: Model<IUser>) {}

    async hashPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt);
    }

    async create (userDTO: UserDTO): Promise<IUser>{
        const hash = await this.hashPassword(userDTO.password);
        const newUser = new this.model({...userDTO, password: hash})
        return await newUser.save();
    }

    async getAll(): Promise<IUser[]>{
        return await this.model.find().exec();
    }

    async getById(id: string): Promise<IUser>{
        return await this.model.findById(id).exec();
    }

    async findByUsername(username: string): Promise<IUser>{
        const user = await this.model.findOne({username})

        if(!user) throw new UnauthorizedException("User not found");

        return user;
    }

    async checkPassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async update(id: string, userDTO: UserDTO): Promise<IUser>{
        const hash = await this.hashPassword(userDTO.password);
        const updatedUser = {...userDTO, password: hash};

        return await this.model.findByIdAndUpdate(id, updatedUser, {new: true})
    }

    async delete(id: string){
        await this.model.findByIdAndDelete(id);

        return {status: HttpStatus.OK, msg: "deleted successfully"}
    }
}
