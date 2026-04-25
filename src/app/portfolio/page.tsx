import { Suspense } from 'react';
import { PortfolioContent } from './page-content';

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="h-12 w-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        </div>
      }
    >
      <PortfolioContent />
    </Suspense>
  );
}
