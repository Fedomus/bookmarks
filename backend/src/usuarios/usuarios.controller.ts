import { Controller, Get, UseGuards, Patch, Body, Delete } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { EditUserDto } from './dto/edit-user.dto';
import { UsuariosService } from './usuarios.service';
import { BookmarksService } from 'src/bookmarks/bookmarks.service';

@UseGuards(AuthGuard)
@Controller('usuarios')
export class UsuariosController {

    constructor(
        private usuariosService: UsuariosService,
        private bookmarksService: BookmarksService
    ) {}
    
    @Get('me')
    getMe(@GetUser() user: any) {
        return this.usuariosService.findOne(user.email)
    }

    @Delete()
    deleteUser(@GetUser('sub') userId: any) {
        this.bookmarksService.deleteBookmarksByUserId(userId)
        return this.usuariosService.deleteUser(userId);
    }

    @Patch() 
    editUser(
        @GetUser('sub') user: any, 
        @Body() dto: EditUserDto
    ){
        return this.usuariosService.editUser(user, dto);
    }

}

