import { MigrationInterface, QueryRunner } from 'typeorm'

export class addedEntity1671462222288 implements MigrationInterface {
  name = 'addedEntity1671462222288'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_bf98d8fd47610db71dfc5a4a5ff"`
    )
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_f25fd350775094ceb3a02c14681"`
    )
    await queryRunner.query(
      `CREATE TABLE "users_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "roleId" uuid, CONSTRAINT "PK_1d8dd7ffa37c3ab0c4eefb0b221" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP COLUMN "rolesId"`
    )
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP COLUMN "permissionsId"`
    )
    await queryRunner.query(`ALTER TABLE "roles_permissions" ADD "roleId" uuid`)
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD "permissionId" uuid`
    )
    await queryRunner.query(
      `ALTER TABLE "users_roles" ADD CONSTRAINT "FK_776b7cf9330802e5ef5a8fb18dc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "users_roles" ADD CONSTRAINT "FK_4fb14631257670efa14b15a3d86" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_28bf280551eb9aa82daf1e156d9" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_31cf5c31d0096f706e3ba3b1e82" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_31cf5c31d0096f706e3ba3b1e82"`
    )
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_28bf280551eb9aa82daf1e156d9"`
    )
    await queryRunner.query(
      `ALTER TABLE "users_roles" DROP CONSTRAINT "FK_4fb14631257670efa14b15a3d86"`
    )
    await queryRunner.query(
      `ALTER TABLE "users_roles" DROP CONSTRAINT "FK_776b7cf9330802e5ef5a8fb18dc"`
    )
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP COLUMN "permissionId"`
    )
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP COLUMN "roleId"`
    )
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD "permissionsId" uuid`
    )
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD "rolesId" uuid`
    )
    await queryRunner.query(`DROP TABLE "users_roles"`)
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_f25fd350775094ceb3a02c14681" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_bf98d8fd47610db71dfc5a4a5ff" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }
}
