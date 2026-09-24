import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1790228479964 implements MigrationInterface {
  name = 'Users1790228479964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."app_users_roles_enum" AS ENUM('SALES', 'ADMIN', 'MANAGER', 'BREAD_MANAGER', 'PRODUCT_MANAGER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "app_users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "roles" "public"."app_users_roles_enum"[] NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_app_users_id" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "app_users"`);
    await queryRunner.query(`DROP TYPE "public"."app_users_roles_enum"`);
  }
}