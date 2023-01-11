import { MigrationInterface, QueryRunner } from "typeorm";

export class resolveMigrationConflict1673451436127 implements MigrationInterface {
    name = 'resolveMigrationConflict1673451436127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workerServices" DROP CONSTRAINT "FK_3d2927aef6a025ec472cdbfc093"`);
        await queryRunner.query(`ALTER TABLE "workerServices" RENAME COLUMN "workerId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "locations" ADD CONSTRAINT "UQ_78eda52dc27b7ad20350c4a752d" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "serviceId" uuid`);
        await queryRunner.query(`ALTER TABLE "locations" ADD CONSTRAINT "UQ_31ccc8588cd6dee4420ebdc6a03" UNIQUE ("serviceId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isWorker" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthday" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "locations" ADD CONSTRAINT "FK_78eda52dc27b7ad20350c4a752d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "locations" ADD CONSTRAINT "FK_31ccc8588cd6dee4420ebdc6a03" FOREIGN KEY ("serviceId") REFERENCES "userServices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workerServices" ADD CONSTRAINT "FK_7c3950867cdb7340b8a34c154ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workerServices" DROP CONSTRAINT "FK_7c3950867cdb7340b8a34c154ad"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP CONSTRAINT "FK_31ccc8588cd6dee4420ebdc6a03"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP CONSTRAINT "FK_78eda52dc27b7ad20350c4a752d"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthday" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isWorker"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP CONSTRAINT "UQ_31ccc8588cd6dee4420ebdc6a03"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "serviceId"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP CONSTRAINT "UQ_78eda52dc27b7ad20350c4a752d"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "workerServices" RENAME COLUMN "userId" TO "workerId"`);
        await queryRunner.query(`ALTER TABLE "workerServices" ADD CONSTRAINT "FK_3d2927aef6a025ec472cdbfc093" FOREIGN KEY ("workerId") REFERENCES "workers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
