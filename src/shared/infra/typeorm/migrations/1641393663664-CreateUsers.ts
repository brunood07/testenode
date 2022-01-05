import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1641393663664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table(
          {
            name: "users",
            columns: [
              {
                name: "id",
                type: "uuid",
                isPrimary: true,
              },
              {
                name: "name",
                type: "varchar",
              },
              {
                name: "email",
                type: "varchar",
                isUnique: true,
              },
              {
                name: "phone",
                type: "numeric",
              },
              {
                name: "password",
                type:  "varchar",
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "now()",
              }
            ]
          }
        )
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
    }

}
