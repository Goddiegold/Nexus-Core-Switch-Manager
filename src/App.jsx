import React, { useState } from "react";
import { CREDENTIALS, LEVELS, STORAGE_KEY, loadValues } from "./data.js";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (username.trim() !== CREDENTIALS.username || password !== CREDENTIALS.password) {
      setError("Invalid username or password.");
      return;
    }
    setError("");
    onLogin();
  }

  return (
    <section className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl" noValidate>
        <h1 className="text-xl font-semibold text-white mb-1">Nexus Core Switch Manager</h1>
        <p className="text-sm text-slate-400 mb-6">Sign in to the network console</p>
        <label htmlFor="username" className="block text-xs font-medium text-slate-300 mb-1">Username</label>
        <input id="username" value={username} onChange={event => setUsername(event.target.value)} type="text" autoComplete="username" className="w-full mb-4 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-sky-300 mono focus:outline-none focus:border-sky-500" />
        <label htmlFor="password" className="block text-xs font-medium text-slate-300 mb-1">Password</label>
        <input id="password" value={password} onChange={event => setPassword(event.target.value)} type="password" autoComplete="current-password" className="w-full mb-2 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-sky-300 mono focus:outline-none focus:border-sky-500" />
        <p role="alert" className="text-xs text-rose-400 min-h-[1rem] mb-4">{error}</p>
        <button id="login-submit" type="submit" className="w-full px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium rounded-xl">Sign In to Console</button>
      </form>
    </section>
  );
}

function Breadcrumbs({ currentLevel, onSelect }) {
  return (
    <nav aria-label="Hierarchy" className="bg-slate-900/60 border-b border-slate-800 px-6 py-2 flex items-center gap-2 text-xs">
      <span className="text-slate-500 uppercase tracking-wider mono">Hierarchy:</span>
      {LEVELS.map((node, index) => (
        <React.Fragment key={node.level}>
          {index > 0 && <span className="text-slate-600">/</span>}
          <button id={`hierarchy-level-${node.level}`} type="button" onClick={() => onSelect(node.level)} className={node.level === currentLevel ? "text-sky-400 font-semibold border border-sky-400 rounded px-1 py-0.5 shadow-[0_0_0_1px_rgba(56,189,248,0.2)]" : "text-slate-400 hover:text-slate-200"} aria-current={node.level === currentLevel ? "page" : undefined}>{node.crumb}</button>
        </React.Fragment>
      ))}
    </nav>
  );
}

function FieldControl({ field, value, editMode, onChange }) {
  const inputClass = "w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs mono text-sky-300 focus:outline-none focus:border-sky-500 disabled:text-slate-500";
  if (field.type === "select") return <select id={field.key} className={inputClass} value={value} disabled={!editMode} onChange={event => onChange(event.target.value)}>{field.options.map(option => <option key={option} value={option}>{option}</option>)}</select>;
  if (field.type === "toggle") return <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl px-3 py-2"><span className="text-xs mono text-slate-400">{value ? "ENABLED" : "DISABLED"}</span><button id={field.key} type="button" role="switch" aria-labelledby={`${field.key}-label`} aria-checked={value} disabled={!editMode} onClick={() => onChange(!value)} className={value ? "bg-emerald-500" : "bg-slate-700"} /></div>;
  return <input id={field.key} className={inputClass} type={field.type} value={value} disabled={!editMode} onChange={event => onChange(field.type === "number" ? Number(event.target.value) : event.target.value)} />;
}

function ParameterCard({ field, value, editMode, onChange }) {
  return <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5"><div className="flex items-start justify-between mb-1"><label id={`${field.key}-label`} htmlFor={field.key} className="text-sm font-semibold text-white">{field.label}</label><span className="text-[10px] mono text-amber-400 uppercase">{editMode ? "Editable" : "Locked"}</span></div><p className="text-xs text-slate-400 mb-4">{field.help}</p><FieldControl field={field} value={value} editMode={editMode} onChange={onChange} /></div>;
}

