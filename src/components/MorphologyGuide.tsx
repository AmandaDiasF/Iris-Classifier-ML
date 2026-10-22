import React, { useState } from 'react';
import { MORPHOLOGY_BANNER_PATH, SPECIES_METADATA } from '../constants/speciesData';
import { Flower2, Info, ArrowUpRight } from 'lucide-react';
import { IrisFeatures } from '../types/iris';

interface MorphologyGuideProps {
  onSelectSample: (features: IrisFeatures) => void;
}

export const MorphologyGuide: React.FC<MorphologyGuideProps> = ({ onSelectSample }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="space-y-8">
      {/* Botanical Anatomy Hero Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1 flex items-center gap-1.5">
              <Flower2 className="w-4 h-4" />
              <span>Anatomia da Flor & Dataset Iris (1936)</span>
            </span>
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
              Diferença entre Sépalas e Pétalas no Modelo
            </h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              O conjunto de dados criado pelo biólogo e estatístico britânico Ronald Fisher em 1936 mede quatro atributos morfológicos fundamentais. O modelo de Machine Learning treinado na Azure avalia a relação espacial dessas dimensões para classificar a espécie com alta precisão.
            </p>

            <div className="mt-6 space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
                <span className="font-bold text-slate-900 block mb-0.5">
                  1. Sépalas (Sepals / Falls):
                </span>
                <p className="text-slate-600">
                  São os segmentos florais externos inferiores que caem graciosamente. Em <span className="font-semibold text-emerald-700">Iris setosa</span>, as sépalas são largas e as pétalas curtas.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
                <span className="font-bold text-slate-900 block mb-0.5">
                  2. Pétalas (Petals / Standards):
                </span>
                <p className="text-slate-600">
                  São os segmentos verticais eretos no centro da flor. O comprimento e a largura das pétalas representam o principal discriminador entre <span className="font-semibold text-sky-700">Iris versicolor</span> e <span className="font-semibold text-indigo-700">Iris virginica</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-100 relative min-h-[280px]">
            {!imageError ? (
              <img
                src={MORPHOLOGY_BANNER_PATH}
                alt="Infográfico botânico e anatomia morfológica de Iris"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-6 text-slate-400">
                <Info className="w-8 h-8" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3 Species Side-by-side comparison */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900">
            Comparativo das Três Espécies
          </h3>
          <p className="text-xs text-slate-500">
            Clique em qualquer espécie para carregar medidas representativas diretamente no formulário de predição
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(SPECIES_METADATA).map(([key, sp]) => {
            const representativeFeatures: IrisFeatures = {
              sepal_length: +(
                (sp.typicalRanges.sepal_length[0] + sp.typicalRanges.sepal_length[1]) /
                2
              ).toFixed(1),
              sepal_width: +(
                (sp.typicalRanges.sepal_width[0] + sp.typicalRanges.sepal_width[1]) /
                2
              ).toFixed(1),
              petal_length: +(
                (sp.typicalRanges.petal_length[0] + sp.typicalRanges.petal_length[1]) /
                2
              ).toFixed(1),
              petal_width: +(
                (sp.typicalRanges.petal_width[0] + sp.typicalRanges.petal_width[1]) /
                2
              ).toFixed(1),
            };

            return (
              <div
                key={key}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={sp.image}
                      alt={sp.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-white/90 backdrop-blur-sm text-slate-800 shadow-xs">
                        Código #{sp.code}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="text-base font-bold text-slate-900">{sp.name}</h4>
                    <p className="text-xs italic text-slate-500 mb-3">{sp.scientificName}</p>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {sp.description}
                    </p>

                    <div className="space-y-1.5 text-[11px] font-mono border-t border-slate-100 pt-3">
                      <div className="flex justify-between text-slate-600">
                        <span className="font-sans text-slate-500">Sépala (comp x larg):</span>
                        <span className="tabular-nums font-semibold">
                          {sp.typicalRanges.sepal_length[0]}-{sp.typicalRanges.sepal_length[1]} × {sp.typicalRanges.sepal_width[0]}-{sp.typicalRanges.sepal_width[1]} cm
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span className="font-sans text-slate-500">Pétala (comp x larg):</span>
                        <span className="tabular-nums font-semibold text-indigo-600">
                          {sp.typicalRanges.petal_length[0]}-{sp.typicalRanges.petal_length[1]} × {sp.typicalRanges.petal_width[0]}-{sp.typicalRanges.petal_width[1]} cm
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectSample(representativeFeatures)}
                    className="w-full py-2 px-3 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Testar Valores Típicos de {key}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
