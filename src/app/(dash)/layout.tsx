import React from "react";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect(`/`);
  }

  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
