import { useState } from "react";
import { Form } from "react-router-dom";
import FormSelect from "../FormSelect";

const Filters = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleToggleSubmenu = (name: string) => {
    setOpenSubmenu(prev => (prev === name ? null : name));
  };

  return (
    <Form className="px-[0.8rem] py-[0.2rem] flex gap-x-[2.4rem] gap-y-2">
      <FormSelect
        label="რეგიონი"
        name="category"
        size="select-sm"
        list={["Electronics", "Furniture", "Clothing", "Books"]}
        defaultValue=""
        submenu={
          openSubmenu === "category" && (
            <ul className="w-[20rem] absolute bg-white shadow-md">
              <li>
                <button className="btn-link" onClick={() => setOpenSubmenu(null)}>Popular</button>
              </li>
              <li>
                <button className="btn-link" onClick={() => setOpenSubmenu(null)}>New Arrivals</button>
              </li>
            </ul>
          )
        }
        onClick={() => handleToggleSubmenu("category")}
      />
      <FormSelect
        label="საფასო კატეგორია"
        name="company"
        list={["Apple", "Samsung", "Sony", "LG"]}
        defaultValue=""
        size=""
        submenu={
          openSubmenu === "company" && (
            <ul className="absolute bg-white shadow-md">
              <li>
                <button className="btn-link" onClick={() => setOpenSubmenu(null)}>Top Rated</button>
              </li>
              <li>
                <button className="btn-link" onClick={() => setOpenSubmenu(null)}>Best Sellers</button>
              </li>
            </ul>
          )
        }
        onClick={() => handleToggleSubmenu("company")}
      />
      <FormSelect
        label="ფართობი"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        defaultValue=""
        submenu={
          openSubmenu === "order" && (
            <ul className="absolute bg-white shadow-md">
              <li>
                <button className="btn-link" onClick={() => setOpenSubmenu(null)}>Price: Low to High</button>
              </li>
              <li>
                <button className="btn-link" onClick={() => setOpenSubmenu(null)}>Price: High to Low</button>
              </li>
              <li>
                <button className="btn-link" onClick={() => setOpenSubmenu(null)}>Customer Ratings</button>
              </li>
            </ul>
          )
        }
        onClick={() => handleToggleSubmenu("order")}
      />
      <FormSelect
        label="საძინებლების რაოდენობა"
        name="bedrooms"
        list={["1", "2", "3", "4+"]}
        size="select-sm"
        defaultValue=""
        submenu={
          openSubmenu === "bedrooms" && (
            <ul className="absolute bg-white shadow-md">
              <li>
                <button className="btn-link" onClick={() => setOpenSubmenu(null)}>Price: Low to High</button>
              </li>
              <li>
                <button className="btn-link" onClick={() => setOpenSubmenu(null)}>Price: High to Low</button>
              </li>
              <li>
                <button className="btn-link" onClick={() => setOpenSubmenu(null)}>Customer Ratings</button>
              </li>
            </ul>
          )
        }
        onClick={() => handleToggleSubmenu("bedrooms")}
      />
    </Form>
  );
};

export default Filters;
