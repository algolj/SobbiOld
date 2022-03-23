import {MigrationInterface, QueryRunner} from "typeorm";

export class main1643833209814 implements MigrationInterface {
    name = 'main1643833209814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_342b5499d5d2e48bc0cc67aa2e0"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "UQ_535c742a3606d2e3122f441b26c"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "REL_342b5499d5d2e48bc0cc67aa2e"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "intervieweeId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "date_of_birth"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "dateOfBirth" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dateOfBirth"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "date_of_birth" date`);
        await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying`);
        await queryRunner.query(`ALTER TABLE "room" ADD "intervieweeId" integer`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "REL_342b5499d5d2e48bc0cc67aa2e" UNIQUE ("intervieweeId")`);
        await queryRunner.query(`ALTER TABLE "room" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "UQ_535c742a3606d2e3122f441b26c" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_342b5499d5d2e48bc0cc67aa2e0" FOREIGN KEY ("intervieweeId") REFERENCES "room-user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
