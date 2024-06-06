// import * as React from "react";
import { IRecord } from "../../services/SummaryService";
import classes from "./laboratoryTable.module.css";

interface LaboratoryTableProps {
  makeHistoryRecord(boil: string, code: string | null, historyType: string): void;
  records: IRecord[];
  pending: boolean;
}

export default function LaboratoryTable(props: LaboratoryTableProps) {
  return (
    <div className={classes.container}>
      {props.records.length > 0 && (
        <table className={classes.laboratory_table_table}>
          <thead className={classes.laboratory_table_header}>
            <tr className={classes.laboratory_table_thead}>
              <td className={classes.laboratory_table_thead_td} style={{ width: "100px" }}>
                Код 1С
              </td>
              <td className={classes.laboratory_table_thead_td} style={{ width: "150px" }}>
                Артикул
              </td>
              <td className={classes.laboratory_table_thead_td} style={{ width: "100px" }}>
                Партия
              </td>
              <td className={classes.laboratory_table_thead_td} style={{ width: "100px" }}>
                План
              </td>
              <td className={classes.laboratory_table_thead_td} style={{ width: "100px" }}>
                Аппарат
              </td>
              <td className={classes.laboratory_table_thead_td} style={{ width: "100px" }}>
                Емкость
              </td>
              <td className={classes.laboratory_table_thead_td} style={{ width: "100px" }}>
                Конвейер
              </td>
              <td className={classes.laboratory_table_thead_td} style={{ width: "150px" }}>
                Статус
              </td>
              <td className={classes.laboratory_table_thead_td} style={{ width: "200px" }}>
                Записал
              </td>
              <td className={classes.laboratory_table_thead_td} style={{ width: "150px" }}>
                Допуск
              </td>
              <td className={classes.laboratory_table_thead_td} style={{ width: "150px" }}>
                Карантин
              </td>
            </tr>
          </thead>

          <tbody style={{ borderRadius: "10px", overflow: "auto", display: "flex", flexDirection: "column" }}>
            {props.records.map((record) => (
              <tr key={record.id} className={classes.laboratory_table_body_tr}>
                <td className={classes.laboratory_table_body_td} style={{ width: "100px" }}>
                  {record.product.code1C}
                </td>
                <td className={classes.laboratory_table_body_td} style={{ width: "150px" }}>
                  {record.product.marking}
                </td>
                <td className={classes.laboratory_table_body_td} style={{ width: "100px" }}>
                  {record.boil.value}
                </td>
                <td className={classes.laboratory_table_body_td} style={{ width: "100px" }}>
                  {record.plan}
                </td>
                <td className={classes.laboratory_table_body_td} style={{ width: "100px" }}>
                  {record.apparatus.value}
                </td>
                <td className={classes.laboratory_table_body_td} style={{ width: "100px" }}>
                  {record.can.value}
                </td>
                <td className={classes.laboratory_table_body_td} style={{ width: "100px" }}>
                  {record.conveyor.value}
                </td>
                <td className={classes.laboratory_table_body_td} style={{ width: "150px", fontSize: "0.8rem" }}>
                  {record.histories.length
                    ? record.histories[record.histories.length - 1].historyType.description
                    : "-"}
                </td>
                <td className={classes.laboratory_table_body_td} style={{ width: "200px", fontSize: "0.8rem" }}>
                  {record.histories.length > 0 &&
                    record.histories[record.histories.length - 1].user &&
                    record.histories[record.histories.length - 1].user?.name}
                  {record.histories.length > 0 &&
                    record.histories[record.histories.length - 1].employee &&
                    record.histories[record.histories.length - 1].employee?.name}
                  {record.histories.length <= 0 && "-"}
                </td>
                <td className={classes.laboratory_table_body_td} style={{ width: "150px" }}>
                  {record.histories.length > 0 &&
                    record.histories[record.histories.length - 1].historyType.value === "base_check" && (
                      <button
                        disabled={props.pending}
                        className={classes.passButton}
                        onClick={() => props.makeHistoryRecord(record.boil.value, record.product.code1C, "plug_pass")}
                      >
                        Подключение
                      </button>
                    )}
                  {record.histories.length > 0 &&
                    record.histories[record.histories.length - 1].historyType.value === "product_check" && (
                      <button
                        disabled={props.pending}
                        className={classes.passButton}
                        onClick={() =>
                          props.makeHistoryRecord(record.boil.value, record.product.code1C, "product_pass")
                        }
                      >
                        Фасовка
                      </button>
                    )}
                  {/* <button
                    disabled={props.pending}
                    className={classes.passButton}
                    onClick={() => props.makeHistoryRecord(record.boil.value, record.product.code1C, "plug_pass")}
                  >
                    Подключение
                  </button> */}
                </td>
                <td className={classes.laboratory_table_body_td} style={{ width: "150px" }}>
                  <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <button
                      disabled={props.pending}
                      className={classes.stopButton}
                      onClick={() => props.makeHistoryRecord(record.boil.value, null, "base_fail")}
                    >
                      Основа
                    </button>

                    <button
                      disabled={props.pending}
                      className={classes.stopButton}
                      onClick={() => props.makeHistoryRecord(record.boil.value, record.product.code1C, "product_fail")}
                    >
                      Продукт
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {/* </div> */}
          </tbody>
          {/* </div> */}
        </table>
      )}
    </div>
  );
}
