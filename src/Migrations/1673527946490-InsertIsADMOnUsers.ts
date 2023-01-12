import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertIsADMOnUsers1673527946490 implements MigrationInterface {
    name = 'InsertIsADMOnUsers1673527946490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdm" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdm"`);
    }

}
