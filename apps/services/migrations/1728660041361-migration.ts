import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728660041361 implements MigrationInterface {
    name = 'Migration1728660041361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "city" character varying NOT NULL, "start_year" character varying NOT NULL, "start_month" character varying NOT NULL, "start_date" character varying NOT NULL, "end_year" character varying NOT NULL, "end_month" character varying NOT NULL, "end_date" character varying NOT NULL, "start_time" character varying, "end_time" character varying, "full_day" boolean DEFAULT true, "color" character varying, "user_id" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e6358bd3df1b2874637dca92bcf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e6358bd3df1b2874637dca92bcf"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
