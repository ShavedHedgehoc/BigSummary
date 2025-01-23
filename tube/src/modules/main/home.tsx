import React from "react";
import Keyboard from "react-simple-keyboard";

// import { KeyboardReact as Keyboard } from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Clock from "../clock";
import DateComponent from "../date-component";
import Layout from "../../layout";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useCurrentProductStore } from "../../use-current-product-store";
import { useShallow } from "zustand/react/shallow";
import { products } from "../../mocks";
import { useSearchParams } from "react-router";
import { useLines } from "../../shared/api/use-lines";

const testLabel =
  "^XA^CI28^FO20,20^GB760,560,4,B,0^FS^FO20,400^GB760,4,4,B,0^FS^FO300,400^GB4,180,4,B,0^FS^FO60,60^FB700,3,,L^A0N,50,50^FDPaper box for hair dye DLS 9/76 with label^FS^FO90,470^FB700,3,,L^A0N,40,40^FDQuantity:^FS^FO 550,470 ^FB700,3,,L^A0N,50,50^FD Pcs^FS^PQ1^XZ";

interface Product {
  id: number;
  code: string;
  name: string;
}

export default function Home() {
  const criterias = [
    { label: "Жесткость", key: "1" },
    { label: "Мягкость", key: "2" },
    { label: "Крутость", key: "3" },
    { label: "Цвет", key: "4" },
    { label: "Толщина лака", key: "5" },
    { label: "Преломление", key: "6" },
    { label: "Какая-то фигня", key: "7" },
    { label: "Не придумал", key: "8" },
    { label: "Пусть будет", key: "9" },
  ];

  const [value, setValue] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  //   const [currentProduct, setCurrentProduct] = React.useState({} as Product);
  const [openModal, setOpenModal] = React.useState(false);

  const printLabel = () => {
    var request = new XMLHttpRequest();
    request.open("POST", "http://192.168.250.95:9100", true);
    // request.setRequestHeader("Content-Length", testLabel.length);

    // Actually sends the request to the server.
    request.send(testLabel);
  };

  function Product() {
    const currentProduct = useCurrentProductStore(useShallow((state) => state.currentProduct));
    return <div className=" text-3xl text-white">{currentProduct.id ? currentProduct.name : "Продукт не выбран"}</div>;
  }

  function Batch() {
    return <div className=" text-3xl text-white">0056272201202518255601</div>;
  }

  interface ModalProps {
    open: boolean;
    onClose: (value: boolean) => void;
  }
  function ModalWindow(props: ModalProps) {
    return (
      <Dialog {...props} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-zinc-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                  </div> */}
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-xl font-semibold text-orange-600">
                      Выбор продукта
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently removed.
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => props.onClose(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => props.onClose(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  }

  function SelectProductButton() {
    const setCurentProduct = useCurrentProductStore(useShallow((state) => state.setCurrentProduct));
    const currentProduct = useCurrentProductStore(useShallow((state) => state.currentProduct));
    const handleClick = () => {
      !currentProduct.id && setCurentProduct(products[1]);
    };
    return (
      <div
        className={` flex w-full h-full justify-center items-center rounded-md text-4xl ${
          currentProduct.id ? "text-gray-600 bg-gray-500" : "text-white bg-orange-600"
        }`}
        onClick={() => handleClick()}
      >
        Выбрать продукт
      </div>
    );
  }

  function Control() {
    // const setCurentProduct = useCurrentProductStore(useShallow((state) => state.setCurrentProduct));
    // const currentProduct = useCurrentProductStore(useShallow((state) => state.currentProduct));
    return (
      <div className="w-full grid  grid-cols-6 grid-rows-4 gap-3 ">
        <div className={`col-span-6`}>
          <SelectProductButton />
        </div>
        {/* <div
          className={`col-span-3   rounded-md text-2xl ${
            currentProduct.id ? "text-gray-600 bg-gray-500" : "text-white bg-orange-600"
          }`}
          //   onClick={() => setOpenModal(true)}
          onClick={() => setCurentProduct(products[1])}
        >
          <div className="flex w-full h-full justify-center items-center">Выбрать продукт</div>
        </div> */}
        {/* <div className="col-span-3   rounded-md text-2xl text-white bg-cyan-600">
          <div className="flex w-full h-full justify-center items-center">Выбрать партию</div>
        </div> */}

        {/* <div className="col-span-6   rounded-md text-2xl text-white bg-teal-600">
          <div className="flex w-full h-full justify-center items-center">Комплектующие</div>
        </div>
        <div className="col-span-3   rounded-md text-2xl text-white bg-purple-600">
          <div className="flex w-full h-full justify-center items-center">Параметры</div>
        </div>
        <div className="col-span-3   rounded-md text-2xl text-white bg-sky-600">
          <div className="flex w-full h-full justify-center items-center">Маркировка</div>
        </div> */}

        <div className="col-span-6   rounded-md text-4xl text-white bg-lime-600">
          <div className="flex w-full h-full justify-center items-center">Начать выпуск</div>
        </div>

        <div className="col-span-6   rounded-md text-4xl text-white bg-yellow-600">
          <div className="flex w-full h-full justify-center items-center">Пауза</div>
        </div>

        <div className="col-span-6   rounded-md text-4xl text-white bg-fuchsia-600">
          <div className="flex w-full h-full justify-center items-center">Закончить выпуск</div>
        </div>
      </div>
    );
  }

  function LeftControl() {
    return (
      <div className="w-full grid  grid-cols-3 grid-rows-1 gap-3 ">
        <div className="   rounded-md text-3xl text-white bg-teal-600">
          <div className="flex w-full h-full justify-center items-center">КОМПЛЕКТУЮЩИЕ</div>
        </div>
        <div className="   rounded-md text-4xl text-white bg-purple-600">
          <div className="flex w-full h-full justify-center items-center">Параметры</div>
        </div>
        <div className="   rounded-md text-4xl text-white bg-sky-600">
          <div className="flex w-full h-full justify-center items-center">Маркировка</div>
        </div>
      </div>
    );
  }

  let [searchParams] = useSearchParams();
  const line = searchParams.get("line");
  const { data, isSuccess } = useLines(line);

  if (isSuccess && !data.length) {
    return <div>Площадка из строки поиска отсутствует в базе данных...</div>;
  }

  if (line === null) {
    return <div>Отсутствует выбор площадки в строке поиска...</div>;
  }

  return (
    <>
      {isSuccess && (
        <Layout>
          <Layout.Header>
            <div className="font-sans font-bold text-4xl text-white">{data[0].description}</div>
            {/* <div className="font-sans font-bold text-4xl text-white">Линия 1</div> */}
            <div className="font-sans font-bold text-4xl text-white">Пост 1</div>
          </Layout.Header>
          <Layout.Subheader>
            <Layout.Product>
              <Layout.ProductName>
                <Product />
              </Layout.ProductName>
              <Layout.Batch>
                <Batch />
              </Layout.Batch>
            </Layout.Product>

            <Layout.State>
              {/* <div className="font-sans font-bold text-3xl text-amber-600">Статус: </div> */}
              <div className="font-sans font-bold text-3xl text-green-700 "> Фасуется</div>
            </Layout.State>
          </Layout.Subheader>
          <Layout.Main>
            <Layout.View>
              <Layout.Info>Info</Layout.Info>
              <Layout.LeftControl>
                <LeftControl />
              </Layout.LeftControl>
            </Layout.View>

            <Layout.Control>
              <Control />
            </Layout.Control>
          </Layout.Main>
          <Layout.Footer>
            <DateComponent />
            <Clock />
          </Layout.Footer>
          <ModalWindow open={openModal} onClose={(val: boolean) => setOpenModal(val)} />
        </Layout>
      )}
    </>
  );
}
