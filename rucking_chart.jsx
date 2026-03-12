import { useState } from "react";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Legend, Area, Scatter
} from "recharts";

const raw = [
  { date: "2025-02-16", type: "Rucking",  season: "冬", time: "夜", weight: 23, distance: 3.20,  climb: null, pace: 7.30,  note: "河濱/便宜背包/訓練鞋" },
  { date: "2025-07-06", type: "Rucking",  season: "夏", time: "日", weight: 16, distance: 10.00, climb: null, pace: 7.42,  note: "河濱/便宜背包/中筒越野跑鞋" },
  { date: "2025-07-09", type: "Running",  season: "夏", time: "夜", weight: 4,  distance: 6.25,  climb: null, pace: 5.55,  note: "河濱/刻意跑跑停停/戰術背心/碳版跑鞋" },
  { date: "2025-07-13", type: "Walking",  season: "夏", time: "日", weight: 6,  distance: 13.15, climb: null, pace: 8.26,  note: "市區/河濱/休閒服/休閒背包/訓練鞋" },
  { date: "2025-07-16", type: "Rucking",  season: "夏", time: "夜", weight: 29, distance: 8.34,  climb: null, pace: 10.40, note: "河濱/老舊登山背包/便宜短桶靴" },
  { date: "2025-07-19", type: "Running",  season: "夏", time: "夜", weight: 6,  distance: 4.96,  climb: null, pace: 6.33,  note: "河濱/戰術背心/碳板跑鞋" },
  { date: "2025-07-21", type: "Running",  season: "夏", time: "夜", weight: 2,  distance: 4.07,  climb: null, pace: 5.50,  note: "河濱/戰術背心/碳板跑鞋" },
  { date: "2025-07-22", type: "Hiking",   season: "夏", time: "日", weight: 16, distance: 1.60,  climb: 118,  pace: 13.21, note: "山路/戰術背包/便宜短筒靴 (118m爬升)" },
  { date: "2025-07-22", type: "Hiking",   season: "夏", time: "日", weight: 16, distance: 1.20,  climb: 168,  pace: 20.40, note: "山路/戰術背包/便宜短筒靴 (168m爬升)" },
  { date: "2025-07-24", type: "Rucking",  season: "夏", time: "夜", weight: 16, distance: 7.53,  climb: null, pace: 9.33,  note: "大雨/河濱/戰術背包/便宜短筒靴" },
  { date: "2025-07-25", type: "Running",  season: "夏", time: "夜", weight: 2,  distance: 3.62,  climb: null, pace: 5.35,  note: "大雨/河濱/戰術背心/爛跑鞋" },
  { date: "2025-07-27", type: "Hiking",   season: "夏", time: "日", weight: 2,  distance: 4.32,  climb: 243,  pace: 11.37, note: "山路/戰術背心/越野跑鞋 (243m爬升)" },
  { date: "2025-07-29", type: "Hiking",   season: "夏", time: "日", weight: 4,  distance: 1.90,  climb: 195,  pace: 15.05, note: "山徑/戰術背心 (195m爬升)" },
  { date: "2025-07-30", type: "Hiking",   season: "夏", time: "日", weight: 4,  distance: 3.57,  climb: 237,  pace: 13.43, note: "山徑/戰術背心 (237m爬升)" },
  { date: "2025-07-31", type: "Rucking",  season: "夏", time: "日", weight: 21, distance: 8.65,  climb: 122,  pace: 11.35, note: "山路/戰術背心/戰術背包/氣溫35" },
  { date: "2025-12-28", type: "Rucking",  season: "冬", time: "日", weight: 57, distance: 3.14,  climb: 23,   pace: 10.53, note: "河濱/陰雨/電腦包/長褲/短筒靴" },
  { date: "2026-02-14", type: "Rucking",  season: "冬", time: "日", weight: 20, distance: 3.14,  climb: 11,   pace: 9.51,  note: "河濱/跑鞋/晴/單手提10kg*2" },
  { date: "2026-02-15", type: "Rucking",  season: "冬", time: "日", weight: 32, distance: 3.14,  climb: 16,   pace: 9.54,  note: "河濱/跑鞋/背20/手提8+4kg" },
  { date: "2026-02-16", type: "Rucking",  season: "冬", time: "日", weight: 22, distance: 3.03,  climb: 17,   pace: 10.40, note: "河濱/跑鞋/鐵棍掛10+10kg（扁擔）" },
  { date: "2026-02-17", type: "Rucking",  season: "冬", time: "日", weight: 38, distance: 3.00,  climb: 8,    pace: 9.45,  note: "河濱/單爛包/便鞋" },
  { date: "2026-02-24", type: "Rucking",  season: "春", time: "夜", weight: 5,  distance: 3.00,  climb: 3,    pace: 6.07,  note: "河濱/戰術背心/爛跑鞋/超快走" },
  { date: "2026-03-04", type: "Rucking",  season: "春", time: "夜", weight: 50, distance: 0.25,  climb: 94,   pace: 37.13, note: "烘爐地階梯/下雨/前21後29kg" },
];

