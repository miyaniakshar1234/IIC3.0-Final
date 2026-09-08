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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="w-full max-w-md bg-zinc-950 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/10 p-6 sm:p-7 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 id="modal-title" className="text-xl font-bold text-white tracking-tight mb-1 font-mono">
          Lock & Finalize Submission?
        </h3>

        <p className="text-xs text-zinc-400 mb-5 font-mono">
          You are finalizing your challenge work for <span className="font-semibold text-zinc-200">&quot;{challengeTitle}&quot;</span>.
        </p>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 text-xs text-amber-300 space-y-2 font-mono">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wide text-[11px]">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Human Review Protocol:</span>
          </div>
          <ul className="list-disc list-inside space-y-1.5 pl-1 text-[11px] text-zinc-300">
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
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl border border-white/10 transition"
          >
            Keep Editing
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 disabled:opacity-50 uppercase tracking-wider"
          >
            {isSubmitting ? 'Locking Submission...' : 'Confirm & Finalize'}
          </button>
        </div>
      </div>
    </div>
  );
}
