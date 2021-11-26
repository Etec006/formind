import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTestQuestions1634614815874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'test_questions',
                columns: [
                    {
                        name: 'testId',
                        type: 'varchar'
                    },
                    {
                        name: 'questionId',
                        type: 'varchar'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'test_questions',
            new TableForeignKey({
                columnNames: ['testId'],
                referencedColumnNames: ['id'],
                referencedTableName: "tests",
                name: "fk_test_question_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            'test_questions',
            new TableForeignKey({
                columnNames: ['questionId'],
                referencedColumnNames: ['id'],
                referencedTableName: "questions",
                name: "fk_question_test_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('test_questions', 'fk_test_question_id');
        await queryRunner.dropForeignKey('test_questions', 'fk_question_test_id');
        await queryRunner.dropTable('test_questions');
    }

}
