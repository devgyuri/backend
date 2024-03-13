import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

class GoogleAuthGuard extends AuthGuard('google') {}
class NaverAuthGuard extends AuthGuard('naver') {}
class KakaoAuthGuard extends AuthGuard('kakao') {}

const DYNAMIC_AUTH_GUARD = {
  google: new GoogleAuthGuard(),
  naver: new NaverAuthGuard(),
  kakao: new KakaoAuthGuard(),
};

export class DynamicAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { social } = context.switchToHttp().getRequest().params;
    return DYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
