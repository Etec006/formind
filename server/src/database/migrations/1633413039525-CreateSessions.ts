import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSession1633413039525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'sessions',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'moduleId',
                        type: 'varchar'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'content',
                        type: 'text'
                    },
                    {
                        name: 'thumbnailId',
                        type: 'varchar'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'sessions',
            new TableForeignKey({
                columnNames: ['moduleId'],
                referencedColumnNames: ['id'],
                referencedTableName: "modules",
                name: "fk_modules_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            'sessions',
            new TableForeignKey({
                columnNames: ['thumbnailId'],
                referencedColumnNames: ['id'],
                referencedTableName: "pictures",
                name: "fk_sessions_thumbnails",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('sessions', 'fk_modules_id');
        await queryRunner.dropForeignKey('sessions', 'fk_sessions_thumbnails');
        await queryRunner.dropTable('sessions');
    }

}
