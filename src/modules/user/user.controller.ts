import {Body, Controller, Get, Param, ParseIntPipe, Post, Delete, Patch} from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '../../models/entities/user.entity';
import { CreateUserDto } from '../dto/user.dto.create';
import { UpdateUserDto } from '../dto/user.dto.update';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}
    
    @Post()
    async create(@Body() createUserDto:CreateUserDto){
        return this.userService.createUser(createUserDto)
    }

    @Get()
    async findAll(): Promise<User[]>{
        return this.userService.findAllUsers();
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<User | null>{
        return this.userService.FindById(id)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<User>{
        return this.userService.deleteUser(id)
    }    

    @Patch(':id')
    async patch(@Param('id', ParseIntPipe) id:number, 
              @Body() updateUserDto:UpdateUserDto
            ):Promise<User>{
        
        return this.userService.patchUser(id, updateUserDto)
    }
}