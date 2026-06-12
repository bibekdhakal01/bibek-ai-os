"use client";

import { useState } from "react";
import { Mail, Send, Terminal, Loader2 } from "lucide-react";
import { soundManager } from "@/src/lib/sound";

export default function ContactContent() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [sendLogs, setSendLogs] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      soundManager.playError();
      return;
    }

    soundManager.playClick();
    setIsSending(true);
    setSendLogs(["INITIALIZING COM_GATEWAY...", "RESOLVING SECURE DNS NODE...", "PACKAGING MESSAGE PAYLOAD..."]);

    // Sequentially show terminal loading logs
    const stages = [
      "ENCRYPTING PAYLOAD WITH QUANTUM SEED...",
      "ESTABLISHING HANDSHAKE WITH SMTP SECURE...",
      "MESSAGE DELIVERED TO NEURAL STORAGE NODE."
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setSendLogs((prev) => [...prev, stages[currentStage]]);
        currentStage++;
      } else {
        clearInterval(interval);
        setIsSending(false);
        setSent(true);
        soundManager.playNotify();
      }
    }, 600);
  };

  const handleReset = () => {
    soundManager.playClick();
    setFormData({ name: "", email: "", message: "" });
    setSent(false);
    setSendLogs([]);
  };

  return (
    <div className="flex flex-col gap-5 font-mono text-xs text-slate-200 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-cyan-500/20 pb-3">
        <Mail className="w-5 h-5 text-cyan-400" />
        <span className="font-orbitron font-bold text-sm tracking-wider uppercase text-cyan-400">
          Secure Comms Terminal
        </span>
      </div>

      {!sent ? (
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Subject Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase tracking-wider text-cyan-500/70 font-semibold">
                Sender Signature
              </label>
              <input
                type="text"
                required
                disabled={isSending}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ENTER YOUR NAME"
                className="bg-cyan-950/10 border border-cyan-500/20 focus:border-cyan-400 rounded px-3 py-2 text-white placeholder-cyan-500/30 font-mono text-xs focus:outline-none focus:shadow-[0_0_8px_rgba(0,245,255,0.2)] disabled:opacity-50"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase tracking-wider text-cyan-500/70 font-semibold">
                Sender Gateway (Email)
              </label>
              <input
                type="email"
                required
                disabled={isSending}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ENTER YOUR EMAIL"
                className="bg-cyan-950/10 border border-cyan-500/20 focus:border-cyan-400 rounded px-3 py-2 text-white placeholder-cyan-500/30 font-mono text-xs focus:outline-none focus:shadow-[0_0_8px_rgba(0,245,255,0.2)] disabled:opacity-50"
              />
            </div>
          </div>

          {/* Message Content */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] uppercase tracking-wider text-cyan-500/70 font-semibold">
              Payload Content (Message)
            </label>
            <textarea
              required
              disabled={isSending}
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="WRITE YOUR MESSAGE SEGMENTS HERE..."
              className="bg-cyan-950/10 border border-cyan-500/20 focus:border-cyan-400 rounded px-3 py-2 text-white placeholder-cyan-500/30 font-mono text-xs focus:outline-none focus:shadow-[0_0_8px_rgba(0,245,255,0.2)] resize-none disabled:opacity-50"
            />
          </div>

          {/* Simulated loading console */}
          {isSending && (
            <div className="bg-cyan-950/20 border border-cyan-500/15 p-3 rounded font-mono text-[9px] text-cyan-400/80 flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1 border-b border-cyan-500/10 pb-1 font-bold">
                <Loader2 className="w-3 h-3 animate-spin text-cyan-400" />
                <span>COMMUNICATION TELEMETRY LOGS</span>
              </div>
              {sendLogs.map((log, idx) => (
                <div key={idx} className="flex gap-1.5">
                  <span>&gt;&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSending}
            className="mt-auto hologram-btn py-2.5 rounded font-orbitron font-bold tracking-widest text-center cursor-pointer flex items-center justify-center gap-2 text-xs uppercase disabled:opacity-50 border-cyan-400/30 hover:border-cyan-400/70 focus:outline-none"
          >
            <Send className="w-3.5 h-3.5" />
            Send Encrypted Payload
          </button>
        </form>
      ) : (
        /* Message Sent Success View */
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-8 bg-cyan-950/5 border border-cyan-500/10 rounded">
          <Terminal className="w-10 h-10 text-emerald-400 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.3)]" />
          <div className="flex flex-col gap-1">
            <h3 className="font-orbitron font-extrabold text-sm tracking-wider text-white">
              TRANSMISSION COMPLETED
            </h3>
            <p className="text-[12px] text-cyan-500/80 max-w-sm px-6 leading-relaxed">
              Your message payload has been encrypted and securely beamed to Bibek Dhakal&apos;s communications node. Feedback receipt logged.
            </p>
          </div>
          
          <button
            onClick={handleReset}
            className="hologram-btn py-1.5 px-4 rounded text-[9px] uppercase tracking-wider font-bold mt-2 cursor-pointer border-cyan-500/20 hover:border-cyan-400/50"
          >
            Send Another Payload
          </button>
        </div>
      )}
    </div>
  );
}
