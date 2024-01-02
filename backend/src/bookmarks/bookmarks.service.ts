import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarksService {

    constructor(
        private prismaService: PrismaService
    ) {}

    async getBookmarks(userId: number) {

        return await this.prismaService.bookmark.findMany({
            where: {
                usuarioId: userId
            }
        })
    }

    async getBookmarkById(userId: number, bookmarkId: number) {
        return await this.prismaService.bookmark.findFirst({
            where: {
                id: bookmarkId,
                usuarioId: userId
            }
        })
    }

    async createBookmark(userId: number, dto: CreateBookmarkDto) {

        const bookmark = await this.prismaService.bookmark.create({
            data: {
                usuarioId: userId,
                ...dto
            }
        })

        return bookmark
    }

    async editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
        const bookmark = await this.prismaService.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        });        

        if(!bookmark || bookmark.usuarioId != userId){
            throw new ForbiddenException("Access to resources denied")
        }

        const editBookmark = await this.prismaService.bookmark.update({
            where: {
                id: bookmarkId
            },
            data: {
                ...dto
            }
        })

        return editBookmark
    }

    async deleteBookmarkById(userId: number, bookmarkId: number) {
        const bookmark = await this.prismaService.bookmark.findUnique({
            where: {
                id: bookmarkId
            }
        });        

        if(!bookmark || bookmark.usuarioId != userId){
            throw new ForbiddenException("Access to resources denied")
        }

        return await this.prismaService.bookmark.delete({
            where: {
                id: bookmarkId
            }
        })
    }

    async deleteBookmarksByUserId(userId: number){
        return this.prismaService.bookmark.deleteMany({
            where: {
                usuarioId: userId
            }
        })
    }
}
