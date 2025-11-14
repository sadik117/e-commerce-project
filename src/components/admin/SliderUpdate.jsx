/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Trash2, Edit, Plus, Save, X, Upload, Loader } from "lucide-react";
import axios from "axios";

const API_URL = "https://robe-by-shamshad-server.vercel.app/slides";
const UPLOAD_URL = "https://robe-by-shamshad-server.vercel.app/upload";

export default function SliderUpdate() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form: we do NOT include manual id. editingId keeps the _id when editing.
  const [form, setForm] = useState({ image: "", title: "", subtitle: "" });
  const [editingId, setEditingId] = useState(null);

  // imageFile holds base64 string (for upload). imagePreview shows either url or base64.
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const toastTimerRef = useRef(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // fetch slides
  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      // API returns array of slides
      setSlides(Array.isArray(res.data) ? res.data : res.data.slides || []);
    } catch (err) {
      showToast("Failed to load slides", "error");
      console.error("fetchSlides:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
    return () => clearTimeout(toastTimerRef.current);
  }, []);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  // Input handlers
  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file", "error");
      return;
    }
    if (file.size && file.size > 10 * 1024 * 1024) {
      showToast("Image must be smaller than 10MB", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageFile(reader.result); // base64 string
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Upload image to backend -> returns URL
  const uploadImage = async () => {
    if (!imageFile) return form.image || "";
    setUploading(true);
    try {
      const res = await axios.post(UPLOAD_URL, { image: imageFile });
      if (res?.data?.url) return res.data.url;
      throw new Error("Upload did not return URL");
    } catch (err) {
      console.error("uploadImage:", err);
      showToast("Image upload failed", "error");
      throw err;
    } finally {
      setUploading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({ image: "", title: "", subtitle: "" });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Submit handler (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!form.title?.trim() || !form.subtitle?.trim()) {
      showToast("Title and subtitle are required", "error");
      return;
    }
    if (!imagePreview && !form.image) {
      showToast("Please provide an image", "error");
      return;
    }

    setSaving(true);
    try {
      // if user picked a local image (base64), upload it first
      let imageUrl = form.image || "";
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const payload = {
        image: imageUrl,
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
      };

      if (editingId) {
        // update
        const res = await axios.put(`${API_URL}/${editingId}`, payload);
        if (res.status !== 200 && res.status !== 201) throw new Error("Update failed");
        showToast("Slide updated");
      } else {
        // create
        const res = await axios.post(API_URL, payload);
        if (res.status !== 200 && res.status !== 201) throw new Error("Create failed");
        showToast("Slide added");
      }

      resetForm();
      fetchSlides();
    } catch (err) {
      console.error("handleSubmit:", err);
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  // Edit slide - populate form and set editingId
  const handleEdit = (slide) => {
    // slide is expected to have _id, image, title, subtitle
    setForm({ image: slide.image || "", title: slide.title || "", subtitle: slide.subtitle || "" });
    setImageFile(null);
    setImagePreview(slide.image || null);
    setEditingId(slide._id || slide.id || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete slide
  const handleDelete = async (id) => {
    if (!confirm("Delete this slide?")) return;
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      if (res.status === 200) {
        showToast("Slide deleted");
        // optimistic update
        setSlides((s) => s.filter((sl) => (sl._id || sl.id) !== id));
      } else {
        throw new Error("Delete failed");
      }
      // refresh from server
      fetchSlides();
    } catch (err) {
      console.error("handleDelete:", err);
      showToast("Delete failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carousel Admin Dashboard</h1>

        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-[#5b0e0e]">
            {editingId ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            {editingId ? "Edit Slide" : "Add New Slide"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Winter Collection"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5b0e0e]"
                />
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="e.g., Explore our new winter collection"
                rows="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5b0e0e] resize-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Upload size={18} className="text-[#5b0e0e]" />
                Slide Image
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#5b0e0e] transition-all duration-200">
                <input
                  ref={fileInputRef}
                  id="slide-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <label htmlFor="slide-image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full max-w-md h-64 object-cover rounded-xl mx-auto border shadow-md"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/600x300?text=Image+Error")}
                      />
                      <p className="text-sm text-green-600 font-medium">Image ready to upload</p>
                      <p className="text-xs text-gray-500">Click to change</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="text-gray-400" size={32} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Click or drag image here</p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {/* Show URL if editing existing and no new image selected */}
              {editingId && form.image && !imageFile && (
                <p className="text-xs text-gray-500 mt-2">
                  Current: <span className="font-mono break-all">{form.image}</span>
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving || uploading}
                className="flex items-center gap-2 bg-[#5b0e0e] hover:bg-[#7d1a1a] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {(saving || uploading) ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    {saving ? (editingId ? "Updating..." : "Saving...") : "Uploading..."}
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {editingId ? "Update" : "Add"} Slide
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  <X size={18} />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Slides Grid */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">All Slides ({slides.length})</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading slides...</div>
          ) : slides.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No slides yet. Add one!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {slides.map((slide) => {
                const id = slide._id || slide.id;
                return (
                  <div key={id} className="group border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-video bg-gray-100">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/600x300?text=Image+Error")}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition" />
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900">{slide.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{slide.subtitle}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-xs text-gray-500">
                          {slide.createdAt ? new Date(slide.createdAt).toLocaleDateString() : ""}
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleEdit(slide)}
                            className="flex items-center gap-1 text-[#5b0e0e] hover:text-[#7d1a1a] font-medium"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl text-white font-medium shadow-2xl transition transform ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
