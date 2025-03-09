import * as React from "react";

function Top({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex flex-shrink-0 w-full h-[150px] gap-2">{children}</div>
    </React.Fragment>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-grow h-full w-full gap-2">{children}</div>;
}
function Bottom({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-shrink-0 w-full h-[150px] ">{children}</div>;
}

function LeftBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex flex-col  flex-grow h-full gap-2 ">{children}</div>;
    </React.Fragment>
  );
}
LeftBarLayout.Top = Top;
LeftBarLayout.Main = Main;
LeftBarLayout.Bottom = Bottom;

function RightBarLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col h-full  w-1/3 gap-2 ">{children}</div>;
}
RightBarLayout.Top = Top;
RightBarLayout.Main = Main;
RightBarLayout.Bottom = Bottom;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex h-dvh flex-row items-center bg-stone-950 px-2 py-2 gap-1 ">{children}</div>
    </React.Fragment>
  );
}

MainLayout.LeftBar = LeftBarLayout;
MainLayout.RightBar = RightBarLayout;
