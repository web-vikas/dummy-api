import Footer from "@/components/footer";
import UserHeader from "@/components/logged-in-header";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserHeader />
      <div>{children}</div>
      <Footer />
    </>
  );
}
