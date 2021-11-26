import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUsers1632867170643 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    },
                    {
                        name: 'profileId',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp'
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                columnNames: ['profileId'],
                referencedColumnNames: ['id'],
                referencedTableName: "pictures",
                name: "fk_user_profile",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'fk_user_profile');
        await queryRunner.dropTable('users')
    }

}
