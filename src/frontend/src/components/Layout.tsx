import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const appId =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "hawaiiguide";

  return (
    <div className="min-h-screen flex flex-col bg-sand-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-ocean-900/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-coral-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-wide">
                Hawai<span className="text-coral-400">'i</span> Guide
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-ocean-100 hover:text-coral-300 font-medium transition-colors text-sm tracking-wide"
              >
                Islands
              </Link>
              <a
                href="#about"
                className="text-ocean-100 hover:text-coral-300 font-medium transition-colors text-sm tracking-wide"
              >
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-ocean-950 text-ocean-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-coral-400 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Hawai<span className="text-coral-400">'i</span> Guide
              </span>
            </div>
            <p className="text-ocean-400 text-sm text-center">
              Discover the magic of the Hawaiian Islands — from volcanic peaks
              to turquoise shores.
            </p>
            <p className="text-ocean-400 text-sm flex items-center gap-1">
              Built with{" "}
              <Heart className="w-3.5 h-3.5 text-coral-400 fill-coral-400" />{" "}
              using{" "}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral-400 hover:text-coral-300 transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-ocean-800 text-center text-ocean-500 text-xs">
            © {new Date().getFullYear()} Hawai'i Guide. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
