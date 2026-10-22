import { IrisFeatures, PredictionResponse } from '../types/iris';

export const PRIMARY_API_URL = 'https://mlteste-a5akend9ach6c3h0.westus3-01.azurewebsites.net/api/predict';
export const PROXY_API_URL = '/api/predict';

export interface PredictApiResult {
  data: PredictionResponse;
  latencyMs: number;
  endpoint: string;
}

export async function predictIrisSpecies(features: IrisFeatures): Promise<PredictApiResult> {
  // Validate numbers
  const payload = {
    sepal_length: Number(features.sepal_length),
    sepal_width: Number(features.sepal_width),
    petal_length: Number(features.petal_length),
    petal_width: Number(features.petal_width),
  };

  if (
    isNaN(payload.sepal_length) ||
    isNaN(payload.sepal_width) ||
    isNaN(payload.petal_length) ||
    isNaN(payload.petal_width)
  ) {
    throw new Error('Todos os 4 valores morfológicos precisam ser números válidos.');
  }

  if (
    payload.sepal_length <= 0 ||
    payload.sepal_width <= 0 ||
    payload.petal_length <= 0 ||
    payload.petal_width <= 0
  ) {
    throw new Error('Os valores das dimensões da flor devem ser maiores que zero.');
  }

  const startTime = performance.now();

  // Try direct Azure endpoint first
  try {
    const response = await fetch(PRIMARY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Servidor respondeu com status HTTP ${response.status} (${response.statusText})`);
    }

    const data: PredictionResponse = await response.json();
    const latencyMs = Math.round(performance.now() - startTime);

    if (!data.predicao) {
      throw new Error('Resposta da API recebida, porém o campo "predicao" não foi retornado.');
    }

    return {
      data,
      latencyMs,
      endpoint: PRIMARY_API_URL,
    };
  } catch (primaryError) {
    // If direct call fails (e.g., CORS in some environments), attempt proxy endpoint
    try {
      const fallbackResponse = await fetch(PROXY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!fallbackResponse.ok) {
        throw new Error(`Proxy respondeu com status HTTP ${fallbackResponse.status}`);
      }

      const data: PredictionResponse = await fallbackResponse.json();
      const latencyMs = Math.round(performance.now() - startTime);

      return {
        data,
        latencyMs,
        endpoint: PROXY_API_URL,
      };
    } catch {
      // Re-throw meaningful error from primary attempt
      const message =
        primaryError instanceof Error
          ? primaryError.message
          : 'Falha ao conectar com o serviço de Machine Learning na Azure.';
      throw new Error(`Erro na predição: ${message}. Verifique sua conexão ou se a API Azure está ativa.`);
    }
  }
}
