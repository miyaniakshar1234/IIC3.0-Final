import React from 'react';
import { PublicVerifierContent } from '@/components/verify/PublicVerifierContent';

export default function DynamicVerifyPage({ params }: { params: { hash: string } }) {
  return <PublicVerifierContent initialHash={params.hash} />;
}
