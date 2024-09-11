import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "./homePage";
import ListingPage from "./listingPage";
import AddListing from "./addListing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "listing",
        element: <ListingPage />,
      },
      {
        path: "add",
        element: <AddListing />,
      },
    ],
  },
]);

export default router;
