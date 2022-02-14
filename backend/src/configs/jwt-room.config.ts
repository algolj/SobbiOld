import { ConfigService } from '@nestjs/config/dist';
import { JwtModuleOptions } from '@nestjs/jwt';

export const JWTRoomConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get('JWT_SECRET'),
  signOptions: {
    expiresIn: '1d',
  },
});
