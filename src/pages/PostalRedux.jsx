import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FixedSizeList as List } from "react-window";

import { fetchPostaldata } from "../store/postalSlice";

const GRID_COLUMNS = "50px 1.5fr 1.5fr 1fr 1fr 1.5fr 1fr 1.2fr";
const MIN_TABLE_WIDTH = 800;

export const PostalRedux = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [listWidth, setListWidth] = useState(MIN_TABLE_WIDTH);

  const { data = [], loading, error } = useSelector((state) => state.postal);

  useEffect(() => {
    dispatch(fetchPostaldata());
  }, [dispatch]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setListWidth(Math.max(w, MIN_TABLE_WIDTH));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function addNew() {
    navigate("/postal_master");
  }

  const handleEdit = (id) => {
    navigate(`/postal_master/${id}`);
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          color: "red",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        {error}
      </div>
    );
  }

  // Row Renderer
  const Row = ({ index, style }) => {
    const item = data[index];

    if (!item) return null;

    return (
      <div
        style={{
          ...style,
          display: "grid",
          gridTemplateColumns: GRID_COLUMNS,
          minWidth: `${MIN_TABLE_WIDTH}px`,
          alignItems: "center",
          padding: "0 8px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: index % 2 === 0 ? "#fff" : "#f9fafb",
          fontSize: "13px",
          boxSizing: "border-box",
        }}
      >
        <div>{index + 1}</div>

        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.state_name}
        </div>

        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.district_name}
        </div>

        <div>{item.city}</div>

        <div>{item.pincode}</div>

        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.area}
        </div>

        <div>
          <span
            style={{
              padding: "3px 8px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: "600",
              background: item.status === 1 ? "#dcfce7" : "#fee2e2",
              color: item.status === 1 ? "#166534" : "#991b1b",
            }}
          >
            {item.status === 1 ? "Active" : "Inactive"}
          </span>
        </div>

        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={() => handleEdit(item.id)}
            style={{
              border: "none",
              background: "#2563eb",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Edit
          </button>

          <button
            style={{
              border: "none",
              background: "#dc2626",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "16px",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "26px", fontWeight: "700" }}>
            Postal Master
          </h1>
          <p style={{ marginTop: "4px", color: "#6b7280", fontSize: "13px" }}>
            Total Records: {data.length}
          </p>
        </div>

        <button
          style={{
            border: "none",
            background: "#16a34a",
            color: "#fff",
            padding: "9px 16px",
            borderRadius: "7px",
            cursor: "pointer",
            fontWeight: "600",
          }}
          onClick={addNew}
        >
          Add New
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          overflowX: "auto", // allows horizontal scroll on small screens
        }}
      >
        {/* Header Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: GRID_COLUMNS,
            minWidth: `${MIN_TABLE_WIDTH}px`,
            background: "#111827",
            color: "#fff",
            padding: "14px 8px",
            fontWeight: "600",
            fontSize: "13px",
            boxSizing: "border-box",
          }}
        >
          <div>ID</div>
          <div>State</div>
          <div>District</div>
          <div>City</div>
          <div>Pincode</div>
          <div>Area</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {/* Virtualized Rows */}
        <div ref={containerRef}>
          <List
            height={650}
            width={listWidth}
            itemCount={data.length}
            itemSize={55}
          >
            {Row}
          </List>
        </div>
      </div>
    </div>
  );
};
