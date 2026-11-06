"use client";

import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth, AdminAuthProvider } from "@/hooks/useAdminAuth";
import { AdminPaymentAuthProvider } from "@/hooks/useAdminPaymentAuth";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const { isLoading, isAuthenticated } = useAdminAuth();
  const isMounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const router = useRouter();

  // Ne pas bloquer l'accès à la page de login et paiement auth
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const isLoginPage = pathname.includes('/admin/login');
  const isPaymentAuthPage = pathname.includes('/admin/paiement/auth');

  useEffect(() => {
    if (isMounted && !isLoading && !isAuthenticated && !isLoginPage && !isPaymentAuthPage) {
      const redirect = pathname === "/admin/create-admin" ? "?redirect=/admin/create-admin" : "";
      router.replace(`/admin/login${redirect}`);
    }
  }, [isAuthenticated, isLoading, isLoginPage, isMounted, isPaymentAuthPage, pathname, router]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (isLoading && !isLoginPage && !isPaymentAuthPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l&apos;administration...</p>
        </div>
      </div>
    );
  }

  // Permettre l'accès aux pages de login et paiement auth sans authentification
  if (isLoginPage || isPaymentAuthPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated && !isLoginPage && !isPaymentAuthPage) {
    return null;
  }

  return <>{children}</>;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminAuthProvider>
      <AdminPaymentAuthProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AdminPaymentAuthProvider>
    </AdminAuthProvider>
  );
}
