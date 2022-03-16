import {MigrationInterface, QueryRunner} from "typeorm";

export class tasks1645464199093 implements MigrationInterface {
    name = 'tasks1645464199093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tasks_hardlevel_enum" AS ENUM('easy', 'medium', 'hard')`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "hardLevel" "public"."tasks_hardlevel_enum" NOT NULL, "code" character varying NOT NULL, CONSTRAINT "UQ_067be4bd67747aa64451933929e" UNIQUE ("title"), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("tag" character varying NOT NULL, "tasksId" integer, CONSTRAINT "PK_db66121dc39534bfc85341711d1" PRIMARY KEY ("tag"))`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_79323c741cb6602ebaab26d95d6" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_79323c741cb6602ebaab26d95d6"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_hardlevel_enum"`);
    }

}
