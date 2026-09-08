'use client';

import React from 'react';
import { AlertTriangle, Lock, X, ShieldCheck } from 'lucide-react';

interface FinalizeSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
  challengeTitle: string;
}

export function FinalizeSubmissionModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  challengeTitle,
}: FinalizeSubmissionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="w-full max-w-md bg-surface text-text-primary rounded-2xl shadow-lg border border-border-accent p-6 sm:p-7 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-warning/10 border border-warning/30 flex items-center justify-center text-warning">
            <Lock className="w-5 h-5" />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 id="modal-title" className="text-xl font-bold text-text-primary tracking-tight mb-1 font-mono">
          Lock & Finalize Submission?
        </h3>

        <p className="text-xs text-text-muted mb-5 font-mono">
          You are finalizing your challenge work for <span className="font-semibold text-text-secondary">&quot;{challengeTitle}&quot;</span>.
        </p>

        <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 mb-6 text-xs text-warning space-y-2 font-mono">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wide text-[11px]">
            <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
            <span>Human Review Protocol:</span>
          </div>
          <ul className="list-disc list-inside space-y-1.5 pl-1 text-[11px] text-text-secondary">
            <li>This revision will be permanently locked with a SHA-256 fingerprint.</li>
            <li>Assigned to a faculty evaluator (Dr. Alok Sharma) for rubric scoring.</li>
            <li>No opaque AI will automatically grant skills or grade this work.</li>
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3 font-mono">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="pb-btn-ghost text-xs py-2 px-4"
          >
            Keep Editing
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="pb-btn-primary text-xs py-2 px-5"
          >
            {isSubmitting ? 'Locking Submission...' : 'Confirm & Finalize'}
          </button>
        </div>
      </div>
    </div>
  );
}
