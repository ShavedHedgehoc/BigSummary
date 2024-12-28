// import * as React from "react";
// import { Box, FormControl, FormLabel, Input, Sheet, Typography, Button } from "@mui/joy";
// import { useNavigate } from "react-router-dom";
// import PendingModal from "../../shared/components/pending-modal";
// import { useLoginFormStore } from "./store/use-login-form-store";
// import { useShallow } from "zustand/shallow";
// import { useLogin } from "./use-login";

// export default function login() {
//   // const isLogin=useLoginFormStore(useShallow((state)=>state.isLogin))
//   const { isLogin, name, email, password, setIsLogin, setName, setEmail, setPassword } = useLoginFormStore();
//   const { processLogin, isPending } = useLogin();
//   const navigate = useNavigate();
//   const handleLogin = () => {
//     store.AuthStore.login(email, password).then(() => {
//       if (store.AuthStore.error.length) {
//         console.log("fail");
//       } else {
//         navigate("/");
//       }
//     });
//   };

//   const handleRegister = () => {
//     store.AuthStore.register(name, email, password).then(() => {
//       if (store.AuthStore.error.length) {
//         console.log("fail");
//       } else {
//         navigate("/");
//       }
//     });
//   };

//   return (
//     <React.Fragment>
//       <PendingModal pending={false} title={"Запрос к базе данных"} content="" />
//       <Box
//         className="MainContent"
//         sx={{
//           flex: 1,
//           display: { xs: "none", sm: "flex" },
//           flexDirection: "column",
//           minWidth: 0,
//           height: "100dvh",
//           gap: 1,
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Sheet
//           sx={{
//             width: "300px",
//             mx: "auto",
//             my: 4, // margin top & bottom
//             py: 3, // padding top & bottom
//             px: 2, // padding left & right
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             borderRadius: "sm",
//             boxShadow: "md",
//           }}
//           variant={"outlined"}
//         >
//           <div>
//             <Typography level="h4">{isLogin ? "Вход" : "Регистрация"}</Typography>
//           </div>
//           {!isLogin && (
//             <FormControl>
//               <FormLabel>Никнэйм</FormLabel>
//               <Input
//                 name="nickname"
//                 type="text"
//                 value={name}
//                 placeholder="Пользователь"
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </FormControl>
//           )}
//           <FormControl>
//             <FormLabel>Электропочта</FormLabel>
//             <Input
//               name="email"
//               type="email"
//               value={email}
//               placeholder="mail@mail.ru"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Пароль</FormLabel>
//             <Input
//               name="password"
//               type="password"
//               value={password}
//               placeholder="*******"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </FormControl>
//           {/* {isLogin && <Button onClick={() => handleLogin()}>Войти</Button>}
//           {!isLogin && <Button onClick={() => handleRegister()}>Зарегистрироваться</Button>} */}
//           <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
//             <Typography level="body-sm">{isLogin ? "В первый раз? " : "Уже зарегистрирован? "}</Typography>
//             <Typography
//               level="body-sm"
//               color="primary"
//               onClick={() => setIsLogin(!isLogin)}
//               sx={{ textDecoration: "underline", cursor: "pointer" }}
//             >
//               {isLogin ? "Зарегистрироваться" : "Войти"}
//             </Typography>
//           </Box>
//         </Sheet>
//       </Box>
//       <Box
//         className="MainContent"
//         sx={{
//           flex: 1,
//           display: { xs: "flex", sm: "none" },
//           flexDirection: "column",
//           minWidth: 0,
//           height: "100dvh",
//           gap: 3,
//           mx: "auto",

//           my: "auto", // margin top & bottom
//           py: 3, // padding top & bottom
//           px: 3, // padding left & right

//           alignItems: "left",
//           justifyContent: "flex-start",
//         }}
//       >
//         <div>
//           <Typography level="h4">{isLogin ? "Вход" : "Регистрация"}</Typography>
//         </div>
//         {!isLogin && (
//           <FormControl>
//             <FormLabel>Никнэйм</FormLabel>
//             <Input
//               name="nickname"
//               type="text"
//               value={name}
//               placeholder="Пользователь"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </FormControl>
//         )}
//         <FormControl>
//           <FormLabel>Электропочта</FormLabel>
//           <Input
//             name="email"
//             type="email"
//             value={email}
//             placeholder="mail@mail.ru"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </FormControl>
//         <FormControl>
//           <FormLabel>Пароль</FormLabel>
//           <Input
//             name="password"
//             type="password"
//             value={password}
//             placeholder="*******"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </FormControl>
//         {isLogin && (
//           <Button size="lg" onClick={() => handleLogin()}>
//             Войти
//           </Button>
//         )}
//         {!isLogin && (
//           <Button size="lg" onClick={() => handleRegister()}>
//             Зарегистрироваться
//           </Button>
//         )}
//         <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
//           <Typography level="body-sm">{isLogin ? "В первый раз? " : "Уже зарегистрирован? "}</Typography>
//           <Typography
//             level="body-sm"
//             color="primary"
//             onClick={() => setIsLogin(!isLogin)}
//             sx={{ textDecoration: "underline", cursor: "pointer" }}
//           >
//             {isLogin ? "Зарегистрироваться" : "Войти"}
//           </Typography>
//         </Box>
//       </Box>
//     </React.Fragment>
//   );
// }
