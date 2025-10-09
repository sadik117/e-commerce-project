import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    gender: "",
    color: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = ["sharee", "panjabi", "t-shirt", "watch", "bag", "hijab", "collection", "cloths"];
  const genders = ["men", "women"];
  const colors = [
    { name: "black", code: "#000000" },
    { name: "white", code: "#ffffff" },
    { name: "red", code: "#ff0000" },
    { name: "blue", code: "#2196f3" },
    { name: "green", code: "#00b050" },
    { name: "yellow", code: "#ffeb3b" },
    { name: "orange", code: "#ff9800" },
    { name: "pink", code: "#e91e63" },
    { name: "purple", code: "#9c27b0" },
    { name: "navy", code: "#000080" },
  ];

  // Handle input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Upload image → Cloudinary (via backend)
      const uploadRes = await axios.post("http://localhost:3000/upload", {
        image,
      });
      const imageUrl = uploadRes.data.url;

      const productData = { ...form, image: imageUrl };
      await axios.post("http://localhost:3000/products", productData);

      toast.success("Product added successfully!");
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        gender: "",
        color: "",
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="3"
        />

        {/* Category */}
        <div>
          <p className="font-semibold mb-1">Category:</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={form.category === cat}
                  onChange={handleChange}
                  required
                />
                <span className="capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender (optional) */}
        <div>
          <p className="font-semibold mb-1">Gender:</p>
          <div className="flex space-x-4">
            {genders.map((g) => (
              <label key={g} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                />
                <span className="capitalize">{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color (optional) */}
        <div>
          <p className="font-semibold mb-1">Color:</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((clr) => (
              <label key={clr.name}>
                <input
                  type="radio"
                  name="color"
                  value={clr.name}
                  checked={form.color === clr.name}
                  onChange={handleChange}
                  className="hidden"
                />
                <div
                  className={`w-8 h-8 rounded border cursor-pointer ${
                    form.color === clr.name
                      ? "ring-2 ring-[#5b0e0e]"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: clr.code }}
                ></div>
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded"
          required
        />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-32 h-32 object-cover mx-auto border rounded"
          />
        )}

        <button
          type="submit"
          className="w-full bg-[#5b0e0e] text-white py-2 rounded hover:bg-[#7d1a1a]"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
