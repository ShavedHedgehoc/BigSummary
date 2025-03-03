import BarrelIcon from "../../shared/components/icons/barrel-icon";
import CansTopMenu from "./cans-top-menu";

export default function CansHeader() {
  return (
    <div className="flex flex-row justify-between items-center px-6 w-full">
      <div className="flex flex-row justify-center items-center gap-4">
        <BarrelIcon size={12} />
        <div className="flex text-4xl font-semibold">Емкости</div>
      </div>
      <CansTopMenu />
    </div>
  );
}
