import { Calendar, Film, Play, Star } from "lucide-react";
import { useEffect, useState } from "react";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/shows");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <div className="min-h-screen bg-[#070913] text-white pt-24 pb-16">
      {/* Background Soft Glow */}
      <div className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[150px] rounded-full" />

      <div className="relative z-10 w-11/12 lg:max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Explore <span className="text-red-500">Movies & Shows</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Top curated picks streaming right now
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-slate-300">
            {movies.length} Titles
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
        ) : (
          /* Movie Card Responsive Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols- gap-4 sm:gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="group relative bg-slate-900/60 rounded-md overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-red-950/40 flex flex-col justify-between"
              >
                {/* Poster Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
                  <img
                    src={
                      movie.image?.medium ||
                      movie.image?.original ||
                      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop"
                    }
                    alt={movie.name}
                    className="w-full h-full  group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Rating Badge */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-sm bg-slate-950/80 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-bold shadow-md">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{movie.rating?.average || "N/A"}</span>
                  </div>

                  {/* Center Play Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/50 scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Movie Details */}
                <div className="p-3 space-y-1.5">
                  <h3
                    title={movie.name}
                    className="text-sm sm:text-base font-bold text-white truncate group-hover:text-red-400 transition-colors"
                  >
                    {movie.name}
                  </h3>

                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
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
                        : movie.language}
                    </span>
                  </div>

                  {/* Genres */}
                  <div className="flex items-center gap-1 pt-0.5 overflow-hidden">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
