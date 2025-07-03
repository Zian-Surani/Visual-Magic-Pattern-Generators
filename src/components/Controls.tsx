import React, { createElement } from 'react';
import { RefreshCwIcon, DownloadIcon, TrashIcon, ArrowLeftIcon, RotateCwIcon } from 'lucide-react';
interface ControlsProps {
  segments: number;
  setSegments: (segments: number) => void;
  colorScheme: string;
  setColorScheme: (scheme: string) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  mirrorMode: boolean;
  setMirrorMode: (mirror: boolean) => void;
  effectMode: string;
  setEffectMode: (effect: string) => void;
  opacity: number;
  setOpacity: (opacity: number) => void;
  autoRotate: boolean;
  setAutoRotate: (rotate: boolean) => void;
  rotateSpeed: number;
  setRotateSpeed: (speed: number) => void;
  onBack: () => void;
}
const Controls: React.FC<ControlsProps> = ({
  segments,
  setSegments,
  colorScheme,
  setColorScheme,
  brushSize,
  setBrushSize,
  mirrorMode,
  setMirrorMode,
  effectMode,
  setEffectMode,
  opacity,
  setOpacity,
  autoRotate,
  setAutoRotate,
  rotateSpeed,
  setRotateSpeed,
  onBack
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
  }, {
    id: 'neon',
    name: 'Neon'
  }, {
    id: 'pastel',
    name: 'Pastel'
  }, {
    id: 'sunset',
    name: 'Sunset'
  }, {
    id: 'cosmic',
    name: 'Cosmic'
  }, {
    id: 'autumn',
    name: 'Autumn'
  }, {
    id: 'winter',
    name: 'Winter'
  }];
  const effectModes = [{
    id: 'normal',
    name: 'Normal'
  }, {
    id: 'glow',
    name: 'Glow'
  }, {
    id: 'neon',
    name: 'Neon Trails'
  }, {
    id: 'liquid',
    name: 'Liquid'
  }, {
    id: 'crystal',
    name: 'Crystal'
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
  return <div className="w-full md:w-72 bg-gray-800 p-4 flex flex-col gap-4 overflow-y-auto max-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Controls</h2>
        <button onClick={onBack} className="text-gray-400 hover:text-white flex items-center gap-1 text-sm">
          <ArrowLeftIcon size={14} />
          Back
        </button>
      </div>
      <div className="space-y-5">
        {/* Core settings */}
        <div className="bg-gray-750 p-3 rounded-lg border border-gray-700">
          <h3 className="font-medium mb-3 text-gray-300">Core Settings</h3>
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
              <label className="block mb-2 text-sm">Opacity: {opacity}%</label>
              <input type="range" min="10" max="100" value={opacity} onChange={e => setOpacity(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
        </div>
        {/* Color & Effects */}
        <div className="bg-gray-750 p-3 rounded-lg border border-gray-700">
          <h3 className="font-medium mb-3 text-gray-300">Color & Effects</h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Color Scheme</label>
              <select value={colorScheme} onChange={e => setColorScheme(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                {colorSchemes.map(scheme => <option key={scheme.id} value={scheme.id}>
                    {scheme.name}
                  </option>)}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm">Effect Mode</label>
              <select value={effectMode} onChange={e => setEffectMode(e.target.value)} className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                {effectModes.map(effect => <option key={effect.id} value={effect.id}>
                    {effect.name}
                  </option>)}
              </select>
            </div>
          </div>
        </div>
        {/* Animation */}
        <div className="bg-gray-750 p-3 rounded-lg border border-gray-700">
          <h3 className="font-medium mb-3 text-gray-300">Animation</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="auto-rotate" checked={autoRotate} onChange={e => setAutoRotate(e.target.checked)} className="w-4 h-4" />
              <label htmlFor="auto-rotate" className="text-sm">
                Auto Rotate
              </label>
            </div>
            {autoRotate && <div>
                <label className="block mb-2 text-sm">
                  Rotation Speed: {rotateSpeed}x
                </label>
                <input type="range" min="0.1" max="5" step="0.1" value={rotateSpeed} onChange={e => setRotateSpeed(parseFloat(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
              </div>}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="mirror-mode" checked={mirrorMode} onChange={e => setMirrorMode(e.target.checked)} className="w-4 h-4" />
              <label htmlFor="mirror-mode" className="text-sm">
                Mirror Mode
              </label>
            </div>
          </div>
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