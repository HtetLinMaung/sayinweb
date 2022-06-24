import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import BreadCrumb from "../../../components/BreadCrumb";
import { appContext } from "../../../providers/AppProvider";
import { http, host } from "../../../utils/http";
import ProductCard from "../../../components/ProductCard";
import money from "mm-money";
import moment from "moment";
import RaisedInput from "../../../components/RaisedInput";
import IconButton from "../../../components/IconButton";
import Button from "../../../components/Button";
import EditablePrice from "../../../components/EditableText";

export default function NewInvoice() {
  const [state, dispatch] = useContext(appContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    dispatch({ type: "SET_STATE", payload: { loading: true } });
    const [err, response] = await http.get("/sayin/products", {
      search,
      sort: "createdAt:desc",
    });
    dispatch({ type: "SET_STATE", payload: { loading: false } });
    if (err) {
      return Swal.fire({
        icon: "error",
        text:
          (err.response.data && err.response.data.message) ||
          err.message ||
          "Something went wrong!",
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

  const updateQty = (id, action) => {
    const newItems = [];
    for (const item of items) {
      let newItem = item;
      if (item._id == id) {
        if (action == "inc") {
          newItem = { ...item, qty: item.qty + 1 };
        } else {
          newItem = { ...item, qty: item.qty - 1 };
        }
      }
      if (newItem.qty > 0) {
        newItems.push(newItem);
      }
    }
    setItems(newItems);
  };

  const addToCart = (product) => {
    const p = items.find((item) => item._id == product._id);
    if (!p) {
      setItems([...items, { ...product, qty: 1, amount: product.price }]);
    }
  };

  const handlePrint = async () => {
    if (!items.length) {
      return Swal.fire({
        icon: "error",
        text: "Please add at least one item to invoice!",
      });
    }
    dispatch({ type: "SET_STATE", payload: { loading: true } });
    const [err, response] = await http.post("/sayin/invoices", {
      items: items.map((item) => ({
        qty: item.qty,
        price: item.price,
        product: item._id,
      })),
      paymentmethod: "Cash",
      tax,
      discount,
    });
    dispatch({ type: "SET_STATE", payload: { loading: false } });
    if (err) {
      return Swal.fire({
        icon: "error",
        text:
          (err.response.data && err.response.data.message) ||
          err.message ||
          "Something went wrong!",
      });
    }
    setItems([]);
  };

  return (
    <div className="flex h-screen md:ml-20 m-0 ">
      <div className="w-2/3 p-10  h-full">
        <div className="mb-5">
          <BreadCrumb
            items={[
              {
                label: "Dashboard",
                to: "/sayinweb",
              },
              {
                label: "Invoice",
                to: "/sayinweb/invoice",
              },
              {
                label: "New Invoice",
                to: "/sayinweb/new-invoice",
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

        <div className="grid grid-cols-3 gap-6 pb-10">
          {products.map((product) => (
            <ProductCard
              onClick={() => addToCart(product)}
              key={product._id}
              {...product}
              image={product.image ? `${host}/sayin${product.image}` : ""}
            />
          ))}
        </div>
      </div>
      <div className=" w-1/4 fixed top-0 right-0 flex flex-col bg-white h-screen  py-14">
        <h1 className="text-2xl font-bold mb-10 px-10">Current Order</h1>
        <ul className="flex-grow overflow-auto px-10 mb-10">
          {items.map((item) => (
            <li key={item._id} className="flex mb-5">
              <img
                className="rounded-xl"
                src={`${host}/sayin${item.image}`}
                style={{ width: 60, height: 60 }}
              />
              <div className="pl-4 flex flex-col justify-between flex-grow">
                <h1 className="font-bold text-lg">{item.name}</h1>
                <div className="flex justify-between">
                  <div className="" style={{ color: "#0285FF" }}>
                    {money.format(money.parseNumber(item.price) * item.qty)} Ks
                  </div>
                  <div
                    className="flex items-center justify-between"
                    style={{ width: 87 }}
                  >
                    <IconButton
                      onClick={() => updateQty(item._id, "dec")}
                      flat
                      size={20}
                      color="red"
                    >
                      <svg
                        style={{ width: "1.1rem" }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 12H4"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </IconButton>
                    <div className="text-lg font-bold px-4">{item.qty}</div>
                    <IconButton
                      onClick={() => updateQty(item._id, "inc")}
                      size={20}
                      flat
                      color="#0285FF"
                    >
                      <svg
                        style={{ width: "1.1rem" }}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 20V12M12 12V4M12 12H20M12 12H4"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </IconButton>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-10">
          <div
            className="p-4 rounded-3xl text-sm"
            style={{ backgroundColor: "#F5F7FB" }}
          >
            <div className="flex justify-between mb-3">
              <span style={{ color: "#818384" }}>Subtotal</span>
              <span className="font-bold">
                {money.sum(
                  items.map((item) => money.parseNumber(item.price) * item.qty)
                )}{" "}
                Ks
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span style={{ color: "#818384" }}>Discount</span>
              <span className="font-bold flex">
                <EditablePrice
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
                <span className="pl-1">Ks</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#818384" }}>Tax</span>
              <span className="font-bold flex">
                <EditablePrice
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                />
                <span className="pl-1">Ks</span>
              </span>
            </div>
          </div>
          <div
            className="mb-10 p-4 rounded-3xl"
            style={{ backgroundColor: "#F5F7FB" }}
          >
            <div className="flex justify-between text-lg">
              <span style={{ color: "#818384" }}>Nett</span>
              <span className="font-bold">
                {money.sum([
                  ...items.map(
                    (item) => money.parseNumber(item.price) * item.qty
                  ),
                  `-${discount}`,
                  tax,
                ])}{" "}
                Ks
              </span>
            </div>
          </div>
          <Button block onClick={handlePrint}>
            Print Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}
