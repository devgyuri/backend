import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthAccessGuard extends AuthGuard('access') {
  getRequest(context: ExecutionContext) {
    console.log('GqlAuthAccessGuard');
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
}
