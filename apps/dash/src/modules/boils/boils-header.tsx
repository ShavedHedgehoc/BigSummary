import HubIcon from "../../shared/components/icons/hub-icon";

export default function BoilsHeader() {
  return (
    <div className="flex flex-row justify-between items-center px-6 w-full">
      <div className="flex flex-row justify-center items-center gap-4">
        <HubIcon size={12} />
        <div className="flex text-4xl font-semibold">Основы</div>
      </div>
    </div>
  );
}
