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
      <div className="pb-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
          <div>
            <div className="section-label text-xs">
              <FileText className="w-4 h-4" />
              <span>Challenge Artifact • Revision {evidence.revision_number} (Locked)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight mt-1.5">
              {evidence.title}
            </h2>
            <p className="text-xs text-text-muted font-mono mt-1">
              Challenge: <span className="font-semibold text-text-secondary">{evidence.challenge_title}</span>
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted bg-canvas border border-border px-3 py-1 rounded-full font-mono">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>Submitted {new Date(evidence.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </span>
          </div>
        </div>

        {/* Challenge Task & AI Policy Pill */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
          <div className="p-4 bg-canvas rounded-xl border border-border space-y-1.5">
            <span className="font-bold text-text-secondary uppercase tracking-wider text-[11px] block">
              Challenge Requirement Brief
            </span>
            <p className="text-text-muted line-clamp-3 leading-relaxed text-[11px]">
              {evidence.challenge_brief}
            </p>
          </div>

          <div className="p-4 bg-info/10 rounded-xl border border-info/20 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-info uppercase tracking-wider text-[11px]">
              <Bot className="w-3.5 h-3.5" />
              <span>AI Disclosure & Permitted Tools Policy</span>
            </div>
            <p className="text-text-secondary line-clamp-3 leading-relaxed text-[11px]">
              {evidence.ai_policy}
            </p>
          </div>
        </div>
      </div>

      {/* Student Contribution Statement */}
      <div className="pb-card p-5 sm:p-6 space-y-3">
        <div className="section-label text-xs flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>Student Contribution Statement</span>
        </div>
        <div className="bg-canvas border border-border rounded-xl p-5 text-xs text-text-secondary leading-relaxed whitespace-pre-wrap font-mono">
          {evidence.contribution}
        </div>
        <p className="text-[11px] text-text-muted italic font-mono">
          * This statement was submitted under academic integrity guidelines and frozen upon challenge completion.
        </p>
      </div>

      {/* Primary Work / Code / SQL Query Body */}
      <div className="pb-card p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="section-label text-xs flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            <span>Submitted Evidence Artifact</span>
          </div>
          <span className="text-[11px] text-text-muted font-mono">
            {evidence.body.length} characters
          </span>
        </div>

        <div className="bg-canvas rounded-xl p-5 font-mono text-xs overflow-x-auto leading-relaxed border border-border text-success">
          <pre className="whitespace-pre-wrap">{evidence.body}</pre>
        </div>
      </div>

      {/* External Verified Reference Links */}
      {evidence.links && evidence.links.length > 0 && (
        <div className="pb-card p-5 sm:p-6 space-y-3">
          <div className="section-label text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span>Verified HTTPS Reference Links ({evidence.links.length})</span>
          </div>
          <p className="text-xs text-text-muted font-mono">
            Inspect the live repository, documentation, or deployed artifact:
          </p>

          <div className="divide-y divide-[var(--border)] border border-border rounded-xl overflow-hidden bg-canvas">
            {evidence.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 hover:bg-surface-hover transition-colors text-xs group"
              >
                <div className="space-y-0.5">
                  <span className="font-semibold text-text-primary group-hover:text-accent flex items-center gap-2 transition-colors">
                    <span>{link.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors" />
                  </span>
                  <span className="text-[11px] text-text-muted font-mono">
                    {link.url}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-accent bg-accent-soft border border-border-accent px-3 py-1 rounded-lg group-hover:bg-accent group-hover:text-[var(--text-inverse)] transition-all font-mono">
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
