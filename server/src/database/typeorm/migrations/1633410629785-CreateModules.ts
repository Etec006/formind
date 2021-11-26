import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateModule1633410629785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'modules',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'subjectId',
                        type: 'varchar'
                    },
                    {
                        name: 'producerId',
                        type: 'varchar'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'concept',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'text'
                    },
                    {
                        name: 'imageId',
                        type: 'varchar'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'modules',
            new TableForeignKey({
                columnNames: ['subjectId'],
                referencedColumnNames: ['id'],
                referencedTableName: "subjects",
                name: "fk_subjects_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            'modules',
            new TableForeignKey({
                columnNames: ['imageId'],
                referencedColumnNames: ['id'],
                referencedTableName: "pictures",
                name: "fk_modules_images",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            'modules',
            new TableForeignKey({
                columnNames: ['producerId'],
                referencedColumnNames: ['id'],
                referencedTableName: "users",
                name: "fk_modules_users",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('modules', 'fk_subjects_id');
        await queryRunner.dropForeignKey('modules', 'fk_modules_images');
        await queryRunner.dropForeignKey('modules', 'fk_modules_users');
        await queryRunner.dropTable('modules');
    }

}
