import { Outlet } from "react-router-dom";

import { Announcement } from "./Announcement";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteLayout() {
  return (
    <div className="site">
      <Announcement />
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
