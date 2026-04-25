import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
export const TodoList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
   const [start, setStart] = useState(0);
   // const [limit, setLimit] = useState(10);
   const [loading, setLoading] = useState(true);
   const [total, setTotal] = useState(0);
   const limit = 10;

  async function getTodoData() {
    try {
      setLoading(true);

      const response = await api.post("/master/brand", {
        limit: limit,
        start: start,
        filter: {},
      });
      console.log(response);
      
      if (response.data.status == "success") {
        setData(response.data.result.data)
        setTotal(response.data.result.totalCount);

      }
    } catch (error) {
        console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getTodoData()
  }, [])

  function addNew() {
    navigate("/todo_add");
  }

  function handleEdit(id) {
    navigate(`/todo_add/${id}`);
  }

  async function handleDelete (id) {
    try {
        const res = await api.post("/master/delete_brand",{id})
        if (res.data.status == 'success') {
            alert("Task deleted succesfully")
            getTodoData()
        } else {
            alert("Not able to delete task")
        }
    } catch (error) {
        console.log(error);
    }
  }

  return (
   <div className="p-6 bg-gray-50 min-h-screen">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Todo List</h2>

    <button
      onClick={addNew}
      className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition duration-200 shadow-sm"
    >
      Add New
    </button>
  </div>

  {/* Table Card */}
  <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] text-sm text-left">
        {/* Table Header */}
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-6 py-4 font-semibold">ID</th>
            <th className="px-6 py-4 font-semibold">Task Name</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Created On</th>
            <th className="px-6 py-4 font-semibold text-center">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data?.length > 0 ? (
            data.map((task, i) => (
              <tr
                key={task.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4 text-gray-700">{i + 1}</td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {task.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {task.description}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      task.status === 1
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {task.status == 1 ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {new Date(task.created_on).toLocaleDateString()}
                </td>

                {/* Action Buttons */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium hover:bg-yellow-200 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(task.id)}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center py-10 text-gray-500"
              >
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
};
