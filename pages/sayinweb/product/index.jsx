import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { useState } from "react";
import TextInput from "../../../components/TextInput";

export default function Product() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <Modal open={open} minWidth={450} onOverlayClick={() => setOpen(false)}>
        <h1 className="font-bold mb-5 text-center" style={{ fontSize: 24 }}>
          Create New Product
        </h1>
        <div className="mb-3">
          <div className="mb-2" style={{ fontSize: 14 }}>
            Ref.
          </div>
          <TextInput />
        </div>
        <div className="mb-3">
          <div className="mb-2" style={{ fontSize: 14 }}>
            Name
          </div>
          <TextInput />
        </div>
        <div className="mb-3">
          <div className="mb-2" style={{ fontSize: 14 }}>
            Price
          </div>
          <TextInput />
        </div>
        <div className="mt-10 flex justify-around">
          <div className="w-1/4">
            <Button block onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
          <div className="w-1/4">
            <Button block color="#EA4C89" onClick={() => setOpen(false)}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
      <div className="flex mb-3">
        <div className="flex-grow"></div>
        <Button color="#EA4C89" onClick={() => setOpen(true)}>
          Add Product
        </Button>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-2">
        <table className="w-full">
          <thead className="font-bold" style={{ fontSize: 14 }}>
            <tr>
              <th>Ref.</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
