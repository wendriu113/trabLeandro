import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    localName: "Museu da Gravura Brasileira (Bagé)",
    question: "O Museu da Gravura é famoso por:",
    options: [
      "Esportes",
      "Praia",
      "Arte em gravuras",
      "Cinema",
      "Shopping"
    ],
    correctIndex: 2,
    explanation: "O Museu da Gravura Brasileira de Bagé, fundado em 1977, é um marco cultural nacional, criado a partir do legado do célebre 'Grupo de Bagé' (Danúbio Gonçalves, Glauco Rodrigues, Glênio Bianchetti e Carlos Scliar).",
    points: 2
  },
  {
    id: 2,
    localName: "Museu Dom Diogo de Souza (Bagé)",
    question: "O Museu Dom Diogo de Souza, um dos mais importantes do Rio Grande do Sul, preserva relíquias de qual período histórico?",
    options: [
      "Da conquista do espaço",
      "Da Revolução Farroupilha e história das charqueadas",
      "Da navegação viking",
      "Da corrida do ouro na Califórnia",
      "Da civilização egípcia antiga"
    ],
    correctIndex: 1,
    explanation: "Fundado em 1956 pelo historiador Tarcísio Taborda, o Museu Dom Diogo de Souza abriga armas, fardas da Revolução Farroupilha, documentos das charqueadas e memória da fronteira gaúcha.",
    points: 2
  },
  {
    id: 3,
    localName: "Catedral de São Sebastião de Bagé",
    question: "A histórica Catedral de São Sebastião, na Praça Silveira Martins, carrega em suas torres as marcas de:",
    options: [
      "Balas e tiros do histórico Cerco de Bagé de 1893",
      "Pinturas rupestres pré-históricas",
      "Relógios de sol coloniais astecas",
      "Brasões da corte imperial japonesa",
      "Mosaicos do Império Bizantino"
    ],
    correctIndex: 0,
    explanation: "Durante a Revolução Federalista de 1893, a Catedral foi palco de combates sangrentos no Cerco de Bagé. Até hoje é possível observar os orifícios das balas de fuzil em suas paredes e torres.",
    points: 2
  },
  {
    id: 4,
    localName: "Forte de Santa Tecla (Bagé)",
    question: "As ruínas do Forte de Santa Tecla foram erguidas no século XVIII com o objetivo de:",
    options: [
      "Construir um grande resort turístico",
      "Instalar uma fábrica de locomotivas a vapor",
      "Defesa e demarcação da fronteira entre Portugal e Espanha",
      "Montar uma refinaria de petróleo",
      "Criar uma arena para touradas"
    ],
    correctIndex: 2,
    explanation: "Construído em 1774 pelo governador espanhol Juan José de Vértiz y Salcedo, o Forte de Santa Tecla foi um dos principais postos militares na disputa pelas fronteiras do Rio Grande do Sul.",
    points: 2
  },
  {
    id: 5,
    localName: "Patrimônio e Tradição da Rainha da Fronteira",
    question: "Bagé é carinhosamente conhecida como 'Rainha da Fronteira' devido a sua:",
    options: [
      "Grande quantidade de praias tropicais",
      "Localização estratégica no Pampa, palacetes históricos e forte tradição gaúcha",
      "Indústria automobilística de alta velocidade",
      "Produção de pranchas de surfe",
      "Estações de esqui nas montanhas"
    ],
    correctIndex: 1,
    explanation: "Localizada no coração do Bioma Pampa e próxima à fronteira com o Uruguai, Bagé ostenta imponentes palacetes do início do século XX e mantém vivas as autênticas tradições do gaúcho campeiro.",
    points: 2
  }
];