const TYPE_COLORS = {
  Rucking: "#58a6ff",
  Hiking:  "#3fb950",
  Running: "#f78166",
  Walking: "#d2a8ff",
};

const TYPE_BG = {
  Rucking: "rgba(88,166,255,0.15)",
  Hiking:  "rgba(63,185,80,0.15)",
  Running: "rgba(247,129,102,0.15)",
  Walking: "rgba(210,168,255,0.15)",
};

const data = raw.map((d, i) => ({
  ...d,
  idx: i + 1,
  shortDate: d.date.slice(5).replace("-", "/"),
  color: TYPE_COLORS[d.type],
}));

const avgWeight = (data.reduce((s, d) => s + d.weight, 0) / data.length).toFixed(1);
const totalKm = data.reduce((s, d) => s + d.distance, 0).toFixed(1);
const maxWeight = Math.max(...data.map(d => d.weight));

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  const color = TYPE_COLORS[payload.type];
  return (
    <circle cx={cx} cy={cy} r={5} fill={color} stroke="#0d1117" strokeWidth={2} />
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div style={{
      background: "#161b22", border: `1px solid ${TYPE_COLORS[d.type]}`,
      borderRadius: 8, padding: "12px 16px",
      fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
      color: "#e6edf3", maxWidth: 260,
      boxShadow: `0 4px 24px ${TYPE_COLORS[d.type]}33`
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{
          background: TYPE_COLORS[d.type], color: "#0d1117",
          borderRadius: 4, padding: "1px 6px", fontSize: 10, fontWeight: 700
        }}>{d.type}</span>
        <span style={{ color: "#8b949e" }}>{d.date} {d.time}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", marginBottom: 8 }}>
        <div><span style={{ color: "#8b949e" }}>負重 </span><span style={{ color: TYPE_COLORS[d.type], fontWeight: 700 }}>{d.weight} kg</span></div>
        <div><span style={{ color: "#8b949e" }}>距離 </span><span style={{ color: "#e6edf3" }}>{d.distance} km</span></div>
        <div><span style={{ color: "#8b949e" }}>均速 </span><span style={{ color: "#e6edf3" }}>{d.pace} min/km</span></div>
        {d.climb && <div><span style={{ color: "#8b949e" }}>爬升 </span><span style={{ color: "#e6edf3" }}>{d.climb} m</span></div>}
      </div>
      <div style={{ color: "#8b949e", fontSize: 11, borderTop: "1px solid #21262d", paddingTop: 8 }}>{d.note}</div>
    </div>
  );
};

const CustomBar = (props) => {
  const { x, y, width, height, payload } = props;
  const color = TYPE_COLORS[payload.type];
  return <rect x={x} y={y} width={width} height={height} fill={color} rx={3} opacity={0.85} />;
};

