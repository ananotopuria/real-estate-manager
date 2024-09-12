import Filters from "../components/Filters";

function HomePage() {
  return (
    <section className="mx-[16rem] my-[3rem] flex">
      <div className="border border-[#DBDBDB]">
        <Filters />
      </div>
      <div>
        <button>ლისტის დამატება</button>
        <button>აგენტის დამატება</button>
      </div>
    </section>
  );
}

export default HomePage;
