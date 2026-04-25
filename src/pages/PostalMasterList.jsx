import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PostalmasterList() {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  // const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const limit = 10;
  async function getPostaldata(start) {
    try {
      const response = await api.post("/master/postal_master", {
        limit: limit,
        start: start,
        filter: {},
      });
      if (response.data.status === "success") {
        setData(response.data.result.data);
        setTotal(response.data.result.totalCount);
      }

      console.log(response);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPostaldata(start);
  }, [start]);

  function addNew() {
    navigate("/postal_master");
  }

  function handleEdit(id) {
    navigate(`/postal_master/${id}`);
  }

  function nextPage() {
    const newStart = start + 10;
    setStart(newStart);
    getPostaldata(newStart); 
  }

  function prevPage() {
    const newStart = Math.max(start - limit, 0);
    setStart(newStart);
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Postal Master List</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={addNew}
        >
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">S. No.</th>
              <th className="p-3">State</th>
              <th className="p-3">District</th>
              <th className="p-3">City</th>
              <th className="p-3">Pincode</th>
              <th className="p-3">Area</th>
              <th className="p-3">Zone</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr className="border-t hover:bg-gray-50" key={index}>
                <td className="p-3">
                  {start + index + 1}
                </td>
                <td className="p-3">{item.state_name}</td>
                <td className="p-3">{item.district_name}</td>
                <td className="p-3">{item.city}</td>
                <td className="p-3">{item.pincode}</td>
                <td className="p-3">{item.area}</td>
                <td className="p-3">{item.zone ? item.zone : "N/A"}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                    {item.status == 1 ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    className="text-blue-600"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Showing {start + 1} to {Math.min(start + limit, total)} of {total}
        </p>

        <div className="flex gap-2">
          <button
            onClick={prevPage}
            disabled={start === 0}
            className={`px-3 py-1 border rounded 
            ${start === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            Prev
          </button>

          <button
            onClick={nextPage}
            disabled={start + limit >= total}
            className={`px-3 py-1 border rounded 
            ${start + limit >= total ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}


// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPostalData } from "../store/postalSlice";

// export default function PostalmasterList() {
//   const dispatch = useDispatch();

//   const { data, loading } = useSelector((state) => state.postal);
//   console.log('data',data);
//   console.log('loading',loading);

  

//   useEffect(() => {
//     dispatch(fetchPostalData()); // 
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <>
//       {data.map((item) => (
//         <div key={item.id}>{item.city}</div>
//       ))}
//     </>
//   );
// }