export default function AllTrainingChart() {
  const [activeType, setActiveType] = useState(null);

  const filteredData = activeType ? data.filter(d => d.type === activeType) : data;

  const typeCounts = Object.entries(
    data.reduce((acc, d) => { acc[d.type] = (acc[d.type] || 0) + 1; return acc; }, {})
  );

  return (
    <div style={{
      background: "#0d1117", minHeight: "100vh",
      padding: "36px 28px",
      fontFamily: "'JetBrains Mono', monospace",
      color: "#e6edf3",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: "#8b949e", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", marginBottom: 6 }}>
          完整訓練日誌分析
        </div>
        <h1 style={{
          fontSize: 28, fontWeight: 800, margin: 0,
          background: "linear-gradient(90deg, #58a6ff 0%, #3fb950 50%, #f78166 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>
          負重進展總覽
        </h1>
        <div style={{ color: "#8b949e", fontSize: 11, marginTop: 4 }}>
          2025.02.16 ─ 2026.03.04 &nbsp;｜&nbsp; 22 筆訓練記錄
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
        {[
          { label: "最高負重", value: `${maxWeight} kg`, color: "#ff7b72" },
          { label: "平均負重", value: `${avgWeight} kg`, color: "#58a6ff" },
          { label: "總距離", value: `${totalKm} km`, color: "#3fb950" },
          { label: "訓練次數", value: "22 次", color: "#d2a8ff" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#161b22", border: "1px solid #21262d",
            borderRadius: 8, padding: "14px 20px", flex: "1 1 110px"
          }}>
            <div style={{ color: "#8b949e", fontSize: 9, letterSpacing: 2, marginBottom: 4 }}>{s.label}</div>
            <div style={{ color: s.color, fontSize: 22, fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Type filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <button onClick={() => setActiveType(null)} style={{
          background: activeType === null ? "#e6edf3" : "#21262d",
          color: activeType === null ? "#0d1117" : "#8b949e",
          border: "none", borderRadius: 20, padding: "5px 14px",
          fontFamily: "inherit", fontSize: 11, cursor: "pointer", fontWeight: 700
        }}>全部</button>
        {typeCounts.map(([type, count]) => (
          <button key={type} onClick={() => setActiveType(activeType === type ? null : type)} style={{
            background: activeType === type ? TYPE_COLORS[type] : TYPE_BG[type],
            color: activeType === type ? "#0d1117" : TYPE_COLORS[type],
            border: `1px solid ${TYPE_COLORS[type]}`,
            borderRadius: 20, padding: "5px 14px",
            fontFamily: "inherit", fontSize: 11, cursor: "pointer", fontWeight: 700
          }}>
            {type} ({count})
          </button>
        ))}
      </div>

      {/* Main chart - weight bars */}
      <div style={{
        background: "#161b22", border: "1px solid #21262d",
        borderRadius: 12, padding: "20px 12px 12px", marginBottom: 20
      }}>
        <div style={{ color: "#8b949e", fontSize: 10, letterSpacing: 3, marginBottom: 16, paddingLeft: 8 }}>
          各次訓練負重 (KG)
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={filteredData} margin={{ top: 8, right: 16, left: 0, bottom: 40 }}>
            <CartesianGrid stroke="#21262d" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="shortDate"
              tick={{ fill: "#8b949e", fontSize: 9 }}
              axisLine={{ stroke: "#21262d" }}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              domain={[0, 65]}
              tick={{ fill: "#8b949e", fontSize: 10 }}
              axisLine={false} tickLine={false}
              tickFormatter={v => `${v}kg`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <ReferenceLine y={parseFloat(avgWeight)} stroke="#8b949e" strokeDasharray="4 4" strokeOpacity={0.5}
              label={{ value: `平均 ${avgWeight}kg`, fill: "#8b949e", fontSize: 9, position: "insideTopRight" }} />
            <Bar dataKey="weight" shape={<CustomBar />} name="負重" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Distance chart */}
      <div style={{
        background: "#161b22", border: "1px solid #21262d",
        borderRadius: 12, padding: "20px 12px 12px", marginBottom: 20
      }}>
        <div style={{ color: "#8b949e", fontSize: 10, letterSpacing: 3, marginBottom: 16, paddingLeft: 8 }}>
          各次訓練距離 (KM)
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={filteredData} margin={{ top: 8, right: 16, left: 0, bottom: 40 }}>
            <CartesianGrid stroke="#21262d" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="shortDate"
              tick={{ fill: "#8b949e", fontSize: 9 }}
              axisLine={{ stroke: "#21262d" }}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis
              tick={{ fill: "#8b949e", fontSize: 10 }}
              axisLine={false} tickLine={false}
              tickFormatter={v => `${v}km`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="distance" shape={<CustomBar />} name="距離" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Weight vs Pace scatter-like line */}
      <div style={{
        background: "#161b22", border: "1px solid #21262d",
        borderRadius: 12, padding: "20px 12px 12px", marginBottom: 20
      }}>
        <div style={{ color: "#8b949e", fontSize: 10, letterSpacing: 3, marginBottom: 16, paddingLeft: 8 }}>
          負重 vs 均速對比 (min/km，不含烘爐地離群值)
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart
            data={filteredData.filter(d => d.pace < 30)}
            margin={{ top: 8, right: 40, left: 0, bottom: 40 }}
          >
            <CartesianGrid stroke="#21262d" strokeDasharray="3 3" />
            <XAxis
              dataKey="shortDate"
              tick={{ fill: "#8b949e", fontSize: 9 }}
              axisLine={{ stroke: "#21262d" }}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis yAxisId="w" domain={[0, 65]}
              tick={{ fill: "#58a6ff", fontSize: 9 }} axisLine={false} tickLine={false}
              tickFormatter={v => `${v}kg`}
            />
            <YAxis yAxisId="p" orientation="right" domain={[0, 25]}
              tick={{ fill: "#f78166", fontSize: 9 }} axisLine={false} tickLine={false}
              tickFormatter={v => `${v}'`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar yAxisId="w" dataKey="weight" shape={<CustomBar />} name="負重" opacity={0.6} />
            <Line yAxisId="p" type="monotone" dataKey="pace"
              stroke="#f78166" strokeWidth={2}
              dot={<CustomDot />}
              name="均速"
            />
          </ComposedChart>
        </ResponsiveContainer>
        <div style={{ color: "#8b949e", fontSize: 9, paddingLeft: 8, marginTop: 4 }}>
          ＊ 橘線為均速（min/km）；烘爐地 3/04 均速 37.1 已排除以利圖表可讀性
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
            <span style={{ color: "#8b949e", fontSize: 11 }}>{type}</span>
          </div>
        ))}
      </div>

      <div style={{ color: "#30363d", fontSize: 9, textAlign: "right", marginTop: 20 }}>
        資料來源：Rucking 訓練日誌 via Sport10
      </div>
    </div>
  );
}
