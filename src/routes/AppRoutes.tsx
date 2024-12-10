import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

import { Login } from "@/features/Login/Login";
import { AppRoutesAdmin } from "./AppRoutesAdmin";
import { AppRoutesCliente } from "./AppRoutesCliente";
import { AppRoutesContadora } from "./AppRoutesContadora";

export function AppRoutes() {
  const { login, role, isLoading } = useAppSelector((state) => state.auth);

  // if (isLoading) {
  // 	return <></>;
  // }

  return (
    <BrowserRouter>
      <Routes>
        {!role ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/" />} />

            {role === "admin" && (
              <Route path="/*" element={<AppRoutesAdmin />} />
            )}
            {role === "cliente" && (
              <Route path="/*" element={<AppRoutesCliente />} />
            )}
            {role === "contadora" && (
              <Route path="/*" element={<AppRoutesContadora />} />
            )}

            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
