import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateModuleClassification1635901917364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "module_classification",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true
                    },
                    {
                        name: 'userId',
                        type: 'varchar',
                    },
                    {
                        name: 'moduleId',
                        type: 'varchar'
                    },
                    {
                        name: 'rating',
                        type: 'float'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'module_classification',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: "users",
                name: "fk_user_module_classification_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            'module_classification',
            new TableForeignKey({
                columnNames: ['moduleId'],
                referencedColumnNames: ['id'],
                referencedTableName: "modules",
                name: "fk_module_user_classification_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('module_classification', 'fk_module_user_classification_id');
        await queryRunner.dropForeignKey('module_classification', 'fk_module_user_classification_id');
        await queryRunner.dropTable('module_classification');
    }

}
