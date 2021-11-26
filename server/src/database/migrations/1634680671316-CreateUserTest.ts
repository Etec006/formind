import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUserTest1634680671316 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_tests',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'testId',
                        type: 'varchar'
                    },
                    {
                        name: 'userId',
                        type: 'varchar'
                    },
                    {
                        name: 'result',
                        type: 'float'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'user_tests',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: "users",
                name: "fk_user_test_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            'user_tests',
            new TableForeignKey({
                columnNames: ['testId'],
                referencedColumnNames: ['id'],
                referencedTableName: "tests",
                name: "fk_test_user_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('user_tests', 'fk_user_test_id');
        await queryRunner.dropForeignKey('user_tests', 'fk_test_user_id');
        await queryRunner.dropTable('user_tests');
    }

}
