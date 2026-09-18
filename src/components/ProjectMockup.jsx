import { useState } from "react";

// Project 03: Vegetable Market Management System (Product Management, Inventory & Sales)
function VegetableMarketDashboard() {
  return (
    <div className="w-full h-full bg-[#0E1310] text-[#E2E8F0] p-4 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden font-sans">
      {/* Subtle ambient accent */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-emerald-500/15 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs font-semibold tracking-wider text-emerald-400 uppercase">
            Vegetable Market POS &amp; Inventory
          </span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400/70 bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
          Live Market Inflow
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-2.5 my-3">
        {[
          { label: "Daily Inflow", val: "1,420 kg", tag: "+12%" },
          { label: "Vegetable Varieties", val: "28 Types", tag: "In Stock" },
          { label: "Sales Batches", val: "164 Orders", tag: "Completed" },
          { label: "Stock Turnover", val: "94.2%", tag: "Fast" },
        ].map((m) => (
          <div key={m.label} className="bg-[#141C17] border border-emerald-500/10 rounded-xl p-2.5">
            <p className="text-[10px] font-mono text-gray-400 uppercase truncate">{m.label}</p>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{m.val}</p>
            <span className="text-[9px] font-mono text-emerald-400">{m.tag}</span>
          </div>
        ))}
      </div>

      {/* Product Table / Inventory Status */}
      <div className="bg-[#141C17]/80 border border-emerald-500/10 rounded-xl p-3 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-5 text-[10px] font-mono text-gray-400 uppercase border-b border-emerald-500/10 pb-1.5 mb-2">
          <span className="col-span-2">Vegetable Product</span>
          <span>Stock Status</span>
          <span>Market Rate</span>
          <span className="text-right">Inventory (Kg)</span>
        </div>
        <div className="space-y-1.5 text-xs">
          {[
            { name: "Tomato (Country Grade A)", stock: "Ample", rate: "₹38 / kg", kg: "380 kg" },
            { name: "Red Onion (Nashik Batch)", stock: "Normal", rate: "₹45 / kg", kg: "520 kg" },
            { name: "Potato (Cold Storage)", stock: "High", rate: "₹32 / kg", kg: "640 kg" },
            { name: "Carrot (Ooty Fresh)", stock: "Selling Fast", rate: "₹65 / kg", kg: "210 kg" },
          ].map((item) => (
            <div key={item.name} className="grid grid-cols-5 items-center text-[11px] text-gray-300">
              <span className="col-span-2 font-medium text-white truncate">{item.name}</span>
              <span className="font-mono text-[10px] text-emerald-400">{item.stock}</span>
              <span className="font-mono text-gray-300">{item.rate}</span>
              <span className="font-mono text-right text-gray-300">{item.kg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Project 04: Smart Crop Recommendation System (Soil Analysis & ML Prediction)
function CropRecommendationDashboard() {
  return (
    <div className="w-full h-full bg-[#10141A] text-[#E2E8F0] p-4 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden font-sans">
      {/* Ambient glow */}
      <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-cyan-500/15 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-cyan-400" />
          <span className="font-mono text-xs font-semibold tracking-wider text-cyan-300 uppercase">
            Soil &amp; Environmental ML Model
          </span>
        </div>
        <span className="font-mono text-[10px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
          Scikit-Learn Classifier
        </span>
      </div>

      {/* Soil Parameter Gauges */}
      <div className="grid grid-cols-5 gap-2 my-3">
        {[
          { label: "Nitrogen (N)", val: "90 mg/kg", fill: "80%" },
          { label: "Phosphorus (P)", val: "42 mg/kg", fill: "55%" },
          { label: "Potassium (K)", val: "43 mg/kg", fill: "58%" },
          { label: "Soil pH", val: "6.5 pH", fill: "65%" },
          { label: "Rainfall", val: "202 mm", fill: "75%" },
        ].map((p) => (
          <div key={p.label} className="bg-[#171E27] border border-cyan-500/10 rounded-xl p-2.5">
            <p className="text-[10px] font-mono text-gray-400 truncate">{p.label}</p>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{p.val}</p>
            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: p.fill }} />
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation Output Banner */}
      <div className="bg-[#171E27]/90 border border-cyan-500/20 rounded-xl p-3 sm:p-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
            Optimal ML Recommendation
          </span>
          <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
            Rice (Oryza Sativa)
          </h4>
          <p className="text-[11px] text-gray-400 mt-0.5">
            High rainfall and nitrogen level match prime tropical wetland conditions.
          </p>
        </div>
        <div className="text-right">
          <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg inline-block">
            99.4% Match
          </span>
        </div>
      </div>
    </div>
  );
}

// Project 09: WhatsApp Agent (Messaging Automation & Meta API)
function WhatsAppAgentDashboard() {
  return (
    <div className="w-full h-full bg-[#0C1512] text-[#E2E8F0] p-4 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden font-sans">
      {/* Ambient glow */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#25D366]/10 blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#25D366]/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[#25D366]" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[#25D366] uppercase">
            WhatsApp Automation Engine
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/25 px-2.5 py-0.5 rounded-full">
          Cloud API Connected
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-2.5 my-3">
        {[
          { label: "Messages Dispatched", val: "1,240", sub: "Today" },
          { label: "Delivery Rate", val: "99.8%", sub: "Confirmed" },
          { label: "Webhook Latency", val: "142 ms", sub: "Real-time" },
          { label: "Queue Status", val: "Idle", sub: "0 Pending" },
        ].map((m) => (
          <div key={m.label} className="bg-[#12221D] border border-[#25D366]/10 rounded-xl p-2.5">
            <p className="text-[10px] font-mono text-gray-400 truncate">{m.label}</p>
            <p className="text-xs sm:text-sm font-bold text-white mt-0.5">{m.val}</p>
            <span className="text-[9px] font-mono text-[#25D366]">{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Message Trigger Simulation */}
      <div className="bg-[#12221D]/80 border border-[#25D366]/15 rounded-xl p-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">
            Automated Trigger Pipeline
          </span>
        </div>
        <div className="flex items-center justify-between bg-black/40 border border-white/5 rounded-lg p-2 text-xs font-mono">
          <span className="text-gray-300">Incoming Event: [Order Confirmation]</span>
          <span className="text-[#25D366]">→ Trigger Auto-Reply Broadcast</span>
          <span className="text-emerald-400">200 OK</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectMockup({ type, image, title, altText }) {
  const [imgErr, setImgErr] = useState(false);
  const isPhone = type === "phone" || type === "game";
  const meaningfulAlt = altText || `${title} project interface showcase`;

  // If project has no real screenshot image, render its genuine dedicated agency dashboard
  if (!image || imgErr) {
    if (title?.includes("Vegetable")) {
      return <VegetableMarketDashboard />;
    }
    if (title?.includes("Crop")) {
      return <CropRecommendationDashboard />;
    }
    if (title?.includes("WhatsApp")) {
      return <WhatsAppAgentDashboard />;
    }
    return <VegetableMarketDashboard />;
  }

  // Portrait Mobile & Game Screenshots (StudyMate, Cobra, Ludo, LifeMate)
  // Presented in agency landscape canvas: ambient blurred backdrop + sharp centered phone device frame
  if (isPhone) {
    return (
      <div className="relative w-full h-full bg-[#0A0908] overflow-hidden flex items-center justify-center select-none">
        {/* Ambient blurred backdrop from the actual screenshot */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110 pointer-events-none"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Soft dark vignette */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

        {/* Phone Device Frame */}
        <div className="relative h-[92%] aspect-[9/18.5] rounded-[22px] border border-white/20 bg-black/90 p-1.5 shadow-2xl flex items-center justify-center transition-transform duration-500 group-hover/img:scale-[1.03]">
          <img
            src={image}
            alt={meaningfulAlt}
            loading="lazy"
            decoding="async"
            onError={() => setImgErr(true)}
            className="w-full h-full object-contain rounded-[16px]"
          />
        </div>
      </div>
    );
  }

  // Landscape Web & Desktop Screenshots (ShareBite, Accident Detection, AVR Stationery POS)
  // Displayed full-width with object-cover inside the 16:9 agency card
  return (
    <div className="relative w-full h-full bg-[#0E0D0C] overflow-hidden flex items-center justify-center select-none">
      <img
        src={image}
        alt={meaningfulAlt}
        loading="lazy"
        decoding="async"
        onError={() => setImgErr(true)}
        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/img:scale-[1.03]"
      />
    </div>
  );
}
