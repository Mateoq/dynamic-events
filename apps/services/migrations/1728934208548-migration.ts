import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728934208548 implements MigrationInterface {
    name = 'Migration1728934208548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_time"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_year"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_year" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_month"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_month" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_date" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_year"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "end_year" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_month"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "end_month" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "end_date" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_time"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_time" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "full_day" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "full_day" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_time"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_time" character varying`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "end_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_month"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "end_month" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_year"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "end_year" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_month"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_month" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_year"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_year" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD "end_time" character varying`);
    }

}
