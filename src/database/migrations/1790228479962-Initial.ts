import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1790228479962 implements MigrationInterface {
    name = 'Initial1790228479962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bread_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a1959de06e6aecdaf0260f62bd1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bread_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "unitPrice" double precision NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_30aaef910a4967171729671b198" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "breads" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "shelfLifeDays" integer, "deletedAt" TIMESTAMP WITH TIME ZONE, "bread_type_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_3708709be8cf68da4a4396e8149" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "breads" ADD CONSTRAINT "FK_fa45b8be3c66a74dc3f22f7bb2a" FOREIGN KEY ("bread_type_id") REFERENCES "bread_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "breads" ADD CONSTRAINT "FK_258cd56e5e4678738a0376cbcb8" FOREIGN KEY ("category_id") REFERENCES "bread_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "breads" DROP CONSTRAINT "FK_258cd56e5e4678738a0376cbcb8"`);
        await queryRunner.query(`ALTER TABLE "breads" DROP CONSTRAINT "FK_fa45b8be3c66a74dc3f22f7bb2a"`);
        await queryRunner.query(`DROP TABLE "breads"`);
        await queryRunner.query(`DROP TABLE "bread_types"`);
        await queryRunner.query(`DROP TABLE "bread_categories"`);
    }

}
