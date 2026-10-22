import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResultCard } from './components/PredictionResultCard';
import { MorphologyGuide } from './components/MorphologyGuide';
import { PredictionHistory } from './components/PredictionHistory';
import { IrisFeatures, PredictionResponse, PredictionHistoryItem } from './types/iris';
import { predictIrisSpecies, PRIMARY_API_URL } from './services/irisApi';
import { AlertCircle, RefreshCw, Sparkles, ExternalLink, Activity, CheckCircle2 } from 'lucide-react';

const INITIAL_FEATURES: IrisFeatures = {
  sepal_length: 6.7,
  sepal_width: 3.0,
  petal_length: 5.2,
  petal_width: 2.3,
};

const LOCAL_STORAGE_KEY = 'iris_classifier_history_v1';

export default function App() {
  const [features, setFeatures] = useState<IrisFeatures>(INITIAL_FEATURES);
  const [submittedFeatures, setSubmittedFeatures] = useState<IrisFeatures>(INITIAL_FEATURES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [latencyMs, setLatencyMs] = useState<number>(0);
  const [endpointUsed, setEndpointUsed] = useState<string>(PRIMARY_API_URL);
  const [activeTab, setActiveTab] = useState<'predictor' | 'morphology' | 'history'>('predictor');
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const saveToHistory = (item: PredictionHistoryItem) => {
    setHistory((prev) => {
      const updated = [item, ...prev].slice(0, 50); // keep last 50
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // storage full
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const apiResult = await predictIrisSpecies(features);
      setResult(apiResult.data);
      setLatencyMs(apiResult.latencyMs);
      setEndpointUsed(apiResult.endpoint);
      setSubmittedFeatures({ ...features });

      // Record in history
      const historyItem: PredictionHistoryItem = {
        id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toISOString(),
        features: { ...features },
        result: apiResult.data,
        latencyMs: apiResult.latencyMs,
        endpointUsed: apiResult.endpoint,
      };
      saveToHistory(historyItem);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Falha desconhecida na requisição da API.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFeatures(INITIAL_FEATURES);
    setError(null);
  };

  const handleSelectSample = (sampleFeatures: IrisFeatures) => {
    setFeatures(sampleFeatures);
    setActiveTab('predictor');
    // Scroll to top of predictor
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewPrediction={() => {
          setActiveTab('predictor');
          handleReset();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Editorial Subheader & API Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Machine Learning Inference Console</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Microsoft Azure Cloud</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Classificador de Espécies da Flor Iris
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Dashboard preditivo integrado à API de Machine Learning na nuvem Azure. Insira os parâmetros biométricos para inferência probabilística da espécie vegetal.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-medium text-slate-800">API Azure Online</span>
              <span className="text-slate-300">|</span>
              <a
                href={PRIMARY_API_URL}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-mono text-[11px] flex items-center gap-1"
                title="Abrir endpoint no navegador"
              >
                <span>/api/predict</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Global Error Notice if request fails */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 sm:p-5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-rose-950">
                  Falha ao comunicar com a API Azure
                </h4>
                <p className="text-xs text-rose-800/90 mt-1">{error}</p>
                <p className="text-[11px] text-rose-700 mt-2">
                  Dica: Se estiver usando localmente, verifique o proxy configurado no <code className="font-mono bg-rose-100 px-1 py-0.5 rounded">vite.config.ts</code> ou acione "Tentar Novamente".
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={isLoading}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tentar Novamente</span>
            </button>
          </div>
        )}

        {/* TAB 1: PREDICTOR VIEW */}
        {activeTab === 'predictor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-6 space-y-6">
              <PredictionForm
                features={features}
                onChange={setFeatures}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                onReset={handleReset}
              />
            </div>

            {/* Right Column: Result or Empty State */}
            <div className="lg:col-span-6 space-y-6">
              {result ? (
                <PredictionResultCard
                  result={result}
                  latencyMs={latencyMs}
                  endpoint={endpointUsed}
                  submittedFeatures={submittedFeatures}
                />
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center flex flex-col items-center justify-center min-h-[460px]">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    Pronto para Classificar
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed">
                    Ajuste os valores morfológicos no formulário ao lado ou clique no botão abaixo para testar a predição com os dados fornecidos no enunciado:
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 max-w-sm w-full text-left font-mono text-xs text-slate-700 mb-6 space-y-1">
                    <div className="text-[11px] font-sans font-semibold text-slate-500 mb-1">
                      Payload preparado:
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">sepal_length:</span>
                      <span className="font-bold text-indigo-700">{features.sepal_length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">sepal_width:</span>
                      <span className="font-bold text-indigo-700">{features.sepal_width}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">petal_length:</span>
                      <span className="font-bold text-indigo-700">{features.petal_length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">petal_width:</span>
                      <span className="font-bold text-indigo-700">{features.petal_width}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    disabled={isLoading}
                    className="w-full max-w-sm py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Executar Classificação Agora</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MORPHOLOGY BOTANICAL GUIDE */}
        {activeTab === 'morphology' && (
          <MorphologyGuide onSelectSample={handleSelectSample} />
        )}

        {/* TAB 3: PREDICTION HISTORY */}
        {activeTab === 'history' && (
          <PredictionHistory
            history={history}
            onSelectHistoryItem={handleSelectSample}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>

      {/* Clean Editorial Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">IrisML Studio</span>
            <span aria-hidden="true">·</span>
            <span>Dataset Fisher (1936) & Azure Cloud API</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px]">esbuild ^0.28.0</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.youtube.com/watch?v=tsm2DjrBnsw"
              target="_blank"
              rel="noreferrer"
              className="text-slate-600 hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors"
            >
              <span>Vídeo Apoio Azure</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
