function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="main_header flex w-full h-20 items-center justify-between py-3 px-8 rounded-md bg-zinc-800">
      {children}
    </div>
  );
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className="main_header flex w-full h-20 items-center justify-end gap-3 py-3 px-8 rounded-md bg-zinc-800">
      {children}
    </div>
  );
}

function Product({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-grow   flex-col justify-center items-center rounded-md w-2/3 h-40 gap-3 ">{children}</div>
  );
}

function ProductName({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-grow  justify-center items-center rounded-md w-full h-20 py-3 px-8  bg-zinc-800 ">
      {children}
    </div>
  );
}

function Batch({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-grow  justify-center items-center rounded-md w-full h-20 py-3 px-8  bg-zinc-800 ">
      {children}
    </div>
  );
}

function State({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-grow  justify-center items-center rounded-md w-1/3 h-40 py-3 px-8  bg-zinc-800 ">
      {children}
    </div>
  );
}

function Subheader({ children }: { children: React.ReactNode }) {
  return <div className="flex  w-full items-center justify-between gap-3 ">{children}</div>;
}

function View({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col flex-grow w-2/3 rounded-md  gap-3 ">{children}</div>;
}
function Info({ children }: { children: React.ReactNode }) {
  return <div className="flex  flex-grow w-full rounded-md p-3 bg-zinc-800 text-slate-200">{children}</div>;
}

function LeftControl({ children }: { children: React.ReactNode }) {
  return <div className="flex   w-full h-1/4 rounded-md p-3 bg-zinc-800 text-slate-200">{children}</div>;
}

function Control({ children }: { children: React.ReactNode }) {
  return <div className="flex w-1/3 flex-grow rounded-md  p-3 bg-zinc-800">{children}</div>;
}

function Main({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-row  flex-grow w-full  rounded-md  gap-3 ">{children}</div>;
}

Layout.Header = Header;
Layout.Subheader = Subheader;
Layout.Product = Product;
Layout.ProductName = ProductName;
Layout.Batch = Batch;
Layout.State = State;
Layout.Main = Main;
Layout.View = View;
Layout.Info = Info;
Layout.LeftControl = LeftControl;
Layout.Control = Control;
Layout.Footer = Footer;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3 w-full h-dvh p-3  bg-slate-950">{children}</div>;
}
