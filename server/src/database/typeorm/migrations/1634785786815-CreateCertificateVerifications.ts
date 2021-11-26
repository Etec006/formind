import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCertificateVerifications1634785786815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'certificates_verifications',
                columns: [
                    {
                        name: 'certificateId',
                        type: 'varchar'
                    },
                    {
                        name: 'verificationId',
                        type: 'varchar'
                    }
                ]
            })
        );
        
        await queryRunner.createForeignKey(
            'certificates_verifications',
            new TableForeignKey({
                columnNames: ['certificateId'],
                referencedColumnNames: ['id'],
                referencedTableName: "certificates",
                name: "fk_certificate_verification_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        )

        await queryRunner.createForeignKey(
            'certificates_verifications',
            new TableForeignKey({
                columnNames: ['verificationId'],
                referencedColumnNames: ['id'],
                referencedTableName: "verifications",
                name: "fk_verification_certificate_id",
                onDelete: "CASCADE",
                onUpdate: "SET NULL",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('certificates_verifications', 'fk_certificate_verification_id');
        await queryRunner.dropForeignKey('certificates_verifications', 'fk_verification_certificate_id');
        await queryRunner.dropTable('certificates_verifications');
    }

}
