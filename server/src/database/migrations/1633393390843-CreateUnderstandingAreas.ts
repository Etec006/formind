import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUnderstandingArea1633393390843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'understanding_areas',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'color',
                        type: 'varchar'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('understanding_areas');
    }

}
