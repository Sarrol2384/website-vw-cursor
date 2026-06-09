import { PricingAdmin } from "@/components/admin/PricingAdmin";
import { getAllPricingAdmin } from "@/lib/cms/queries";

export default async function AdminPricingPage() {
  const packages = await getAllPricingAdmin();
  return <PricingAdmin items={packages} />;
}
