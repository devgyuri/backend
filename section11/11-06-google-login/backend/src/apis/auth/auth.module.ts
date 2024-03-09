import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { JwtGoogleStrategy } from './jwt-social-google.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    UsersModule, //
  ],
  controllers: [AuthController],
  providers: [
    JwtAccessStrategy, //
    JwtRefreshStrategy, //
    JwtGoogleStrategy, //
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
