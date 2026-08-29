// Original, abstract preview art for each project type. Built with plain
// divs/CSS (no external images) so every project has a distinct, premium
// preview even before real screenshots are added.

function Bar({ w = "60%", h = "8px", className = "" }) {
  return (
    <div
      className={`rounded-full bg-ink/10 ${className}`}
      style={{ width: w, height: h }}
    />
  );
}

function PhoneMockup() {
  return (
    <div className="h-full w-full flex items-center justify-center py-6">
      <div className="w-[62%] max-w-[190px] aspect-[9/18] rounded-[26px] border border-white/10 bg-surface-2 p-2 shadow-2xl">
        <div className="h-full w-full rounded-[18px] bg-bg overflow-hidden relative">
          <div className="h-8 flex items-center justify-between px-3">
            <Bar w="30%" h="5px" />
            <div className="w-2 h-2 rounded-full bg-orange/70" />
          </div>
          <div className="px-3 space-y-2">
            <Bar w="70%" h="10px" />
            <Bar w="45%" h="7px" className="bg-white/5" />
          </div>
          <div className="px-3 mt-4 grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-surface border border-white/5 flex items-center justify-center"
              >
                <div className="w-5 h-5 rounded-md bg-orange/25" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-3 right-3 h-9 rounded-full bg-surface border border-white/5 flex items-center justify-around">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-orange" : "bg-white/15"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopMockup() {
  return (
    <div className="h-full w-full flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-surface-2 overflow-hidden shadow-2xl">
        <div className="h-7 bg-surface flex items-center gap-1.5 px-3 border-b border-white/5">
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
          ))}
        </div>
        <div className="p-4 grid grid-cols-[1fr_2fr] gap-3">
          <div className="space-y-2">
            <Bar w="80%" h="7px" />
            <Bar w="60%" h="7px" className="bg-white/5" />
            <Bar w="70%" h="7px" className="bg-white/5" />
            <Bar w="50%" h="7px" className="bg-white/5" />
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-lg bg-orange/10 border border-orange/20" />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-10 rounded-md bg-surface border border-white/5" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="h-full w-full flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-surface-2 p-4 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <Bar w="35%" h="9px" />
          <div className="flex gap-1.5">
            <div className="w-6 h-6 rounded-full bg-orange/20" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-surface border border-white/5 p-2.5">
              <Bar w="60%" h="5px" className="bg-white/10 mb-2" />
              <Bar w="40%" h="10px" className={i === 0 ? "bg-orange/40" : "bg-white/15"} />
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-surface border border-white/5 p-3 h-24 flex items-end gap-1.5">
          {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: i === 5 ? "#FF7A33" : "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WebMockup() {
  return (
    <div className="h-full w-full flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-surface-2 overflow-hidden shadow-2xl">
        <div className="h-7 bg-surface flex items-center px-3 border-b border-white/5">
          <div className="w-full max-w-[140px] h-3.5 rounded-full bg-white/5" />
        </div>
        <div className="p-4 space-y-3">
          <Bar w="55%" h="12px" />
          <Bar w="80%" h="7px" className="bg-white/5" />
          <div className="grid grid-cols-3 gap-2 pt-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-surface border border-white/5 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-orange/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="h-full w-full flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xs rounded-xl border border-white/10 bg-surface-2 overflow-hidden shadow-2xl">
        <div className="h-10 bg-surface border-b border-white/5 flex items-center gap-2 px-3">
          <div className="w-5 h-5 rounded-full bg-orange/30" />
          <Bar w="35%" h="6px" />
        </div>
        <div className="p-3 space-y-2">
          <div className="max-w-[70%] rounded-2xl rounded-bl-sm bg-surface border border-white/5 px-3 py-2">
            <Bar w="90px" h="6px" />
          </div>
          <div className="max-w-[70%] ml-auto rounded-2xl rounded-br-sm bg-orange/20 border border-orange/20 px-3 py-2">
            <Bar w="60px" h="6px" className="bg-white/20" />
          </div>
          <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-surface border border-white/5 px-3 py-2">
            <Bar w="110px" h="6px" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GameMockup() {
  return (
    <div className="h-full w-full flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[220px] aspect-square rounded-xl border border-white/10 bg-surface-2 p-3 shadow-2xl">
        <div className="grid grid-cols-6 grid-rows-6 gap-1 h-full w-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-[3px] ${
                i === 14 || i === 15 || i === 16
                  ? "bg-orange"
                  : i === 22
                  ? "bg-white/40"
                  : "bg-surface"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const mockups = {
  phone: PhoneMockup,
  desktop: DesktopMockup,
  dashboard: DashboardMockup,
  web: WebMockup,
  chat: ChatMockup,
  game: GameMockup,
};

export default function ProjectMockup({ type }) {
  const Mockup = mockups[type] || DashboardMockup;
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-surface to-bg-soft overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange/10 blur-3xl"
      />
      <Mockup />
    </div>
  );
}
