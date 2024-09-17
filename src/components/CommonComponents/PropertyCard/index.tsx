import React, { useState, useEffect } from "react";
import PropertyCard from "./../PropertyCard"; 

interface City {
  id: number;
  name: string;
  region_id: number;
  region: {
    id: number;
    name: string;
  };
}

interface RealEstate {
  id: number;
  address: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  is_rental: number;
  image: string;
  city_id: number;
  city: City;
}

const RealEstateListing: React.FC = () => {
  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);

  useEffect(() => {
    const fetchRealEstates = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer 9d07d43c-d2e5-4af1-94f9-5d83672dee15",
            },
          }
        );

        if (response.ok) {
          const data: RealEstate[] = await response.json();
          setRealEstates(data);
        } else {
          console.error("Error fetching real estates");
        }
      } catch (error) {
        console.error("Error fetching real estates:", error);
      }
    };

    fetchRealEstates();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {realEstates.map((estate) => (
        <PropertyCard
          key={estate.id}
          imageSrc={estate.image}
          label={estate.city.name}
          price={`${estate.price.toLocaleString()} ₾`}
          address={`${estate.address}, ${estate.city.name}`}
          bedrooms={estate.bedrooms}
          area={estate.area}
          zipCode={estate.zip_code}
        />
      ))}
    </div>
  );
};

export default RealEstateListing;
