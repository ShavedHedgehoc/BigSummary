import * as React from "react";
import { useSearchParams } from "react-router";
// import MainLayout from "../../shared/layouts/main-layout";
// import Header from "./header";
// import Employee from "./employee";
// import { useAuth } from "./use-auth";
import ConveyorIcon from "../../shared/ui/icons/conveyor-icon";

// import { useLogout } from "./use-logout";
import Employee from "../employee/employee";
import State from "../state/state";

import Timer from "../timer/timer";
import Checks from "../checks/checks";
import Components from "../components/components";
import Product from "../product/product";
import MainLayout from "../../shared/layouts/main-layout";
import MainLayoutNew from "../../shared/layouts/main-layout-new";
import Actions from "../actions/actions";
import Header from "./header";

export default function MainPage() {
  let [searchParams] = useSearchParams();
  const conveyor = searchParams.get("conveyor");
  const post = searchParams.get("post");

  if (!conveyor || !post) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center bg-gray-900 text-4xl text-slate-200">
        <div>No conveyor or post</div>
      </div>
    );
  }

  return (
    // <React.Fragment>
    //   <div className="flex flex-col bg-gray-950 h-dvh px-4 py-4 gap-4">
    //     <div className="flex flex-row justify-between gap-4">
    //       <Timer />
    //       <div className="flex flex-row flex-grow  items-center rounded-lg bg-gray-900 1border border-stone-600 px-4 py-2 gap-4">
    //         <div className="text-slate-300">
    //           <ConveyorIcon size={36} />
    //         </div>
    //         <div className="flex flex-col gap-2 items-start ">
    //           <div className="text-2xl font-semibold text-slate-300">Конвейер {conveyor}</div>
    //           <div className="text-xl font-semibold text-slate-400">Пост {post}</div>
    //         </div>
    //       </div>
    //       <State conveyor={conveyor} />
    //     </div>
    //     <div className="flex flex-row flex-grow justify-between gap-4 ">
    //       <Product conveyor={conveyor} />
    //       <Components conveyor={conveyor} />
    //       <Checks conveyor={conveyor} />
    //     </div>
    //     <div className="flex flex-row flex-grow-0 justify-between gap-4 ">
    //       <div></div>
    //       <Employee conveyor={conveyor} />
    //     </div>
    //   </div>
    // </React.Fragment>

    // <MainLayout>
    //   <MainLayout.LeftBar>
    //     <MainLayout.LeftBar.Top>
    //       <Timer />
    //       <div className="flex flex-row flex-grow  items-center rounded-lg bg-gray-900 1border border-stone-600 px-4 py-2 gap-4">
    //         <div className="text-slate-300">
    //           <ConveyorIcon size={36} />
    //         </div>
    //         <div className="flex flex-col gap-2 items-start ">
    //           <div className="text-2xl font-semibold text-slate-300">Конвейер {conveyor}</div>
    //           <div className="text-xl font-semibold text-slate-400">Пост {post}</div>
    //         </div>
    //       </div>
    //     </MainLayout.LeftBar.Top>
    //     <MainLayout.LeftBar.Main>
    //       <Product conveyor={conveyor} />
    //       <Components conveyor={conveyor} />
    //       <Checks conveyor={conveyor} />
    //       <Checks conveyor={conveyor} />
    //     </MainLayout.LeftBar.Main>
    //     <MainLayout.LeftBar.Bottom>
    //       <div className="flex w-full bg-green-200">1</div>
    //     </MainLayout.LeftBar.Bottom>
    //   </MainLayout.LeftBar>
    //   <MainLayout.RightBar>
    //     <MainLayout.RightBar.Top>
    //       <State conveyor={conveyor} />
    //     </MainLayout.RightBar.Top>
    //     <MainLayout.RightBar.Main>1{/* <Checks conveyor={conveyor} /> */}</MainLayout.RightBar.Main>
    //     <MainLayout.RightBar.Bottom>
    //       <Employee conveyor={conveyor} />
    //     </MainLayout.RightBar.Bottom>
    //   </MainLayout.RightBar>
    // </MainLayout>

    <MainLayoutNew>
      <MainLayoutNew.LeftBar>
        <MainLayoutNew.LeftBar.Top>
          <Timer />
          <Header conveyor={conveyor} post={post} />
          <Employee conveyor={conveyor} />
          <State conveyor={conveyor} />
        </MainLayoutNew.LeftBar.Top>
        <MainLayoutNew.LeftBar.Main>
          <Product conveyor={conveyor} />
          <Components conveyor={conveyor} />
          <Checks conveyor={conveyor} />
          {/* <Checks conveyor={conveyor} /> */}
        </MainLayoutNew.LeftBar.Main>
      </MainLayoutNew.LeftBar>
      <MainLayoutNew.RightBar>
        <Actions conveyor={conveyor} />
      </MainLayoutNew.RightBar>
    </MainLayoutNew>
  );
}
