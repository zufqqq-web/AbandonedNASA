import React, { useState } from 'react';
import { Destination, Mission } from './types/mission';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorldSelector } from './components/WorldSelector';
import { MapSection } from './components/MapSection';
import { MissionTimeline } from './components/MissionTimeline';
import { ObjectExplorer } from './components/ObjectExplorer';
import { LastSignalSection } from './components/LastSignalSection';
import { MoonArtifactsSection } from './components/MoonArtifactsSection';
import { TheyRemainGallery } from './components/TheyRemainGallery';
import { FinalSection } from './components/FinalSection';
import { Footer } from './components/Footer';
import { MissionModal } from './components/MissionModal';

export default function App() {
  const [activeWorld, setActiveWorld] = useState<Destination>('Mars');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const scrollToExplorer = () => {
    const explorerEl = document.getElementById('explorer');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeWorld={activeWorld}
        onWorldChange={(world) => setActiveWorld(world)}
      />

      {/* Main Experience Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          activeWorld={activeWorld}
          onExploreClick={scrollToExplorer}
        />

        {/* 2. Interactive World Selector */}
        <WorldSelector
          selectedWorld={activeWorld}
          onSelectWorld={(world) => setActiveWorld(world)}
        />

        {/* 3. Interactive Leaflet Map (Moon Trek & Mars Trek) */}
        <MapSection
          activeWorld={activeWorld}
          onSelectWorld={(world) => setActiveWorld(world)}
          onSelectMission={(mission) => setSelectedMission(mission)}
        />

        {/* 4. Interactive Mission Timeline */}
        <MissionTimeline
          selectedWorld={activeWorld}
          onSelectMission={(mission) => setSelectedMission(mission)}
        />

        {/* 5. Object Explorer Catalog */}
        <ObjectExplorer
          activeWorld={activeWorld}
          onSelectWorld={(world) => setActiveWorld(world)}
          onOpenDetail={(mission) => setSelectedMission(mission)}
        />

        {/* 6. Emotional Centerpiece: The Last Signal */}
        <LastSignalSection />

        {/* 7. Special Section: What Remains on the Moon */}
        <MoonArtifactsSection />

        {/* 8. Planetary Heritage Memorial: They Remain */}
        <TheyRemainGallery />

        {/* 9. Conclusion */}
        <FinalSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fullscreen Mission Detail Modal */}
      <MissionModal
        mission={selectedMission}
        onClose={() => setSelectedMission(null)}
      />
    </div>
  );
}
