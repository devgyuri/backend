import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/boards.entity';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  findAll(): Board[] {
    const result = [
      { number: 1, writer: '철수', title: '안녕', contents: '내용내용' },
      {
        number: 2,
        writer: '영희',
        title: '너의 이름은',
        contents: '무엇이니',
      },
      { number: 3, writer: '맹구', title: '...', contents: '잘 부탁해' },
    ];
    return result;
  }

  create({ createBoardInput }: IBoardsServiceCreate): string {
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    return '게시물 등록에 성공하였습니다.';
  }
}
