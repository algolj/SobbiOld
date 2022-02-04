import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1643188652451 implements MigrationInterface {
  name = 'User1643188652451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_country_enum" AS ENUM('Ukraine', 'Belarus', 'Poland', 'Czech', 'Lithuania', 'Other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_gender_enum" AS ENUM('Female', 'Male', 'Other', 'undefined')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "lastName" character varying, "firstName" character varying, "country" "public"."user_country_enum", "dateOfBirth" date, "gender" "public"."user_gender_enum", "bio" character varying, "image" bytea, "socialMedia" json, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_country_enum"`);
  }
}
