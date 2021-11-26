import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSubjects1633401262501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'subjects',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'areaId',
                        type: 'varchar'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'subjects',
            new TableForeignKey({
                columnNames: ['areaId'],
                referencedColumnNames: ['id'],
                referencedTableName: "understanding_areas",
                name: "fk_understanding_areas_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('subjects', 'fk_understanding_areas_id');
        await queryRunner.dropForeignKey('subjects', 'fk_user_subject_id');
        await queryRunner.dropTable('subjects');
    }

}
