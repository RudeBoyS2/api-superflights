import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports:[ConfigModule.forRoot({
		envFilePath:['.env.development'],
		isGlobal: true
	}),UserModule,PassportModule,JwtModule.register({
		secret:process.env.JWT_SECRET,
		signOptions:{
			expiresIn:process.env.EXPIRES_IN,
			audience: process.env.APP_URL
		}
	})],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]		
})

export class AuthModule {}