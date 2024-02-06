import Footer from "@/components/footer";
import Header from "@/components/header";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

DashBoardLayout.getInitialProps = ({ req }: any) => {
  const isServer = !!req;
  const isBrowser = !req;

  if (isServer) {
    // Get/set cookies server-side
    console.log("server");
  } else {
    console.log("client");
  }
};
