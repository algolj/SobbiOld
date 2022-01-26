import { ConfigService } from '@nestjs/config/dist';
import { JwtModuleOptions } from '@nestjs/jwt';

export const JWTConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({ secret: configService.get('JWT_SECRET') });
