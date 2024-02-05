import Footer from "@/components/footer";
import Header from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Separator className="mt-10"/>
      <Footer />
    </>
  );
}