function Console({ onLogout }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [editMode, setEditMode] = useState(true);
  const [guideOpen, setGuideOpen] = useState(false);
  const [values, setValues] = useState(loadValues);
  const [syncStatus, setSyncStatus] = useState("READY TO APPLY");
  const [saved, setSaved] = useState(false);
  const node = LEVELS[currentLevel - 1];
  const next = LEVELS[currentLevel];
  const updateValue = (key, value) => setValues(previous => ({ ...previous, [key]: value }));
  const save = () => { localStorage.setItem(STORAGE_KEY, JSON.stringify(values)); setSyncStatus("SYNCED"); setSaved(true); setTimeout(() => setSaved(false), 6000); };

  return <div className="min-h-screen flex flex-col">
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between"><div><h1 className="text-base font-semibold text-white">Nexus Core Switch Manager</h1><p className="text-xs text-slate-400 mono">Cluster: VX-9000-PRIMARY | Node 01</p></div><div className="flex items-center gap-4"><div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5"><span className={`px-2 py-0.5 rounded text-xs font-semibold ${editMode ? "bg-amber-500/20 text-amber-300" : "bg-slate-800 text-slate-400"}`}>{editMode ? "EDITING UNLOCKED" : "READ ONLY"}</span><button id="editModeSwitch" type="button" role="switch" aria-labelledby="editModeLabel" aria-checked={editMode} onClick={() => setEditMode(value => !value)} className={editMode ? "bg-amber-500" : "bg-slate-700"} /><span id="editModeLabel" className="text-xs font-medium text-slate-300">Edit Mode</span></div><button id="open-test-guide" type="button" onClick={() => setGuideOpen(true)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium rounded-xl">Test Guide</button><button id="logoutButton" type="button" onClick={onLogout} className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-medium rounded-xl">Logout</button></div></header>
    <Breadcrumbs currentLevel={currentLevel} onSelect={setCurrentLevel} />
    <main className="flex-1 px-6 py-6"><section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6"><span className="inline-block px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-xs font-semibold mono mb-2">LEVEL {currentLevel} OF {LEVELS.length}</span><h2 className="text-2xl font-semibold text-white">{node.title}</h2><p className="text-sm text-slate-400 mt-1">{node.description}</p></section><h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Level Editable Parameters</h3><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">{node.fields.map(field => <ParameterCard key={field.key} field={field} value={values[field.key]} editMode={editMode} onChange={value => updateValue(field.key, value)} />)}</div><section><h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Drill-Down Sub-Node</h3>{next ? <button id={`drill-down-level-${next.level}`} type="button" onClick={() => setCurrentLevel(next.level)} className="w-full max-w-xl text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-5"><span className="inline-block px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] mono uppercase mb-2">Advance to Level {next.level}</span><h4 className="text-sm font-bold text-white">{next.title}</h4><p className="text-xs text-slate-400 mt-1 mb-4">{next.description}</p><span className="block border-t border-slate-800 pt-3 text-xs text-sky-400 font-medium">Drill Down into Level {next.level} →</span></button> : <p className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-xs mono text-emerald-400">Terminal Depth Reached: Level 7 IPv4 Subnet Parameters Configured.</p>}</section></main>
    <footer className="bg-slate-900 border-t border-slate-800 px-6 py-3 flex items-center justify-between"><p className="text-xs text-slate-400">System Sync Status: <span className="font-semibold text-emerald-400">{syncStatus}</span></p><button id="saveButton" type="button" onClick={save} disabled={!editMode} className="mr-56 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-medium rounded-xl">Save &amp; Apply Configuration</button></footer>{saved && <div id="save-success-message" role="status" className="fixed bottom-20 right-6 px-4 py-3 bg-emerald-600 text-white text-sm font-medium rounded-xl shadow-lg">Configuration saved successfully!</div>}
    {guideOpen && <div id="test-guide-dialog" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="test-guide-title"><div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"><div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between"><div><h3 id="test-guide-title" className="text-lg font-bold text-white">Plain English Test Guide</h3><p className="text-xs text-slate-400">Step-by-step test workflow for Levels 1 through 7</p></div><button id="close-test-guide" type="button" onClick={() => setGuideOpen(false)} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800" aria-label="Close test guide">×</button></div><div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-300"><div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-amber-300 text-xs leading-relaxed"><strong>Note:</strong> Edit Mode is enabled by default upon logging in. All fields across all 7 levels are editable immediately.</div>{LEVELS.map(node => <div id={`test-guide-level-${node.level}`} key={node.level} className="border border-slate-800 rounded-xl p-4 bg-slate-950/50"><h4 className="font-semibold text-white text-sm mb-2 text-amber-400">Level {node.level}: {node.title}</h4><ul className="list-disc list-inside space-y-1 text-xs text-slate-300"><li>Edit the level parameters shown on the current screen.</li><li>Use the hierarchy breadcrumbs to move between levels.</li>{node.level < LEVELS.length && <li>Use the drill-down card to advance to Level {node.level + 1}.</li>}</ul></div>)}<div className="border border-emerald-500/20 rounded-xl p-4 bg-emerald-500/10"><h4 className="font-semibold text-emerald-400 text-sm mb-2">Save &amp; Persistence Verification</h4><p className="text-xs text-emerald-200/80">Click Save &amp; Apply Configuration to persist your edits.</p></div></div><div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex justify-end"><button id="close-test-guide-footer" type="button" onClick={() => setGuideOpen(false)} className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-xl">Close Guide</button></div></div></div>}
  </div>;
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return authenticated ? <Console onLogout={() => setAuthenticated(false)} /> : <Login onLogin={() => setAuthenticated(true)} />;
}
