'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAP_STYLE = 'mapbox://styles/zachjve/cmmx9hkog000x01qscd3z9pm5';
const PARIS_CENTER: [number, number] = [2.2945, 48.8584]; // Tour Eiffel

export default function MapBackground() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const cancelRotationRef = useRef<(() => void) | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!accessToken) {
      console.warn('NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN non configuré');
      return;
    }

    mapboxgl.accessToken = accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: PARIS_CENTER,
      zoom: 9,
      pitch: 40,
      bearing: 0,
      attributionControl: false,
      interactive: false,
    });

    map.current.on('load', () => {
      if (!map.current || !mapContainer.current) return;

      // Désactiver IMMÉDIATEMENT POIs, noms de lieux, noms de rues (avant tout affichage)
      try {
        map.current.setConfigProperty('basemap', 'showPlaceLabels', false);
        map.current.setConfigProperty('basemap', 'showPointOfInterestLabels', false);
        map.current.setConfigProperty('basemap', 'showRoadLabels', false);
      } catch {
        // Style custom peut ne pas supporter ces propriétés
      }

      map.current.resize();

      // Attendre le prochain frame avant d'afficher (évite le flash des labels)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setMapReady(true);
        });
      });

      // Animation fluide : zoom serré sur Paris (zoom 16 = quartier)
      map.current.flyTo({
        center: PARIS_CENTER,
        zoom: 16,
        pitch: 45,
        bearing: 0,
        duration: 2500,
        essential: true,
      });

      // Une fois le zoom terminé : rotation continue autour du centre
      const startRotation = () => {
        let animationId: number;
        const ROTATION_SPEED = 0.03; // degrés par frame (~20 sec pour 360°)

        const rotate = () => {
          if (!map.current) return;
          const bearing = (map.current.getBearing() + ROTATION_SPEED) % 360;
          map.current.setBearing(bearing);
          animationId = requestAnimationFrame(rotate);
        };
        animationId = requestAnimationFrame(rotate);

        return () => cancelAnimationFrame(animationId);
      };

      map.current.once('moveend', () => {
        cancelRotationRef.current = startRotation();
      });
    });

    const handleResize = () => map.current?.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelRotationRef.current?.();
      window.removeEventListener('resize', handleResize);
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <>
      <div
        ref={mapContainer}
        className="fixed inset-0 w-screen h-screen transition-opacity duration-300"
        style={{ zIndex: 0, opacity: mapReady ? 1 : 0 }}
      />
      <div
        className="fixed inset-0 z-[1] bg-black/40 pointer-events-none"
        aria-hidden
      />
    </>
  );
}
