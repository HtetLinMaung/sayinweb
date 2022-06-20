import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import BreadCrumb from "../../../components/BreadCrumb";
import { appContext } from "../../../providers/AppProvider";
import { http, host } from "../../../utils/http";
import ProductCard from "../../../components/ProductCard";
import money from "mm-money";
import moment from "moment";
import RaisedInput from "../../../components/RaisedInput";

export default function Order() {
  const [state, dispatch] = useContext(appContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    dispatch({ type: "SET_STATE", payload: { loading: true } });
    const [err, response] = await http.get("/sayin/products", {
      search,
    });
    dispatch({ type: "SET_STATE", payload: { loading: false } });
    if (err) {
      return Swal.fire({
        icon: "error",
        text:
          err.response.data.message || err.message || "Something went wrong!",
      });
    }
    setProducts(
      response.data.data.map((d) => ({
        ...d,
        price: money.format(d.price),
        createdAt: moment(d.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }))
    );
  };

  return (
    <div className="flex h-screen md:ml-20 m-0">
      <div className="w-2/3 p-10 overflow-auto h-full">
        <div className="mb-5">
          <BreadCrumb
            items={[
              {
                label: "Dashboard",
                to: "/sayinweb",
              },
              {
                label: "Order",
                to: "/sayinweb/order",
              },
            ]}
          />
        </div>
        <div className="mb-5 flex justify-end">
          <RaisedInput
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              {...product}
              image={`${host}/sayin${product.image}`}
            />
          ))}
        </div>
      </div>
      <div className="w-1/3 bg-white h-screen"></div>
    </div>
  );
}
