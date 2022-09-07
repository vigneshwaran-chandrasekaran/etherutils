import Navbar from "./navbar";
import Footer from "./footer";
// import Sidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <main className="main">
      <div className="content-area">{children}</div>
      </main>
      <Footer />
    </>
  );
}
