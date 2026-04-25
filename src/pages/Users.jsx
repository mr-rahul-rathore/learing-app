import { useState } from "react"

function Users() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    console.log('e.target',e.target);
    
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validate = () => {
    let newErrors = {}

    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.role) newErrors.role = "Role is required"

    setErrors(newErrors)
    
    console.log('--->',newErrors);
    
    console.log('--->',Object.keys(newErrors));
    console.log(Object.keys(newErrors).length === 0);
    

    return Object.keys(newErrors).length === 0
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      console.log("Form Submitted:", formData)

      alert("User Created Successfully 🚀")

      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "",
      })
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create User
        </button>

      </form>
    </div>
  )
}

export default Users
