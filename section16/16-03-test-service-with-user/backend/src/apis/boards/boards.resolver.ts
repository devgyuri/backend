import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => String, { nullable: true })
  async fetchBoards(): Promise<string> {
    // return this.boardsService.findAll();

    const myCache = await this.cacheManager.get('qqq');
    console.log(myCache);
    return 'cache 조회 완료';
  }

  @Mutation(() => String, { nullable: true })
  async createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<string> {
    // return this.boardsService.create({ createBoardInput });

    await this.cacheManager.set('qqq', createBoardInput, {
      ttl: 100,
    });
    return 'cache 등록 완료';
  }
}
