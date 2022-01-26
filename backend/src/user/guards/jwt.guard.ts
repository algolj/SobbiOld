import { AuthGuard } from '@nestjs/passport';

export class JwtUserGuard extends AuthGuard('jwt') {}
