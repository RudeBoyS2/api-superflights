import { Body, Controller, Get, Post, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JWTAuthGuard)
@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService){}
    
    @Post()
    create(@Body() userDTO: UserDTO){     
        return this.userService.create(userDTO);
    }

    @Get()
    getAll(){
        return this.userService.getAll();
    }

    @Get(":id")
    getById(@Param("id") id: string){
        return this.userService.getById(id);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() userDTO: UserDTO){
        return this.userService.update(id, userDTO);
    }

    @Delete(":id")
    delete(@Param("id") id: string){
        return this.userService.delete(id);
    }
}
