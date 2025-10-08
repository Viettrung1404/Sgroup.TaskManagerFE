import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

const normalizeBaseUrl = (baseUrl: string) => {
  if (!baseUrl) {
    return undefined;
  }

  if (baseUrl === "/") {
    return undefined;
  }

  return baseUrl.replace(/\/$/, "");
};

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const basename = normalizeBaseUrl(import.meta.env.BASE_URL);

  return <BrowserRouter basename={basename}>{children}</BrowserRouter>;
};