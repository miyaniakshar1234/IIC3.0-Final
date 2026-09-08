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
      <div className="bg-surface rounded-xl border border-border p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/70">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-accent">
              <FileText className="w-4 h-4" />
              <span>Challenge Artifact • Revision {evidence.revision_number} (Locked)</span>
            </div>
            <h2 className="text-xl font-bold text-text-primary mt-1">
              {evidence.title}
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Challenge: <span className="font-semibold text-text-primary">{evidence.challenge_title}</span>
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="inline-flex items-center space-x-1.5 text-xs font-medium text-text-secondary bg-gray-50 border border-border px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>Submitted {new Date(evidence.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </span>
          </div>
        </div>

        {/* Challenge Task & AI Policy Pill */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-gray-50/70 rounded-lg border border-border/60 text-xs">
            <span className="font-semibold text-text-primary block mb-1">
              Challenge Requirement Brief
            </span>
            <p className="text-text-secondary line-clamp-3 leading-relaxed">
              {evidence.challenge_brief}
            </p>
          </div>

          <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-xs">
            <div className="flex items-center space-x-1.5 font-semibold text-accent mb-1">
              <Bot className="w-3.5 h-3.5" />
              <span>AI Disclosure & Permitted Tools Policy</span>
            </div>
            <p className="text-text-secondary line-clamp-3 leading-relaxed">
              {evidence.ai_policy}
            </p>
          </div>
        </div>
      </div>

      {/* Student Contribution Statement (Core Integrity Rule) */}
      <div className="bg-surface rounded-xl border border-border p-5 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
          <User className="w-4 h-4" />
          <span>Student Contribution Statement</span>
        </div>
        <div className="bg-indigo-50/40 border border-indigo-100 rounded-lg p-4 text-xs text-text-primary leading-relaxed whitespace-pre-wrap font-sans">
          {evidence.contribution}
        </div>
        <p className="text-[11px] text-text-secondary italic">
          * This statement was submitted under academic integrity guidelines and confirmed upon finalization.
        </p>
      </div>

      {/* Primary Work / Code / SQL Query Body */}
      <div className="bg-surface rounded-xl border border-border p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-text-primary uppercase tracking-wider">
            <Code2 className="w-4 h-4 text-accent" />
            <span>Submitted Evidence Artifact</span>
          </div>
          <span className="text-[11px] text-text-secondary font-mono">
            {evidence.body.length} characters
          </span>
        </div>

        <div className="bg-[#0F172A] text-gray-100 rounded-lg p-4 font-mono text-xs overflow-x-auto leading-relaxed border border-gray-800">
          <pre className="whitespace-pre-wrap">{evidence.body}</pre>
        </div>
      </div>

      {/* External Verified Reference Links */}
      {evidence.links && evidence.links.length > 0 && (
        <div className="bg-surface rounded-xl border border-border p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-text-primary uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified HTTPS Reference Links ({evidence.links.length})</span>
          </div>
          <p className="text-xs text-text-secondary">
            Inspect the live repository, documentation, or deployed artifact:
          </p>

          <div className="divide-y divide-border/60 border border-border rounded-lg overflow-hidden">
            {evidence.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-surface hover:bg-gray-50 transition-colors text-xs group"
              >
                <div className="space-y-0.5">
                  <span className="font-semibold text-text-primary group-hover:text-accent flex items-center space-x-1.5">
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 text-text-secondary group-hover:text-accent" />
                  </span>
                  <span className="text-[11px] text-text-secondary font-mono">
                    {link.url}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-accent bg-accent-soft px-2.5 py-1 rounded group-hover:bg-blue-100 transition-colors">
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
