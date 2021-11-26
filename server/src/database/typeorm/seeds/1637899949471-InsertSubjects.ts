import { Connection, getCustomRepository, In } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import UnderstandingArea from '../../../entities/UnderstandingArea';
import { areas } from '../../../enums/areas';
import SubjectRepository from '../../../repositories/SubjectRepository';
import UnderstandingAreaRepository from '../../../repositories/UnderstandingAreaRepository';

function getAreaIdByName(areas: UnderstandingArea[], name: string){
    const area = areas.find(area => area.name == name)
    return area;
}


export default class CreateRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const subjectRepository = getCustomRepository(SubjectRepository);
    const areaRepository = getCustomRepository(UnderstandingAreaRepository);

    const areasData = await areaRepository.find({
        name: In([
            areas.EXATAS,
            areas.BIOLOGICAS,
            areas.ENGENHARIAS,
            areas.SAUDE,
            areas.AGRARIAS,
            areas.LETRAS,
            areas.SOCIAIS,
            areas.HUMANAS
        ])
    })

    const subjects = subjectRepository.create([
        {
            name: "Matemática",
            description: "A Matemática é uma ciência que relaciona a lógica com situações práticas habituais. Ela desenvolve uma constante busca pela veracidade dos fatos por meio de técnicas precisas e exatas. Ao longo da história, a Matemática foi sendo construída e aperfeiçoada, prosseguindo em constante evolução, investigando novas situações e estabelecendo relações com os acontecimentos cotidianos.",
            area: getAreaIdByName(areasData, areas.EXATAS)
        },
        {
            name: "Probabilidade e Estatística",
            description: "A teoria da Probabilidade é o estudo matemático na quantificação da aleatoriedade e incerteza de eventos na natureza; a Estatística é a ciência da coleta, descrição e análise de dados. Há uma interligação entre essas duas áreas de ciências que lidam com o que é aleatório.",
            area: getAreaIdByName(areasData, areas.EXATAS)
        },
        {
            name: "Ciência da Computação",
            description: "Ciência da computação é a ciência que estuda as técnicas, metodologias, instrumentos computacionais e aplicações tecnológicas, que informatizem os processos e desenvolvam soluções de processamento de dados de entrada e saída pautados no computador. Não se restringindo apenas ao estudo dos algoritmos, suas aplicações e implementação na forma de software. Assim, a Ciência da Computação também abrange as técnicas de modelagem de dados e gerenciamento de banco de dados, envolvendo também a telecomunicação e os protocolos de comunicação, além de princípios que abrangem outras especializações da área",
            area: getAreaIdByName(areasData, areas.EXATAS)
        },
        {
            name: "Astronomia",
            description: "Astronomia é uma ciência natural que estuda corpos celestes (como estrelas, planetas, cometas, nebulosas, aglomerados de estrelas, galáxias) e fenômenos que se originam fora da atmosfera da Terra (como a radiação cósmica de fundo em micro-ondas). Preocupada com a evolução, a física, a química e o movimento de objetos celestes, bem como a formação e o desenvolvimento do universo.",
            area: getAreaIdByName(areasData, areas.EXATAS)
        },
        {
            name: "Física",
            description: "Física é uma ciência voltada ao estudo dos fenômenos naturais, baseando-se em teorias e por meio da observação e experimentação. A palavra Física tem origem grega (“physis”) e significa natureza. A disciplina estuda, portanto, a natureza, as propriedades da matéria e as forças naturais.",
            area: getAreaIdByName(areasData, areas.EXATAS)
        },
        {
            name: "Química",
            description: "Química é a ciência que estuda a composição, estrutura, propriedades da matéria, as mudanças sofridas por ela durante as reações químicas e a sua relação com a energia. ... Áreas interdisciplinares e complementares incluem Bioquímica, Ensino de Química, e Química Ambiental.",
            area: getAreaIdByName(areasData, areas.EXATAS)
        },
        {
            name: "Geociências",
            description: "Ciências da Terra (ou Geociências), é um termo abrangente aplicado às ciências relacionadas com o estudo do planeta Terra. Existem abordagens reducionistas e holísticas relativamente às ciências da Terra. As principais disciplinas historicamente aplicam conhecimentos de física, geografia, matemática, química e biologia de modo a construir um conhecimento quantitativo das principais áreas ou esferas do sistema Terra.",
            area: getAreaIdByName(areasData, areas.EXATAS)
        },
        {
            name: "Oceanografia",
            description: "A Oceanografia (do grego ὠκεανός e γράφω significando oceano e grafia, respetivamente), também conhecida como Oceanologia ou Ciências do Mar, é uma ciência do ramo das geociências que se dedica ao estudo dos oceanos e zonas costeiras sob todos os aspetos, desde sua descrição física até a interpretação dos fenómeno que neles se verificam e de sua interação com os continentes e com a atmosfera, bem como também no que diz respeito aos processos que atuam nestes ambientes.",
            area: getAreaIdByName(areasData, areas.EXATAS)
        },
        {
            name: "Biologia Geral",
            description: "BIOLOGIA GERAL é a ciência que estuda as diferentes formas de vida. Os objetos de estudo da BIOLOGIA GERAL são os seres vivos, como animais, vegetais, fungos, bactérias e protozoários, as unidades que os compõem (como átomos, moléculas e células), e também a relação deles com o meio em que vivem e com outros seres.",
            area: getAreaIdByName(areasData, areas.BIOLOGICAS)
        },
        {
            name: "Genética",
            description: "A Genética é a parte da Biologia que estuda a hereditariedade, ou seja, a forma como as características são repassadas de geração para geração.",
            area: getAreaIdByName(areasData, areas.BIOLOGICAS)
        },
        {
            name: "Botânica",
            description: "Botânica (ciência dos vegetais) é o ramo da biologia que estuda a vida de plantas e algas, abrangendo aspectos do crescimento, da reprodução, do desenvolvimento, do metabolismo, das doenças e evolução dos organismos vegetais.",
            area: getAreaIdByName(areasData, areas.BIOLOGICAS)
        },
        {
            name: "Zoologia",
            description: "ZOOLOGIA é a ciência que estuda os animais, sejam espécies vivas ou extintas. Estes estudos podem ser direcionados a diversos aspectos, como a estrutura dos organismos, as características que diferenciam gêneros e espécies, evolução destas ao longo do tempo, hábitos de reprodução e alimentação, relação com o meio onde vivem e distribuição das populações pelas diferentes áreas do planeta.",
            area: getAreaIdByName(areasData, areas.BIOLOGICAS)
        },
        {
            name: "Ecologia",
            description: "Ecologia é uma ciência complexa que nos permite entender como os seres vivos relacionam-se uns com os outros e com o ambiente em que vivem. Ao estudar ecologia, podemos compreender melhor a importância de cada espécie do planeta e também como o ambiente influencia na distribuição e na abundância das diferentes espécies.",
            area: getAreaIdByName(areasData, areas.BIOLOGICAS)
        }
    ])

    await subjectRepository.save(subjects)
  }
}