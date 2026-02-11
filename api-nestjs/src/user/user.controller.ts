import {Body, Controller, Get, Param, ParseIntPipe, Post, Delete, Put} from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() body:{email: string, senha:string}){
        return this.userService.createUser(body.email, body.senha)
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

    @Put(':id')
    async put(@Param('id', ParseIntPipe) id:number, 
              @Body()body:{email: string, senha:string}
            ):Promise<User>{
        const{email, senha} = body
        return this.userService.putUser(id, email, senha)
    }
}