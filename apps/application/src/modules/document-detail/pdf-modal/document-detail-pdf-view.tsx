import { Sheet } from "@mui/joy";
import { Document, Page, PDFViewer, Text, View, Font, StyleSheet } from "@react-pdf/renderer";
import { usePDFModalStore } from "../store/use-pdf-modal-store";
import { useShallow } from "zustand/react/shallow";
import { useRecordHistories } from "../../../shared/api/use-record-histories";
import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";

export default function DocumentDetailPDFView({
  viewerWidth,
  viewerHeight,
}: {
  viewerWidth: number;
  viewerHeight: number;
}) {
  const record = usePDFModalStore(useShallow((state) => state.record));
  const { data, isSuccess } = useRecordHistories(record ? record.id : null);

  Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
  });

  const styles = StyleSheet.create({
    body: {
      fontFamily: "Roboto",
      backgroundColor: "white",
      paddingTop: "30px",
      paddingBottom: "30px",
      paddingLeft: "10px",
      paddingRight: "10px",
    },

    header: {
      textAlign: "center",
      fontSize: "16px",
      paddingBottom: "15px",
    },

    subheader: {
      textAlign: "left",
      fontSize: "12px",
    },

    table: {
      width: "100%",
      marginTop: "10px",
      borderTop: "1 gray solid",
      borderLeft: "1 gray solid",
      borderRight: "1 gray solid",
      borderBottom: "1 gray solid",
      borderRadius: "4px",
    },

    table_header: {
      width: "100%",
      backgroundColor: "#93c5fd",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
      fontSize: "10px",
      display: "flex",
      flexDirection: "row",
      paddingTop: 5,
      paddingBottom: 5,
    },

    table_row: {
      width: "100%",
      fontSize: "10px",
      display: "flex",
      flexDirection: "row",
      borderTop: "1 black solid",
      paddingTop: 5,
      paddingBottom: 5,
    },

    first_cell: {
      display: "flex",
      width: "70px",
      height: "100%",
      justifyContent: "center",
      flexShrink: 1,
    },

    second_cell: {
      display: "flex",
      width: "60px",
      height: "100%",
      justifyContent: "center",
      flexShrink: 1,
    },

    third_cell: {
      display: "flex",
      width: "140px",
      height: "100%",
      justifyContent: "center",
      paddingLeft: 10,
      flexShrink: 0,
    },

    fourth_cell: {
      display: "flex",
      width: "120px",
      height: "100%",
      justifyContent: "center",
      paddingLeft: 10,
      flexShrink: 0,
    },

    fifth_cell: {
      display: "flex",
      flexGrow: 0,
      width: "200px",
      height: "100%",
      justifyContent: "center",
      paddingLeft: 10,
      paddingRight: 10,
    },
  });

  return (
    <Sheet variant="outlined" sx={{ borderRadius: "sm", mb: 1 }}>
      <PDFViewer style={{ width: viewerWidth, height: viewerHeight, margin: 0, borderRadius: "8px" }}>
        <Document>
          <Page size="A4" orientation="portrait" style={styles.body}>
            <Text style={styles.header}>Информация по фасовке</Text>
            <Text style={styles.subheader}>Артикул: {record?.product}</Text>
            <Text style={styles.subheader}>Партия: {record?.boil}</Text>
            <Text style={styles.subheader}>Конвейер: {record?.conveyor}</Text>
            {isSuccess && data.histories.length > 0 && (
              <View style={styles.table} wrap={true}>
                <View style={styles.table_header} wrap={false}>
                  <View style={styles.first_cell}>
                    <Text style={{ width: 70, textAlign: "center" }}>Дата</Text>
                  </View>
                  <View style={styles.second_cell}>
                    <Text style={{ width: 60, textAlign: "center" }}>Время</Text>
                  </View>
                  <View style={styles.third_cell}>
                    <Text>Статус</Text>
                  </View>
                  <View style={styles.fourth_cell}>
                    <Text>Автор</Text>
                  </View>
                  <View style={styles.fifth_cell}>
                    <Text>Комментарий</Text>
                  </View>
                </View>
                {data.histories.map((item) => (
                  <View key={item.id} wrap={false} style={styles.table_row}>
                    <View style={styles.first_cell}>
                      <Text style={{ width: 70, textAlign: "center" }}>{formatDateToString(item.createdAt)}</Text>
                    </View>
                    <View style={styles.second_cell}>
                      <Text style={{ width: 60, textAlign: "center" }}>{formatTimeToString(item.createdAt)}</Text>
                    </View>
                    <View style={styles.third_cell}>
                      <Text>{item.historyType.description}</Text>
                    </View>
                    <View style={styles.fourth_cell}>
                      <Text>{item.user ? item.user.name : item.employee ? item.employee.name : "-"}</Text>
                    </View>
                    <View style={styles.fifth_cell}>
                      <Text>{item.history_note ? item.history_note.value : ""}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </Page>
        </Document>
      </PDFViewer>
    </Sheet>
  );
}
