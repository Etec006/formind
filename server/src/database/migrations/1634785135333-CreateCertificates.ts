import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCertificates1634785135333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'certificates',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'userId',
                        type: 'varchar'
                    },
                    {
                        name: 'subjectId',
                        type: 'varchar'
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'certificates',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: "users",
                name: "fk_certificate_user_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        )

        await queryRunner.createForeignKey(
            'certificates',
            new TableForeignKey({
                columnNames: ['subjectId'],
                referencedColumnNames: ['id'],
                referencedTableName: "subjects",
                name: "fk_certificate_subject_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('certificates', 'fk_certificate_user_id');
        await queryRunner.dropForeignKey('certificates', 'fk_certificate_subject_id');
        await queryRunner.dropTable('certificates');
    }

}
