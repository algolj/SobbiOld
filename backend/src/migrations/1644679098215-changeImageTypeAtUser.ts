import {MigrationInterface, QueryRunner} from "typeorm";

export class changeImageTypeAtUser1644679098215 implements MigrationInterface {
    name = 'changeImageTypeAtUser1644679098215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "image" bytea`);
    }

}
