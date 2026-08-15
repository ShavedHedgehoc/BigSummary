import * as React from "react";

function Header({ children }: { children: React.ReactNode }) {
  return <div className="flex h-[104px] flex-shrink-0 rounded-lg bg-gray-900 text-slate-200 mb-2">{children}</div>;
}

function Main({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-grow w-full rounded-lg bg-gray-950 text-slate-200 overflow-hidden">{children}</div>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-32 flex-shrink-0 rounded-lg bg-gray-900 text-slate-200 mt-2 px-6 gap-4">{children}</div>
  );
}

TechLayout.Header = Header;
TechLayout.Main = Main;
TechLayout.Footer = Footer;

export default function TechLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex h-dvh flex-col bg-gray-950">{children}</div>
    </React.Fragment>
  );
}
