import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { useContext, useState, useEffect } from "react";
import money from "mm-money";
import moment from "moment";
import TextInput from "../../../components/TextInput";
import PriceInput from "../../../components/PriceInput";
import { http, host } from "../../../utils/http";
import { appContext } from "../../../providers/AppProvider";
import Swal from "sweetalert2";
import Table from "../../../components/Table";
import RaisedInput from "../../../components/RaisedInput";
import IconButton from "../../../components/IconButton";
import UploadButton from "../../../components/UploadButton";
import DownloadButton from "../../../components/DownloadButton";
import ImageUploader from "../../../components/ImageUploader";
import TextArea from "../../../components/TextArea";
import BreadCrumb from "../../../components/BreadCrumb";
import { useRouter } from "next/router";

const headers = [
  {
    key: "code",
    title: "Code",
  },
  {
    key: "name",
    title: "Name",
  },
  {
    key: "price",
    title: "Price",
  },
  {
    key: "createdAt",
    title: "Time",
  },
];

export default function Product() {
  const router = useRouter();
  const [state, dispatch] = useContext(appContext);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0.00");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perpage: 50,
    pagecount: 1,
  });
  const [totalCounts, setTotalCounts] = useState(0);
  const [search, setSearch] = useState("");
  const [upoloadLoading, setUploadLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, pagination.perpage, search]);

  const fetchProducts = async () => {
    setProducts([]);
    dispatch({ type: "SET_STATE", payload: { loading: true } });
    const [err, response] = await http.get("/sayin/products", {
      ...pagination,
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
        createdAt: moment(d.createdAt).format("DD/MM/YYYY, h:mm:ss a"),
      }))
    );
    setPagination({ ...pagination, pagecount: response.data.pagecount });
    setTotalCounts(response.data.total);
  };

  const handleSave = async () => {
    if (!code) {
      return Swal.fire({
        icon: "warning",
        text: "Please enter product's code!",
      });
    }
    if (!name) {
      return Swal.fire({
        icon: "warning",
        text: "Please enter product's name!",
      });
    }
    if (!price) {
      return Swal.fire({
        icon: "warning",
        text: "Please enter product's price!",
      });
    }

    dispatch({ type: "SET_STATE", payload: { loading: true } });
    let err = null;
    let response = null;
    if (isEdit && productId) {
      [err, response] = await http.put(`/sayin/products/${productId}`, {
        code,
        name,
        price,
        image,
      });
    } else {
      [err, response] = await http.post("/sayin/products", {
        code,
        name,
        price,
        image,
      });
    }

    dispatch({ type: "SET_STATE", payload: { loading: false } });
    if (err) {
      return Swal.fire({
        icon: "error",
        text:
          err.response.data.message || err.message || "Something went wrong!",
      });
    }
    handleCancel();
    Swal.fire({
      icon: "success",
      text: response.data.message,
    });
    fetchProducts();
  };

  const handleCancel = () => {
    setOpen(false);
    setCode("");
    setName("");
    setPrice("0.00");
    setImage("");
    setIsEdit(false);
  };

  const fetchProductById = async (id) => {
    dispatch({ type: "SET_STATE", payload: { loading: true } });
    const [err, response] = await http.get(`/sayin/products/${id}`);
    dispatch({ type: "SET_STATE", payload: { loading: false } });
    if (err) {
      return Swal.fire({
        icon: "error",
        text:
          err.response.data.message || err.message || "Something went wrong!",
      });
    }
    setProductId(id);
    setCode(response.data.data.code);
    setName(response.data.data.name);
    setPrice(response.data.data.price);
    setDescription(response.data.data.description);
    setImage(`${host}/sayin${response.data.data.image}`);
  };

  const handleEdit = (id) => {
    fetchProductById(id);
    setIsEdit(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.value) {
      dispatch({ type: "SET_STATE", payload: { loading: true } });
      const [err, response] = await http.delete(`/sayin/products/${id}`);
      dispatch({ type: "SET_STATE", payload: { loading: false } });
      if (err) {
        return Swal.fire({
          icon: "error",
          text:
            err.response.data.message || err.message || "Something went wrong!",
        });
      }
      Swal.fire({
        icon: "success",
        text: response.data.message,
      });
      fetchProducts();
    }
  };

  const handleImport = async (f) => {
    setUploadLoading(true);
    const [err, response] = await http.post("/sayin/products/import", {
      dataurl: f.dataurl,
    });
    setUploadLoading(false);
    if (err) {
      return Swal.fire({
        icon: "error",
        text:
          err.response.data.message || err.message || "Something went wrong!",
      });
    }
    Swal.fire({
      icon: "success",
      text: response.data.message,
    });
    fetchProducts();
  };

  return (
    <div className="p-10 md:ml-20 mb-20 m-0">
      <Modal
        open={open}
        minWidth={280}
        width={650}
        onOverlayClick={handleCancel}
      >
        <h1 className="font-bold mb-5 text-center" style={{ fontSize: 24 }}>
          {!isEdit ? "Create New" : "Edit"} Product
        </h1>
        <div className="flex">
          <div className="w-1/2">
            <div className="mb-3">
              <div className="mb-2" style={{ fontSize: 14 }}>
                Code
              </div>
              <TextInput
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="mb-2" style={{ fontSize: 14 }}>
                Name
              </div>
              <TextInput
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 w-2/3">
              <div className="mb-2" style={{ fontSize: 14 }}>
                Price
              </div>
              <PriceInput
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="mb-3 flex justify-end pt-8">
              <ImageUploader
                size={200}
                url={image}
                onFilePicked={(f) => setImage(f.dataurl)}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="mb-2" style={{ fontSize: 14 }}>
            Description
          </div>
          <TextArea
            minHeight={150}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-10 flex justify-around">
          <div className="w-1/4">
            <Button block onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <div className="w-1/4">
            <Button block onClick={handleSave}>
              {isEdit ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
      <div className="mb-5">
        <BreadCrumb
          items={[
            {
              label: "Dashboard",
              to: "/sayinweb",
            },
            {
              label: "Product",
              to: "/sayinweb/product",
            },
          ]}
        />
      </div>
      <div className="flex flex-wrap mb-5">
        <div className="flex-grow"></div>
        <div className="w-full sm:w-auto">
          <DownloadButton
            label="Export"
            url={`${host}/sayin/products/export?token=${state.token}&search=${search}`}
          />
        </div>
        <div className="px-3">
          <UploadButton
            label="Import"
            loading={upoloadLoading}
            onFilePicked={handleImport}
          />
        </div>
        <Button onClick={() => setOpen(true)}>Add Product</Button>
      </div>
      <div className="flex mb-5">
        <RaisedInput
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="svg-inline--fa fa-search fa-w-16 fa-3x"
            style={{ width: "1rem" }}
          >
            <path
              fill="currentColor"
              d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              className=""
              style={{ color: "grey" }}
            ></path>
          </svg>
        </RaisedInput>
        <div className="px-3">
          <IconButton>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="filter"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-filter fa-w-16 fa-3x __svg"
              style={{ width: "1rem" }}
            >
              <path
                fill="currentColor"
                d="M463.952 0H48.057C5.419 0-16.094 51.731 14.116 81.941L176 243.882V416c0 15.108 7.113 29.335 19.2 40l64 47.066c31.273 21.855 76.8 1.538 76.8-38.4V243.882L497.893 81.941C528.042 51.792 506.675 0 463.952 0zM288 224v240l-64-48V224L48 48h416L288 224z"
              ></path>
            </svg>
          </IconButton>
        </div>
      </div>
      <Table
        pagination={pagination}
        onPaginationChange={setPagination}
        headers={headers}
        items={products}
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
        totalCounts={totalCounts}
        countLabel="Product"
        colStyles={{
          price: {
            textAlign: "right",
          },
        }}
      ></Table>
    </div>
  );
}
