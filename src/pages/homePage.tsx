import { FaPlus } from "react-icons/fa6";
import Button from "../components/CommonComponents/Button";
import Filters from "../components/HomeComponents/Filters";
import { useNavigate } from "react-router-dom"; 

function HomePage() {
  const navigate = useNavigate(); 

  return (
    <section className="mx-[16rem] my-[3rem] flex justify-between">
      <div className="border border-[#DBDBDB]">
        <Filters />
      </div>
      <div className="flex gap-10">
        <Button
          title="ლისტინგის დამატება"
          icon={<FaPlus />}
          textColor="#ffffff"
          onClick={() => navigate("/add")} 
        />
        <Button
          title="აგენტის დამატება"
          icon={<FaPlus />}
          backgroundColor="#fff"
          textColor="#f93b1d"
          onClick={() => alert("button clicked!")}
        />
      </div>
    </section>
  );
}

export default HomePage;
