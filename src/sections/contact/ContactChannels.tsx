import { ArrowUpRight } from "lucide-react";

import { RuledItem } from "../../components/motion";
import { ExternalLink } from "../../components/ui/Button";
import { CHANNELS, type Channel } from "../../data/contact";

function Row({ channel }: { channel: Channel }) {
  const content = (
    <>
      <channel.icon size={22} strokeWidth={1.2} />
      <span>
        <span className="channel__label">{channel.label}</span>
        <br />
        <span className="label">{channel.value}</span>
      </span>
      <span />
      {channel.href && <ArrowUpRight size={18} strokeWidth={1.25} />}
    </>
  );

  return channel.href ? (
    <ExternalLink className="channel" href={channel.href}>
      {content}
    </ExternalLink>
  ) : (
    <div className="channel">{content}</div>
  );
}

export function ContactChannels() {
  return (
    <ul>
      {CHANNELS.map((channel) => (
        <RuledItem key={channel.label}>
          <Row channel={channel} />
        </RuledItem>
      ))}
    </ul>
  );
}
