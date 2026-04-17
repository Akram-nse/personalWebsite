import HomeHashScroll from "@/components/HomeHashScroll";
import QuoteHero from "@/components/QuoteHero";
import TimelineIntro from "@/components/TimelineIntro";
import TimelineRail from "@/components/TimelineRail";
import TimelineSection from "@/components/TimelineSection";
import {
  hero,
  timelineIntro,
  timelineSections,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <HomeHashScroll />
      <QuoteHero
        name={hero.name}
        tagline={hero.tagline}
        quote={hero.quote}
        attribution={hero.attribution}
        scrollCta={hero.scrollCta}
      />

      <div id="timeline">
        <TimelineIntro
          title={timelineIntro.title}
          bodyBefore={timelineIntro.bodyBefore}
          bodyMiddle={timelineIntro.bodyMiddle}
          bodyAfter={timelineIntro.bodyAfter}
        />

        <TimelineRail />

        <div>
          {timelineSections.map((entry) => (
            <TimelineSection key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </>
  );
}
