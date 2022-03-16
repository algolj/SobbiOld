import {MigrationInterface, QueryRunner} from "typeorm";

export class tests1645468235192 implements MigrationInterface {
    name = 'tests1645468235192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tests" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "questions" json NOT NULL, CONSTRAINT "UQ_12a8ad98a94a8442d195bd9ecc8" UNIQUE ("title"), CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tests"`);
    }

}
