import React, { useState, useEffect } from "react";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

interface Region {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

const AddListingForm = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch("/api/regions"); 
        const data = await response.json();
        setRegions(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `/api/cities?regionId=${selectedRegion}`
          );
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };

      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedRegion]);

  // Validation
  const validationSchema = Yup.object({
    address: Yup.string()
      .required("სავალდებულოა")
      .min(2, "მისამართი ძალიან მოკლეა"),
    image: Yup.mixed()
      .required("სავალდებულოა")
      .test("fileType", "სურათის ტიპი არასწორია", (value) => {
        return (
          value &&
          value instanceof File &&
          ["image/jpeg", "image/png"].includes(value.type)
        );
      })
      .test("fileSize", "ფაილი არ უნდა აღემატებოდეს 1MB-ს", (value) => {
        return value && value instanceof File && value.size <= 1024 * 1024;
      }),
    region: Yup.string().required("სავალდებულოა"),
    city: Yup.string().required("სავალდებულოა"),
    zipCode: Yup.number().required("სავალდებულოა"),
    price: Yup.number().required("სავალდებულოა"),
    area: Yup.number().required("სავალდებულოა"),
    bedrooms: Yup.number()
      .required("სავალდებულოა")
      .integer("მთელი რიცხვი უნდა იყოს"),
    description: Yup.string()
      .required("სავალდებულოა")
      .min(5, "მინიმუმ 5 სიტყვა"),
    saleRentTag: Yup.string().required("სავალდებულოა"),
    agent: Yup.string().required("სავალდებულოა"),
  });

  return (
    <section className="px-[50rem]">
      <h2 className="text-center p-[4rem] text-[#021526] text-4xl">
        ლისტინგის დამატება
      </h2>
      <Formik
        initialValues={{
          address: "",
          image: null,
          region: "",
          city: "",
          zipCode: "",
          price: "",
          area: "",
          bedrooms: "",
          description: "",
          saleRentTag: "",
          agent: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <label className="text-[1.6rem]">გარიგების ტიპი</label>
              <div className="flex gap-2 mt-2 text-[1.2rem]">
                <Field type="radio" name="saleRentTag" value="sale" /> იყიდება
                &nbsp;&nbsp;
                <Field type="radio" name="saleRentTag" value="rent" /> ქირავდება
              </div>
            </div>
            <h3 className="mt-[4rem] text-[1.6rem]">მდებარეობა</h3>
            <div className="flex mt-2 justify-between gap-[2rem]">
              <div className="text-[1.2rem] flex flex-col w-full">
                <label htmlFor="address">მისამართი *</label>
                <Field
                  name="address"
                  type="text"
                  className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                />
              </div>
              <div className="text-[1.2rem] flex flex-col w-full">
                <label htmlFor="zipCode">საფოსტო ინდექსი *</label>
                <Field
                  name="zipCode"
                  type="text"
                  className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                />
              </div>
            </div>
            <div className="flex mt-2 justify-between gap-[2rem]">
              <div className="text-[1.2rem] flex flex-col w-full">
                <label htmlFor="region">რეგიონი</label>
                <Field
                  as="select"
                  name="region"
                  className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const regionId = e.target.value;
                    setFieldValue("region", regionId);
                    setSelectedRegion(parseInt(regionId));
                  }}
                >
                  <option value="">აირჩიეთ რეგიონი</option>
                  {Array.isArray(regions) &&
                    regions.map((region) => (
                      <option key={region.id} value={region.id}>
                        {region.name}
                      </option>
                    ))}
                </Field>
              </div>

              <div className="text-[1.2rem] flex flex-col w-full">
                <label htmlFor="city">ქალაქი</label>
                <Field
                  as="select"
                  name="city"
                  className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const cityId = e.target.value;
                    setFieldValue("city", cityId);
                  }}
                >
                  <option value="">აირჩიეთ ქალაქი</option>
                  {Array.isArray(cities) &&
                    cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                </Field>
              </div>
            </div>

            {selectedRegion && (
              <div>
                <label htmlFor="city">ქალაქი</label>
                <Field as="select" name="city" className="input">
                  <option value="">აირჩიეთ ქალაქი</option>
                  {Array.isArray(cities) &&
                    cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                </Field>
              </div>
            )}

            <h3 className="mt-[4rem] text-[1.6rem]">ბინის დეტალები</h3>
            <div className="flex mt-2 justify-between gap-[2rem]">
              <div className="text-[1.2rem] flex flex-col w-full">
                <label htmlFor="price">ფასი</label>
                <Field
                  name="price"
                  type="number"
                  className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                />
              </div>

              <div className="text-[1.2rem] flex flex-col w-full">
                <label htmlFor="area">ფართობი</label>
                <Field
                  name="area"
                  type="number"
                  className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                />
              </div>
            </div>

            <div className="text-[1.2rem] flex flex-col w-[48.5%] mt-[1rem]">
              <label htmlFor="bedrooms">საძინებლების რაოდენობა *</label>
              <Field
                name="bedrooms"
                type="number"
                className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
              />
            </div>

            <div className="mt-[2rem] flex flex-col text-[1.2rem]">
              <label htmlFor="description">აღწერა</label>
              <Field
                name="description"
                as="textarea"
                className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2 h-[13rem]"
              />
            </div>

            <div className="mt-[2rem] flex flex-col">
              <label htmlFor="image">ატვირთეთ ფოტო *</label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.currentTarget.files) {
                    setFieldValue("image", e.currentTarget.files[0]);
                  }
                }}
                className="input"
              />
            </div>

            <div>
              <label htmlFor="agent">აგენტი</label>
              <Field as="select" name="agent" className="input">
                <option value="">აირჩიეთ აგენტი</option>
              </Field>
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddListingForm;
