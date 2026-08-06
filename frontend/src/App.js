import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Results from "./pages/Results";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#FFFFFF",
            border: "1px solid #E5E2D9",
            color: "#1C211F",
            fontFamily: "'Manrope', sans-serif",
            borderRadius: "999px",
          },
        }}
      />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report/:id" element={<Results />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
