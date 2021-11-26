import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSessionProgress1636069578519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "session_progress",
                columns: [
                    {
                        name: "userId",
                        type: "varchar"
                    },
                    {
                        name: "sessionId",
                        type: "varchar"
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            'session_progress',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: "users",
                name: "fk_user_session_progress_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            'session_progress',
            new TableForeignKey({
                columnNames: ['sessionId'],
                referencedColumnNames: ['id'],
                referencedTableName: "sessions",
                name: "fk_session_user_progress_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('session_progress', 'fk_user_session_progress_id');
        await queryRunner.dropForeignKey('session_progress', 'fk_session_user_progress_id');
        await queryRunner.dropTable('session_progress');
    }

}
