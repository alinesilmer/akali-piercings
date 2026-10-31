import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "../../components/ui/Button";
import { Section, SectionHead } from "../../components/ui/Section";
import { INSTAGRAM_POSTS } from "../../data/about";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../../data/site";
import { useInstagramEmbeds } from "../../hooks/useInstagramEmbeds";
import { isInstagramPost } from "../../lib/instagram";

const POSTS = INSTAGRAM_POSTS.filter(isInstagramPost);

/** Instagram posts, embedded only once the feed is within 600px of the viewport. */
function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "600px" });
  useInstagramEmbeds(ref, near);

  return (
    <div ref={ref} className="posts" data-lenis-prevent>
      {near &&
        POSTS.map((url) => (
          <div key={url} className="post">
            <blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14" />
          </div>
        ))}
    </div>
  );
}

export function Work() {
  return (
    <Section tone="panel">
      <SectionHead
        kanji="作品"
        title="Trabajos"
        aside={
          <Button variant="link" href={INSTAGRAM_URL}>
            {INSTAGRAM_HANDLE} <ArrowUpRight size={15} strokeWidth={1.5} />
          </Button>
        }
      />
      <InstagramFeed />
    </Section>
  );
}
