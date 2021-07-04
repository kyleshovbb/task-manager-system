import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BoardRequest } from './interfaces/board.interface';

import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  async findAll() {
    const boards = await this.boardService.getAll();
    return boards.map((board) => board.toResponse());
  }

  @Post()
  async create(@Body() body: BoardRequest) {
    const newBoard = await this.boardService.save(body);
    return newBoard.toResponse();
  }

  @Get(':boardId')
  async findOne(@Param('boardId') boardId: string) {
    const board = await this.boardService.findById(boardId);

    if (board) {
      return board.toResponse();
    }

    throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
  }

  @Put(':boardId')
  async update(@Body() body: BoardRequest, @Param('boardId') boardId: string) {
    const board = await this.boardService.update(boardId, body);

    if (board) {
      return board;
    }

    throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':boardId')
  async delete(@Param('boardId') boardId: string) {
    await this.boardService.remove(boardId);
  }
}
