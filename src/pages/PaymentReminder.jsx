import { useEffect, useState } from "react";
import api from "../services/api";

export default function PaymentReminder() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    try {
      const response = await api.post("/master/role_list", {
        limit: 20,
        start: 0,
        filter: {
          search: "",
          name: "",
          created_on: ""
        }
      });

      console.log(response.data);

      // set data from API
      setCompanies(response.data.result.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Role List</h1>

      <div className="bg-white shadow rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Role Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created On</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((role, i) => (
              <tr key={role.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{i+1}</td>
                <td className="p-4">{role.name}</td>
                <td className="p-4">{role.status}</td>
                <td className="p-4">
                  {new Date(role.created_on).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}