"use client";
import { createContext } from "react";

export const ClientContext = createContext(null);

export default function ClientProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <ClientContext.Provider value={session}>{children}</ClientContext.Provider>
  );
}
