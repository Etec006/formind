import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateHistory1636072731120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "history",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "userId",
                        type: "varchar",
                    },
                    {
                        name: "moduleId",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp"
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            'history',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: "users",
                name: "fk_user_module_history_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            'history',
            new TableForeignKey({
                columnNames: ['moduleId'],
                referencedColumnNames: ['id'],
                referencedTableName: "modules",
                name: "fk_module_user_history_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('history', 'fk_user_module_history_id');
        await queryRunner.dropForeignKey('history', 'fk_module_user_history_id');
        await queryRunner.dropTable('history');
    }

}
