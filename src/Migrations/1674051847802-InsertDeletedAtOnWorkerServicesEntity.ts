import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDeletedAtOnWorkerServicesEntity1674051847802 implements MigrationInterface {
    name = 'InsertDeletedAtOnWorkerServicesEntity1674051847802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workerServices" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workerServices" DROP COLUMN "deletedAt"`);
    }

}
