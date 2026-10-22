import React from 'react';
import { PredictionHistoryItem, IrisFeatures } from '../types/iris';
import { Clock, RotateCcw, Trash2, Download, Layers } from 'lucide-react';

interface PredictionHistoryProps {
  history: PredictionHistoryItem[];
  onSelectHistoryItem: (features: IrisFeatures) => void;
  onClearHistory: () => void;
}

export const PredictionHistory: React.FC<PredictionHistoryProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  const handleExportCSV = () => {
    if (history.length === 0) return;
    const headers = [
      'Timestamp',
      'Predicao',
      'Codigo',
      'Sepal_Length',
      'Sepal_Width',
      'Petal_Length',
      'Petal_Width',
      'Latencia_ms',
    ];
    const rows = history.map((h) => [
      new Date(h.timestamp).toISOString(),
      h.result.predicao,
      h.result.codigo,
      h.features.sepal_length,
      h.features.sepal_width,
      h.features.petal_length,
      h.features.petal_width,
      h.latencyMs,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `iris_predictions_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">Nenhum teste registrado ainda</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Faça sua primeira requisição no formulário do classificador para acompanhar o histórico de previsões e latências da API Azure.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Histórico de Predições</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Registro de execuções anteriores salvas localmente no navegador
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="text-xs font-medium text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>

          <button
            type="button"
            onClick={onClearHistory}
            className="text-xs font-medium text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg px-3 py-2 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Histórico</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="py-3 px-4">Data / Hora</th>
              <th className="py-3 px-4">Espécie Predita</th>
              <th className="py-3 px-4 text-center">Código</th>
              <th className="py-3 px-4 text-right">Sépala (C × L)</th>
              <th className="py-3 px-4 text-right">Pétala (C × L)</th>
              <th className="py-3 px-4 text-right">Latência</th>
              <th className="py-3 px-4 text-center">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
            {history.map((item) => {
              const date = new Date(item.timestamp);
              const formattedDate = date.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });

              return (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-sans text-slate-500 tabular-nums">
                    {formattedDate}
                  </td>
                  <td className="py-3 px-4 font-sans font-bold text-slate-900">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      Iris {item.result.predicao}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-semibold">
                      #{item.result.codigo}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums">
                    {item.features.sepal_length} × {item.features.sepal_width} cm
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums text-indigo-700 font-semibold">
                    {item.features.petal_length} × {item.features.petal_width} cm
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums text-slate-500">
                    {item.latencyMs} ms
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      type="button"
                      onClick={() => onSelectHistoryItem(item.features)}
                      className="px-2.5 py-1 text-[11px] font-sans font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded transition-colors cursor-pointer inline-flex items-center gap-1"
                      title="Carregar estas medidas no formulário"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reutilizar</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
