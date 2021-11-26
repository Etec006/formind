import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSessionQuestions1637803308242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "session_questions",
                columns: [
                    {
                        name: 'sessionId',
                        type: 'varchar'
                    },
                    {
                        name: 'questionId',
                        type: 'varchar'
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            'session_questions',
            new TableForeignKey({
                columnNames: ['sessionId'],
                referencedColumnNames: ['id'],
                referencedTableName: "sessions",
                name: "fk_session_question_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            'session_questions',
            new TableForeignKey({
                columnNames: ['questionId'],
                referencedColumnNames: ['id'],
                referencedTableName: "questions",
                name: "fk_question_session_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('session_questions', 'fk_session_question_id');
        await queryRunner.dropForeignKey('session_questions', 'fk_question_session_id');
        await queryRunner.dropTable('session_questions');
    }

}
