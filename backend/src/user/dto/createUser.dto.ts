import { IsEmail, IsNotEmpty } from 'class-validator';
import { Blob } from 'buffer';

import { ECountry } from '@app/common/country.enum';
import { EGender } from '@app/common/gender.enum';
import { ISocialMedia } from '@app/common/social-media.interface';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  readonly lastName: string;
  readonly firstName: string;
  readonly country: ECountry;
  readonly dateOfBirth: Date;
  readonly gender: EGender;
  readonly bio: string;
  readonly image: Blob;
  readonly socialMedia: ISocialMedia;
}
