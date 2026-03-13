import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronDown,
  MapPin,
  Palmtree,
  Sun,
  Waves,
} from "lucide-react";
import IslandCard from "../components/IslandCard";
import { useAllIslands } from "../hooks/useQueries";

const monthEvents = [
  {
    id: "jan",
    label: "Jan",
    name: "January",
    events: [
      {
        title: "Maui Whale Festival",
        desc: "Celebrate the humpback whale migration with educational events, whale watches, and live music along the Maui coast.",
        location: "Maui",
        color: "ocean",
      },
      {
        title: "Hula Bowl",
        desc: "College football all-star game featuring top NFL prospects, played at Aloha Stadium with festive island flair.",
        location: "Oahu",
        color: "coral",
      },
      {
        title: "Ka Molokai Makahiki",
        desc: "Ancient Hawaiian games festival celebrating the Makahiki season with traditional sports and cultural demonstrations.",
        location: "Molokai",
        color: "palm",
      },
    ],
  },
  {
    id: "feb",
    label: "Feb",
    name: "February",
    events: [
      {
        title: "Maui Whale Festival (continues)",
        desc: "The world-famous humpback whale festival continues through February with peak whale sightings in Maui's warm waters.",
        location: "Maui",
        color: "ocean",
      },
      {
        title: "Chinese New Year Honolulu",
        desc: "Vibrant celebrations in Chinatown with lion dances, firecrackers, food vendors, and dazzling lantern parades.",
        location: "Oahu",
        color: "coral",
      },
      {
        title: "Waimea Town Celebration",
        desc: "Annual festival honoring the multi-cultural heritage of Waimea with rodeo events, music, and local food.",
        location: "Kauai",
        color: "golden",
      },
    ],
  },
  {
    id: "mar",
    label: "Mar",
    name: "March",
    events: [
      {
        title: "Kona Brewers Festival",
        desc: "Award-winning craft beer festival on the Kona waterfront, featuring 40+ breweries, live music, and island cuisine.",
        location: "Big Island",
        color: "golden",
      },
      {
        title: "Prince Kuhio Day",
        desc: "State holiday honoring Prince Jonah Kuhio Kalaniana'ole, celebrated with cultural performances and ceremonies statewide.",
        location: "Statewide",
        color: "palm",
      },
      {
        title: "Honolulu Festival",
        desc: "Three-day cultural festival highlighting the friendship between Hawaii and Asia-Pacific nations through art, performance, and food.",
        location: "Oahu",
        color: "ocean",
      },
    ],
  },
  {
    id: "apr",
    label: "Apr",
    name: "April",
    events: [
      {
        title: "Merrie Monarch Festival",
        desc: "The world's most prestigious hula competition, held in Hilo. Solo and group hula halau compete in ancient and modern hula for a week.",
        location: "Big Island",
        color: "coral",
      },
      {
        title: "East Maui Taro Festival",
        desc: "Hana's beloved community festival celebrating taro (kalo) — the staple of Hawaiian culture — with tastings, crafts, and live music.",
        location: "Maui",
        color: "palm",
      },
      {
        title: "Saveur Blog Awards in Hawaii",
        desc: "Food-focused gathering celebrating culinary culture, local farms, and Hawaii's unique fusion cuisine.",
        location: "Oahu",
        color: "golden",
      },
    ],
  },
  {
    id: "may",
    label: "May",
    name: "May",
    events: [
      {
        title: "Lei Day",
        desc: "May 1st is Lei Day across all Hawaiian islands — a beautiful state holiday celebrating the art of lei-making and the spirit of aloha.",
        location: "Statewide",
        color: "coral",
      },
      {
        title: "Spam Jam Waikiki",
        desc: "Hawaii's beloved Spam festival turns Kalakaua Avenue into a mile-long street party with creative Spam dishes from top local restaurants.",
        location: "Oahu",
        color: "golden",
      },
      {
        title: "Na Pali Coast Hikes",
        desc: "Prime hiking season opens on Na Pali's legendary Kalalau Trail with stunning views, cascading waterfalls, and dramatic sea cliffs.",
        location: "Kauai",
        color: "palm",
      },
    ],
  },
  {
    id: "jun",
    label: "Jun",
    name: "June",
    events: [
      {
        title: "King Kamehameha Day",
        desc: "June 11th state holiday honoring the great King Kamehameha I. Grand floral parades with stunning lei-draped statues across islands.",
        location: "Statewide",
        color: "golden",
      },
      {
        title: "Maui Film Festival",
        desc: "Starlit outdoor screenings at the Celestial Cinema in Wailea, featuring world-class films, filmmaker panels, and celebrity guests.",
        location: "Maui",
        color: "ocean",
      },
      {
        title: "Hawaiian Slack-Key Guitar Festival",
        desc: "Celebrating the beloved ki ho'alu (slack key) guitar tradition with performances by Hawaii's finest musicians at Queens Beach.",
        location: "Oahu",
        color: "palm",
      },
    ],
  },
  {
    id: "jul",
    label: "Jul",
    name: "July",
    events: [
      {
        title: "Fourth of July Celebrations",
        desc: "Spectacular fireworks displays light up beaches across all islands, with the biggest show launched from Magic Island in Honolulu.",
        location: "Statewide",
        color: "coral",
      },
      {
        title: "Ukulele Festival",
        desc: "The world's largest ukulele festival at Kapiolani Park features thousands of players, free concerts, and ukulele workshops for all ages.",
        location: "Oahu",
        color: "golden",
      },
      {
        title: "Koloa Plantation Days",
        desc: "Week-long festival in Kauai's historic Koloa Town celebrating the plantation era with rodeos, golf tournaments, and cultural events.",
        location: "Kauai",
        color: "palm",
      },
    ],
  },
  {
    id: "aug",
    label: "Aug",
    name: "August",
    events: [
      {
        title: "Hawaii State Farm Fair",
        desc: "Family-friendly fair at Aloha Stadium showcasing the best of Hawaii's agriculture with rides, local food, livestock, and carnival games.",
        location: "Oahu",
        color: "palm",
      },
      {
        title: "Duke's OceanFest",
        desc: "A week of ocean sports competition honoring Duke Kahanamoku — the father of modern surfing — with paddleboard races, swim meets, and surf events.",
        location: "Oahu",
        color: "ocean",
      },
      {
        title: "Billabong Pro Tahara",
        desc: "World Surf League event drawing international pro surfers to compete in Hawaii's warm summer swells.",
        location: "Maui",
        color: "coral",
      },
    ],
  },
  {
    id: "sep",
    label: "Sep",
    name: "September",
    events: [
      {
        title: "Aloha Festivals",
        desc: "Hawaii's longest-running cultural event spanning six weeks across all islands, with floral parades, royal court ceremonies, and hula.",
        location: "Statewide",
        color: "coral",
      },
      {
        title: "Waikiki Roughwater Swim",
        desc: "One of the most famous open-water swimming events in the world — a 2.38-mile ocean swim from Sans Souci Beach to Duke Kahanamoku Beach.",
        location: "Oahu",
        color: "ocean",
      },
      {
        title: "Maui County Fair",
        desc: "The oldest fair in Hawaii featuring carnival rides, local food booths, livestock shows, and live entertainment at the War Memorial Complex.",
        location: "Maui",
        color: "golden",
      },
    ],
  },
  {
    id: "oct",
    label: "Oct",
    name: "October",
    events: [
      {
        title: "Hawaii International Film Festival",
        desc: "Premier film festival bridging East and West through cinema, with screenings of films from Asia, Pacific Rim, and around the globe.",
        location: "Oahu",
        color: "ocean",
      },
      {
        title: "Ironman World Championship",
        desc: "The world's most iconic triathlon — a 2.4-mile swim, 112-mile bike, and 26.2-mile run through the lava fields of the Big Island.",
        location: "Big Island",
        color: "coral",
      },
      {
        title: "Hana Relay",
        desc: "Epic 52-mile relay race from Kahului to Hana winding through Maui's legendary Road to Hana with its 600 curves and 54 bridges.",
        location: "Maui",
        color: "palm",
      },
    ],
  },
  {
    id: "nov",
    label: "Nov",
    name: "November",
    events: [
      {
        title: "Kona Coffee Cultural Festival",
        desc: "Ten-day festival celebrating Kona's world-renowned coffee with farm tours, cupping competitions, and the crowning of the Coffee Queen.",
        location: "Big Island",
        color: "golden",
      },
      {
        title: "Vans Triple Crown of Surfing Begins",
        desc: "The world's most prestigious surfing series kicks off at Haleiwa, followed by Sunset Beach and Pipe Masters on Oahu's legendary North Shore.",
        location: "Oahu",
        color: "ocean",
      },
      {
        title: "Veterans Day Parade",
        desc: "One of Hawaii's largest parades honoring military veterans with floats, marching bands, and a solemn ceremony at the Punchbowl.",
        location: "Oahu",
        color: "coral",
      },
    ],
  },
  {
    id: "dec",
    label: "Dec",
    name: "December",
    events: [
      {
        title: "Honolulu Marathon",
        desc: "One of the world's top ten marathons draws 30,000 runners through the streets of Honolulu at sunrise, finishing at Diamond Head Crater.",
        location: "Oahu",
        color: "coral",
      },
      {
        title: "Vans Triple Crown of Surfing",
        desc: "The Pipe Masters at Banzai Pipeline crowns the world surfing champion in some of the most powerful waves on the planet.",
        location: "Oahu",
        color: "ocean",
      },
      {
        title: "Christmas in the Islands",
        desc: "Hawaii celebrates Christmas with festive lights along Honolulu's streets, Christmas boats parades, and holiday hula performances.",
        location: "Statewide",
        color: "golden",
      },
    ],
  },
];

