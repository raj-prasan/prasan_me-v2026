"use client";

import { position } from "@/lib/constants";

export function MinimalMap() {
  return (
    <iframe
      src="https://www.openstreetmap.org/export/embed.html?bbox=92.77842521667482%2C26.660652750618922%2C92.89172172546388%2C26.738558551486467&amp;layer=mapnik&amp;marker=26.699612310564078%2C92.83507347106934"
      loading="lazy"
      className="border-0 h-80 w-full rounded-xl grayscale px-6 opacity-90"
    />
  );
}

