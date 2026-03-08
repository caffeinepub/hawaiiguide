import { Link } from '@tanstack/react-router';
import { ArrowRight, Waves } from 'lucide-react';
import type { Island } from '../backend';
import { getIslandImage, getIslandSlug } from '../utils/imageMapper';

interface IslandCardProps {
  island: Island;
}

export default function IslandCard({ island }: IslandCardProps) {
  const imageSrc = getIslandImage(island.name);
  const slug = getIslandSlug(island.name);

  return (
    <Link
      to="/island/$name"
      params={{ name: slug }}
      className="group block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-ocean-100">
        <img
          src={imageSrc}
          alt={`${island.name} island`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="inline-flex items-center gap-1 bg-coral-400/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            <Waves className="w-3 h-3" />
            {island.beaches.length} Beaches
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-ocean-900 mb-2 group-hover:text-coral-600 transition-colors">
          {island.name}
        </h3>
        <p className="text-ocean-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {island.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3 text-xs text-ocean-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-palm-500 inline-block" />
              {island.topAttractions.length} Attractions
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-golden-500 inline-block" />
              {island.travelTips.length} Tips
            </span>
          </div>
          <span className="flex items-center gap-1 text-coral-500 text-sm font-semibold group-hover:gap-2 transition-all">
            Explore <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
