import {MigrationInterface, QueryRunner} from "typeorm";

export class roomAndRoomUser1643299638151 implements MigrationInterface {
    name = 'roomAndRoomUser1643299638151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "intervieweeId" integer, CONSTRAINT "UQ_535c742a3606d2e3122f441b26c" UNIQUE ("name"), CONSTRAINT "REL_342b5499d5d2e48bc0cc67aa2e" UNIQUE ("intervieweeId"), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room-user" ("id" SERIAL NOT NULL, "email" character varying, "name" character varying, "password" character varying NOT NULL, "userInRoomId" integer, "interviewerRoomId" integer, "watcherRoomId" integer, CONSTRAINT "PK_f6bf6732a4a54b99ca6d0a103c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_342b5499d5d2e48bc0cc67aa2e0" FOREIGN KEY ("intervieweeId") REFERENCES "room-user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room-user" ADD CONSTRAINT "FK_15d6a9a9b411e8e44a00d5813a3" FOREIGN KEY ("userInRoomId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room-user" ADD CONSTRAINT "FK_60e985d4c62869e928014d3dbde" FOREIGN KEY ("interviewerRoomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room-user" ADD CONSTRAINT "FK_00f2b3b7385231390ffebb8f360" FOREIGN KEY ("watcherRoomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room-user" DROP CONSTRAINT "FK_00f2b3b7385231390ffebb8f360"`);
        await queryRunner.query(`ALTER TABLE "room-user" DROP CONSTRAINT "FK_60e985d4c62869e928014d3dbde"`);
        await queryRunner.query(`ALTER TABLE "room-user" DROP CONSTRAINT "FK_15d6a9a9b411e8e44a00d5813a3"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_342b5499d5d2e48bc0cc67aa2e0"`);
        await queryRunner.query(`DROP TABLE "room-user"`);
        await queryRunner.query(`DROP TABLE "room"`);
    }

}
