// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  // constructor(private readonly appService) {}

  @Query(() => String)
  fetchBoard() {
    return 'board data';
  }
}
