import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSiteSettings } from "@/lib/cms/queries";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Site settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
