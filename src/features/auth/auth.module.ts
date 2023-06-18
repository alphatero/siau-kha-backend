import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BlackList, BlackListSchema } from 'src/core/models/black-list';
import { UserModule } from '../user';
import { LocalStrategy } from './strategies/local.strategies';
import { JwtStrategy } from './strategies/jwt.strategies';
import { SignInMiddleware } from 'src/common/middleware';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('secrets.jwt'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    // 建立Mongo資料庫連線
    MongooseModule.forFeature([
      {
        name: BlackList.name,
        schema: BlackListSchema,
      },
    ]),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInMiddleware).forRoutes('auth/sign-in');
  }
}
