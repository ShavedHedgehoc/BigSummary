import * as React from "react";
import { IRecord } from "../../services/SummaryService";

interface SummaryTableProps {
  records: IRecord[];
}

export default function SummaryTable(props: SummaryTableProps) {
  const [records, setRecords] = React.useState({} as IRecord[]);

  let currPage: number;
  currPage = 0;
  const cardsPerPage = 20;

  const setData = (perPage: number) => {
    const recCount = props.records.length;
    const start = currPage * cardsPerPage;
    const end = Math.min((currPage + 1) * cardsPerPage, recCount + 1);
    setRecords(props.records.slice(start, end));
    if (currPage < Math.ceil(recCount / perPage) - 1) {
      currPage = currPage + 1;
    } else {
      currPage = 0;
    }
  };

  React.useEffect(() => {
    setData(cardsPerPage);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setData(cardsPerPage);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {records.length > 0 && (
        <div>
          <div>
            <table>
              {records.map((record) => (
                <tr>
                  <td>{record.product.code1C}</td>
                  <td>{record.product.marking}</td>
                  <td>{record.boil.value}</td>
                  <td>{record.plan}</td>
                  <td>{record.apparatus.value}</td>
                  <td>{record.can.value}</td>
                  <td>{record.conveyor.value}</td>
                  <td>
                    {record.histories.length > 0
                      ? record.histories[record.histories.length - 1].historyType.description
                      : "-"}
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div></div>
        </div>
      )}
    </>
  );
}
