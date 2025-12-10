import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pincodeData from "./../components/Data/pincodes.json";
import EditIcon from "@mui/icons-material/Edit";
import {
  addUserAddress,
  deleteUserAddress,
  fetchUserAddress,
  updateUserAddress,
} from "@/components/API/api";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

export default function AddressForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    house: "",
    street: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    address_type: "",
  });

  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(true);
  const [UserAddress, setUserAddress] = useState([]);
  const [index, setIndex] = useState(0);
  const [invalidPincode, setInvalidPincode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    id: null,
    default: false
  });

  // 📌 Form heading (Dynamic)
  const formHeading =
    UserAddress.length === 0 || selectedId === null
      ? "Add New Address"
      : "Edit Address";

  // 📌 Handle Input Changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 📌 Handle Pincode Auto-Fill
  const handlePincodeChange = (e) => {
    const pin = e.target.value;
    setPincode(pin);
    setInvalidPincode(false);

    setForm((prev) => ({ ...prev, pincode: pin }));

    if (pin.length === 6) {
      const match = pincodeData.pincodes.find(
        (item) => item.pincode.toString() === pin
      );

      if (match) {
        setCity(match.districtName);
        setState(match.stateName);
        setForm((prev) => ({
          ...prev,
          city: match.districtName,
          state: match.stateName,
        }));
      } else {
        setInvalidPincode(true);
        setCity("");
        setState("");
      }
    }
  };

  // 📌 Handle Edit Address
  const handleEdit = (data) => {
    setSelectedId(data.address.id);
    setShowForm(true);
    setIndex(data.index);

    const add = data.address.address_line;
    const parts = add.split(",");

    setForm({
      name: data.address.name,
      phone: data.address.phone_number,
      house: parts[0],
      street: parts[1],
      landmark: parts[2],
      pincode: data.address.zip_code,
      city: data.address.city,
      state: data.address.state,
      address_type: data.address.address_type,
    });

    setPincode(data.address.pincode);
    setCity(data.address.city);
    setState(data.address.state);
  };

  // 📌 Handle Edit Address
  const handleDelete = async (data) => {
    if(data.default){
      alert("Default address can not be deleted")
      return;
    }
    const res = await deleteUserAddress(data.id);
    if (res && res.ok) {
      alert("Address deleted successfully");
      setUserAddress((prev) => prev.filter((addr) => addr.address_id !== id));
    } else {
      alert("Failed to delete address");
    }
    router.reload();
  };

  // 📌 Just Save and Continue Existing Address
  const handleSaveContinue = async () => {
    if(!selectedId){
      alert("Select Address and Proceed")
    }
    const selectedAddress = UserAddress.find(
      (addr) => addr.address_id === selectedId
    );
    await localStorage.setItem('address_id', selectedId)
    router.push('/billing')
  };

  // 📌 On Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedId) {
      const data = UserAddress[index];
      const res = await updateUserAddress({ form, data });
      const response = await res.json();
      if (res.ok) {
        alert("Address Updated Successfully");
        router.reload();
      } else {
        alert("Address Updation Failed");
      }
      return;
    }

    // Compute default address logic using a local variable
    const isDefault = !Array.isArray(UserAddress) || UserAddress.length === 0;
    const res = await addUserAddress(form, isDefault);
    if (res && res.ok) {
      const newAddress = await res.json();
      alert("Address added successfully");
      setUserAddress((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        newAddress,
      ]);
      setShowForm(false);
    } else {
      alert("Failed to add address");
    }
  };

  useEffect(() => {
    async function loadUserAddress() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetchUserAddress(token);
      setUserAddress(res || []);
      setLoading(false);
    }

    loadUserAddress();
  }, []);

  // 📌 Auto show form if no addresses exist
  useEffect(() => {
    if (UserAddress.length === 0) {
      setShowForm(false);
    }
  }, [UserAddress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-[115px] pb-10 px-4"
    >
      {/*   Existing Addresses Section */}
      {loading ? (
        <div className="h-[70vh] flex items-center justify-center">
          <div className="relative">
            <div className="fixed inset-0 flex items-center justify-center z-10">
              <Image
                src={"/loading.webp"}
                alt="Loading..."
                width={100}
                height={100}
                unoptimized
                className="opacity-25"
              />
            </div>
          </div>
        </div>
      ) : (
        UserAddress.length > 0 && (
          <div className="max-w-2xl mx-auto mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Your Addresses
            </h2>

            <div className="space-y-4">
              {UserAddress.map((address, index) => (
                <div
                  key={address.id}
                  onClick={() => {
                    setSelectedId(address.id);
                    setShowForm(false);
                  }}
                  className={`border bg-white rounded-xl p-4 flex justify-between items-start shadow-sm hover:shadow-md transition cursor-pointer
                  ${
                    selectedId === address.id
                      ? "border-black ring-1 ring-black"
                      : "border-gray-200"
                  }
                `}
                >
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {address.name}
                    </p>
                    <p className="font-semibold text-sm text-gray-900 mb-1">
                      {address.phone_number}
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {address.address_line}
                      <br />
                      {address.city}, {address.state} ({address.zip_code})
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* Edit */}
                    <button
                      className="px-4 py-1 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit({ address, index });
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </button>

                    {/* Delete */}
                    <button
                      className="px-4 py-1 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete({ open: true, id: address.id, default: address.is_default });
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Confirmation to Delete The Product */}
            {confirmDelete.open && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl w-80">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Delete Product
                  </h3>
                  <p className="text-sm text-gray-600 mb-5">
                    Are you sure you want to delete this product? This action
                    cannot be undone.
                  </p>

                  <div className="flex justify-end gap-3">
                    <button
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() =>
                        setConfirmDelete({ open: false, id: null })
                      }
                    >
                      Cancel
                    </button>

                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => {
                        handleDelete(confirmDelete);
                        setConfirmDelete({ open: false, id: null, default: false });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save & Continue (Only when selected) */}
            {selectedId && !showForm && (
              <button
                onClick={handleSaveContinue}
                className="w-full mt-5 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900"
              >
                Save & Continue
              </button>
            )}
          </div>
        )
      )}

      {/*  Address Form */}
      {showForm && (
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-5"
          >
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {formHeading}
            </h2>

            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Mobile + Pincode */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Mobile Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Pincode</label>
                {invalidPincode && (
                  <p className="text-red-500 text-xs m-1">Invalid Pincode</p>
                )}
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handlePincodeChange}
                  className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                  placeholder="110001"
                  required
                />
              </div>
            </div>

            {/* City / State */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">City</label>
                <input
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">State</label>
                <input
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
            </div>

            {/* Address fields */}
            <div>
              <label className="text-sm font-medium">Address Type</label>
              <input
                name="address_type"
                value={form.address_type}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">House / Flat</label>
              <input
                name="house"
                value={form.house}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Street / Area</label>
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Landmark</label>
              <input
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                className="border border-gray-300 w-full p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition-all"
            >
              Save Address
            </button>
          </form>
        </div>
      )}

      {/* Add New Address Button */}
      {!showForm && (
        <div className="mt-5 max-w-lg mx-auto">
          <button
            onClick={() => {
              setForm({
                name: "",
                phone: "",
                house: "",
                street: "",
                landmark: "",
                pincode: "",
                city: "",
                state: "",
              });
              setCity("");
              setState("");
              setPincode("");
              setSelectedId(null);
              setShowForm(true);
            }}
            className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-900 transition-all"
          >
            + Add New Address
          </button>
        </div>
      )}
    </motion.div>
  );
}
