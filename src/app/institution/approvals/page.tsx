'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { AppShell } from '@/components/ui/AppShell';
import { useAuth } from '@/context/AuthContext';
import {
  Building2,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Users,
  Download,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

export default function StudentAffiliationApprovalsPage() {
  const { user, affiliationRequests, approveAffiliation, rejectAffiliation } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');

  const institutionName = user?.institutionName || 'Manipal University Jaipur (MUJ)';

  const handleApprove = (id: string) => {
    approveAffiliation(id);
    toast.success('Trust Anchor Issued', { 
      description: 'Cryptographic signature embedded into student passport.' 
    });
  };

  const handleReject = (id: string) => {
    rejectAffiliation(id);
    toast.error('Affiliation Rejected', {
      description: 'The request has been denied and removed from the queue.'
    });
  };

  const isDemoDean = user?.email?.includes('dean.computing');

  const visibleRequests = isDemoDean ? affiliationRequests : [];

  const filteredRequests = visibleRequests.filter((req) => {
    const matchesSearch =
      req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'pending') return req.status === 'pending_approval';
    if (filterStatus === 'approved') return req.status === 'approved';
    return true;
  });

  const pendingCount = visibleRequests.filter((r) => r.status === 'pending_approval').length;
  const approvedCount = visibleRequests.filter((r) => r.status === 'approved').length;

  const handleExportCsv = () => {
    const headers = ['Request ID', 'Student Name', 'Roll / PRN', 'Email', 'Program', 'Requested At', 'Status'];
    const rows = visibleRequests.map((r) => [
      r.id,
      `"${r.studentName}"`,
      r.rollNumber,
      r.studentEmail,
      `"${r.program}"`,
      r.requestedAt,
      r.status,
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encoded;
    link.download = `proofbridge_student_affiliation_registry.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-16">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
          <Link href="/institution/insights" className="hover:text-text-primary flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Curriculum Gap Radar</span>
          </Link>
          <span>/</span>
          <span className="text-text-primary font-bold">Student Affiliation Approvals</span>
        </div>

        {/* ── HEADER ── */}
        <div className="pb-card-accent p-6 sm:p-8 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warning/10 text-warning text-xs font-mono font-bold border border-warning/30">
                  <Building2 className="w-3.5 h-3.5" />
                  REGISTRAR &amp; DEAN VERIFICATION PORTAL
                </span>
                <span className="text-xs text-text-muted font-mono">{institutionName}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-text-primary tracking-tight">
                Student Affiliation &amp; Enrollment Queue
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
                Review and cryptographically anchor student enrollment requests. When a student signs up and selects your institution, approving their identity issues an immutable campus trust anchor on their ProofBridge skill passport.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleExportCsv}
                className="pb-btn-ghost text-xs py-2 px-3.5 font-mono flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>Export Registry CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── STAT BENTO ROW ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="pb-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="section-label text-[10px]">Pending Verification</span>
              <Clock className="w-4 h-4 text-warning" />
            </div>
            <div className="metric-value text-3xl text-warning">{pendingCount} Requests</div>
            <p className="text-[10px] text-text-muted font-mono">Requires Registrar action</p>
          </div>

          <div className="pb-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="section-label text-[10px]">Verified Campus Students</span>
              <ShieldCheck className="w-4 h-4 text-success" />
            </div>
            <div className="metric-value text-3xl text-success">100 + {approvedCount}</div>
            <p className="text-[10px] text-text-muted font-mono">Anchored to {institutionName}</p>
          </div>

          <div className="pb-card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="section-label text-[10px]">Accreditation Trust Model</span>
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div className="metric-value text-xl text-accent font-bold mt-1">Autonomous Anchor</div>
            <p className="text-[10px] text-text-muted font-mono">W3C DID Issuer Protocol</p>
          </div>
        </div>

        {/* ── QUEUE TABLE CARD ── */}
        <div className="pb-card p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-text-primary tracking-tight">
                Enrollment Verification Queue
              </h2>
              <p className="text-xs text-text-muted font-mono mt-0.5">
                Students registered under {institutionName} awaiting Dean &amp; Registrar signoff
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student, roll, PRN..."
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-border bg-canvas font-mono text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-canvas p-1 rounded-lg border border-border font-mono text-xs">
                {[
                  { id: 'all', label: `All (${visibleRequests.length})` },
                  { id: 'pending', label: `Pending (${pendingCount})` },
                  { id: 'approved', label: `Approved (${approvedCount})` },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFilterStatus(t.id as any)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
                      filterStatus === t.id
                        ? 'bg-surface text-accent font-bold shadow-sm border border-border-accent'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-border rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-border text-text-muted font-bold uppercase tracking-wider text-[11px] font-mono">
                <tr>
                  <th className="px-5 py-3.5">Student Details</th>
                  <th className="px-5 py-3.5">Degree &amp; Program</th>
                  <th className="px-5 py-3.5">Roll / PRN Number</th>
                  <th className="px-5 py-3.5">Request Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Registrar Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRequests.map((req) => {
                  const isPending = req.status === 'pending_approval';
                  const isApproved = req.status === 'approved';

                  return (
                    <tr key={req.id} className="hover:bg-surface-hover transition-colors">
                      {/* Student Details */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-text-primary text-sm flex items-center gap-1.5">
                          <GraduationCap className="w-4 h-4 text-info" />
                          <span>{req.studentName}</span>
                        </div>
                        <div className="text-[10px] text-text-muted font-mono mt-0.5">
                          {req.studentEmail}
                        </div>
                      </td>

                      {/* Program */}
                      <td className="px-5 py-4 font-mono font-medium text-text-secondary text-xs">
                        {req.program}
                      </td>

                      {/* Roll / PRN */}
                      <td className="px-5 py-4 font-mono font-bold text-text-primary">
                        <span className="px-2 py-0.5 rounded bg-canvas border border-border">
                          {req.rollNumber}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-text-muted font-mono text-[11px]">
                        {req.requestedAt}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        {isPending ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-warning/10 text-warning border border-warning/30">
                            <Clock className="w-3 h-3" />
                            Pending Verification
                          </span>
                        ) : isApproved ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-success/10 text-success border border-success/30">
                            <CheckCircle2 className="w-3 h-3" />
                            Affiliation Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-danger/10 text-danger border border-danger/30">
                            <XCircle className="w-3 h-3" />
                            Rejected
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        {isPending ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleApprove(req.id)}
                              className="px-3 py-1.5 rounded-lg bg-success text-white font-mono text-xs font-bold hover:bg-success/90 transition shadow-sm flex items-center gap-1 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReject(req.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-canvas hover:bg-danger/10 text-danger border border-border hover:border-danger/30 font-mono text-xs transition cursor-pointer"
                              title="Reject affiliation"
                            >
                              <XCircle className="w-3 h-3" />
                            </button>
                          </div>
                        ) : isApproved ? (
                          <span className="text-[11px] font-mono text-success font-semibold flex items-center justify-end gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Anchor Active</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-text-muted">
                            Action Complete
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-12 text-text-muted font-mono text-xs">
              No matching affiliation requests found.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
