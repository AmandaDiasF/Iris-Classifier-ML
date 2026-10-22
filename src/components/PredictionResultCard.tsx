import React, { useState } from 'react';
import {
  CheckCircle2,
  Code2,
  Copy,
  Check,
  Clock,
  Layers,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { PredictionResponse, IrisFeatures } from '../types/iris';
import { SPECIES_METADATA } from '../constants/speciesData';

interface PredictionResultCardProps {
  result: PredictionResponse;
  latencyMs: number;
  endpoint: string;
  submittedFeatures: IrisFeatures;
}

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({
  result,
  latencyMs,
  endpoint,
  submittedFeatures,
}) => {
  const [copied, setCopied] = useState(false);
  const [showJsonRaw, setShowJsonRaw] = useState(false);
  const [imageError, setImageError] = useState(false);

  const speciesName = result.predicao || 'Desconhecida';
  // Match species metadata (case-insensitive)
  const metadataKey = Object.keys(SPECIES_METADATA).find(
    (k) => k.toLowerCase() === speciesName.toLowerCase()
  );
  const metadata = metadataKey ? SPECIES_METADATA[metadataKey] : null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden transition-all duration-200">
      {/* Top Banner Accent */}
      <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500" />

      <div className="p-6 sm:p-8">
        {/* Header Section with Prominent Result */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Resultado da Classificação</span>
              <span className="text-slate-300">|</span>
              <span className="font-mono text-slate-400 tabular-nums">Código {result.codigo}</span>
            </div>

            {/* PROMINENT PREDIÇÃO FIELD */}
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Iris <span className="text-indigo-600 underline decoration-indigo-200 decoration-4 underline-offset-4">{result.predicao}</span>
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Classificado com Sucesso</span>
              </span>
            </div>

            {metadata && (
              <p className="text-sm italic text-slate-500 mt-1">
                {metadata.scientificName}
              </p>
            )}
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-right">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Tempo de Resposta</span>
              <span className="font-mono text-sm font-semibold text-slate-700 flex items-center justify-end gap-1 tabular-nums">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {latencyMs} ms
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-right">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Classe Numérica</span>
              <span className="font-mono text-sm font-semibold text-indigo-600 flex items-center justify-end gap-1 tabular-nums">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Index #{result.codigo}
              </span>
            </div>
          </div>
        </div>

        {/* Center Grid: Flower Botanical Visual + Details */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Botanical Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3 shadow-xs">
              {metadata && !imageError ? (
                <img
                  src={metadata.image}
                  alt={`Fotografia botânica de ${speciesName}`}
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-indigo-50 to-slate-100">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg mb-2">
                    {speciesName.slice(0, 2)}
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">Iris {speciesName}</span>
                  <span className="text-xs text-slate-500 mt-1">Exemplar botânico catalogado</span>
                </div>
              )}

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent p-3 text-white">
                <span className="text-xs font-medium">Exemplar Botânico</span>
                <p className="text-[11px] text-slate-300">Iris {speciesName} em floração natural</p>
              </div>
            </div>

            {metadata && (
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {metadata.description}
              </p>
            )}
          </div>

          {/* Morphological Analysis Table */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-indigo-600" />
                <span>Dados Recebidos pela API & Confronto Morfológico</span>
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Confronto das dimensões processadas (em cm) com os intervalos de referência do dataset clássico de Fisher
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Característica</th>
                    <th className="py-2.5 px-3 text-right">Valor Enviado</th>
                    <th className="py-2.5 px-3 text-right">Faixa Típica {speciesName}</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-900">
                      Comprimento Sépala (sepal_length)
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold tabular-nums text-indigo-700">
                      {result.dados_recebidos?.sepal_length ?? submittedFeatures.sepal_length} cm
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-500 tabular-nums">
                      {metadata ? `${metadata.typicalRanges.sepal_length[0]} - ${metadata.typicalRanges.sepal_length[1]} cm` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-slate-100 text-slate-700">
                        Processado
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-900">
                      Largura Sépala (sepal_width)
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold tabular-nums text-indigo-700">
                      {result.dados_recebidos?.sepal_width ?? submittedFeatures.sepal_width} cm
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-500 tabular-nums">
                      {metadata ? `${metadata.typicalRanges.sepal_width[0]} - ${metadata.typicalRanges.sepal_width[1]} cm` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-slate-100 text-slate-700">
                        Processado
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-900">
                      Comprimento Pétala (petal_length)
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold tabular-nums text-indigo-700">
                      {result.dados_recebidos?.petal_length ?? submittedFeatures.petal_length} cm
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-500 tabular-nums">
                      {metadata ? `${metadata.typicalRanges.petal_length[0]} - ${metadata.typicalRanges.petal_length[1]} cm` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-slate-100 text-slate-700">
                        Processado
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-900">
                      Largura Pétala (petal_width)
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold tabular-nums text-indigo-700">
                      {result.dados_recebidos?.petal_width ?? submittedFeatures.petal_width} cm
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-500 tabular-nums">
                      {metadata ? `${metadata.typicalRanges.petal_width[0]} - ${metadata.typicalRanges.petal_width[1]} cm` : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-slate-100 text-slate-700">
                        Processado
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key biological traits */}
            {metadata && (
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <span className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Marcadores Biológicos Distintivos:
                </span>
                <ul className="text-xs text-slate-600 space-y-1">
                  {metadata.keyTraits.map((trait, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer Technical Drawer: Raw JSON & Endpoint details */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2 truncate max-w-md">
            <span className="font-semibold text-slate-700 shrink-0">Origem:</span>
            <span className="font-mono text-[11px] text-slate-500 truncate" title={endpoint}>
              {endpoint}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setShowJsonRaw(!showJsonRaw)}
              className="text-xs font-medium text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1.5 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{showJsonRaw ? 'Ocultar JSON' : 'Ver JSON Bruto'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyJson}
              className="text-xs font-medium text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1.5 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar JSON'}</span>
            </button>
          </div>
        </div>

        {/* Raw JSON Code Block */}
        {showJsonRaw && (
          <div className="mt-4 p-4 bg-slate-900 rounded-lg text-slate-200 font-mono text-xs overflow-x-auto shadow-inner">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
