import Link from "next/link";

import classes from "./DashboardHeader.module.css";

const DashboardHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Link href="/admin">FoodBearCat Admin Panel </Link>
        </div>
        <div className={classes.headerLinks}>
          <Link href="/admin/menus">Menus</Link>
          <Link href="/admin/accounts">Account</Link>
          <Link href="/">Logout</Link>
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;