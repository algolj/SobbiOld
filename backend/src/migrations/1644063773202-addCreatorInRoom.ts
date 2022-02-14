import {MigrationInterface, QueryRunner} from "typeorm";

export class addCreatorInRoom1644063773202 implements MigrationInterface {
    name = 'addCreatorInRoom1644063773202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" ADD "creatorId" integer`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "UQ_86e40e0afb08286884be0e6f38b" UNIQUE ("creatorId")`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_86e40e0afb08286884be0e6f38b" FOREIGN KEY ("creatorId") REFERENCES "room-user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_86e40e0afb08286884be0e6f38b"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "UQ_86e40e0afb08286884be0e6f38b"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "creatorId"`);
    }

}
