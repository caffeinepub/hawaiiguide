import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Palmtree, Sun, Waves } from "lucide-react";
import IslandCard from "../components/IslandCard";
import { useAllIslands } from "../hooks/useQueries";

export default function Home() {
  const { data: islands, isLoading, isError } = useAllIslands();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[560px] md:h-[600px] overflow-hidden">
        <img
          src="/assets/generated/hawaii-hero.dim_1440x600.png"
          alt="Hawaii panoramic landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/30 via-ocean-900/20 to-ocean-900/70" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-5">
            <Sun className="w-4 h-4 text-golden-300" />
            Aloha! Welcome to Paradise
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
            Discover
            <br />
            <span className="text-coral-300">Hawai'i</span>
          </h1>
          <p className="text-ocean-100 text-lg md:text-xl max-w-xl mb-8 leading-relaxed drop-shadow">
            Explore six stunning islands — each with its own unique landscapes,
            culture, and aloha spirit.
          </p>
          <a
            href="#islands"
            className="inline-flex items-center gap-2 bg-coral-500 hover:bg-coral-400 text-white font-semibold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <Waves className="w-4 h-4" />
            Explore Islands
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-ocean-800 text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-display text-2xl font-bold text-coral-300">
                6
              </div>
              <div className="text-ocean-300 text-xs mt-0.5">Main Islands</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-golden-300">
                137
              </div>
              <div className="text-ocean-300 text-xs mt-0.5">
                Miles of Beaches
              </div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-palm-300">
                8
              </div>
              <div className="text-ocean-300 text-xs mt-0.5">
                National Parks
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Islands Grid */}
      <section
        id="islands"
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-coral-500 font-semibold text-sm mb-3">
            <Palmtree className="w-4 h-4" />
            THE HAWAIIAN ISLANDS
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ocean-900 mb-4">
            Choose Your Island
          </h2>
          <p className="text-ocean-500 text-lg max-w-2xl mx-auto">
            From the volcanic wonders of the Big Island to the lush valleys of
            Kauai — every island tells a different story.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map(
              (skKey) => (
                <div
                  key={skKey}
                  className="rounded-2xl overflow-hidden bg-white shadow-card"
                >
                  <Skeleton className="h-52 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ),
            )}
          </div>
        )}

        {isError && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🌊</div>
            <h3 className="font-display text-xl font-bold text-ocean-800 mb-2">
              Unable to load islands
            </h3>
            <p className="text-ocean-500">Please try refreshing the page.</p>
          </div>
        )}

        {islands && islands.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {islands.map((island) => (
              <IslandCard key={island.name} island={island} />
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section
        id="about"
        className="bg-ocean-900 text-white py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-golden-300 font-semibold text-sm mb-4">
            <Sun className="w-4 h-4" />
            ABOUT HAWAI'I
          </div>
          <h2 className="font-display text-4xl font-bold mb-6">
            The Spirit of <span className="text-coral-300">Aloha</span>
          </h2>
          <p className="text-ocean-200 text-lg leading-relaxed mb-6">
            Hawai'i is the only U.S. state located in Oceania, consisting of a
            volcanic archipelago in the central Pacific Ocean. Known for its
            stunning natural beauty, rich Polynesian culture, and warm
            hospitality, the islands offer an unparalleled travel experience for
            every kind of adventurer.
          </p>
          <p className="text-ocean-300 text-base leading-relaxed">
            Whether you're chasing waterfalls on Maui, watching lava flow on the
            Big Island, or surfing the legendary waves of Oahu's North Shore —
            Hawai'i will leave you breathless and longing to return.
          </p>
        </div>
      </section>
    </div>
  );
}
