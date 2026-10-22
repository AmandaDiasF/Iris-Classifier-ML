import { IrisFeatures, SpeciesMetadata } from '../types/iris';

export const SPECIES_METADATA: Record<string, SpeciesMetadata> = {
  Setosa: {
    id: 'setosa',
    name: 'Iris Setosa',
    scientificName: 'Iris setosa Pall. ex Link',
    code: 0,
    color: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      text: 'text-emerald-800 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-800/40',
      accent: 'bg-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300',
    },
    image: '/src/assets/images/iris_setosa_flower_1792666041159.jpg',
    description: 'Espécie caracterizada por sépalas largas e pétalas notavelmente menores e arredondadas. Frequentemente encontrada em regiões subárticas e temperadas do hemisfério norte.',
    keyTraits: [
      'Pétalas muito pequenas (< 2.0 cm)',
      'Sépalas relativamente largas (> 3.0 cm)',
      'Fácil separabilidade linear no espaço vetorial',
    ],
    typicalRanges: {
      sepal_length: [4.3, 5.8],
      sepal_width: [2.3, 4.4],
      petal_length: [1.0, 1.9],
      petal_width: [0.1, 0.6],
    },
  },
  Versicolor: {
    id: 'versicolor',
    name: 'Iris Versicolor',
    scientificName: 'Iris versicolor L.',
    code: 1,
    color: {
      bg: 'bg-sky-50 dark:bg-sky-950/30',
      text: 'text-sky-800 dark:text-sky-300',
      border: 'border-sky-200 dark:border-sky-800/40',
      accent: 'bg-sky-600',
      badge: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-900/40 dark:text-sky-300',
    },
    image: '/src/assets/images/iris_versicolor_flower_1792666041694.jpg',
    description: 'Conhecida como "Blue Flag", possui proporções intermediárias entre a Setosa e a Virginica. As pétalas exibem delicadas nervuras amarelas e violetas.',
    keyTraits: [
      'Pétalas de comprimento médio (3.0 - 5.1 cm)',
      'Largura das pétalas moderada (1.0 - 1.8 cm)',
      'Morfologia equilibrada entre sépalas e pétalas',
    ],
    typicalRanges: {
      sepal_length: [4.9, 7.0],
      sepal_width: [2.0, 3.4],
      petal_length: [3.0, 5.1],
      petal_width: [1.0, 1.8],
    },
  },
  Virginica: {
    id: 'virginica',
    name: 'Iris Virginica',
    scientificName: 'Iris virginica L.',
    code: 2,
    color: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/30',
      text: 'text-indigo-800 dark:text-indigo-300',
      border: 'border-indigo-200 dark:border-indigo-800/40',
      accent: 'bg-indigo-600',
      badge: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900/40 dark:text-indigo-300',
    },
    image: '/src/assets/images/iris_virginica_flower_1792666042801.jpg',
    description: 'A maior das três espécies, nativa do leste da América do Norte. Destaca-se por sépalas e pétalas alongadas e uma crista amarela viva na base das pétalas.',
    keyTraits: [
      'Pétalas longas e desenvolvidas (4.5 - 6.9 cm)',
      'Largura das pétalas robusta (1.4 - 2.5 cm)',
      'Sépalas proeminentes e porte botânico elevado',
    ],
    typicalRanges: {
      sepal_length: [4.9, 7.9],
      sepal_width: [2.2, 3.8],
      petal_length: [4.5, 6.9],
      petal_width: [1.4, 2.5],
    },
  },
};

export const SAMPLE_PRESETS: { label: string; species: string; features: IrisFeatures; note: string }[] = [
  {
    label: 'Exemplo Virginica (Modelo do Enunciado)',
    species: 'Virginica',
    features: {
      sepal_length: 6.7,
      sepal_width: 3.0,
      petal_length: 5.2,
      petal_width: 2.3,
    },
    note: 'Exemplo oficial da especificação da tarefa',
  },
  {
    label: 'Exemplo Iris Setosa Típica',
    species: 'Setosa',
    features: {
      sepal_length: 5.1,
      sepal_width: 3.5,
      petal_length: 1.4,
      petal_width: 0.2,
    },
    note: 'Pétalas diminutas características',
  },
  {
    label: 'Exemplo Iris Versicolor Típica',
    species: 'Versicolor',
    features: {
      sepal_length: 5.9,
      sepal_width: 3.0,
      petal_length: 4.2,
      petal_width: 1.5,
    },
    note: 'Dimensões intermediárias clássicas',
  },
  {
    label: 'Exemplo Iris Virginica Robusta',
    species: 'Virginica',
    features: {
      sepal_length: 7.2,
      sepal_width: 3.2,
      petal_length: 6.0,
      petal_width: 2.1,
    },
    note: 'Pétalas longas e proeminentes',
  },
];

export const MORPHOLOGY_BANNER_PATH = '/src/assets/images/iris_morphology_banner_1792666042434.jpg';
