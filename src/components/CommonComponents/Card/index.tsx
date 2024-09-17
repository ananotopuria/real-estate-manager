import React from "react";
import { BiSolidArea } from "react-icons/bi";
import { IoIosBed } from "react-icons/io";
import { GiMailbox } from "react-icons/gi";
import { TiLocation } from "react-icons/ti";

interface PropertyCardProps {
  imageSrc: string;
  label: string;
  price: string;
  address: string;
  bedrooms: number;
  area: number;
  zipCode: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  imageSrc,
  label,
  price,
  address,
  bedrooms,
  area,
  zipCode,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg w-[26rem] h-[35rem]">
      <div className="relative">
        <div
          className="absolute top-2 left-2 text-white px-3 py-1 rounded-lg font-bold"
          style={{ backgroundColor: "#02152680" }}
        >
          {label}
        </div>
        <img src={imageSrc} alt="property" className="w-full h-auto" />
      </div>
      <div className="p-4">
        <p className="text-[2.8rem] font-bold text-custom-blue">{price}</p>
        <p className="text-gray-600 mt-2 flex items-center gap-2">
          <TiLocation />
          <span>{address}</span>
        </p>
        <div className="flex justify-between mt-4">
          <p className="text-gray-600 flex items-center gap-2">
            <IoIosBed />
            <span>{bedrooms}</span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <BiSolidArea /> <span>{area}მ²</span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <GiMailbox /> <span>{zipCode}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
