import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="app-root">
      <Navbar />
      <main
        className="container"
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
