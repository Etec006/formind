import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTests1634614476309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tests',
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
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'timing',
                        type: 'time'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'tests',
            new TableForeignKey({
                columnNames: ['subjectId'],
                referencedColumnNames: ['id'],
                referencedTableName: "subjects",
                name: "fk_test_subject_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tests', 'fk_test_subject_id');
        await queryRunner.dropTable('tests');
    }

}
