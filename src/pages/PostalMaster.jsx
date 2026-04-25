import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function PostalMaster() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    state_name: "",
    district_name: "",
    city: "",
    pincode: "",
    area: "",
    zone: "",
    status: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const getStates = async () => {
    try {
      const res = await api.post("/master/state_list", { filter: {} });
      setStates(res.data.result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDistricts = async (state) => {
    try {
      const res = await api.post("/master/district_list", {
        filter: { state_name: state },
      });
      setDistricts(res.data.result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCity = async (district) => {
    try {
      const res = await api.post("/master/city_list", {
        filter: { district_name: district },
      });
      setCities(res.data.result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPostalMasterDetail = async (id) => {
    try {
      const res = await api.post("/master/postal_master_detail", {
        postal_id: id,
      });
      const data = res.data.result.data;
      setFormData({
        state_name: data.state_name,
        district_name: data.district_name,
        city: data.city,
        pincode: data.pincode,
        area: data.area,
        zone: data.zone || "",
        status: data.status == 1 ? "active" : "inactive",
      });
      getDistricts(data.state_name);
      getCity(data.district_name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStates();
    if (id) {
      getPostalMasterDetail(id);
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "state_name") {
      setDistricts([]);
      setCities([]);
      setFormData((prev) => ({
        ...prev,
        state_name: value,
        district_name: "",
        city: "",
      }));
      if (value) getDistricts(value);
      return;
    }

    if (name === "district_name") {
      setCities([]);
      setFormData((prev) => ({
        ...prev,
        district_name: value,
        city: "",
      }));
      if (value) getCity(value);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const validate = () => {
    let newErrors = {};
    if (!formData.state_name) newErrors.state = "State is required";
    if (!formData.district_name) newErrors.district = "District is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pincode) newErrors.pincode = "Pincode is required";
    else if (!/^[0-9]{6}$/.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";
    if (!formData.area) newErrors.area = "Area is required";
    if (!formData.zone) newErrors.zone = "Zone is required";
    if (!formData.status) newErrors.status = "Status is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const url = id
        ? "/master/postal_master_update"
        : "/master/postal_master_add";
      const payload = id ? { postal_id: id, ...formData } : formData;
      const response = await api.post(url, payload);
      if (response.data.status === "success") {
        alert(id ? "Updated Successfully" : "Created Successfully");
        navigate("/postal_master_list");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const selectClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <div className="flex items-center gap-3 mb-6 border-b pb-3">

  <button
    onClick={() => navigate("/postal_master_list")}
    className="p-2 rounded hover:bg-gray-100"
  >
    <FaArrowLeft className="text-gray-700 text-lg" />
  </button>

  <h2 className="text-xl font-semibold text-gray-800">
    {id ? "Update Postal Master" : "Add Postal Master"}
  </h2>

</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* State */}
          <div>
            <label className={labelClass}>State</label>
            <select
              name="state_name"
              value={formData.state_name}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Select State</option>
              {states.map((s, i) => (
                <option key={i} value={s.state_name}>
                  {s.state_name}
                </option>
              ))}
            </select>
            {error.state && <p className={errorClass}>{error.state}</p>}
          </div>

          {/* District */}
          <div>
            <label className={labelClass}>District</label>
            <select
              name="district_name"
              value={formData.district_name}
              onChange={handleChange}
              disabled={!formData.state_name}
              className={selectClass}
            >
              <option value="">Select District</option>
              {districts.map((d, i) => (
                <option key={i} value={d.district_name}>
                  {d.district_name}
                </option>
              ))}
            </select>
            {error.district && <p className={errorClass}>{error.district}</p>}
          </div>

          {/* City */}
          <div>
            <label className={labelClass}>City</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.district_name}
              className={selectClass}
            >
              <option value="">Select City</option>
              {cities.map((c, i) => (
                <option key={i} value={c.city}>
                  {c.city}
                </option>
              ))}
            </select>
            {error.city && <p className={errorClass}>{error.city}</p>}
          </div>

          {/* Pincode */}
          <div>
            <label className={labelClass}>Pincode</label>
            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter 6-digit pincode"
              maxLength={6}
              className={inputClass}
            />
            {error.pincode && <p className={errorClass}>{error.pincode}</p>}
          </div>

          {/* Area */}
          <div>
            <label className={labelClass}>Area</label>
            <input
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Enter area"
              className={inputClass}
            />
            {error.area && <p className={errorClass}>{error.area}</p>}
          </div>

          {/* Zone */}
          <div>
            <label className={labelClass}>Zone</label>
            <input
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              placeholder="Enter zone"
              className={inputClass}
            />
            {error.zone && <p className={errorClass}>{error.zone}</p>}
          </div>

          {/* Status */}
          <div className="col-span-1 md:col-span-2">
            <label className={labelClass}>Status</label>
            <div className="flex items-center gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleChange}
                  className="accent-blue-600 w-4 h-4"
                />
                Active
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
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

export default PostalMaster;
