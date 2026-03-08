import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, MapPin, Waves, Star, Lightbulb, Mountain } from 'lucide-react';
import { useIslandByName } from '../hooks/useQueries';
import { getIslandImage } from '../utils/imageMapper';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function IslandDetail() {
  const { name } = useParams({ from: '/island/$name' });
  const decodedName = decodeURIComponent(name);
  const { data: island, isLoading, isError } = useIslandByName(decodedName);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <Skeleton className="h-72 w-full rounded-2xl" />
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    );
  }

  if (isError || !island) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🌊</div>
        <h2 className="font-display text-2xl font-bold text-ocean-800 mb-3">Island not found</h2>
        <p className="text-ocean-500 mb-6">We couldn't find information for this island.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-coral-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-coral-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Islands
        </Link>
      </div>
    );
  }

  const imageSrc = getIslandImage(island.name);

  return (
    <div className="bg-sand-50 min-h-screen">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={imageSrc}
          alt={island.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/40 via-ocean-900/20 to-ocean-900/80" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 max-w-4xl mx-auto w-full left-0 right-0">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium mb-4 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            All Islands
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-coral-300" />
            <span className="text-coral-300 text-sm font-semibold tracking-wide uppercase">Hawaiian Island</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            {island.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* Description */}
        <section>
          <p className="text-ocean-700 text-lg leading-relaxed border-l-4 border-coral-400 pl-5 italic">
            {island.description}
          </p>
        </section>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-card border border-sand-200">
            <Mountain className="w-6 h-6 text-palm-500 mx-auto mb-2" />
            <div className="font-display text-2xl font-bold text-ocean-900">{island.topAttractions.length}</div>
            <div className="text-ocean-500 text-xs mt-0.5">Attractions</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card border border-sand-200">
            <Waves className="w-6 h-6 text-ocean-500 mx-auto mb-2" />
            <div className="font-display text-2xl font-bold text-ocean-900">{island.beaches.length}</div>
            <div className="text-ocean-500 text-xs mt-0.5">Beaches</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card border border-sand-200">
            <Lightbulb className="w-6 h-6 text-golden-500 mx-auto mb-2" />
            <div className="font-display text-2xl font-bold text-ocean-900">{island.travelTips.length}</div>
            <div className="text-ocean-500 text-xs mt-0.5">Travel Tips</div>
          </div>
        </div>

        {/* Top Attractions */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-palm-100 flex items-center justify-center">
              <Star className="w-5 h-5 text-palm-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ocean-900">Top Attractions</h2>
          </div>
          <div className="grid gap-4">
            {island.topAttractions.map((attraction, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 shadow-card border border-sand-200 flex gap-4 hover:border-palm-300 transition-colors"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-palm-500 text-white flex items-center justify-center font-display font-bold text-sm">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-display font-bold text-ocean-900 mb-1">{attraction.name}</h3>
                  <p className="text-ocean-600 text-sm leading-relaxed">{attraction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-sand-300" />
          <span className="text-2xl">🌊</span>
          <div className="flex-1 h-px bg-sand-300" />
        </div>

        {/* Beaches */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-ocean-100 flex items-center justify-center">
              <Waves className="w-5 h-5 text-ocean-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ocean-900">Beaches</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {island.beaches.map((beach, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-ocean-50 to-white rounded-xl p-5 shadow-card border border-ocean-100 hover:border-ocean-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">🏖️</span>
                  <div>
                    <h3 className="font-display font-bold text-ocean-900 mb-1">{beach.name}</h3>
                    <p className="text-ocean-600 text-sm leading-relaxed">{beach.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-sand-300" />
          <span className="text-2xl">🌺</span>
          <div className="flex-1 h-px bg-sand-300" />
        </div>

        {/* Travel Tips */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-golden-100 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-golden-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ocean-900">Travel Tips</h2>
          </div>
          <div className="grid gap-4">
            {island.travelTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-golden-50 to-white rounded-xl p-5 shadow-card border border-golden-200 hover:border-golden-400 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Badge className="bg-golden-400 text-white border-0 text-xs font-bold mt-0.5 flex-shrink-0">
                    Tip {idx + 1}
                  </Badge>
                  <div>
                    <h3 className="font-display font-bold text-ocean-900 mb-1">{tip.title}</h3>
                    <p className="text-ocean-600 text-sm leading-relaxed">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back Button */}
        <div className="pt-4 pb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-ocean-800 hover:bg-ocean-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Islands
          </Link>
        </div>
      </div>
    </div>
  );
}
