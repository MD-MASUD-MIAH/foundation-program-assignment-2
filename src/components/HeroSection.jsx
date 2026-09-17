import { Play, Star, Volume2 } from "lucide-react";
import video from "../../public/downloaded-file.mp4";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-start overflow-hidden bg-slate-950 select-none">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105"
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Gradient Overlays for Cinematic Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 w-11/12 lg:max-w-7xl mx-auto pt-32 pb-20 flex flex-col justify-center">
        <div className="max-w-3xl space-y-8">
          {/* Tags & Rating Badges */}
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="px-3.5 py-1.5 text-xs font-extrabold tracking-widest text-rose-400 bg-rose-500/15 border border-rose-500/30 rounded-md uppercase">
              Trending Now
            </span>
            <span className="px-3.5 py-1.5 text-xs font-bold tracking-wide text-slate-200 bg-white/10 border border-white/10 rounded-md">
              4K Ultra HD
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-black">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>8.9 / 10</span>
            </div>
            <span className="text-sm font-semibold text-slate-300">
              2026 • 2h 24m • Sci-Fi / Action
            </span>
          </div>

          {/* Movie Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] uppercase drop-shadow-2xl">
            Inter
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-400">
              stellar
            </span>
          </h1>

          {/* Movie Synopsis */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200/90 leading-relaxed max-w-2xl font-normal drop-shadow">
            A team of explorers travel through a newly discovered wormhole in
            space, surpassing human limitations to conquer the vast distances
            involved in an interstellar voyage.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <button className="flex items-center gap-3 px-9 py-4 rounded-md bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-base tracking-wide uppercase shadow-2xl shadow-red-600/40 hover:shadow-red-600/60 transition-all duration-200">
              <Play className="w-5 h-5 fill-white" />
              <span>Explore Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Details */}
      <div className="absolute right-6 sm:right-12 bottom-12 z-20 hidden md:flex items-center gap-4">
        <button className="p-3.5 rounded-md bg-slate-900/70 hover:bg-slate-900 text-slate-300 hover:text-white border border-white/15 backdrop-blur-md transition-all">
          <Volume2 className="w-5 h-5" />
        </button>
        <span className="px-4 py-2 bg-slate-900/70 border border-white/15 backdrop-blur-md text-xs font-bold tracking-wider text-slate-200 rounded-md">
          PG-13
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
