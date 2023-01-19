import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllEntitiesAndRelations1674085511401 implements MigrationInterface {
    name = 'CreateAllEntitiesAndRelations1674085511401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "gender" character varying NOT NULL, "birthday" character varying NOT NULL, "profileImg" character varying NOT NULL, "telephone" character varying(11) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isWorker" boolean NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userServices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "description" character varying(300) NOT NULL, "femaleOnly" boolean NOT NULL DEFAULT false, "status" character varying NOT NULL DEFAULT 'pendente', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "categoryId" uuid, "locationId" uuid, CONSTRAINT "PK_457b50b21c0548222619cc2e3ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "longitude" numeric(6,3) NOT NULL, "latitude" numeric(6,2) NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workerServices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "acceptedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "userServiceId" uuid, CONSTRAINT "REL_6827c75118ea603ffb1673737e" UNIQUE ("userServiceId"), CONSTRAINT "PK_2829557eacadbd9526e55f76c1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "userServices" ADD CONSTRAINT "FK_85d0224fd3b415c37961c0d50cc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userServices" ADD CONSTRAINT "FK_a578ca41a6e8a7477c7dfb9f4ad" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userServices" ADD CONSTRAINT "FK_1d1cdd24d772647ab23baf69550" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workerServices" ADD CONSTRAINT "FK_7c3950867cdb7340b8a34c154ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workerServices" ADD CONSTRAINT "FK_6827c75118ea603ffb1673737eb" FOREIGN KEY ("userServiceId") REFERENCES "userServices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workerServices" DROP CONSTRAINT "FK_6827c75118ea603ffb1673737eb"`);
        await queryRunner.query(`ALTER TABLE "workerServices" DROP CONSTRAINT "FK_7c3950867cdb7340b8a34c154ad"`);
        await queryRunner.query(`ALTER TABLE "userServices" DROP CONSTRAINT "FK_1d1cdd24d772647ab23baf69550"`);
        await queryRunner.query(`ALTER TABLE "userServices" DROP CONSTRAINT "FK_a578ca41a6e8a7477c7dfb9f4ad"`);
        await queryRunner.query(`ALTER TABLE "userServices" DROP CONSTRAINT "FK_85d0224fd3b415c37961c0d50cc"`);
        await queryRunner.query(`DROP TABLE "workerServices"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "userServices"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
