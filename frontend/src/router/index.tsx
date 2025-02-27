import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loading from '@/components/Loading';
import SymbolsView from '@/components/SymbolsView'; // Direct import for initial view

// Lazy load secondary routes
const StatementsView = lazy(() => import('@/components/StatementsView'));
const ProfileView = lazy(() => import('@/components/ProfileView'));

const Router = () => {
  return (
    <Routes>
      <Route
        index
        element={<SymbolsView />} // No Suspense needed for initial view
      />
      <Route
        path="profile"
        element={
          <Suspense fallback={<Loading />}>
            <ProfileView />
          </Suspense>
        }
      />
      <Route
        path="statements"
        element={
          <Suspense fallback={<Loading />}>
            <StatementsView />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
