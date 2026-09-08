'use client';

import React from 'react';
import {
  FileText,
  ExternalLink,
  Bot,
  User,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Code2,
  AlertCircle
} from 'lucide-react';

export interface ReferenceLink {
  label: string;
  url: string;
}

export interface SubmissionEvidence {
  id: string;
  revision_number: number;
  submitted_at: string;
  student_display_name: string;
  student_program: string;
  challenge_title: string;
  challenge_brief: string;
  ai_policy: string;
  title: string;
  body: string;
  contribution: string;
  links: ReferenceLink[];
}

interface EvidenceViewerProps {
  evidence: SubmissionEvidence;
}

export function EvidenceViewer({ evidence }: EvidenceViewerProps) {
  return (
    <div className="space-y-6">
      {/* Top Metadata Header */}
      <div className="glass-card rounded-2xl border border-white/10 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-400 font-mono">
              <FileText className="w-4 h-4" />
              <span className="uppercase tracking-wider">Challenge Artifact • Revision {evidence.revision_number} (Locked)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1.5">
              {evidence.title}
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Challenge: <span className="font-semibold text-white">{evidence.challenge_title}</span>
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="inline-flex items-center space-x-1.5 text-xs font-medium text-zinc-400 bg-zinc-950/80 border border-white/10 px-3 py-1 rounded-full font-mono">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>Submitted {new Date(evidence.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </span>
          </div>
        </div>

        {/* Challenge Task & AI Policy Pill */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
          <div className="p-4 bg-zinc-950/80 rounded-xl border border-white/10 space-y-1.5">
            <span className="font-bold text-zinc-300 uppercase tracking-wider text-[11px] block">
              Challenge Requirement Brief
            </span>
            <p className="text-zinc-400 line-clamp-3 leading-relaxed text-[11px]">
              {evidence.challenge_brief}
            </p>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 space-y-1.5">
            <div className="flex items-center space-x-1.5 font-bold text-blue-400 uppercase tracking-wider text-[11px]">
              <Bot className="w-3.5 h-3.5" />
              <span>AI Disclosure & Permitted Tools Policy</span>
            </div>
            <p className="text-zinc-300 line-clamp-3 leading-relaxed text-[11px]">
              {evidence.ai_policy}
            </p>
          </div>
        </div>
      </div>

      {/* Student Contribution Statement (Core Integrity Rule) */}
      <div className="glass-card rounded-2xl border border-white/10 p-5 sm:p-6 shadow-xl space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
          <User className="w-4 h-4" />
          <span>Student Contribution Statement</span>
        </div>
        <div className="bg-zinc-950/90 border border-white/10 rounded-xl p-5 text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap font-mono">
          {evidence.contribution}
        </div>
        <p className="text-[11px] text-zinc-500 italic font-mono">
          * This statement was submitted under academic integrity guidelines and frozen upon challenge completion.
        </p>
      </div>

      {/* Primary Work / Code / SQL Query Body */}
      <div className="glass-card rounded-2xl border border-white/10 p-5 sm:p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>Submitted Evidence Artifact</span>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">
            {evidence.body.length} characters
          </span>
        </div>

        <div className="bg-zinc-950 rounded-xl p-5 font-mono text-xs overflow-x-auto leading-relaxed border border-white/10 shadow-inner text-zinc-300">
          <pre className="whitespace-pre-wrap">{evidence.body}</pre>
        </div>
      </div>

      {/* External Verified Reference Links */}
      {evidence.links && evidence.links.length > 0 && (
        <div className="glass-card rounded-2xl border border-white/10 p-5 sm:p-6 shadow-xl space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified HTTPS Reference Links ({evidence.links.length})</span>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            Inspect the live repository, documentation, or deployed artifact:
          </p>

          <div className="divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden bg-zinc-950/60">
            {evidence.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors text-xs group"
              >
                <div className="space-y-0.5">
                  <span className="font-semibold text-white group-hover:text-blue-400 flex items-center space-x-2 transition-colors">
                    <span>{link.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {link.url}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-lg group-hover:bg-blue-500/20 transition-all font-mono">
                  Open Reference
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
