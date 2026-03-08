import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type Attraction = {
    name : Text;
    description : Text;
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
              },
              {
                name = "Akaka Falls";
                description = "422-foot waterfall amidst lush rainforest.";
              },
              {
                name = "Mauna Kea Observatory";
                description = "Stargazing at the world's premier astronomical observation site.";
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
              },
              {
                name = "Haleakala National Park";
                description = "View sunrise and sunset from Maui's highest peak.";
              },
              {
                name = "Lahaina Town";
                description = "Historic whaling village with shops and restaurants.";
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
                description = "Famous beach with lively atmosphere and high-rise hotels.";
              },
              {
                name = "Diamond Head Crater";
                description = "Hike to scenic summit overlooking Honolulu.";
              },
              {
                name = "Pearl Harbor";
                description = "Historic WWII memorials and museums.";
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
              },
              {
                name = "Waimea Canyon";
                description = "Referred to as the 'Grand Canyon of the Pacific'.";
              },
              {
                name = "Wailua Falls";
                description = "Dramatic twin waterfalls in lush setting.";
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
              },
              {
                name = "Halawa Valley";
                description = "Ancient cultural site with waterfalls.";
              },
              {
                name = "Molokai Mule Ride";
                description = "Unique experience down steep Kalaupapa cliffs.";
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
              },
              {
                name = "Shipwreck Beach";
                description = "Famous for the remains of sunken ships.";
              },
              {
                name = "Munro Trail";
                description = "Scenic hiking and off-road biking trail.";
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
