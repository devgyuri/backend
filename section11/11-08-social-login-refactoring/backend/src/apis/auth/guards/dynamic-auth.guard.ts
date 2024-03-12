import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

class GoogleAuthGuard extends AuthGuard('google') {}
const googleAuthGuard = new GoogleAuthGuard();

class NaverAuthGuard extends AuthGuard('naver') {}
const naverAuthGuard = new NaverAuthGuard();

class KakaoAuthGuard extends AuthGuard('kakao') {}
const kakaoAuthGuard = new KakaoAuthGuard();

export class DynamicAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { social } = context.switchToHttp().getRequest();
    if (social === 'google') {
      return googleAuthGuard.canActivate(context);
    }
    if (social === 'naver') {
      return naverAuthGuard.canActivate(context);
    }
    if (social === 'kakao') {
      return kakaoAuthGuard.canActivate(context);
    }
  }
}
