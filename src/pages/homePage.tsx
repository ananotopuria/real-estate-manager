import { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import Button from "../components/CommonComponents/Button";
import Filters from "../components/HomeComponents/Filters";
import Modal from "../components/HomeComponents/Modal";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ImageUpload from "../components/AddListingComponents/ImageUpload";

interface AgentFormValues {
  name: string;
  surname: string;
  email: string;
  avatar: File | null;
  phone: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს")
    .required("სახელი სავალდებულოა"),
  surname: Yup.string()
    .min(2, "გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს")
    .required("გვარი სავალდებულოა"),
  email: Yup.string()
    .email("ელ-ფოსტა უნდა იყოს ვალიდური")
    .matches(/@redberry\.ge$/, "ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge-თ")
    .required("ელ-ფოსტა სავალდებულოა"),
  avatar: Yup.mixed().required("ავატარის ატვირთვა სავალდებულოა"),
  phone: Yup.string()
    .matches(/^5\d{8}$/, "ტელეფონი უნდა იყოს ფორმატის 5XXXXXXXX")
    .required("ტელ-ნომერი სავალდებულოა"),
});

function HomePage() {
  const navigate = useNavigate();
  const [isAgentModalOpen, setAgentModalOpen] = useState(false);

  const handleAgentAddClick = () => {
    setAgentModalOpen(true);
  };

  const handleCloseModal = () => {
    setAgentModalOpen(false);
  };

  const handleSubmit = async (
    values: AgentFormValues,
    { setSubmitting }: FormikHelpers<AgentFormValues>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }

      const response = await axios.post(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        formData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer 9d07d43c-d2e5-4af1-94f9-5d83672dee15",
          },
        }
      );

      console.log("Response:", response.data);
      handleCloseModal();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error("General error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setSubmitting(false);
    }
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

      {isAgentModalOpen && (
        <Modal open={isAgentModalOpen}>
          <div className="p-6 bg-white rounded-lg shadow-lg w-[100rem] h-[65rem]">
            <h2 className="text-[3.2rem] font-bold text-custom-blue mb-6 text-center mt-[8rem]">
              აგენტის დამატება
            </h2>
            <Formik<AgentFormValues>
              initialValues={{
                name: "",
                surname: "",
                email: "",
                avatar: null,
                phone: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                errors,
                touched,
                setFieldValue,
                values,
              }: FormikProps<AgentFormValues>) => (
                <Form className="mx-[10rem] mt-[6rem]">
                  {/* name */}
                  <div className="flex mt-2 justify-between gap-[2rem]">
                    <div className="text-[1.2rem] flex flex-col w-full">
                      <label htmlFor="name">სახელი *</label>
                      <Field
                        type="text"
                        name="name"
                        className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                      />
                      <div className="text-sm mt-1 flex items-center">
                        {errors.name && touched.name ? (
                          <div className="text-[#F93B1D] flex items-center">
                            <FaCheck className="text-[#F93B1D] mr-1" />{" "}
                            {errors.name}
                          </div>
                        ) : !errors.name &&
                          touched.name &&
                          values.name.length >= 2 ? (
                          <div className="text-[#45A849] flex items-center">
                            <FaCheck className="text-[#45A849] mr-1" /> მინიმუმ
                            ორი სიმბოლო
                          </div>
                        ) : (
                          <div className="text-black flex items-center">
                            <FaCheck className="text-black mr-1" /> მინიმუმ ორი
                            სიმბოლო
                          </div>
                        )}
                      </div>
                    </div>

                    {/* surname  */}
                    <div className="text-[1.2rem] flex flex-col w-full">
                      <label htmlFor="surname">გვარი *</label>
                      <Field
                        type="text"
                        name="surname"
                        className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                      />
                      <div className="text-sm mt-1 flex items-center">
                        {errors.surname && touched.surname ? (
                          <div className="text-[#F93B1D] flex items-center">
                            <FaCheck className="text-[#F93B1D] mr-1" />{" "}
                            {errors.surname}
                          </div>
                        ) : !errors.surname &&
                          touched.surname &&
                          values.surname.length >= 2 ? (
                          <div className="text-[#45A849] flex items-center">
                            <FaCheck className="text-[#45A849] mr-1" /> მინიმუმ
                            ორი სიმბოლო
                          </div>
                        ) : (
                          <div className="text-black flex items-center">
                            <FaCheck className="text-black mr-1" /> მინიმუმ ორი
                            სიმბოლო
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* email */}
                  <div className="flex mt-2 justify-between gap-[2rem]">
                    <div className="text-[1.2rem] flex flex-col w-full">
                      <label htmlFor="email">ელ-ფოსტა *</label>
                      <Field
                        type="email"
                        name="email"
                        className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                      />
                      <div className="text-sm mt-1 flex items-center">
                        {errors.email && touched.email ? (
                          <div className="text-[#F93B1D] flex items-center">
                            <FaCheck className="text-[#F93B1D] mr-1" />
                            {errors.email}
                          </div>
                        ) : !errors.email && touched.email ? (
                          <div className="text-[#45A849] flex items-center">
                            <FaCheck className="text-[#45A849] mr-1" />
                            ვალიდური ელ-ფოსტა (@redberry.ge)
                          </div>
                        ) : (
                          <div className="text-black flex items-center">
                            <FaCheck className="text-black mr-1" />
                            ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge-თ
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ph number */}
                    <div className="text-[1.2rem] flex flex-col w-full">
                      <label htmlFor="phone">ტელეფონის ნომერი</label>
                      <Field
                        type="tel"
                        name="phone"
                        className="border border-custom-border rounded-lg p-2 text-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-orange mt-2"
                        placeholder="5XXXXXXXX"
                      />
                      <div className="text-sm mt-1 flex items-center">
                        {errors.phone && touched.phone ? (
                          <div className="text-[#F93B1D] flex items-center">
                            <FaCheck className="text-[#F93B1D] mr-1" />
                            {errors.phone}
                          </div>
                        ) : !errors.phone && touched.phone ? (
                          <div className="text-[#45A849] flex items-center">
                            <FaCheck className="text-[#45A849] mr-1" />
                            ვალიდური ტელეფონის ნომერი
                          </div>
                        ) : (
                          <div className="text-black flex items-center">
                            <FaCheck className="text-black mr-1" />
                            ტელეფონის ნომერი უნდა იყოს ფორმატში 5XXXXXXXX
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* avatar */}
                  <div className="flex flex-col mt-4">
                    <label htmlFor="avatar" className="text-[1.2rem]">
                      ავატარი *
                    </label>
                    <ImageUpload
                      setFieldValue={(field, value) =>
                        setFieldValue(field, value)
                      }
                    />
                  </div>

                  <div className="mt-[4rem] mb-[4rem] flex gap-6 justify-end">
                    <Button
                      title="გაუქმება"
                      backgroundColor="#fff"
                      textColor="#f93b1d"
                      onClick={handleCloseModal}
                    />
                    <Button title="დაამატე აგენტი" type="submit" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default HomePage;
