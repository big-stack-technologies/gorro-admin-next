import AdminShellLayout from "@/components/layouts/AdminShell.layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminShellLayout>{children}</AdminShellLayout>
}
