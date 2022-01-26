import { UserEntity } from '../user.entity';

export type TLoginData = Pick<UserEntity, 'email' | 'username'>;
