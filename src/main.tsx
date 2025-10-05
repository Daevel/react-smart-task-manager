import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
      <Toaster richColors />
    </AuthProvider>
  </StrictMode>
);
