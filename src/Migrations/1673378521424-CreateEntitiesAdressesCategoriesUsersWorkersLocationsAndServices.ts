import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntitiesAdressesCategoriesUsersWorkersLocationsAndServices1673378521424 implements MigrationInterface {
    name = 'CreateEntitiesAdressesCategoriesUsersWorkersLocationsAndServices1673378521424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "longitude" integer NOT NULL, "latitude" integer NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zipCode" character varying(8) NOT NULL, "district" character varying NOT NULL, "number" integer NOT NULL, "reference" character varying, "city" character varying NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userServices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "description" character varying(300) NOT NULL, "femaleOnly" boolean NOT NULL DEFAULT false, "status" character varying NOT NULL DEFAULT 'pendente', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, "categoryId" uuid, "locationId" uuid, CONSTRAINT "REL_1d1cdd24d772647ab23baf6955" UNIQUE ("locationId"), CONSTRAINT "PK_457b50b21c0548222619cc2e3ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "gender" character varying NOT NULL, "birthday" TIMESTAMP NOT NULL, "profileImg" character varying NOT NULL, "telephone" character varying(11) NOT NULL, "isActive" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "addressId" uuid, "locationId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "REL_49acb911ee20b02f86ec532a12" UNIQUE ("locationId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workerServices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "acceptedAt" TIMESTAMP, "workerId" uuid, "userServiceId" uuid, CONSTRAINT "REL_6827c75118ea603ffb1673737e" UNIQUE ("userServiceId"), CONSTRAINT "PK_2829557eacadbd9526e55f76c1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "birthday" date NOT NULL, "gender" character varying NOT NULL, "profileImg" character varying NOT NULL, "telephone" character varying(11) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "addressId" uuid, "locationId" uuid, CONSTRAINT "REL_ce61597f97557c382e041b7e7e" UNIQUE ("addressId"), CONSTRAINT "REL_e9d77ace7dffa48b4d4ca25b30" UNIQUE ("locationId"), CONSTRAINT "PK_e950c9aba3bd84a4f193058d838" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "userServices" ADD CONSTRAINT "FK_85d0224fd3b415c37961c0d50cc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userServices" ADD CONSTRAINT "FK_a578ca41a6e8a7477c7dfb9f4ad" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userServices" ADD CONSTRAINT "FK_1d1cdd24d772647ab23baf69550" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_49acb911ee20b02f86ec532a122" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workerServices" ADD CONSTRAINT "FK_3d2927aef6a025ec472cdbfc093" FOREIGN KEY ("workerId") REFERENCES "workers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workerServices" ADD CONSTRAINT "FK_6827c75118ea603ffb1673737eb" FOREIGN KEY ("userServiceId") REFERENCES "userServices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workers" ADD CONSTRAINT "FK_ce61597f97557c382e041b7e7eb" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workers" ADD CONSTRAINT "FK_e9d77ace7dffa48b4d4ca25b30d" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workers" DROP CONSTRAINT "FK_e9d77ace7dffa48b4d4ca25b30d"`);
        await queryRunner.query(`ALTER TABLE "workers" DROP CONSTRAINT "FK_ce61597f97557c382e041b7e7eb"`);
        await queryRunner.query(`ALTER TABLE "workerServices" DROP CONSTRAINT "FK_6827c75118ea603ffb1673737eb"`);
        await queryRunner.query(`ALTER TABLE "workerServices" DROP CONSTRAINT "FK_3d2927aef6a025ec472cdbfc093"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_49acb911ee20b02f86ec532a122"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "userServices" DROP CONSTRAINT "FK_1d1cdd24d772647ab23baf69550"`);
        await queryRunner.query(`ALTER TABLE "userServices" DROP CONSTRAINT "FK_a578ca41a6e8a7477c7dfb9f4ad"`);
        await queryRunner.query(`ALTER TABLE "userServices" DROP CONSTRAINT "FK_85d0224fd3b415c37961c0d50cc"`);
        await queryRunner.query(`DROP TABLE "workers"`);
        await queryRunner.query(`DROP TABLE "workerServices"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "userServices"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "locations"`);
    }

}
