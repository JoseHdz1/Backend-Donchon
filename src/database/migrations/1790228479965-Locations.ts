import { MigrationInterface, QueryRunner } from 'typeorm';

export class Locations1790228479965 implements MigrationInterface {
	name = 'Locations1790228479965';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "address" character varying, "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_locations_id" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "locations"`);
	}
}