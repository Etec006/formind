import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAnswers1634609229433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'answers',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'questionId',
                        type: 'varchar'
                    },
                    {
                        name: 'text',
                        type: 'varchar'
                    },
                    {
                        name: 'isCorrect',
                        type: 'boolean'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'answers',
            new TableForeignKey({
                columnNames: ['questionId'],
                referencedColumnNames: ['id'],
                referencedTableName: "questions",
                name: "fk_question_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('answers', 'fk_question_id');
        await queryRunner.dropTable('answers');
    }

}
