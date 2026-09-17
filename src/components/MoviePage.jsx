import {
  Calendar,
  Clock,
  ExternalLink,
  Film,
  Globe,
  Info,
  Search,
  Star,
  Tag,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let endpoint = "https://api.tvmaze.com/shows";

        if (searchQuery.trim()) {
          endpoint = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(
            searchQuery.trim(),
          )}`;
        }

        const response = await fetch(endpoint);
        const data = await response.json();

        if (searchQuery.trim()) {
          setMovies(data.map((item) => item.show));
        } else {
          setMovies(data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchMovies();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const stripHtml = (html) => {
    if (!html) return "No description available for this show.";
    return html.replace(/<[^>]*>?/gm, "");
  };

  return (
    <div className="min-h-screen bg-[#070913] text-white pt-24 pb-16">
      {/* Background Soft Glow */}
      <div className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[150px] rounded-full" />

      <div className="relative z-10 w-11/12 lg:max-w-7xl mx-auto">
        {/* Prominent Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie or TV show..."
              className="w-full h-13 bg-slate-900/80 border border-white/10 rounded-xl pl-12 pr-11 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-slate-900 transition-all shadow-xl shadow-black/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {searchQuery ? "Search Results" : "Explore"}{" "}
              <span className="text-red-500">Movies & Shows</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {searchQuery
                ? `Showing results for "${searchQuery}"`
                : "Top curated picks streaming right now"}
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-slate-300">
            {movies.length} Titles Found
          </span>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-white/5 animate-pulse rounded-md border border-white/5"
              />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5">
            <Film className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-lg font-bold text-white">No shows found</p>
            <p className="text-sm text-slate-400 mt-1">
              Try searching with another keyword or movie name.
            </p>
          </div>
        ) : (
          /* Movie Card Responsive Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-slate-900/60 rounded-sm overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/40 flex flex-col justify-between"
              >
                {/* Poster Container */}
                <div className="relative aspect-[4/4] w-full overflow-hidden bg-slate-950">
                  <img
                    src={
                      movie.image?.medium ||
                      movie.image?.original ||
                      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop"
                    }
                    alt={movie.name}
                    className="w-full h-full  transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-sm bg-slate-950/80 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-bold shadow-md">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{movie.rating?.average || "N/A"}</span>
                  </div>
                </div>

                {/* Movie Details */}
                <div className="p-3.5 space-y-2 flex flex-col justify-between flex-grow">
                  <div>
                    <h3
                      title={movie.name}
                      className="text-sm sm:text-base font-bold text-white truncate group-hover:text-red-400 transition-colors"
                    >
                      {movie.name}
                    </h3>

                    <div className="flex items-center justify-between text-slate-400 text-[11px] mt-1">
                      {/* Premiere Year */}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {movie.premiered ? movie.premiered.slice(0, 4) : "N/A"}
                      </span>

                      {/* Runtime or Language */}
                      <span className="flex items-center gap-1">
                        <Film className="w-3 h-3 text-slate-500" />
                        {movie.averageRuntime
                          ? `${movie.averageRuntime}m`
                          : movie.language || "EN"}
                      </span>
                    </div>

                    {/* Genres */}
                    <div className="flex items-center gap-1 pt-1.5 overflow-hidden">
                      {movie.genres?.slice(0, 2).map((genre, index) => (
                        <span
                          key={index}
                          className="text-[10px] px-1.5 py-0.5 rounded-sm bg-white/5 text-slate-300 border border-white/5 truncate"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* See Details Button */}
                  <button
                    onClick={() => setSelectedMovie(movie)}
                    className="w-full mt-2 py-2 rounded-sm bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 text-xs font-semibold tracking-wide text-white transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>See Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🎞️ Movie Details Modal Overlay */}
      {selectedMovie && (
        <div
          onClick={() => setSelectedMovie(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
        >
          {/* Modal Card */}
          <div
            onClick={(e) => e.stopPropagation()} // ব্যাকড্রপ ক্লিকে বন্ধ করার জন্য স্টপ প্রোপাগেশন
            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/80 my-auto"
          >
            {/* Close Button Header */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-slate-950/80 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600 transition"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Movie Backdrop / Poster Image */}
            <div className="relative w-full h-56 sm:h-72 bg-slate-950">
              <img
                src={
                  selectedMovie.image?.original ||
                  selectedMovie.image?.medium ||
                  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop"
                }
                alt={selectedMovie.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            </div>

            {/* Modal Body Info */}
            <div className="p-6 sm:p-8 -mt-12 relative z-10 space-y-4">
              {/* Title & Metadata Badges */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {selectedMovie.name}
                </h2>

                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-sm font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{selectedMovie.rating?.average || "N/A"} / 10</span>
                  </div>

                  <span className="flex items-center gap-1 text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {selectedMovie.premiered || "Unknown Release"}
                  </span>

                  {selectedMovie.averageRuntime && (
                    <span className="flex items-center gap-1 text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {selectedMovie.averageRuntime} mins
                    </span>
                  )}

                  {selectedMovie.language && (
                    <span className="flex items-center gap-1 text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm">
                      <Globe className="w-3 h-3 text-slate-400" />
                      {selectedMovie.language}
                    </span>
                  )}
                </div>
              </div>

              {/* Genres Tag List */}
              {selectedMovie.genres?.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <Tag className="w-3.5 h-3.5 text-red-500" />
                  {selectedMovie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="text-xs px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-rose-300 rounded-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview / Summary */}
              <div className="space-y-1.5 pt-1">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Overview
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed max-h-40 overflow-y-auto pr-2">
                  {stripHtml(selectedMovie.summary)}
                </p>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                {selectedMovie.officialSite ? (
                  <a
                    href={selectedMovie.officialSite}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold"
                  >
                    <span>Visit Official Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">
                    Network: {selectedMovie.network?.name || "Independent"}
                  </span>
                )}

                <button
                  onClick={() => setSelectedMovie(null)}
                  className="px-5 py-2 rounded-sm bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
