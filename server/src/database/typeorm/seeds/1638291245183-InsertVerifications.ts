import { Connection, getCustomRepository, In } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { verifications } from '../../../enums/verifications';
import VerificationRepository from '../../../repositories/VerificationRepository';

export default class CreateVerifications implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
      const verificationRepository = getCustomRepository(VerificationRepository)
  
      const verificationsData = verificationRepository.create([
        {
            name: verifications.PROVA
        },
        {
            name: verifications.DIPLOMA
        },
        {
            name: verifications.ANALISE
        },
        {
            name: verifications.RANKEADO
        },
        {
            name: verifications.CONFIANCA
        }
      ])
  
      await verificationRepository.save(verificationsData);
    }
  }