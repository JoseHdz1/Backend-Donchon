import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1790228479963 implements MigrationInterface {
  name = 'Products1790228479963';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."products_unit_type_enum" AS ENUM('caja', 'unidad', 'litro', 'mililitro', 'kilo', 'gramo', 'paquete', 'bolsa', 'costal', 'docena', 'pieza')`,
    );
    await queryRunner.query(
      `CREATE TABLE "distributors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "contactEmail" character varying NOT NULL, "phoneNumber" character varying, "website" character varying, "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_distributors_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_product_categories_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "unitType" "public"."products_unit_type_enum" NOT NULL, "purchasePrice" double precision NOT NULL, "unitPrice" double precision NOT NULL, "usageType" character varying NOT NULL, "salesPrice" double precision, "description" text, "expirationDay" date, "deletedAt" TIMESTAMP WITH TIME ZONE, "category_id" integer NOT NULL, "distributor_id" integer NOT NULL, CONSTRAINT "PK_products_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_products_category" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_products_distributor" FOREIGN KEY ("distributor_id") REFERENCES "distributors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_products_distributor"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_products_category"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "product_categories"`);
    await queryRunner.query(`DROP TABLE "distributors"`);
    await queryRunner.query(`DROP TYPE "public"."products_unit_type_enum"`);
  }
}