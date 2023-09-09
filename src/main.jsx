import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./Providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="max-w-screen-xl mx-auto">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </div>
  </React.StrictMode>
);
