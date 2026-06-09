import { ServicesAdmin } from "@/components/admin/ServicesAdmin";
import { getAllServicesAdmin } from "@/lib/cms/queries";

export default async function AdminServicesPage() {
  const services = await getAllServicesAdmin();
  return <ServicesAdmin items={services} />;
}
