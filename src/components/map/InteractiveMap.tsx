import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { TOURIST_PLACES } from '../../data/places';
import { TouristPlace } from '../../types';

interface InteractiveMapProps {
  onSelectPlaceForQuiz: (place: TouristPlace) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectPlaceForQuiz }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double initialization

    // Center on Bagé, RS (Rainha da Fronteira)
    const center: [number, number] = [-31.3314, -54.1069];
    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: 13,
      zoomControl: true,
      attributionControl: false
    });

    // Clean OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Custom EducaTour SVG Pin Icon
    const customPinIcon = L.divIcon({
      className: 'custom-pin-marker',
      html: `
        <div style="transform: translate(-50%, -100%);">
          <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4));">
            <path d="M18 45C17.5 44 1 23 1 18C1 8.6 8.6 1 18 1C27.4 1 35 8.6 35 18C35 23 18.5 44 18 45Z" fill="#FFC400" stroke="#245B78" stroke-width="2.5" />
            <circle cx="18" cy="18" r="9" fill="#245B78" />
            <circle cx="18" cy="18" r="4.5" fill="#FFFFFF" />
          </svg>
        </div>
      `,
      iconSize: [36, 46],
      iconAnchor: [18, 46],
      popupAnchor: [0, -46]
    });

    // Add markers for all tourist places
    TOURIST_PLACES.forEach(place => {
      const marker = L.marker(place.coordinates, { icon: customPinIcon }).addTo(map);

      // Popup Content
      const popupDiv = document.createElement('div');
      popupDiv.className = 'educatour-popup p-1 text-center font-sans';
      popupDiv.innerHTML = `
        <div style="border-radius: 12px; overflow: hidden; margin-bottom: 8px;">
          <img src="${place.image}" alt="${place.name}" style="width: 100%; height: 90px; object-fit: cover;" />
        </div>
        <span style="background: #245B78; color: #FFC400; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 10px; text-transform: uppercase;">
          ${place.category}
        </span>
        <h4 style="font-weight: 800; font-size: 13px; color: #163749; margin: 6px 0 3px 0; line-height: 1.2;">
          ${place.name}
        </h4>
        <p style="font-size: 11px; color: #64748B; margin-bottom: 10px; line-height: 1.3;">
          ${place.description}
        </p>
        <button id="btn-quiz-${place.id}" style="
          width: 100%;
          background: #20A765;
          color: white;
          font-weight: bold;
          font-size: 11px;
          padding: 8px 12px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
        ">
          Fazer Desafio (+2 pts)
        </button>
      `;

      marker.bindPopup(popupDiv, { maxWidth: 220, closeButton: true });

      // Handle button click inside popup
      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-quiz-${place.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectPlaceForQuiz(place);
          };
        }
      });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onSelectPlaceForQuiz]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full z-10" />
    </div>
  );
};
