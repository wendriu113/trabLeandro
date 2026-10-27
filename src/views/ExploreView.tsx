import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/common/Button';
import { TOURIST_PLACES } from '../data/places';
import { TouristPlace } from '../types';
import { MapPin, Sparkles, Flag, Map, X, Search, BookOpen } from 'lucide-react';

interface ExploreViewProps {
  onBackToMenu: () => void;
  onGoToQuiz: () => void;
  onGoToMap: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onBackToMenu,
  onGoToQuiz,
  onGoToMap,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Todos', 'Cultura', 'Natureza', 'História', 'Arquitetura'];

  const filteredPlaces = TOURIST_PLACES.filter(place => {
    const matchesCategory = activeCategory === 'Todos' || place.category === activeCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          place.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col justify-between bg-educa-deepBlue">
      {/* Top Bar */}
      <Header
        title="Explorar Locais"
        onBack={onBackToMenu}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col px-5 py-4 sm:px-8 max-w-2xl mx-auto w-full overflow-y-auto">
        {/* Header Introduction */}
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-educa-yellow tracking-tight">
            Descubra Bagé - RS
          </h1>
          <p className="text-sm text-educa-lightGray/90 mt-1">
            Explore o Museu da Gravura Brasileira, as marcas farroupilhas e os palacetes da Rainha da Fronteira!
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar ponto turístico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#2F6F91]/80 focus:bg-[#357B9F] text-white placeholder-white/70 text-sm border border-white/20 outline-none focus:border-educa-yellow"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" />
        </div>

        {/* Category Pills */}
        <div className="flex space-x-2 overflow-x-auto pb-3 mb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-educa-yellow text-educa-darkBlue shadow-md'
                  : 'bg-educa-midBlue/70 text-white/80 hover:bg-educa-midBlue'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="space-y-4 pb-6">
          {filteredPlaces.map(place => (
            <div
              key={place.id}
              onClick={() => setSelectedPlace(place)}
              className="bg-white rounded-2xl overflow-hidden shadow-card border border-white/10 hover:shadow-game transition-all duration-200 cursor-pointer text-gray-800 flex flex-col sm:flex-row group"
            >
              <div className="sm:w-44 h-40 sm:h-auto relative overflow-hidden bg-gray-200 shrink-0">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-educa-darkBlue/80 backdrop-blur-md text-educa-yellow font-bold text-xs">
                  {place.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-gray-900 group-hover:text-educa-deepBlue transition-colors line-clamp-1">
                    {place.name}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center mt-1 mb-2">
                    <MapPin size={13} className="mr-1 text-educa-green shrink-0" />
                    <span className="truncate">{place.address}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                  <span className="text-xs font-semibold text-educa-midBlue flex items-center">
                    <BookOpen size={14} className="mr-1" />
                    Toque para ver detalhes
                  </span>
                  <span className="text-xs font-bold text-educa-green bg-green-50 px-2 py-0.5 rounded-md">
                    +2 pts quiz
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Place Details Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-educa-deepBlue border-2 border-white/20 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-56 w-full">
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-educa-deepBlue via-transparent to-black/40" />
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="px-2.5 py-0.5 rounded-full bg-educa-yellow text-educa-darkBlue font-black text-xs uppercase tracking-wide">
                  {selectedPlace.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1 drop-shadow">
                  {selectedPlace.name}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 text-white">
              <p className="text-xs text-educa-lightGray flex items-center">
                <MapPin size={15} className="mr-1.5 text-educa-yellow shrink-0" />
                <span>{selectedPlace.address}</span>
              </p>

              <div>
                <h4 className="text-sm font-bold text-educa-yellow uppercase tracking-wider mb-1">
                  Sobre o Local
                </h4>
                <p className="text-sm text-educa-lightGray/90 leading-relaxed">
                  {selectedPlace.longDescription}
                </p>
              </div>

              {/* Curiosity Box */}
              <div className="bg-educa-midBlue/50 border border-white/10 rounded-2xl p-4">
                <h4 className="text-xs font-bold text-educa-yellow uppercase tracking-wider flex items-center mb-1">
                  <Sparkles size={14} className="mr-1.5" />
                  Curiosidade de Aventureiro
                </h4>
                <p className="text-xs sm:text-sm text-white/90 italic leading-relaxed">
                  "{selectedPlace.curiosity}"
                </p>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 space-y-2.5">
                <Button
                  variant="green"
                  onClick={() => {
                    setSelectedPlace(null);
                    onGoToQuiz();
                  }}
                  icon={<Flag size={20} />}
                >
                  Fazer Desafio deste Local
                </Button>

                <Button
                  variant="yellow"
                  onClick={() => {
                    setSelectedPlace(null);
                    onGoToMap();
                  }}
                  icon={<Map size={20} />}
                >
                  Ver no Mapa
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
