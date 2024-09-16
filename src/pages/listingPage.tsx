import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import flatImg from "./../assets/image.png";
import { TiLocation } from "react-icons/ti";
import { BiSolidArea } from "react-icons/bi";
import { IoIosBed } from "react-icons/io";
import { GiMailbox } from "react-icons/gi";
import agentImg from "./../assets/Beautiful young woman looking serious.png";
import { MdMailOutline } from "react-icons/md";
import { TbPhoneCall } from "react-icons/tb";
import PropertyCard from "../components/CommonComponents/Card";

function ListingPage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="px-[16rem] mt-[10rem]">
        <button onClick={() => navigate("/")}>
          <FaArrowLeft className="text-[2rem] text-custom-blue pointer" />
        </button>
        <div className="flex mt-[2rem]">
          <div className="flex-1 relative">
            <div className="absolute top-10 left-16 bg-[#02152680] text-white test-[2rem] px-3 py-1 rounded-lg">
              იყიდება
            </div>
            <img src={flatImg} alt="flat image" className="w-full h-auto" />
            <p className="text-[#808A93] font-[1.6rem] text-end mt-[1rem]">
              გამოქვეყნების თარიღი 08/08/24
            </p>
          </div>
          <div className="flex-1 ml-[6rem] ">
            <h3 className="mt-[0.5rem] text-[4.8rem] font-bold leading-[57.6px] text-custom-blue">
              80,458 &#8382;
            </h3>
            <ul className="w-[34rem]">
              <li className="flex items-center text-[#808A93] mt-[1rem] text-[1.4rem]">
                <TiLocation />
                <span className="ml-2 font-normal">
                  თბილისი, ი. ჭავჭავაძის 53
                </span>
              </li>
              <li className="flex items-center text-[#808A93] mt-[1rem] text-[1.4rem]">
                <BiSolidArea />
                &nbsp;ფართი&nbsp;
                <span>55</span>&nbsp;მ<sup>2</sup>
              </li>
              <li className="flex items-center text-[#808A93] mt-[1rem] text-[1.4rem]">
                <IoIosBed />
                &nbsp; საძინებელი&nbsp;
                <span>2</span>
              </li>
              <li className="flex items-center text-[#808A93] mt-[1rem] text-[1.4rem]">
                <GiMailbox /> &nbsp;საფოსტო ინდექსი&nbsp;
                <span>2525</span>
              </li>
            </ul>
            <p className="mt-[3rem] text-[1.2rem] text-[#808A93]">
              იყიდება ბინა ჭავჭავაძის ქუჩაზე, ვაკეში. ბინა არის ახალი რემონტით,
              ორი საძინებლითა და დიდი აივნებით. მოწყობილია ავეჯითა და ტექნიკით.
            </p>
            <div className="border mt-[3rem] p-6 rounded-lg">
              <div className="flex gap-4">
                <img
                  src={agentImg}
                  alt="agent icon"
                  className="w-[7rem] h-[7rem]"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-custom-blue">სოფიო გელოვანი</p>
                  <p>აგენტი</p>
                </div>
              </div>
              <p className="flex items-center gap-2 mt-[0.5rem] text-[#808A93]">
                <MdMailOutline /> <span>sophio.gelovani@redberry.ge</span>
              </p>
              <p className="flex items-center gap-2 text-[#808A93]">
                <TbPhoneCall /> <span>577 777 777</span>
              </p>
            </div>
            <button className="mt-[1rem] p-[0.5rem] text-[#676E76] border rounded-md">
              ლისტინგის წაშლა
            </button>
          </div>
        </div>
      </section>
      <section className="px-[16rem] mt-[2rem]">
        <h2 className="text-custom-blue text-[3rem] font-medium">
          ბინები მსგავს ლოკაციაზე
        </h2>
        <div className="flex gap-[2rem]">
          <div className="mt-2">
            <PropertyCard
              imageSrc={flatImg}
              label="იყიდება"
              price="$200,000"
              address="123 Main St, თბილისი"
              bedrooms={3}
              area={120}
              zipCode="12345"
            />
          </div>
          <div className="mt-2">
            <PropertyCard
              imageSrc={flatImg}
              label="იყიდება"
              price="$200,000"
              address="123 Main St, თბილისი"
              bedrooms={3}
              area={120}
              zipCode="12345"
            />
          </div>
          <div className="mt-2">
            <PropertyCard
              imageSrc={flatImg}
              label="იყიდება"
              price="$200,000"
              address="123 Main St, თბილისი"
              bedrooms={3}
              area={120}
              zipCode="12345"
            />
          </div>
          <div className="mt-2">
            <PropertyCard
              imageSrc={flatImg}
              label="იყიდება"
              price="$200,000"
              address="123 Main St, თბილისი"
              bedrooms={3}
              area={120}
              zipCode="12345"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default ListingPage;
