"use client";


export function MinimalMap() {
  return (
    <div className="px-6">
      <div className="h-80 w-full overflow-hidden rounded-xl grayscale opacity-90">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=92.77842521667482%2C26.660652750618922%2C92.89172172546388%2C26.738558551486467&amp;layer=mapnik&amp;marker=26.699612310564078%2C92.83507347106934"
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}

