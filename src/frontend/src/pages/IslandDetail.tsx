import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Lightbulb,
  MapPin,
  Mountain,
  Star,
  Ticket,
  Waves,
  X,
} from "lucide-react";
import { useState } from "react";
import type { Attraction, Beach } from "../backend";
import { useIslandByName } from "../hooks/useQueries";
import { getIslandImage } from "../utils/imageMapper";

// Category badge color mapping
const categoryStyles: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Beach: {
    bg: "bg-ocean-100",
    text: "text-ocean-700",
    border: "border-ocean-200",
  },
  Hike: { bg: "bg-palm-100", text: "text-palm-600", border: "border-palm-200" },
  History: {
    bg: "bg-golden-100",
    text: "text-golden-600",
    border: "border-golden-200",
  },
  Nature: {
    bg: "bg-palm-100",
    text: "text-palm-600",
    border: "border-palm-200",
  },
  Culture: {
    bg: "bg-coral-300/20",
    text: "text-coral-600",
    border: "border-coral-300/40",
  },
};

const defaultCategoryStyle = {
  bg: "bg-sand-100",
  text: "text-ocean-700",
  border: "border-sand-200",
};

function getCategoryStyle(category?: string) {
  if (!category) return defaultCategoryStyle;
  return categoryStyles[category] ?? defaultCategoryStyle;
}

interface AttractionCardProps {
  attraction: Attraction;
  index: number;
  onOpen: (attraction: Attraction) => void;
}

function AttractionCard({ attraction, index, onOpen }: AttractionCardProps) {
  const catStyle = getCategoryStyle(attraction.category);
  const cardIdx = index + 1;

  return (
    <button
      type="button"
      data-ocid={`attraction.open_modal_button.${cardIdx}`}
      onClick={() => onOpen(attraction)}
      className="w-full text-left bg-white rounded-xl shadow-card border border-sand-200 hover:border-palm-400 hover:shadow-card-hover hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 overflow-hidden cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palm-400 focus-visible:ring-offset-2"
    >
      {/* Card header row */}
      <div className="flex gap-4 p-5 pb-4">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-palm-500 text-white flex items-center justify-center font-display font-bold text-sm group-hover:bg-palm-600 transition-colors">
          {cardIdx}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-bold text-ocean-900 leading-tight group-hover:text-palm-700 transition-colors">
              {attraction.name}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              {attraction.category && (
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                >
                  {attraction.category}
                </span>
              )}
              <span className="text-palm-400 group-hover:text-palm-600 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
          <p className="text-ocean-600 text-sm leading-relaxed line-clamp-2">
            {attraction.description}
          </p>
        </div>
      </div>

      {/* Meta row: hours + admission */}
      {(attraction.hours || attraction.admission) && (
        <div className="flex flex-wrap gap-x-5 gap-y-2 px-5 pb-4 border-t border-sand-100 pt-3">
          {attraction.hours && (
            <div className="flex items-center gap-1.5 text-sm text-ocean-600">
              <Clock className="w-3.5 h-3.5 text-ocean-400 flex-shrink-0" />
              <span className="font-medium text-ocean-500">Hours:</span>
              <span>{attraction.hours}</span>
            </div>
          )}
          {attraction.admission && (
            <div className="flex items-center gap-1.5 text-sm text-ocean-600">
              <Ticket className="w-3.5 h-3.5 text-ocean-400 flex-shrink-0" />
              <span className="font-medium text-ocean-500">Admission:</span>
              <span>{attraction.admission}</span>
            </div>
          )}
        </div>
      )}

      {/* Visitor tip preview */}
      {attraction.tip && (
        <div className="mx-4 mb-4 rounded-lg bg-golden-100 border border-golden-200 px-4 py-3 flex gap-2.5 items-start">
          <Lightbulb className="w-4 h-4 text-golden-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-golden-600 uppercase tracking-wide">
              Visitor Tip
            </span>
            <p className="text-sm text-ocean-700 mt-0.5 leading-relaxed line-clamp-1">
              {attraction.tip}
            </p>
          </div>
        </div>
      )}

      {/* View details hint */}
      <div className="px-5 pb-3 flex items-center gap-1 text-xs text-palm-500 font-semibold group-hover:text-palm-700 transition-colors">
        <ChevronRight className="w-3.5 h-3.5" />
        <span>View full details</span>
      </div>
    </button>
  );
}

interface AttractionDetailModalProps {
  attraction: Attraction | null;
  onClose: () => void;
}

