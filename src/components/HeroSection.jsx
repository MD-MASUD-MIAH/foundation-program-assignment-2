import { Play, Star } from "lucide-react";
import video from "../../public/downloaded-file.mp4";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[75vh] md:min-h-screen flex items-center justify-center md:justify-start overflow-hidden bg-slate-950 select-none">
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
        <div className="absolute inset-0 bg-slate-950/70 md:bg-transparent md:bg-gradient-to-r md:from-slate-950 md:via-slate-950/75 md:to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 w-11/12 lg:max-w-7xl mx-auto pt-24 pb-16 md:pt-32 md:pb-20 flex flex-col justify-center items-center md:items-start text-center md:text-left">
        <div className="max-w-3xl space-y-6 md:space-y-8 flex flex-col items-center md:items-start">
          {/* Tags & Rating Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3.5">
            <span className="px-3 py-1 md:px-3.5 md:py-1.5 text-[11px] md:text-xs font-extrabold tracking-widest text-rose-400 bg-rose-500/15 border border-rose-500/30 rounded-md uppercase">
              Trending Now
            </span>
            <span className="px-2.5 py-1 md:px-3.5 md:py-1.5 text-[11px] md:text-xs font-bold tracking-wide text-slate-200 bg-white/10 border border-white/10 rounded-md">
              4K Ultra HD
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-400 text-[11px] md:text-xs font-black">
              <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-amber-400" />
              <span>8.9 / 10</span>
            </div>
            <span className="text-xs md:text-sm font-semibold text-slate-300 w-full sm:w-auto mt-1 sm:mt-0">
              2026 • 2h 24m • Sci-Fi / Action
            </span>
          </div>

          {/* Movie Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] uppercase drop-shadow-2xl">
            Inter
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-400">
              stellar
            </span>
          </h1>

          {/* Movie Synopsis */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200/90 leading-relaxed max-w-2xl font-normal drop-shadow">
            A team of explorers travel through a newly discovered wormhole in
            space, surpassing human limitations to conquer the vast distances
            involved in an interstellar voyage.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-5 pt-1 md:pt-2">
            <a href="/movies" className="flex items-center gap-3 px-8 py-3.5 md:px-9 md:py-4 rounded-sm bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-sm md:text-base tracking-wide uppercase shadow-2xl shadow-red-600/40 hover:shadow-red-600/60 transition-all duration-200">
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-white" />
              <span>Explore Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Bottom Details */}
      <div className="absolute right-6 sm:right-12 bottom-12 z-20 hidden md:flex items-center gap-4">
        {/* Additional actions if needed */}
      </div>
    </section>
  );
};

export default HeroSection;
