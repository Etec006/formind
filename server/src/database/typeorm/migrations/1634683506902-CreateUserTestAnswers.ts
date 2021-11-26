import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUserTestAnswers1634683506902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_test_answers',
                columns: [
                    {
                        name: 'userTestId',
                        type: 'varchar'
                    },
                    {
                        name: 'answerId',
                        type: 'varchar'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'user_test_answers',
            new TableForeignKey({
                columnNames: ['userTestId'],
                referencedColumnNames: ['id'],
                referencedTableName: "user_tests",
                name: "fk_user_test_answer_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            'user_test_answers',
            new TableForeignKey({
                columnNames: ['answerId'],
                referencedColumnNames: ['id'],
                referencedTableName: "answers",
                name: "fk_answer_test_user_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('user_test_answers', 'fk_user_test_answer_id');
        await queryRunner.dropForeignKey('user_test_answers', 'fk_answer_test_user_id');
        await queryRunner.dropTable('user_test_answers');
    }

}
