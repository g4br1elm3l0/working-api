import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLocation1673885349068 implements MigrationInterface {
    name = 'AddLocation1673885349068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "longitude" numeric(6,3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "latitude" numeric(6,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "longitude" integer NOT NULL`);
    }

}
