import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
