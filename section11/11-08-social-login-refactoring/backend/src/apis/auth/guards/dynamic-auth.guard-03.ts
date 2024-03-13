import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

const DYNAMIC_AUTH_GUARD = {
  google: new (class extends AuthGuard('google') {})(),
  kakao: new (class extends AuthGuard('kakao') {})(),
  naver: new (class extends AuthGuard('naver') {})(),
};

export class DynamicAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { social } = context.switchToHttp().getRequest().params;
    return DYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
