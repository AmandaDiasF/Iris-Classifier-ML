import React from 'react';
import { Loader2, Sparkles, RotateCcw, ArrowRight, Dna } from 'lucide-react';
import { IrisFeatures } from '../types/iris';
import { SAMPLE_PRESETS } from '../constants/speciesData';

interface PredictionFormProps {
  features: IrisFeatures;
  onChange: (features: IrisFeatures) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onReset: () => void;
}

interface FieldConfig {
  key: keyof IrisFeatures;
  label: string;
  sublabel: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  description: string;
}

const FIELDS: FieldConfig[] = [
  {
    key: 'sepal_length',
    label: 'Comprimento da Sépala',
    sublabel: 'sepal_length',
    min: 3.5,
    max: 9.0,
    step: 0.1,
    unit: 'cm',
    description: 'Extensão longitudinal da sépala externa (típico: 4.3 a 7.9 cm)',
  },
  {
    key: 'sepal_width',
    label: 'Largura da Sépala',
    sublabel: 'sepal_width',
    min: 1.5,
    max: 5.0,
    step: 0.1,
    unit: 'cm',
    description: 'Extensão transversal da sépala (típico: 2.0 a 4.4 cm)',
  },
  {
    key: 'petal_length',
    label: 'Comprimento da Pétala',
    sublabel: 'petal_length',
    min: 0.5,
    max: 8.0,
    step: 0.1,
    unit: 'cm',
    description: 'Fator crítico de separação botânica (típico: 1.0 a 6.9 cm)',
  },
  {
    key: 'petal_width',
    label: 'Largura da Pétala',
    sublabel: 'petal_width',
    min: 0.1,
    max: 3.5,
    step: 0.1,
    unit: 'cm',
    description: 'Espessura da pétala central (típico: 0.1 a 2.5 cm)',
  },
];

export const PredictionForm: React.FC<PredictionFormProps> = ({
  features,
  onChange,
  onSubmit,
  isLoading,
  onReset,
}) => {
  const handleNumberChange = (key: keyof IrisFeatures, valueStr: string) => {
    const val = parseFloat(valueStr);
    onChange({
      ...features,
      [key]: isNaN(val) ? 0 : Math.round(val * 10) / 10,
    });
  };

  const applyPreset = (presetFeatures: IrisFeatures) => {
    onChange({ ...presetFeatures });
  };

  const handleRandomize = () => {
    // Generate realistic randomized flower values
    const speciesIndex = Math.floor(Math.random() * 3);
    if (speciesIndex === 0) {
      // Setosa
      onChange({
        sepal_length: +(4.5 + Math.random() * 1.0).toFixed(1),
        sepal_width: +(3.0 + Math.random() * 1.0).toFixed(1),
        petal_length: +(1.2 + Math.random() * 0.6).toFixed(1),
        petal_width: +(0.1 + Math.random() * 0.4).toFixed(1),
      });
    } else if (speciesIndex === 1) {
      // Versicolor
      onChange({
        sepal_length: +(5.5 + Math.random() * 1.2).toFixed(1),
        sepal_width: +(2.5 + Math.random() * 0.7).toFixed(1),
        petal_length: +(3.8 + Math.random() * 1.1).toFixed(1),
        petal_width: +(1.1 + Math.random() * 0.6).toFixed(1),
      });
    } else {
      // Virginica
      onChange({
        sepal_length: +(6.2 + Math.random() * 1.5).toFixed(1),
        sepal_width: +(2.8 + Math.random() * 0.8).toFixed(1),
        petal_length: +(5.0 + Math.random() * 1.5).toFixed(1),
        petal_width: +(1.8 + Math.random() * 0.6).toFixed(1),
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
            Parâmetros Morfológicos
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Insira as 4 medidas numéricas em centímetros para predição via modelo Azure
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRandomize}
            disabled={isLoading}
            className="text-xs font-medium text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Gerar dimensões botânicas aleatórias plausíveis"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Gerar Amostra</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={isLoading}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Redefinir para valores padrões"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        </div>
      </div>

      {/* Preset Fast Picker */}
      <div className="mt-4 pt-1">
        <label className="block text-xs font-medium text-slate-500 mb-2">
          Carregar predefinições de teste rápido:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SAMPLE_PRESETS.map((preset) => {
            const isMatch =
              features.sepal_length === preset.features.sepal_length &&
              features.sepal_width === preset.features.sepal_width &&
              features.petal_length === preset.features.petal_length &&
              features.petal_width === preset.features.petal_width;

            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset.features)}
                className={`text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                  isMatch
                    ? 'border-indigo-500 bg-indigo-50/50 text-indigo-950 font-medium'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/80 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{preset.label}</span>
                  <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                    {preset.features.sepal_length} / {preset.features.sepal_width} / {preset.features.petal_length} / {preset.features.petal_width}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">{preset.note}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 4 Form Inputs */}
      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FIELDS.map((field) => {
            const value = features[field.key];

            return (
              <div
                key={field.key}
                className="bg-slate-50/70 border border-slate-200/80 rounded-lg p-4 transition-colors hover:border-slate-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label
                      htmlFor={field.key}
                      className="block text-sm font-semibold text-slate-800"
                    >
                      {field.label}
                    </label>
                    <span className="font-mono text-[11px] text-slate-600">
                      Payload: {field.sublabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <input
                      id={field.key}
                      name={field.key}
                      type="number"
                      step={field.step}
                      min={field.min}
                      max={field.max}
                      value={value === 0 ? '' : value}
                      onChange={(e) => handleNumberChange(field.key, e.target.value)}
                      required
                      className="w-20 px-2.5 py-1 text-right text-sm font-semibold font-mono bg-white border border-slate-300 rounded-md shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 tabular-nums text-slate-900"
                    />
                    <span className="text-xs font-semibold text-slate-600">{field.unit}</span>
                  </div>
                </div>

                {/* Interactive Slider */}
                <div className="mt-3">
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={value || field.min}
                    onChange={(e) => handleNumberChange(field.key, e.target.value)}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between items-center text-[10px] text-slate-600 font-mono mt-1 tabular-nums">
                    <span>min {field.min} cm</span>
                    <span>max {field.max} cm</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 mt-2">
                  {field.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Submit Action */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Dna className="w-4 h-4 text-slate-400" />
            <span>POST para Azure ML endpoint com payload JSON estruturado</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-400 text-white font-semibold text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processando predição na Azure...</span>
              </>
            ) : (
              <>
                <span>Classificar Espécie da Flor</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
