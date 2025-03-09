import * as React from "react";

function Top({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex flex-shrink-0 w-full  gap-2">{children}</div>
    </React.Fragment>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex  h-full w-full gap-2">{children}</div>
    </React.Fragment>
  );
}
// function Bottom({ children }: { children: React.ReactNode }) {
//   return (
//     <React.Fragment>
//       <div className="flex flex-shrink-0 w-full h-[150px] ">{children}</div>
//     </React.Fragment>
//   );
// }

function LeftBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex flex-col flex-grow w-7/8 rounded-lg h-full gap-2 ">{children}</div>
    </React.Fragment>
  );
}
LeftBarLayout.Top = Top;
LeftBarLayout.Main = Main;
// LeftBarLayout.Bottom = Bottom;

function RightBarLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex flex-col h-full  w-1/8">{children}</div>
    </React.Fragment>
  );
}

export default function MainLayoutNew({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex h-dvh flex-row w-dvw items-center bg-stone-950  py-2 gap-2 ">{children}</div>
    </React.Fragment>
  );
}

MainLayoutNew.LeftBar = LeftBarLayout;
MainLayoutNew.RightBar = RightBarLayout;
