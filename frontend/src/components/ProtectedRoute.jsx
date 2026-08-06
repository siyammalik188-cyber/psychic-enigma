import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user === null) {
    return (
      <div data-testid="auth-checking" className="max-w-6xl mx-auto px-6 py-24 text-ink2">
        Loading…
      </div>
    );
  }
  if (user === false) return <Navigate to="/login" replace />;
  return children;
}
