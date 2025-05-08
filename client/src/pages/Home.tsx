import HomeScreen from "../components/HomeScreen";
import Footer from "../components/Footer";
function Home() {
  // /* @ts-expect-error || React can`t init this*/
  // const tg = window.Telegram.WebApp;
  // const data = tg.initData;
  // tg.expand();
  // tg.setHeaderColor("#2a2a2d");
  // tg.setBackgroundColor("#2a2a2d");

  // const [info, setInfo] = useState<User | null>(null);

  // const [mobileBlur, setMobileBlur] = useState(false);

  // const handleMobileblur = () => {
  //   setMobileBlur((prev) => !prev);
  // };

  // useEffect(() => {
  //   const validate = async () => {
  //     const result = await ValidateData(data);
  //     await setInfo(result);
  //   };
  //   validate();
  // }, [data]);

  // if (info === null)
  //   return (
  //     <>
  //       <div className="flex w-full h-full justify-center items-center tg__txt flex-col">
  //         <div className="w-[80px] h-[80px] animate-pulse bg-black rounded-full">
  //           <div className="w-[80px] h-[80px] border-b-4 rounded-full animate-spin"></div>
  //         </div>
  //         {data === "" ? <p>Use telegram client!</p> : ""}
  //       </div>
  //     </>
  //   );
  return (
    <>
      <HomeScreen />
      <Footer />
    </>
  );
}

export default Home;
