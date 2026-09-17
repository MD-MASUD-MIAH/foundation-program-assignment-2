import AOS from "aos";
import "aos/dist/aos.css";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Film,
  Globe,
  Info,
  Search,
  Star,
  Tag,
  Tv,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;
  const maxAllowedMovies = 36;

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [movies, currentPage]);

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

        let formattedData = [];
        if (searchQuery.trim()) {
          formattedData = data.map((item) => item.show);
        } else {
          formattedData = data;
        }

        setMovies(formattedData.slice(0, maxAllowedMovies));
        setCurrentPage(1);
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

  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-white pt-34 pb-16 overflow-hidden">
      {/* Cinematic Theater Ambience Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="https://i.ibb.co.com/JwK1yV0p/Chat-GPT-Image-Sep-17-2026-07-58-38-PM.png"
          alt="Cinema Theater Screen"
          className="w-full h-full object-cover object-center"
        />
        {/* Balanced Dark Overlay so Cards and Posters Pop */}
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />
      </div>

      <div className="relative z-10 w-11/12 lg:max-w-7xl mx-auto">
        <div data-aos="fade-down" className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie or TV show..."
              className="w-full h-12 bg-slate-900/80 border border-white/15 rounded-sm pl-12 pr-11 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-slate-900 transition-all shadow-xl shadow-black/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight drop-shadow-lg">
              {searchQuery ? "Search Results" : "Explore"}{" "}
              <span className="text-red-500">Movies & Shows</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 drop-shadow">
              {searchQuery
                ? `Showing results for "${searchQuery}"`
                : "Top curated picks streaming right now"}
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-sm bg-slate-900/80 backdrop-blur-md border border-white/15 text-slate-200 shadow-md">
            {movies.length} Titles
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] bg-slate-900/60 animate-pulse rounded-md border border-white/10"
              />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div
            data-aos="zoom-in"
            className="text-center py-20 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10"
          >
            <Film className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-lg font-bold text-white">No shows found</p>
            <p className="text-sm text-slate-400 mt-1">
              Try searching with another keyword or movie name.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
              {currentMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  data-aos="fade-up"
                  data-aos-delay={(index % 4) * 50}
                  className="group relative bg-slate-900/85 backdrop-blur-md rounded-md overflow-hidden border border-white/15 hover:border-red-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/50 flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/4] w-full overflow-hidden bg-slate-950">
                    <img
                      src={
                        movie.image?.medium ||
                        movie.image?.original ||
                        "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop"
                      }
                      alt={movie.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-sm bg-slate-950/80 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-bold shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{movie.rating?.average || "N/A"}</span>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2 flex flex-col justify-between flex-grow">
                    <div>
                      <h3
                        title={movie.name}
                        className="text-sm sm:text-base font-bold text-white truncate group-hover:text-red-400 transition-colors"
                      >
                        {movie.name}
                      </h3>

                      <div className="flex items-center justify-between text-slate-400 text-[11px] mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {movie.premiered
                            ? movie.premiered.slice(0, 4)
                            : "N/A"}
                        </span>

                        <span className="flex items-center gap-1">
                          <Film className="w-3 h-3 text-slate-400" />
                          {movie.averageRuntime
                            ? `${movie.averageRuntime}m`
                            : movie.language || "EN"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 pt-1.5 overflow-hidden">
                        {movie.genres?.slice(0, 2).map((genre, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded-sm bg-white/10 text-slate-200 border border-white/10 truncate"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedMovie(movie)}
                      className="w-full mt-2 py-2 rounded-sm bg-white/10 hover:bg-red-600 border border-white/15 hover:border-red-600 text-xs font-semibold tracking-wide text-white transition-all duration-200 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>See Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div
                data-aos="fade-up"
                className="flex items-center justify-center gap-2 mt-12"
              >
                <button
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                  className="p-2.5 rounded-sm bg-slate-900/90 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white hover:border-red-500 disabled:opacity-40 disabled:hover:border-white/15 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-9 h-9 text-xs font-bold rounded-sm border transition cursor-pointer ${
                        currentPage === number
                          ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30"
                          : "bg-slate-900/90 backdrop-blur-md border-white/15 text-slate-300 hover:border-red-500 hover:text-white"
                      }`}
                    >
                      {number}
                    </button>
                  ),
                )}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                  className="p-2.5 rounded-sm bg-slate-900/90 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white hover:border-red-500 disabled:opacity-40 disabled:hover:border-white/15 transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedMovie && (
        <div
          onClick={() => setSelectedMovie(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            data-aos="zoom-in"
            data-aos-duration="250"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-[#0d111d] border border-white/15 rounded-xl shadow-2xl shadow-black/90 my-auto overflow-hidden"
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-slate-950/80 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[280px] bg-slate-950/80 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                  <img
                    src={
                      selectedMovie.image?.original ||
                      selectedMovie.image?.medium ||
                      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop"
                    }
                    alt={selectedMovie.name}
                    className="w-full h-auto object-contain block"
                  />
                </div>

                <div className="mt-3.5 flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-md text-amber-400 text-xs font-bold w-full max-w-[280px] justify-center">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>
                    Rating: {selectedMovie.rating?.average || "N/A"} / 10
                  </span>
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    {selectedMovie.name}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                    <span className="flex items-center gap-1 text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-sm">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {selectedMovie.premiered
                        ? `${selectedMovie.premiered.slice(0, 4)}`
                        : "Year N/A"}
                    </span>

                    {selectedMovie.averageRuntime && (
                      <span className="flex items-center gap-1 text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-sm">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {selectedMovie.averageRuntime} mins
                      </span>
                    )}

                    {selectedMovie.language && (
                      <span className="flex items-center gap-1 text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-sm">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        {selectedMovie.language}
                      </span>
                    )}

                    {selectedMovie.status && (
                      <span className="flex items-center gap-1 text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-sm font-semibold">
                        <Tv className="w-3.5 h-3.5 text-rose-400" />
                        {selectedMovie.status}
                      </span>
                    )}
                  </div>

                  {selectedMovie.genres?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-3">
                      <Tag className="w-3.5 h-3.5 text-red-500 mr-1" />
                      {selectedMovie.genres.map((genre) => (
                        <span
                          key={genre}
                          className="text-[11px] font-medium px-2 py-0.5 bg-red-600/15 border border-red-500/30 text-rose-300 rounded-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1.5">
                      Storyline / Overview
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed max-h-48 overflow-y-auto pr-2 custom-scrollbar font-normal">
                      {stripHtml(selectedMovie.summary)}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">
                      Network:{" "}
                    </span>
                    {selectedMovie.network?.name ||
                      selectedMovie.webChannel?.name ||
                      "Independent"}
                  </div>

                  <div className="flex items-center gap-3">
                    {selectedMovie.officialSite && (
                      <a
                        href={selectedMovie.officialSite}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold transition"
                      >
                        <span>Official Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedMovie(null)}
                      className="px-4 py-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition active:scale-95 cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
