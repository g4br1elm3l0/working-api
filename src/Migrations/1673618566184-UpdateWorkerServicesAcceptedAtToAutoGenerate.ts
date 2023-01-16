import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWorkerServicesAcceptedAtToAutoGenerate1673618566184 implements MigrationInterface {
    name = 'UpdateWorkerServicesAcceptedAtToAutoGenerate1673618566184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workerServices" ALTER COLUMN "acceptedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workerServices" ALTER COLUMN "acceptedAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workerServices" ALTER COLUMN "acceptedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "workerServices" ALTER COLUMN "acceptedAt" DROP NOT NULL`);
    }

}
