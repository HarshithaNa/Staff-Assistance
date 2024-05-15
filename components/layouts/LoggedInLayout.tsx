import SideMenu from "../client/side-menu";

const LoggedInLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <SideMenu />
      {children}
    </div>
  );
};

export default LoggedInLayout;
