import * as React from "react";
import { Context } from "../../main";
import { Box, Option, Select, Sheet, Typography } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { observer } from "mobx-react-lite";

export const perPageValues = [10, 15, 20, 50, 90];

// export interface PaginationComponentProps {
//   firstRecord: number;
//   lastRecord: number;
//   total: number;
//   limit: number;
//   page: number;
//   pages: number;
//   changeLimit(val: number): void;
//   firstPage(): void;
//   lastPage(): void;
//   prevPage(): void;
//   nextPage(): void;
// }

function PaginationComponent() {
  const { store } = React.useContext(Context);

  return (
    <React.Fragment>
      <Sheet
        className="Container"
        variant="outlined"
        sx={[
          {
            display: { xs: "none", xl: "flex" },
            width: "100%",
            borderRadius: "sm",
            justifyContent: "flex-end",
            mt: "auto",
            gap: 3,
            p: 1,
            borderWidth: "1px",
          },
          (theme) => ({
            backgroundColor: theme.variants.soft.neutral,
          }),
        ]}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography level="body-xs">
              Записи: {store.BoilStore.firstRecord} - {store.BoilStore.lastRecord} из {store.BoilStore.state.data.total}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography level="body-xs">Записей на странице:</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Select
              size="sm"
              sx={{ fontSize: "small" }}
              defaultValue={store.BoilStore.state.limit}
              slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
              disabled={store.BoilStore.pages === 0}
              onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
                event && newValue && store.BoilStore.changeLimit(newValue);
              }}
            >
              {perPageValues.map((val) => (
                <Option value={val} key={val}>
                  <Typography level="body-xs">{val}</Typography>
                </Option>
              ))}
            </Select>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={store.BoilStore.state.page === 1 || store.BoilStore.pages === 0}
            onClick={() => store.BoilStore.firstPage()}
          >
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </IconButton>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={store.BoilStore.state.page === 1 || store.BoilStore.pages === 0}
            onClick={() => store.BoilStore.prevPage()}
          >
            <KeyboardArrowLeftOutlinedIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography level="body-xs">
              Страница {store.BoilStore.pages === 0 ? 0 : store.BoilStore.state.page} из {store.BoilStore.pages}
            </Typography>
          </Box>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={store.BoilStore.state.page === store.BoilStore.pages || store.BoilStore.pages === 0}
            onClick={() => store.BoilStore.nextPage()}
          >
            <KeyboardArrowRightOutlinedIcon />
          </IconButton>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={store.BoilStore.state.page === store.BoilStore.pages || store.BoilStore.pages === 0}
            onClick={() => store.BoilStore.lastPage()}
          >
            <KeyboardDoubleArrowRightOutlinedIcon />
          </IconButton>
        </Box>
      </Sheet>
    </React.Fragment>
  );
}

// function PaginationComponent(props: PaginationComponentProps) {
//   // const { store } = React.useContext(Context);
//   const RecordsComponent = observer(() => (
//     <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 1 }}>
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <Typography level="body-xs">
//           Записи: {props.firstRecord} - {props.lastRecord} из {props.total}
//         </Typography>
//       </Box>
//     </Box>
//   ));
//   const OptionComponent = observer(() =>
//     perPageValues.map((val) => (
//       <Option value={val} key={val}>
//         <Typography level="body-xs">{val}</Typography>
//       </Option>
//     ))
//   );

//   const SelectComponent = observer(() => (
//     <Select
//       size="sm"
//       sx={{ fontSize: "small" }}
//       defaultValue={props.limit}
//       slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
//       disabled={props.pages === 0}
//       onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
//         event?.stopPropagation();
//         event?.preventDefault();
//         event && newValue && props.changeLimit(newValue);
//       }}
//     >
//       <OptionComponent />
//     </Select>
//   ));
//   const LimitComponent = observer(() => (
//     <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 1 }}>
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <Typography level="body-xs">Записей на странице:</Typography>
//       </Box>
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <SelectComponent />
//         {/* <Select
//           size="sm"
//           sx={{ fontSize: "small" }}
//           defaultValue={props.limit}
//           slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
//           disabled={props.pages === 0}
//           onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
//             event && newValue && props.changeLimit(newValue);
//           }}
//         > */}
//         {/* <OptionComponent /> */}
//         {/* {perPageValues.map((val) => (
//             <Option value={val} key={val}>
//               <Typography level="body-xs">{val}</Typography>
//             </Option>
//           ))}
//         </Select> */}
//       </Box>
//     </Box>
//   ));

//   const ButtonComponent = observer(() => (
//     <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//       <IconButton
//         size="sm"
//         variant="outlined"
//         disabled={props.page === 1 || props.pages === 0}
//         onClick={() => props.firstPage()}
//       >
//         <KeyboardDoubleArrowLeftOutlinedIcon />
//       </IconButton>
//       <IconButton
//         size="sm"
//         variant="outlined"
//         disabled={props.page === 1 || props.pages === 0}
//         onClick={() => props.prevPage()}
//       >
//         <KeyboardArrowLeftOutlinedIcon />
//       </IconButton>
//       <Box sx={{ display: "flex", alignItems: "center" }}>
//         <Typography level="body-xs">
//           Страница {props.pages === 0 ? 0 : props.page} из {props.pages}
//         </Typography>
//       </Box>
//       <IconButton
//         size="sm"
//         variant="outlined"
//         disabled={props.page === props.pages || props.pages === 0}
//         onClick={() => props.nextPage()}
//       >
//         <KeyboardArrowRightOutlinedIcon />
//       </IconButton>
//       <IconButton
//         size="sm"
//         variant="outlined"
//         disabled={props.page === props.pages || props.pages === 0}
//         onClick={() => props.lastPage()}
//       >
//         <KeyboardDoubleArrowRightOutlinedIcon />
//       </IconButton>
//     </Box>
//   ));
//   return (
//     <React.Fragment>
//       <Sheet
//         className="Container"
//         variant="outlined"
//         sx={[
//           {
//             display: { xs: "none", xl: "flex" },
//             width: "100%",
//             borderRadius: "sm",
//             justifyContent: "flex-end",
//             mt: "auto",
//             gap: 3,
//             p: 1,
//             borderWidth: "1px",
//           },
//           (theme) => ({
//             backgroundColor: theme.variants.soft.neutral,
//           }),
//         ]}
//       >
//         <RecordsComponent />
//         <LimitComponent />
//         <ButtonComponent />

{
  /* <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={props.page === 1 || props.pages === 0}
            onClick={() => props.firstPage()}
          >
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </IconButton>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={props.page === 1 || props.pages === 0}
            onClick={() => props.prevPage()}
          >
            <KeyboardArrowLeftOutlinedIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography level="body-xs">
              Страница {props.pages === 0 ? 0 : props.page} из {props.pages}
            </Typography>
          </Box>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={props.page === props.pages || props.pages === 0}
            onClick={() => props.nextPage()}
          >
            <KeyboardArrowRightOutlinedIcon />
          </IconButton>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={props.page === props.pages || props.pages === 0}
            onClick={() => props.lastPage()}
          >
            <KeyboardDoubleArrowRightOutlinedIcon />
          </IconButton>
        </Box> */
}
//       </Sheet>
//     </React.Fragment>
//   );
// }

export default observer(PaginationComponent);
// export default PaginationComponent;
