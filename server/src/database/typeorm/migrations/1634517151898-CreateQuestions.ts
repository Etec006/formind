import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateQuestions1634517151898 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'questions',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'producerId',
                        type: 'varchar'
                    },
                    {
                        name: 'title',
                        type: 'varchar'
                    },
                    {
                        name: 'text',
                        type: 'varchar'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'questions',
            new TableForeignKey({
                columnNames: ['producerId'],
                referencedColumnNames: ['id'],
                referencedTableName: "users",
                name: "fk_question_producer_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('questions', 'fk_question_producer_id');
        await queryRunner.dropTable('questions');
    }

}
