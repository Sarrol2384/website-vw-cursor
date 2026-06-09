import { FaqAdmin } from "@/components/admin/FaqAdmin";
import { getAllFaqAdmin } from "@/lib/cms/queries";

export default async function AdminFaqPage() {
  const items = await getAllFaqAdmin();
  return <FaqAdmin items={items} />;
}
