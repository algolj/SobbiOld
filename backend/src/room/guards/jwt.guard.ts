import { AuthGuard } from '@nestjs/passport';

export class JwtUserInRoomGuard extends AuthGuard('jwt') {}
