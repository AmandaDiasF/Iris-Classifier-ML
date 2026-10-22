export interface IrisFeatures {
  sepal_length: number;
  sepal_width: number;
  petal_length: number;
  petal_width: number;
}

export interface PredictionResponse {
  codigo: number;
  dados_recebidos: IrisFeatures;
  predicao: string;
}

export interface PredictionHistoryItem {
  id: string;
  timestamp: string;
  features: IrisFeatures;
  result: PredictionResponse;
  latencyMs: number;
  endpointUsed: string;
}

export interface SpeciesMetadata {
  id: string;
  name: string;
  scientificName: string;
  code: number;
  color: {
    bg: string;
    text: string;
    border: string;
    accent: string;
    badge: string;
  };
  image: string;
  description: string;
  keyTraits: string[];
  typicalRanges: {
    sepal_length: [number, number];
    sepal_width: [number, number];
    petal_length: [number, number];
    petal_width: [number, number];
  };
}
