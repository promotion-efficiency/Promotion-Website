export default function VideoChapter() {
  return (
    <section id="video-chapter" className="relative h-[70vh] min-h-[480px] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-people-running-on-a-running-track-3280-large.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full items-end text-white">
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Chapter 01 — Energy
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-tight md:text-6xl">
            Every campaign starts with momentum. We build it and keep it moving.
          </h2>
        </div>
      </div>
    </section>
  )
}
