import React, { useState } from 'react';
import KaleidoscopeCanvas from './components/KaleidoscopeCanvas';
import Controls from './components/Controls';
import LandingPage from './components/LandingPage';
export function App() {
  const [segments, setSegments] = useState(8);
  const [colorScheme, setColorScheme] = useState('rainbow');
  const [brushSize, setBrushSize] = useState(5);
  const [mirrorMode, setMirrorMode] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [effectMode, setEffectMode] = useState('normal');
  const [opacity, setOpacity] = useState(100);
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotateSpeed, setRotateSpeed] = useState(1);
  const enterGenerator = () => {
    setShowLanding(false);
  };
  return <div className="flex flex-col w-full min-h-screen bg-gray-900 text-white">
      {showLanding ? <LandingPage onEnter={enterGenerator} /> : <>
          <header className="p-4 border-b border-gray-800">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              MirraMaze Kaleidoscope Studio
            </h1>
          </header>
          <main className="flex flex-col md:flex-row flex-1 w-full">
            <div className="flex-1 p-4 flex justify-center items-center">
              <KaleidoscopeCanvas segments={segments} colorScheme={colorScheme} brushSize={brushSize} mirrorMode={mirrorMode} effectMode={effectMode} opacity={opacity} autoRotate={autoRotate} rotateSpeed={rotateSpeed} />
            </div>
            <Controls segments={segments} setSegments={setSegments} colorScheme={colorScheme} setColorScheme={setColorScheme} brushSize={brushSize} setBrushSize={setBrushSize} mirrorMode={mirrorMode} setMirrorMode={setMirrorMode} effectMode={effectMode} setEffectMode={setEffectMode} opacity={opacity} setOpacity={setOpacity} autoRotate={autoRotate} setAutoRotate={setAutoRotate} rotateSpeed={rotateSpeed} setRotateSpeed={setRotateSpeed} onBack={() => setShowLanding(true)} />
          </main>
          <footer className="p-2 text-center text-sm text-gray-400 border-t border-gray-800">
            Draw with your mouse to create mesmerizing kaleidoscope patterns
          </footer>
        </>}
    </div>;
}