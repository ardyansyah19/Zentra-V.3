import RealtimeBadge from './RealtimeBadge';

export default function Topbar({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-7 gap-4 flex-wrap">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-navy-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-plum-500 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <RealtimeBadge />
        {action}
      </div>
    </div>
  );
}
