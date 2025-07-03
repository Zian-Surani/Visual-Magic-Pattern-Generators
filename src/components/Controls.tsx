import React, { createElement } from 'react';
import { RefreshCwIcon, DownloadIcon, TrashIcon } from 'lucide-react';
interface ControlsProps {
  segments: number;
  setSegments: (segments: number) => void;
  colorScheme: string;
  setColorScheme: (scheme: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  mirrorMode: boolean;
  setMirrorMode: (mirror: boolean) => void;
}
const Controls: React.FC<ControlsProps> = ({
  segments,
  setSegments,
  colorScheme,
  setColorScheme,
  brushSize,
  setBrushSize,
  mirrorMode,
  setMirrorMode
}) => {
  const colorSchemes = [{
    id: 'rainbow',
    name: 'Rainbow'
  }, {
    id: 'ocean',
    name: 'Ocean'
  }, {
    id: 'fire',
    name: 'Fire'
  }, {
    id: 'forest',
    name: 'Forest'
  }, {
    id: 'monochrome',
    name: 'Monochrome'
  }];
  const handleClear = () => {
    const canvas = document.getElementById('kaleidoscope') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };
  const handleDownload = () => {
    const canvas = document.getElementById('kaleidoscope') as HTMLCanvasElement;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'mirramaze-kaleidoscope.png';
      link.href = dataURL;
      link.click();
    }
  };
  return <div className="w-full md:w-64 bg-gray-800 p-4 flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Controls</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">Segments: {segments}</label>
          <input type="range" min="3" max="24" value={segments} onChange={e => setSegments(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
        </div>
        <div>
          <label className="block mb-2 text-sm">
            Brush Size: {brushSize}px
          </label>
          <input type="range" min="1" max="20" value={brushSize} onChange={e => setBrushSize(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
        </div>
        <div>
          <label className="block mb-2 text-sm">Color Scheme</label>
          <select value={colorScheme} onChange={e => setColorScheme(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
            {colorSchemes.map(scheme => <option key={scheme.id} value={scheme.id}>
                {scheme.name}
              </option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="mirror-mode" checked={mirrorMode} onChange={e => setMirrorMode(e.target.checked)} className="w-4 h-4" />
          <label htmlFor="mirror-mode" className="text-sm">
            Mirror Mode
          </label>
        </div>
      </div>
      <div className="mt-auto pt-4 space-y-2">
        <button onClick={handleClear} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">
          <TrashIcon size={16} />
          Clear Canvas
        </button>
        <button onClick={handleDownload} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          <DownloadIcon size={16} />
          Download Image
        </button>
      </div>
    </div>;
};
export default Controls;