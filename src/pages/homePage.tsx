import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "../components/CommonComponents/Button";
import Filters from "../components/HomeComponents/Filters";
import Modal from "../components/HomeComponents/Modal";
import { useNavigate } from "react-router-dom"; 

function HomePage() {
  const navigate = useNavigate();
  const [isAgentModalOpen, setAgentModalOpen] = useState(false);

  const handleAgentAddClick = () => {
    setAgentModalOpen(true);
  };

  const handleCloseModal = () => {
    setAgentModalOpen(false);
  };

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
          onClick={handleAgentAddClick}
        />
      </div>
    {/* modal */}
      {isAgentModalOpen && (
        <Modal open={isAgentModalOpen}>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">აგენტის დამატება</h2>
            <button
              className="mt-4 p-2 bg-red-500 text-white rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default HomePage;
