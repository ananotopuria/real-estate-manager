import React, { useState, useEffect } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageUpload from "../components/AddListingComponents/ImageUpload";
import Button from "../components/CommonComponents/Button";
import { FaCheck } from "react-icons/fa6";

interface Region {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

interface Agent {
  id: number;
  name: string;
}

interface ListingFormValues {
  address: string;
  price: number;
  area: number;
  bedrooms: number;
  city: string;
  region: string;
  description: string;
  postalCode: string;
  saleRentTag: string;
  agent: string;
  image: File | null;
}

const AddListingForm = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/regions",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer 9d01f43f-5130-4ab4-9329-f6f43456d1ff`,
            },
          }
        );
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
            `https://api.real-estate-manager.redberryinternship.ge/api/cities?regionId=${selectedRegion}`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer 9d01f43f-5130-4ab4-9329-f6f43456d1ff`,
              },
            }
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

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/agents",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer 9d01f43f-5130-4ab4-9329-f6f43456d1ff`,
            },
          }
        );
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  const validationSchema = Yup.object({
    address: Yup.string()
      .required("სავალდებულოა")
      .min(2, `ჩაწერეთ ვალიდური მონაცემები`),
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
    postalCode: Yup.string()
      .required("სავალდებულოა")
      .matches(/^\d+$/, "მხოლოდ რიცხვები"),
    price: Yup.number()
      .required("სავალდებულოა")
      .integer("მთელი რიცხვი უნდა იყოს"),
    area: Yup.number().required("სავალდებულოა"),
    bedrooms: Yup.number()
      .required("სავალდებულოა")
      .integer("მთელი რიცხვი უნდა იყოს"),
    description: Yup.string()
      .required("სავალდებულოა")
      .test("minWords", "მინიმუმ 5 სიტყვა", (value) => {
        if (!value) return false;
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 5;
      }),
    saleRentTag: Yup.string().required("სავალდებულოა"),
    agent: Yup.string().required("სავალდებულოა"),
  });

  const handleSubmit = async (values: ListingFormValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === "number") {
        formData.append(key, value.toString());
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    formData.append(
      "Authorization",
      `Bearer 9d01f43f-5130-4ab4-9329-f6f43456d1ff`
    );

    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
          postalCode: "",
          price: 0,
          area: 0,
          bedrooms: 0,
          description: "",
          saleRentTag: "",
          agent: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched, values }) => (
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
                <div className="text-sm mt-1 flex items-center">
                  {errors.address && touched.address ? (
                    <div className="text-[#F93B1D] flex items-center">
                      <FaCheck className="text-[#F93B1D] mr-1" />{" "}
                      {errors.address}
                    </div>
                  ) : values.address && !errors.address ? (
                    <div className="text-[#45A849] flex items-center">
                      <FaCheck className="text-[#45A849] mr-1" /> მინიმუმ ორი
                      სიმბოლო
                    </div>
                  ) : (
                    <div className="text-black flex items-center">
                      <FaCheck className="text-black mr-1" /> მინიმუმ ორი
                      სიმბოლო
                    </div>
                  )}
                </div>
              </div>
              <div className="text-[1.2rem] flex flex-col w-full">
                <label htmlFor="zipCode">საფოსტო ინდექსი *</label>
                <Field
                  name="zipCode"
                  type="number"
                  className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                />
                <div className="text-sm mt-1 flex items-center">
                  {errors.postalCode && touched.postalCode ? (
                    <div className="text-[#F93B1D] flex items-center">
                      <FaCheck className="text-[#F93B1D] mr-1" />{" "}
                      {errors.postalCode}
                    </div>
                  ) : values.postalCode && !errors.postalCode ? (
                    <div className="text-[#45A849] flex items-center">
                      <FaCheck className="text-[#45A849] mr-1" /> მხოლოდ
                      რიცხვები
                    </div>
                  ) : (
                    <div className="text-black flex items-center">
                      <FaCheck className="text-black mr-1" /> მხოლოდ რიცხვები
                    </div>
                  )}
                </div>
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

            <h3 className="mt-[4rem] text-[1.6rem]">ბინის დეტალები</h3>
            <div className="flex mt-2 justify-between gap-[2rem]">
              <div className="text-[1.2rem] flex flex-col w-full">
                <label htmlFor="price">ფასი</label>
                <Field
                  name="price"
                  type="number"
                  className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                />
                <div className="text-sm mt-1 flex items-center">
                  {errors.price && touched.price ? (
                    <div className="text-[#F93B1D] flex items-center">
                      <FaCheck className="text-[#F93B1D] mr-1" /> {errors.price}
                    </div>
                  ) : values.price && !errors.price ? (
                    <div className="text-[#45A849] flex items-center">
                      <FaCheck className="text-[#45A849] mr-1" /> მხოლოდ
                      რიცხვები
                    </div>
                  ) : (
                    <div className="text-black flex items-center">
                      <FaCheck className="text-black mr-1" /> მხოლოდ რიცხვები
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[1.2rem] flex flex-col w-full">
                <label htmlFor="area">ფართობი</label>
                <Field
                  name="area"
                  type="number"
                  className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                />
                <div className="text-sm mt-1 flex items-center">
                  {errors.area && touched.area ? (
                    <div className="text-[#F93B1D] flex items-center">
                      <FaCheck className="text-[#F93B1D] mr-1" /> {errors.area}
                    </div>
                  ) : values.area && !errors.area ? (
                    <div className="text-[#45A849] flex items-center">
                      <FaCheck className="text-[#45A849] mr-1" /> მხოლოდ
                      რიცხვები
                    </div>
                  ) : (
                    <div className="text-black flex items-center">
                      <FaCheck className="text-black mr-1" /> მხოლოდ რიცხვები
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-[1.2rem] flex flex-col w-[48.5%] mt-[1rem]">
              <label htmlFor="bedrooms">საძინებლების რაოდენობა *</label>
              <Field
                name="bedrooms"
                type="number"
                className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
              />
              <div className="text-sm mt-1 flex items-center">
                {errors.bedrooms && touched.bedrooms ? (
                  <div className="text-[#F93B1D] flex items-center">
                    <FaCheck className="text-[#F93B1D] mr-1" />{" "}
                    {errors.bedrooms}
                  </div>
                ) : values.bedrooms && !errors.bedrooms ? (
                  <div className="text-[#45A849] flex items-center">
                    <FaCheck className="text-[#45A849] mr-1" /> მხოლოდ რიცხვები
                  </div>
                ) : (
                  <div className="text-black flex items-center">
                    <FaCheck className="text-black mr-1" /> მხოლოდ რიცხვები
                  </div>
                )}
              </div>
            </div>

            <div className="mt-[2rem] flex flex-col text-[1.2rem]">
              <label htmlFor="description">აღწერა</label>
              <Field
                name="description"
                as="textarea"
                className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2 h-[13rem]"
              />
              <div className="text-sm mt-1 flex items-center">
                {errors.description && touched.description ? (
                  <div className="text-[#F93B1D] flex items-center">
                    <FaCheck className="text-[#F93B1D] mr-1" />{" "}
                    {errors.description}
                  </div>
                ) : values.description && !errors.description ? (
                  <div className="text-[#45A849] flex items-center">
                    <FaCheck className="text-[#45A849] mr-1" /> მინიმუმ ხუთი
                    სიტყვა
                  </div>
                ) : (
                  <div className="text-black flex items-center">
                    <FaCheck className="text-black mr-1" /> მინიმუმ ხუთი სიტყვა
                  </div>
                )}
              </div>
            </div>
            <ImageUpload setFieldValue={setFieldValue} />
            <h3 className="mt-[4rem] text-[1.6rem]">აგენტი</h3>
            <div className="mt-[1rem] flex flex-col">
              <label htmlFor="agent" className="mt-[1rem] text-[1.2rem]">
                აირჩიე
              </label>
              <Field
                as="select"
                name="agent"
                className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2 w-[48.5%]"
              >
                <option value="">აირჩიეთ აგენტი</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </Field>

              <ErrorMessage name="agent">
                {(msg) => (
                  <div className="text-red-600 text-sm mt-1">{msg}</div>
                )}
              </ErrorMessage>
            </div>
            <div className="mt-[4rem] mb-[4rem] flex gap-6 justify-end">
              <Button
                title="გაუქმება"
                backgroundColor="#fff"
                textColor="#f93b1d"
              />
              <Button title="დაამატე ლისტინგი" type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddListingForm;
