import type { ReactNode } from "react";
import {
  Check,
  FileText,
  GripHorizontal,
  Grip,
  RefreshCw,
  Settings2,
} from "lucide-react";
// @ts-expect-error Vite resolves the imported PNG asset at build time.
import wallpaper from "../imports/image.png";

type WidgetTheme = "light" | "dark";
type WidgetSize = "full" | "compact";

const taskRows = [
  ["Plan product review", true],
  ["Finalize launch notes", false],
  ["Review Q1 brief", false],
  ["Send stakeholder update", false],
] as const;

function GhostIcon({ children }: { children: ReactNode }) {
  // The kit exposes no Button component; this compact native button reproduces the documented shadcn ghost icon button.
  return <button className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">{children}</button>;
}

function TextButton({ children, primary = false }: { children: ReactNode; primary?: boolean }) {
  // The kit exports no Button component; this native element follows the requested shadcn primary/ghost treatment.
  return <button className={`h-8 rounded-md px-3 text-[13px] font-medium ${primary ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{children}</button>;
}

function Pill({ children }: { children: ReactNode }) {
  return <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium leading-4 text-secondary-foreground">{children}</span>;
}

function WidgetShell({
  theme,
  size,
  hover = false,
  title,
  description,
  badge,
  children,
  footer,
  className = "",
}: {
  theme: WidgetTheme;
  size: WidgetSize;
  hover?: boolean;
  title: string;
  description: string;
  badge: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  const compact = size === "compact";
  const width = compact ? "w-[280px]" : "w-[320px]";
  const height = compact ? "h-[200px]" : "h-[360px]";

  return (
    <section className={`${theme === "dark" ? "dark" : ""} ${width} ${height} shrink-0`}>
      <div className={`relative flex size-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-[0_10px_22px_rgba(0,0,0,0.13)] ${className}`}>
        {hover && (
          <div className="flex h-8 shrink-0 items-center justify-between border-b bg-card px-1.5">
            <GhostIcon><GripHorizontal size={16} strokeWidth={1.5} /></GhostIcon>
            <div className="flex items-center gap-0.5">
              <GhostIcon><RefreshCw size={16} strokeWidth={1.5} /></GhostIcon>
              <GhostIcon><Settings2 size={16} strokeWidth={1.5} /></GhostIcon>
            </div>
          </div>
        )}
        <header className={`${compact ? "px-4 pt-4" : "px-5 pt-5"} flex items-start justify-between gap-3`}>
          <div className="min-w-0">
            <div className="text-[15px] font-semibold leading-5 tracking-normal">{title}</div>
            {!compact && <div className="mt-0.5 text-[13px] leading-5 text-muted-foreground">{description}</div>}
          </div>
          <Pill>{badge}</Pill>
        </header>
        <div className={`${compact ? "px-4 pb-4 pt-3" : "px-5 pb-5 pt-4"} min-h-0 flex-1`}>{children}</div>
        {!compact && footer}
        {hover && <Grip className="absolute bottom-1.5 right-1.5 text-muted-foreground" size={14} strokeWidth={1.5} />}
      </div>
    </section>
  );
}

function CheckboxRow({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex min-h-8 items-center gap-2.5 rounded-md px-1 text-[14px] leading-5">
      <span className={`flex size-4 shrink-0 items-center justify-center rounded-md border ${done ? "border-primary bg-primary text-primary-foreground dark:border-[var(--success)] dark:bg-[var(--success)] dark:text-[var(--primary-foreground)]" : "border-muted-foreground/50 bg-card"}`}>
        {done && <Check size={12} strokeWidth={2} />}
      </span>
      <span className={done ? "text-muted-foreground line-through" : "text-foreground"}>{label}</span>
    </div>
  );
}

function FocusTasks({ theme, size = "full", hover = false }: { theme: WidgetTheme; size?: WidgetSize; hover?: boolean }) {
  const compact = size === "compact";
  return (
    <WidgetShell theme={theme} size={size} hover={hover} title="Focus Tasks" description="3 tasks remaining" badge="Database">
      <div className={`${compact ? "space-y-1" : "space-y-2"}`}>
        {taskRows.slice(0, compact ? 3 : 4).map(([label, done]) => <CheckboxRow key={label} label={label} done={done} />)}
      </div>
      {!compact && (
        <footer className="-mx-5 mt-5 border-t px-5 pt-3">
          <div className="flex justify-between text-[12px] leading-4 text-muted-foreground"><span>Progress</span><span>40%</span></div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted dark:bg-border"><div className="h-full w-2/5 rounded-full bg-primary" /></div>
        </footer>
      )}
    </WidgetShell>
  );
}

function CalendarWidget({ theme, size = "full", hover = false }: { theme: WidgetTheme; size?: WidgetSize; hover?: boolean }) {
  const compact = size === "compact";
  const dates = [29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1];
  const eventDates = [6, 14, 21];
  const events = [["Team standup", "9:00 AM"], ["Design review", "2:00 PM"], ["Sprint planning", "4:30 PM"]];
  return (
    <WidgetShell theme={theme} size={size} hover={hover} title="January 2026" description="3 events today" badge="Calendar" className={compact ? "w-[300px] h-[260px]" : "w-[340px] h-[420px]"}>
      <div className="grid grid-cols-7 text-center text-[12px]">
        {"SMTWTFS".split("").map((day, index) => <span key={`${day}-${index}`} className="mb-1 text-muted-foreground">{day}</span>)}
        {dates.map((date, index) => {
          const muted = index < 3 || index > 33;
          const today = date === 21 && index === 23;
          return <span key={`${date}-${index}`} className="relative mx-auto flex size-8 items-center justify-center rounded-md text-[12px] leading-none">
            <span className={`${today ? "flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground" : muted ? "text-muted-foreground/55" : "text-foreground"}`}>{date}</span>
            {!today && eventDates.includes(date) && index > 3 && <i className={`absolute bottom-0.5 size-1 rounded-full ${date === 6 ? "bg-foreground dark:bg-destructive" : date === 14 ? "bg-foreground dark:bg-[var(--success)]" : "bg-foreground dark:bg-[var(--warning)]"}`} />}
          </span>;
        })}
      </div>
      {!compact && <footer className="-mx-5 mt-3 border-t px-5 pt-3 space-y-2">{events.map(([name, time], index) => <div className="flex items-center gap-2" key={name}><span className={`size-1.5 rounded-full ${index === 0 ? "bg-foreground dark:bg-destructive" : index === 1 ? "bg-muted-foreground dark:bg-[var(--success)]" : "bg-muted-foreground dark:bg-[var(--warning)]"}`} /><span className="flex-1 text-[14px] leading-5">{name}</span><span className="text-[12px] text-muted-foreground">{time}</span></div>)}</footer>}
    </WidgetShell>
  );
}

function RecentPages({ theme, size = "full", hover = false }: { theme: WidgetTheme; size?: WidgetSize; hover?: boolean }) {
  const rows = [["Product roadmap", "2m ago"], ["Meeting notes", "15m ago"], ["Weekly sprint", "1h ago"]];
  return <WidgetShell theme={theme} size={size} hover={hover} title="Recent Pages" description="Jump back into work" badge="Recent" className={size === "compact" ? "h-[180px]" : "h-[300px]"}>
    <div className="space-y-1">{rows.map(([title, time]) => <div key={title} className="flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-secondary"><FileText size={20} strokeWidth={1.5} className="shrink-0 text-muted-foreground" /><div className="min-w-0 flex-1"><div className="truncate text-[14px] leading-5">{title}</div><div className="text-[12px] leading-4 text-muted-foreground">{time}</div></div></div>)}</div>
  </WidgetShell>;
}

function StateCard({ title, children }: { title: string; children: ReactNode }) {
  return <div className="flex flex-col gap-3"><div className="text-center text-[12px] font-medium text-white/80">{title}</div><div className="scale-[0.82] origin-top">{children}</div></div>;
}

function FocusState({ state }: { state: "loading" | "empty" | "offline" | "auth" | "error" }) {
  const content = state === "loading" ? <div className="space-y-3"><div className="h-8 rounded-md bg-muted animate-pulse" /><div className="h-8 rounded-md bg-muted animate-pulse" /><div className="h-8 rounded-md bg-muted animate-pulse" /></div> : state === "empty" ? <div className="pt-7 text-center"><div className="text-[14px] text-muted-foreground">No tasks in this view.</div><TextButton>Open Notion</TextButton></div> : state === "auth" ? <div className="pt-7 text-center"><div className="text-[14px] text-muted-foreground">Your Notion connection has expired.</div><TextButton primary>Reconnect Notion</TextButton></div> : state === "error" ? <div className="pt-7 text-center"><div className="text-[14px] text-muted-foreground">We couldn’t sync your tasks.</div><TextButton>Retry</TextButton></div> : <><div className="space-y-2 opacity-55">{taskRows.map(([label, done]) => <CheckboxRow key={label} label={label} done={done} />)}</div><div className="absolute inset-x-0 bottom-0 border-t bg-card px-5 py-2 text-[12px] text-muted-foreground">Showing cached · 2h ago</div></>;
  return <WidgetShell theme="light" size="full" title="Focus Tasks" description="3 tasks remaining" badge="Database">{content}</WidgetShell>;
}

function Artboard({ title, children }: { title: string; children: ReactNode }) {
  return <section className="relative overflow-hidden border-y border-white/20 bg-zinc-950 py-9"><div className="absolute inset-0 opacity-55">
      {/* ImageWithFallback is not present in this template; imported wallpaper is rendered directly as the required desktop backdrop. */}
      <img src={wallpaper} alt="Mountain desktop wallpaper" className="size-full object-cover" />
    </div><div className="relative mx-auto max-w-[1480px] px-6"><div className="mb-6 flex items-center gap-3"><span className="rounded-md bg-black/45 px-2.5 py-1 text-[12px] font-medium text-white/90 ring-1 ring-white/15">Desktop widgets</span><span className="text-[13px] text-white/70">{title}</span></div>{children}</div></section>;
}

export default function App() {
  return <main className="min-h-screen overflow-x-hidden bg-zinc-950 font-[Inter]">
    {/* MARKER-MAKE-KIT-INVOKED */}
    {/* MARKER-MAKE-KIT-TOKENS-READ */}
    {/* MARKER-MAKE-KIT-ATTACHMENTS-READ */}
    {/* MARKER-MAKE-KIT-FINAL-CHECK-READ */}
    <div className="border-b border-white/15 bg-zinc-950 px-6 py-6 text-white"><div className="mx-auto max-w-[1480px]"><div className="text-[20px] font-semibold tracking-[-0.01em]">Notion desktop widgets</div><div className="mt-1 text-[13px] text-zinc-400">Frameless, opaque windows designed to live directly on the desktop.</div></div></div>
    <Artboard title="Focus Tasks · full, compact, and hover states · light and dark">
      <div className="grid gap-8 xl:grid-cols-2"><div><div className="mb-3 text-[12px] font-medium text-white/75">Light theme</div><div className="flex flex-wrap items-start gap-6"><FocusTasks theme="light" /><FocusTasks theme="light" size="compact" /><FocusTasks theme="light" hover /></div></div><div><div className="mb-3 text-[12px] font-medium text-white/75">Dark theme</div><div className="flex flex-wrap items-start gap-6"><FocusTasks theme="dark" /><FocusTasks theme="dark" size="compact" /><FocusTasks theme="dark" hover /></div></div></div>
    </Artboard>
    <Artboard title="Calendar · full, compact, and hover states · light and dark">
      <div className="grid gap-8 xl:grid-cols-2"><div><div className="mb-3 text-[12px] font-medium text-white/75">Light theme</div><div className="flex flex-wrap items-start gap-6"><CalendarWidget theme="light" /><CalendarWidget theme="light" size="compact" /><CalendarWidget theme="light" hover /></div></div><div><div className="mb-3 text-[12px] font-medium text-white/75">Dark theme</div><div className="flex flex-wrap items-start gap-6"><CalendarWidget theme="dark" /><CalendarWidget theme="dark" size="compact" /><CalendarWidget theme="dark" hover /></div></div></div>
    </Artboard>
    <Artboard title="Recent Pages · full, compact, and hover states · light and dark">
      <div className="grid gap-8 xl:grid-cols-2"><div><div className="mb-3 text-[12px] font-medium text-white/75">Light theme</div><div className="flex flex-wrap items-start gap-6"><RecentPages theme="light" /><RecentPages theme="light" size="compact" /><RecentPages theme="light" hover /></div></div><div><div className="mb-3 text-[12px] font-medium text-white/75">Dark theme</div><div className="flex flex-wrap items-start gap-6"><RecentPages theme="dark" /><RecentPages theme="dark" size="compact" /><RecentPages theme="dark" hover /></div></div></div>
    </Artboard>
    <Artboard title="Focus Tasks · system states">
      <div className="flex flex-wrap justify-center gap-x-1 gap-y-0"><StateCard title="Loading"><FocusState state="loading" /></StateCard><StateCard title="Empty"><FocusState state="empty" /></StateCard><StateCard title="Offline"><FocusState state="offline" /></StateCard><StateCard title="Auth expired"><FocusState state="auth" /></StateCard><StateCard title="Sync error"><FocusState state="error" /></StateCard></div>
    </Artboard>
  </main>;
}
