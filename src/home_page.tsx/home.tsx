// import Cube from "./cube";
// import React, { useEffect, useState } from "react";


// export default function Home() {
//   const [greeting, setGreeting] = useState("Hello, Junior!");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setGreeting("Привет, Студент!");
//     }, 2000); // 2000 миллисекунд = 2 секунды

//     return () => clearTimeout(timer); // Очистка таймера при размонтировании
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
//       <h1 className="text-3xl font-bold mb-6">{greeting}</h1>
//       <div className="w-full max-w-2xl">
//         <Cube />
//       </div>
//     </div>
//   );
// }