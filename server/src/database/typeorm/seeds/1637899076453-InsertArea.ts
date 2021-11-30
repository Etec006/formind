import { Connection, getCustomRepository, In } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { areas } from '../../../enums/areas';
import UnderstandingAreaRepository from '../../../repositories/UnderstandingAreaRepository';

export default class CreateArea implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const areaRepository = getCustomRepository(UnderstandingAreaRepository);

    const areasData = areaRepository.create([
        {
            name: areas.EXATAS,
            color: "blue"
        },
        {
            name: areas.BIOLOGICAS,
            color: "green"
        },
        {
            name: areas.ENGENHARIAS,
            color: "purple"
        },
        {
            name: areas.SAUDE,
            color: "green"
        },
        {
            name: areas.AGRARIAS,
            color: "yellow"
        },
        {
            name: areas.LETRAS,
            color: "blue"
        },
        {
            name: areas.SOCIAIS,
            color: "orange"
        },
        {
            name: areas.HUMANAS,
            color: "red"
        }
    ])

    await areaRepository.save(areasData);
  }
}