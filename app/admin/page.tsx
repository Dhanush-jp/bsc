import { AdminPanel } from "@/components/admin-panel";
import { defaultSiteContent } from "@/data/site-content";

export default function AdminPage() {
  return <AdminPanel initialContent={defaultSiteContent} />;
}
