import { Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import Settings from "./pages/Settings"
import PaymentReminder from "./pages/PaymentReminder";
import PostsList from "./pages/PostsList"
import Login from "./pages/Login"
import ProtectedRoute from "./utils/auth"
import Counter from "./pages/Counter"
import PostalMasterList from './pages/PostalMasterList'
import PostalMaster from "./pages/PostalMaster"
import { TodoList } from "./pages/todo/TodoList"
import TodoAdd from "./pages/todo/TodoForm"
import { PostalRedux } from "./pages/PostalRedux"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payments" element={<PaymentReminder />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/postal_master/:id?" element={<PostalMaster />} />
        <Route path="/postal_master_list" element={<PostalMasterList />} />
        <Route path="/todo_list" element={<TodoList />} />
        <Route path="/postal_redux" element={<PostalRedux />} />
        <Route path="/todo_add/:id?" element={<TodoAdd />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App
