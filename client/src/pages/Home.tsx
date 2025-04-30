import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header></Header>
      <div className="h-full w-full flex xl:flex flex-col justify-around">
        <section className="w-full h-[65%] rounded-2xl tg__section border-1"></section>
        <div className="btns flex w-full justify-around h-[10%]">
          <button className="tg__btn w-[45%] rounded-4xl border-1"></button>
          <button className="tg__btn w-[45%] rounded-4xl border-1"></button>
        </div>
      </div>
    </>
  );
}

export default Home;