function AttractionDetailModal({
  attraction,
  onClose,
}: AttractionDetailModalProps) {
  const catStyle = getCategoryStyle(attraction?.category);
  const isOpen = attraction !== null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="attraction.dialog"
        className="max-w-lg w-full p-0 gap-0 overflow-hidden rounded-2xl border border-sand-200 shadow-2xl"
        onInteractOutside={onClose}
      >
        {/* Custom close button */}
        <button
          type="button"
          data-ocid="attraction.dialog.close_button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-sand-200 flex items-center justify-center text-ocean-400 hover:text-ocean-700 hover:bg-white hover:border-sand-300 transition-all shadow-sm"
          aria-label="Close details"
        >
          <X className="w-4 h-4" />
        </button>

        {attraction && (
          <ScrollArea className="max-h-[85vh]">
            {/* Modal header */}
            <div className="bg-gradient-to-br from-palm-600 to-ocean-800 px-6 pt-8 pb-6">
              <DialogHeader>
                <div className="flex items-start gap-3 pr-8">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    {attraction.category && (
                      <span
                        className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border mb-2 ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
                      >
                        {attraction.category}
                      </span>
                    )}
                    <DialogTitle className="font-display text-xl font-bold text-white leading-tight">
                      {attraction.name}
                    </DialogTitle>
                  </div>
                </div>
              </DialogHeader>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-5 bg-white">
              {/* Full description */}
              <div>
                <p className="text-ocean-700 leading-relaxed text-[15px]">
                  {attraction.description}
                </p>
              </div>

              {/* Hours + Admission */}
              {(attraction.hours || attraction.admission) && (
                <div className="grid gap-3">
                  {attraction.hours && (
                    <div className="flex items-start gap-3 bg-ocean-50 rounded-xl px-4 py-3 border border-ocean-100">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ocean-100 flex items-center justify-center mt-0.5">
                        <Clock className="w-4 h-4 text-ocean-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-ocean-500 uppercase tracking-wide mb-0.5">
                          Hours
                        </p>
                        <p className="text-sm text-ocean-800 font-medium">
                          {attraction.hours}
                        </p>
                      </div>
                    </div>
                  )}
                  {attraction.admission && (
                    <div className="flex items-start gap-3 bg-palm-50 rounded-xl px-4 py-3 border border-palm-100">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-palm-100 flex items-center justify-center mt-0.5">
                        <Ticket className="w-4 h-4 text-palm-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-palm-500 uppercase tracking-wide mb-0.5">
                          Admission
                        </p>
                        <p className="text-sm text-ocean-800 font-medium">
                          {attraction.admission}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Visitor tip */}
              {attraction.tip && (
                <div className="rounded-xl bg-golden-100 border border-golden-200 px-4 py-4 flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-golden-200 flex items-center justify-center mt-0.5">
                    <Lightbulb className="w-4 h-4 text-golden-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-golden-600 uppercase tracking-wide">
                      Visitor Tip
                    </span>
                    <p className="text-sm text-ocean-700 mt-1 leading-relaxed">
                      {attraction.tip}
                    </p>
                  </div>
                </div>
              )}

              {/* Close action */}
              <div className="pt-1 pb-1">
                <Button
                  onClick={onClose}
                  className="w-full bg-ocean-800 hover:bg-ocean-700 text-white font-semibold rounded-xl h-11"
                >
                  Close
                </Button>
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface BeachCardProps {
  beach: Beach;
  index: number;
  onOpen: (beach: Beach) => void;
}

function BeachCard({ beach, index, onOpen }: BeachCardProps) {
  const cardIdx = index + 1;

  return (
    <button
      type="button"
      data-ocid={`beach.open_modal_button.${cardIdx}`}
      onClick={() => onOpen(beach)}
      className="w-full text-left bg-gradient-to-br from-ocean-50 to-white rounded-xl shadow-card border border-ocean-100 hover:border-ocean-400 hover:shadow-card-hover hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 overflow-hidden cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-400 focus-visible:ring-offset-2"
    >
      <div className="flex gap-3 p-5 pb-4">
        <span className="text-xl mt-0.5 flex-shrink-0">🏖️</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-bold text-ocean-900 leading-tight group-hover:text-ocean-600 transition-colors">
              {beach.name}
            </h3>
            <span className="text-ocean-400 group-hover:text-ocean-600 transition-colors flex-shrink-0">
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
          <p className="text-ocean-600 text-sm leading-relaxed line-clamp-2">
            {beach.description}
          </p>
        </div>
      </div>
      <div className="px-5 pb-3 flex items-center gap-1 text-xs text-ocean-500 font-semibold group-hover:text-ocean-700 transition-colors">
        <ChevronRight className="w-3.5 h-3.5" />
        <span>View full details</span>
      </div>
    </button>
  );
}

interface BeachDetailModalProps {
  beach: Beach | null;
  onClose: () => void;
}

function BeachDetailModal({ beach, onClose }: BeachDetailModalProps) {
  const isOpen = beach !== null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="beach.dialog"
        className="max-w-lg w-full p-0 gap-0 overflow-hidden rounded-2xl border border-ocean-100 shadow-2xl"
        onInteractOutside={onClose}
      >
        {/* Custom close button */}
        <button
          type="button"
          data-ocid="beach.dialog.close_button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-ocean-200 flex items-center justify-center text-ocean-400 hover:text-ocean-700 hover:bg-white hover:border-ocean-300 transition-all shadow-sm"
          aria-label="Close details"
        >
          <X className="w-4 h-4" />
        </button>

        {beach && (
          <ScrollArea className="max-h-[85vh]">
            {/* Modal header */}
            <div className="bg-gradient-to-br from-ocean-600 to-ocean-900 px-6 pt-8 pb-6">
              <DialogHeader>
                <div className="flex items-start gap-3 pr-8">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-xl">
                    🏖️
                  </div>
                  <div>
                    <DialogTitle className="font-display text-xl font-bold text-white leading-tight">
                      {beach.name}
                    </DialogTitle>
                  </div>
                </div>
              </DialogHeader>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-5 bg-white">
              {/* Full description */}
              <div>
                <p className="text-ocean-700 leading-relaxed text-[15px]">
                  {beach.description}
                </p>
              </div>

              {/* Close action */}
              <div className="pt-1 pb-1">
                <Button
                  onClick={onClose}
                  className="w-full bg-ocean-800 hover:bg-ocean-700 text-white font-semibold rounded-xl h-11"
                >
                  Close
                </Button>
              </div>
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function IslandDetail() {
  const { name } = useParams({ from: "/island/$name" });
  const decodedName = decodeURIComponent(name);
  const { data: island, isLoading, isError } = useIslandByName(decodedName);
  const [selectedAttraction, setSelectedAttraction] =
    useState<Attraction | null>(null);
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);

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
        <h2 className="font-display text-2xl font-bold text-ocean-800 mb-3">
          Island not found
        </h2>
        <p className="text-ocean-500 mb-6">
          We couldn't find information for this island.
        </p>
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
            <span className="text-coral-300 text-sm font-semibold tracking-wide uppercase">
              Hawaiian Island
            </span>
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
            <div className="font-display text-2xl font-bold text-ocean-900">
              {island.topAttractions.length}
            </div>
            <div className="text-ocean-500 text-xs mt-0.5">Attractions</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card border border-sand-200">
            <Waves className="w-6 h-6 text-ocean-500 mx-auto mb-2" />
            <div className="font-display text-2xl font-bold text-ocean-900">
              {island.beaches.length}
            </div>
            <div className="text-ocean-500 text-xs mt-0.5">Beaches</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card border border-sand-200">
            <Lightbulb className="w-6 h-6 text-golden-500 mx-auto mb-2" />
            <div className="font-display text-2xl font-bold text-ocean-900">
              {island.travelTips.length}
            </div>
            <div className="text-ocean-500 text-xs mt-0.5">Travel Tips</div>
          </div>
        </div>

        {/* Top Attractions */}
        <section>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-palm-100 flex items-center justify-center">
              <Star className="w-5 h-5 text-palm-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ocean-900">
              Top Attractions
            </h2>
          </div>
          <p className="text-ocean-500 text-sm mb-5 ml-12">
            Tap any attraction to see full details
          </p>
          <div className="grid gap-4">
            {island.topAttractions.map((attraction, idx) => (
              <AttractionCard
                key={attraction.name}
                attraction={attraction}
                index={idx}
                onOpen={setSelectedAttraction}
              />
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
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-ocean-100 flex items-center justify-center">
              <Waves className="w-5 h-5 text-ocean-600" />
            </div>
            <h2 className="font-display text-2xl font-bold text-ocean-900">
              Beaches
            </h2>
          </div>
          <p className="text-ocean-500 text-sm mb-5 ml-12">
            Tap any beach to see full details
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {island.beaches.map((beach, idx) => (
              <BeachCard
                key={beach.name}
                beach={beach}
                index={idx}
                onOpen={setSelectedBeach}
              />
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
            <h2 className="font-display text-2xl font-bold text-ocean-900">
              Travel Tips
            </h2>
          </div>
          <div className="grid gap-4">
            {island.travelTips.map((tip, idx) => (
              <div
                key={tip.title}
                className="bg-gradient-to-r from-golden-50 to-white rounded-xl p-5 shadow-card border border-golden-200 hover:border-golden-400 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Badge className="bg-golden-400 text-white border-0 text-xs font-bold mt-0.5 flex-shrink-0">
                    Tip {idx + 1}
                  </Badge>
                  <div>
                    <h3 className="font-display font-bold text-ocean-900 mb-1">
                      {tip.title}
                    </h3>
                    <p className="text-ocean-600 text-sm leading-relaxed">
                      {tip.content}
                    </p>
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

      {/* Attraction detail modal */}
      <AttractionDetailModal
        attraction={selectedAttraction}
        onClose={() => setSelectedAttraction(null)}
      />

      {/* Beach detail modal */}
      <BeachDetailModal
        beach={selectedBeach}
        onClose={() => setSelectedBeach(null)}
      />
    </div>
  );
}
