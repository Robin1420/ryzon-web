import s from "./ChannelList.module.css";

export type Channel = { label: string; value: string };

export function ChannelList({ channels }: { channels: readonly Channel[] }) {
  return (
    <dl className={s.list}>
      {channels.map((c) => (
        <div key={c.label} className={s.row}><dt>{c.label}</dt><dd>{c.value}</dd></div>
      ))}
    </dl>
  );
}
