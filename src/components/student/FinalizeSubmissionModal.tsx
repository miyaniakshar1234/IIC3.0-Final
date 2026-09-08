import React from 'react'
import { AlertTriangle, Lock, X } from 'lucide-react'

interface FinalizeSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isSubmitting?: boolean
  challengeTitle: string
}

export function FinalizeSubmissionModal({
  isOpen,
  onClose,
  onConfirm,
  isSubmitting = false,
  challengeTitle,
}: FinalizeSubmissionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="w-full max-w-md bg-surface rounded-2xl shadow-2xl border border-border p-6 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
            <Lock className="w-5 h-5" />
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 id="modal-title" className="text-lg font-bold text-text-primary mb-1">
          Lock & Finalize Submission?
        </h3>

        <p className="text-sm text-text-secondary mb-4">
          You are finalizing your submission for <span className="font-semibold text-text-primary">&quot;{challengeTitle}&quot;</span>.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-6 text-xs text-amber-900 space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            Human Review Process:
          </div>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>This revision will be permanently locked and assigned to a human reviewer.</li>
            <li>No AI will automatically grant skills or grade this work.</li>
            <li>You can view status updates in your Student Dashboard.</li>
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-gray-100 rounded-lg transition"
          >
            Keep Editing
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-semibold text-white bg-accent hover:bg-blue-700 rounded-lg shadow-xs transition flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Locking Submission...' : 'Confirm & Finalize'}
          </button>
        </div>
      </div>
    </div>
  )
}
