// import { User } from "../interfaces/interfaces";
// import { useState } from "react";
// import plusImg from "../assets/plus.svg";
// import ModalAddFund from "./Modal";

// function Header({ first_name, balance, photo_url, lang }: User) {
//   const [addFund, setAddFund] = useState(false);

//   const handleClickFund = () => {
//     setAddFund((prev) => !prev);
//   };

//   return (
//     <>
//       <header className="w-full h-[13%] tg__header flex justify-evenly rounded-b-3xl">
//         <div className="left__side w-[45%] h-full flex items-center">
//           <div className="tg__btn h-[55%] border-white rounded-full w-[80%] md:w-[40%] flex items-center justify-center gap-1.5 md:gap-5 p-1">
//             <p className="tg__txt rounded-full text-center pl-1.5 pr-1.5">
//               {balance} ₽
//             </p>
//             <button
//               className="tg__btn flex items-center justify-center h-full"
//               onClick={handleClickFund}
//             >
//               <span>
//                 <img
//                   src={plusImg}
//                   alt=""
//                   className="h-[22px] w-[22px] rounded-full cursor-pointer transition-transform duration-150 hover:scale-110"
//                 />
//               </span>
//             </button>
//           </div>
//         </div>
//         <div className="right__side w-[45%] flex items-center flex-row-reverse gap-2">
//           <img src={photo_url} alt="" className="w-[42px] rounded-full" />
//           <p>{first_name}</p>
//         </div>
//       </header>
//       {addFund === true ? (
//         <Modal handleClickFund={handleClickFund} lang={lang} />
//       ) : (
//         ""
//       )}
//     </>
//   );
// }

// export default Header;