const badgeColors: Record<string, string> = {
  ocean: "bg-ocean-100 text-ocean-700 border-ocean-200",
  coral: "bg-coral-300/20 text-coral-600 border-coral-300/30",
  golden: "bg-golden-100 text-golden-600 border-golden-200",
  palm: "bg-palm-100 text-palm-600 border-palm-200",
};

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

      {/* Hawaii Events Calendar */}
      <section
        id="events"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sand-50 to-ocean-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-ocean-500 font-semibold text-sm mb-3">
              <CalendarDays className="w-4 h-4" />
              YEAR-ROUND CELEBRATIONS
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ocean-900 mb-4">
              Hawaii Events
            </h2>
            <p className="text-ocean-500 text-lg max-w-2xl mx-auto">
              From ancient cultural festivals to world-class surf competitions —
              every month brings something extraordinary to the islands.
            </p>
          </div>

          <Tabs defaultValue="jan">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-ocean-100 p-1.5 rounded-2xl mb-8 justify-center">
              {monthEvents.map((month, idx) => (
                <TabsTrigger
                  key={month.id}
                  value={month.id}
                  data-ocid={`events.tab.${idx + 1}`}
                  className="rounded-xl px-3 py-1.5 text-sm font-medium text-ocean-600 data-[state=active]:bg-ocean-800 data-[state=active]:text-white data-[state=active]:shadow transition-all"
                >
                  {month.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {monthEvents.map((month, mIdx) => (
              <TabsContent key={month.id} value={month.id} className="mt-0">
                <div className="mb-5">
                  <h3 className="font-display text-2xl font-bold text-ocean-900">
                    {month.name}
                  </h3>
                  <div className="h-0.5 w-12 bg-coral-400 mt-1 rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {month.events.map((event, eIdx) => (
                    <div
                      key={event.title}
                      data-ocid={`events.item.${mIdx * 3 + eIdx + 1}`}
                      className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-display text-base font-bold text-ocean-900 leading-snug flex-1">
                          {event.title}
                        </h4>
                      </div>
                      <p className="text-ocean-600 text-sm leading-relaxed flex-1">
                        {event.desc}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-coral-500 flex-shrink-0" />
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full border ${badgeColors[event.color]}`}
                        >
                          {event.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
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
