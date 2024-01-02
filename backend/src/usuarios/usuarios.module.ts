import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { PrismaService } from '../prisma/prisma.service';
import { BookmarksService } from 'src/bookmarks/bookmarks.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService, BookmarksService]
})
export class UsuariosModule {}
