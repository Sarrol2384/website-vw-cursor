import { Footer } from "@/components/marketing/Footer";
import { Header } from "@/components/marketing/Header";
import { getSiteSettings } from "@/lib/cms/queries";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
