import { Footer } from "@/components/marketing/Footer";
import { Header } from "@/components/marketing/Header";
import { TopBar } from "@/components/marketing/TopBar";
import { getSiteSettings } from "@/lib/cms/queries";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <TopBar settings={settings} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
