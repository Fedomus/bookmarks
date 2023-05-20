import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { BookmarksService } from './bookmarks.service';
import { GetUser } from '../decorators/get-user.decorator';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@UseGuards(AuthGuard)
@Controller('bookmarks')
export class BookmarksController {

    constructor(
        private bookmarksService: BookmarksService
    ) {}

    @Get()
    getBookmarks(@GetUser('sub') userId: number) {
        return this.bookmarksService.getBookmarks(userId)
    }

    @Post()
    createBookmark(
        @GetUser('sub') userId: number,
        @Body() dto: CreateBookmarkDto
        ) {
            return this.bookmarksService.createBookmark(userId, dto)
        }

    @Get(':id')
    getBookmarkById(
        @GetUser('sub') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number 
        ) {
            return this.bookmarksService.getBookmarkById(userId, bookmarkId)
        }

    @Patch(':id')
    editBookmarkById(
        @GetUser('sub') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number, 
        @Body() dto: EditBookmarkDto
        ) {
            return this.bookmarksService.editBookmarkById(userId, bookmarkId, dto)
        }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarkById(
        @GetUser('sub') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number 
        ) {
            return this.bookmarksService.deleteBookmarkById(userId, bookmarkId)
        }

}
