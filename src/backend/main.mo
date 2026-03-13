import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import MixinStorage "blob-storage/Mixin";



actor {
  include MixinStorage();

  type Attraction = {
    name : Text;
    description : Text;
    category : ?Text;
    hours : ?Text;
    admission : ?Text;
    tip : ?Text;
  };

  type Beach = {
    name : Text;
    description : Text;
  };

  type Tip = {
    title : Text;
    content : Text;
  };

  type Island = {
    name : Text;
    description : Text;
    topAttractions : [Attraction];
    beaches : [Beach];
    travelTips : [Tip];
  };

  let islandData = Map.empty<Text, Island>();

  // Pre-populate with Hawaii island data
  public shared ({ caller }) func initializeIslands() : async () {
    if (islandData.isEmpty()) {
      let islands = [
        (
          "Big Island",
          {
            name = "Big Island";
            description = "The largest and most diverse Hawaiian island.";
            topAttractions = [
              {
                name = "Hawaii Volcanoes National Park";
                description = "Home to active Kilauea and Mauna Loa volcanoes.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
              {
                name = "Akaka Falls";
                description = "422-foot waterfall amidst lush rainforest.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
              {
                name = "Mauna Kea Observatory";
                description = "Stargazing at the world's premier astronomical observation site.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
            ];
            beaches = [
              {
                name = "Punalu'u Black Sand Beach";
                description = "Famous for its black sand and sea turtles.";
              },
              {
                name = "Hapuna Beach";
                description = "White sand beach, great for swimming.";
              },
            ];
            travelTips = [
              {
                title = "Rent a 4x4 Vehicle";
                content = "Some attractions require sturdy vehicles for rugged terrain.";
              },
              {
                title = "Prepare for Varying Climates";
                content = "Pack for both tropical and chilly climates due to island's diverse weather.";
              },
            ];
          },
        ),
        (
          "Maui",
          {
            name = "Maui";
            description = "Known for its stunning beaches, waterfalls, and the Road to Hana.";
            topAttractions = [
              {
                name = "Road to Hana";
                description = "Picturesque drive with waterfalls, rainforests, and coastal views.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
              {
                name = "Haleakala National Park";
                description = "View sunrise and sunset from Maui's highest peak.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
              {
                name = "Lahaina Town";
                description = "Historic whaling village with shops and restaurants.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
            ];
            beaches = [
              {
                name = "Kaanapali Beach";
                description = "Resort area with white sand beaches.";
              },
              {
                name = "Wailea Beach";
                description = "Upscale resort beach with calm waters.";
              },
            ];
            travelTips = [
              {
                title = "Book Maui Activities in Advance";
                content = "Popular tours and activities often sell out. Book ahead when possible.";
              },
              {
                title = "Respect Local Culture";
                content = "Learn about Hawaii's customs and traditions while visiting.";
              },
            ];
          },
        ),
        (
          "Oahu",
          {
            name = "Oahu";
            description = "The most populous Hawaiian island, known for Honolulu and Waikiki Beach.";
            topAttractions = [
              {
                name = "Waikiki Beach";
                description = "The world-famous crescent beach stretching nearly two miles along Honolulu's coast. Lined with luxury hotels, restaurants, and surf schools, it's the heart of Oahu's tourism scene.";
                category = ?"Beach";
                hours = ?"Open 24 hours";
                admission = ?"Free";
                tip = ?"Arrive early morning (before 8am) to snag a shaded spot and beat the crowds. Rent a board from one of the many surf schools right on the beach.";
              },
              {
                name = "Diamond Head State Monument";
                description = "An iconic 300,000-year-old volcanic crater offering a challenging 1.6-mile round-trip hike to the summit with panoramic views of Waikiki, Honolulu, and the Pacific.";
                category = ?"Hike";
                hours = ?"Daily 6am–6pm (last entry 4pm)";
                admission = ?"$5 per person / $10 per vehicle";
                tip = ?"Book your entry reservation online at least a day ahead — walk-ins are often turned away. Bring water and wear sunscreen, as there's little shade on the trail.";
              },
              {
                name = "Pearl Harbor National Memorial";
                description = "One of America's most visited historic sites, honoring the December 7, 1941 attack. Includes the USS Arizona Memorial, USS Missouri battleship, USS Bowfin submarine, and the Pacific Aviation Museum.";
                category = ?"History";
                hours = ?"Daily 7am–5pm (USS Arizona Memorial tours depart 8am–3pm)";
                admission = ?"USS Arizona Memorial: Free (timed passes required). USS Missouri: $32 adults / $15 children.";
                tip = ?"Reserve USS Arizona Memorial passes online weeks in advance — they sell out quickly. Arrive early for the best experience and allow at least half a day.";
              },
              {
                name = "Hanauma Bay Nature Preserve";
                description = "A protected marine life sanctuary set inside a volcanic bay. One of Hawaii's top snorkeling spots, home to hundreds of tropical fish species and green sea turtles.";
                category = ?"Nature";
                hours = ?"Wed–Mon 6:45am–4pm (closed Tuesdays)";
                admission = ?"$25 per person (ages 13+); free for Oahu residents and children under 13";
                tip = ?"Reservations are mandatory and fill up fast — book online at least 2 days ahead. Watch the required 9-minute reef education video before entering the water.";
              },
              {
                name = "Polynesian Cultural Center";
                description = "A living museum and cultural theme park showcasing the traditions, dances, crafts, and food of six Polynesian island cultures: Hawaii, Samoa, Tonga, Fiji, Tahiti, and Aotearoa.";
                category = ?"Culture";
                hours = ?"Mon–Sat 12pm–9pm (closed Sundays)";
                admission = ?"From $79.95 per person (various packages available)";
                tip = ?"The evening luau and 'Ha: Breath of Life' night show are highlights. Book a combo package to get the best value. Plan for a full 6–7 hour visit.";
              },
              {
                name = "Manoa Falls Trail";
                description = "A lush 1.6-mile round-trip hike through a tropical rainforest leading to a stunning 150-foot waterfall. One of the most accessible and rewarding hikes on Oahu.";
                category = ?"Hike";
                hours = ?"Daily 7am–7pm";
                admission = ?"$7 parking fee (free for pedestrians)";
                tip = ?"The trail can be very muddy — wear waterproof shoes or trail runners. Mosquito repellent is a must. The waterfall is most impressive after recent rain.";
              },
            ];
            beaches = [
              {
                name = "Lanikai Beach";
                description = "Turquoise waters and soft white sand.";
              },
              {
                name = "North Shore";
                description = "Famous for big wave surfing and relaxed atmosphere.";
              },
            ];
            travelTips = [
              {
                title = "Plan For Traffic in Honolulu";
                content = "Factor in extra time for busy city traffic.";
              },
              {
                title = "Explore Outside Waikiki";
                content = "Venture beyond Waikiki for authentic local experiences.";
              },
            ];
          },
        ),
        (
          "Kauai",
          {
            name = "Kauai";
            description = "Known for its lush scenery, waterfalls, and outdoor adventures.";
            topAttractions = [
              {
                name = "Na Pali Coast";
                description = "Scenic coastline with cliffs, waterfalls, and hiking trails.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
              {
                name = "Waimea Canyon";
                description = "Referred to as the 'Grand Canyon of the Pacific'.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
              {
                name = "Wailua Falls";
                description = "Dramatic twin waterfalls in lush setting.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
            ];
            beaches = [
              {
                name = "Hanalei Bay";
                description = "Picturesque bay with mountain backdrop.";
              },
              {
                name = "Poipu Beach";
                description = "Popular family-friendly beach.";
              },
            ];
            travelTips = [
              {
                title = "Rent a Car";
                content = "Kauai's attractions are spread out, so a car is essential.";
              },
              {
                title = "Respect the Environment";
                content = "Help preserve the island's fragile natural beauty.";
              },
            ];
          },
        ),
        (
          "Molokai",
          {
            name = "Molokai";
            description = "Known as the 'Friendly Isle', offering authentic Hawaii experiences.";
            topAttractions = [
              {
                name = "Kalaupapa National Historical Park";
                description = "Dramatic cliffs and historic leprosy settlement.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
              {
                name = "Halawa Valley";
                description = "Ancient cultural site with waterfalls.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
              {
                name = "Molokai Mule Ride";
                description = "Unique experience down steep Kalaupapa cliffs.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
            ];
            beaches = [
              {
                name = "Papohaku Beach";
                description = "One of Hawaii's longest white sand beaches.";
              },
              {
                name = "Kepuhi Beach";
                description = "Secluded and scenic coastline.";
              },
            ];
            travelTips = [
              {
                title = "Plan for Fewer Tourist Services";
                content = "Molokai has fewer hotel and tourist services than other islands.";
              },
              {
                title = "Experience Traditional Hawaiian Culture";
                content = "Molokai offers rich cultural experiences for visitors.";
              },
            ];
          },
        ),
        (
          "Lanai",
          {
            name = "Lanai";
            description = "The most tranquil Hawaiian island, known for luxury resorts and adventures.";
            topAttractions = [
              {
                name = "Garden of the Gods";
                description = "Unique rock formations and dramatic landscapes.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
              {
                name = "Shipwreck Beach";
                description = "Famous for the remains of sunken ships.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
              {
                name = "Munro Trail";
                description = "Scenic hiking and off-road biking trail.";
                category = null;
                hours = null;
                admission = null;
                tip = null;
              },
            ];
            beaches = [
              {
                name = "Hulopoe Bay";
                description = "Great for snorkeling and swimming.";
              },
              {
                name = "Polihua Beach";
                description = "Remote and rarely crowded beach.";
              },
            ];
            travelTips = [
              {
                title = "Tour by Jeep";
                content = "Lanai's terrain is best explored by 4-wheel drive vehicle.";
              },
              {
                title = "Prepare for Isolation";
                content = "Lack of crowds and peaceful atmosphere.";
              },
            ];
          },
        ),
      ];

      for ((name, island) in islands.values()) {
        islandData.add(name, island);
      };
    };
  };

  public query ({ caller }) func getAllIslands() : async [Island] {
    if (islandData.isEmpty()) { Runtime.trap("No islands data found") };
    islandData.values().toArray();
  };

  public query ({ caller }) func getIslandByName(name : Text) : async Island {
    switch (islandData.get(name)) {
      case (null) { Runtime.trap("Island not found") };
      case (?island) { island };
    };
  };
};
