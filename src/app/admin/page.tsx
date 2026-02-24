import type { Metadata } from "next";
import AdminPage from "@/uicomponents/AdminPage";

export const metadata: Metadata = {
  title: "Admin | Ds.Productions",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRoute() {
  return <AdminPage />;
}
