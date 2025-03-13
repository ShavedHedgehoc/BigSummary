import { Outlet, useSearchParams } from "react-router";
import MainLayoutNew from "../../shared/layouts/main-layout-new";
import Timer from "../timer/timer";
import Header from "./header";
import Employee from "../employee/employee";
import State from "../state/state";
import Actions from "../actions/actions";

export default function LayoutPage() {
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
    <MainLayoutNew>
      <MainLayoutNew.LeftBar>
        <MainLayoutNew.LeftBar.Top>
          <Timer />
          <Header conveyor={conveyor} post={post} />
          <Employee conveyor={conveyor} />
          <State conveyor={conveyor} />
        </MainLayoutNew.LeftBar.Top>
        <MainLayoutNew.LeftBar.Main>
          <Outlet />
        </MainLayoutNew.LeftBar.Main>
      </MainLayoutNew.LeftBar>
      <MainLayoutNew.RightBar>
        <Actions conveyor={conveyor} post={post} />
      </MainLayoutNew.RightBar>
    </MainLayoutNew>
  );
}
