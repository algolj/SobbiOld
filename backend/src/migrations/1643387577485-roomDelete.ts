import {MigrationInterface, QueryRunner} from "typeorm";

export class roomDelete1643387577485 implements MigrationInterface {
    name = 'roomDelete1643387577485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room-user" DROP CONSTRAINT "FK_00f2b3b7385231390ffebb8f360"`);
        await queryRunner.query(`ALTER TABLE "room-user" DROP CONSTRAINT "FK_60e985d4c62869e928014d3dbde"`);
        await queryRunner.query(`ALTER TABLE "room-user" DROP CONSTRAINT "FK_15d6a9a9b411e8e44a00d5813a3"`);
        await queryRunner.query(`ALTER TABLE "room-user" ADD CONSTRAINT "FK_15d6a9a9b411e8e44a00d5813a3" FOREIGN KEY ("userInRoomId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room-user" ADD CONSTRAINT "FK_60e985d4c62869e928014d3dbde" FOREIGN KEY ("interviewerRoomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room-user" ADD CONSTRAINT "FK_00f2b3b7385231390ffebb8f360" FOREIGN KEY ("watcherRoomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room-user" DROP CONSTRAINT "FK_00f2b3b7385231390ffebb8f360"`);
        await queryRunner.query(`ALTER TABLE "room-user" DROP CONSTRAINT "FK_60e985d4c62869e928014d3dbde"`);
        await queryRunner.query(`ALTER TABLE "room-user" DROP CONSTRAINT "FK_15d6a9a9b411e8e44a00d5813a3"`);
        await queryRunner.query(`ALTER TABLE "room-user" ADD CONSTRAINT "FK_15d6a9a9b411e8e44a00d5813a3" FOREIGN KEY ("userInRoomId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room-user" ADD CONSTRAINT "FK_60e985d4c62869e928014d3dbde" FOREIGN KEY ("interviewerRoomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room-user" ADD CONSTRAINT "FK_00f2b3b7385231390ffebb8f360" FOREIGN KEY ("watcherRoomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
