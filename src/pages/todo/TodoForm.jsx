import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";

function TodoAdd() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: 1,
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const brand_detail = async (id) => {
    try {
      const response = await api.post("/master/brand_detail", {
        brand_id: id,
      });
      const data = response.data.data.detail;
      setFormData({
        name: data.name,
        description: data.description,
        status: data.status,
      });

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=> {
    if (id) {
        brand_detail(id);
    }
  }, [id])

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // remove error while typing
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let validationError = {};

    if (!formData.name.trim()) {
      validationError.name = "Task name is required";
    }

    if (!formData.description.trim()) {
      validationError.description = "Description is required";
    }

    if (!formData.status) {
      validationError.status = "Status is required";
    }

    setError(validationError);

    // stop submit if errors exist
    if (Object.keys(validationError).length > 0) return;

    console.log(formData);
    try {
      setLoading(true);
      const url = id ? "/master/update_brand" : "/master/add_brand";
      const payload = id ? { brand_id: id, ...formData } : formData;
      const response = await api.post(url, payload);
      console.log(response);

      if (response.data.status === "success") {
        alert(id ? "Updated Successfully" : "Created Successfully");
        navigate("/todo_list");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    // You can add API functionality here
  }

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b pb-3">
          <button
            type="button"
            onClick={() => navigate("/todo_list")}
            className="p-2 rounded hover:bg-gray-100"
          >
            <FaArrowLeft className="text-gray-700 text-lg" />
          </button>

          <h2 className="text-xl font-semibold text-gray-800">
            {id ? "Update Todo" : "Add Todo"}
          </h2>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task Name */}
          <div>
            <label className={labelClass}>Task Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Task Name"
              className={inputClass}
            />

            {error.name && <p className={errorClass}>{error.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Task Description"
              className={inputClass}
            />

            {error.description && (
              <p className={errorClass}>{error.description}</p>
            )}
          </div>

          {/* Status */}
          <div className="col-span-1 md:col-span-2">
            <label className={labelClass}>Status</label>

            <div className="flex items-center gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="radio"
                  name="status"
                  value="1"
                  checked={formData.status == 1}
                  onChange={handleChange}
                  className="accent-blue-600 w-4 h-4"
                />
                Active
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="radio"
                  name="status"
                  value="0"
                  checked={formData.status == 0}
                  onChange={handleChange}
                  className="accent-blue-600 w-4 h-4"
                />
                Inactive
              </label>
            </div>

            {error.status && <p className={errorClass}>{error.status}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : id ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default TodoAdd;
