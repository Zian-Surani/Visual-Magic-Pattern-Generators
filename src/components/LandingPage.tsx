import React from 'react';
import { SparklesIcon, WandIcon, ArrowRightIcon, PaletteIcon, MousePointerIcon, DownloadIcon } from 'lucide-react';
interface LandingPageProps {
  onEnter: () => void;
}
const LandingPage: React.FC<LandingPageProps> = ({
  onEnter
}) => {
  // Sample kaleidoscope images
  const sampleImages = ['https://images.unsplash.com/photo-1507908708918-778587c9e563?q=80&w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=400&auto=format&fit=crop', 'https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?q=80&w=400&auto=format&fit=crop'];
  return <div className="min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-pink-500 blur-xl opacity-40"></div>
            </div>
            <WandIcon className="w-16 h-16 relative z-10 text-pink-200" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
            MirraMaze
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-8 max-w-2xl">
            Create stunning kaleidoscope art with our interactive pattern
            generator
          </p>
          <button onClick={onEnter} className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
            Enter Studio
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      {/* Features Section */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Create Mesmerizing Patterns
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-750 border border-gray-700">
              <div className="mb-4 text-pink-400">
                <MousePointerIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                Interactive Drawing
              </h3>
              <p className="text-gray-300">
                Draw with your mouse or touch to create symmetrical patterns
                that update in real-time.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-750 border border-gray-700">
              <div className="mb-4 text-purple-400">
                <PaletteIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                Rich Color Palettes
              </h3>
              <p className="text-gray-300">
                Choose from a variety of color schemes or create your own custom
                palette.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-750 border border-gray-700">
              <div className="mb-4 text-blue-400">
                <DownloadIcon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                Save Your Creations
              </h3>
              <p className="text-gray-300">
                Download your artwork as high-quality PNG images to share or
                print.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            Gallery
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Get inspired by these kaleidoscope creations and start making your
            own
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {sampleImages.map((image, index) => <div key={index} className="relative group overflow-hidden rounded-lg">
                <img src={image} alt={`Kaleidoscope example ${index + 1}`} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <p className="font-medium">Kaleidoscope Art #{index + 1}</p>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="text-center mt-12">
            <button onClick={onEnter} className="group bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 mx-auto">
              <SparklesIcon className="w-5 h-5" />
              Start Creating Now
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default LandingPage;