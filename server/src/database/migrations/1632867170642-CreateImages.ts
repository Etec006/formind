import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateImages1632867170642 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pictures',
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "size",
                        type: "int"
                    },
                    {
                        name: "key",
                        type: "varchar"
                    },
                    {
                        name: "url",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pictures')
    }

}
