import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function POList() {
  const [poList, setPoList] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();


  useEffect(() => {
    fetchPOs();
  }, []);

  const fetchPOs = async () => {
    try {
      const res = await API.get("/po");
      console.log(res.data); // check browser console
      setPoList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
const getStatus = (po) => {

  if (!po.actualDispatchDate)
    return <span className="badge bg-warning">Pending</span>;

  const due = new Date(po.dueDate);
  const actual = new Date(po.actualDispatchDate);

  if (actual <= due)
    return <span className="badge bg-success">On Time</span>;

  return <span className="badge bg-danger">Supplier Delay</span>;
};
const getDelayDays = (po) => {

  if (!po.actualDispatchDate)
    return "-";

  const due = new Date(po.dueDate);
  const actual = new Date(po.actualDispatchDate);

  const diff = Math.ceil(
    (actual - due) /
    (1000 * 60 * 60 * 24)
  );

  return diff > 0 ? diff : 0;
};
const filteredPOs = poList.filter((po) => {

  const searchText = search.toLowerCase();

  const matchesSearch =
    String(po.poNumber).toLowerCase().includes(searchText) ||
    po.customerName.toLowerCase().includes(searchText) ||
    po.supplierName.toLowerCase().includes(searchText);

  let status = "Pending";

  if (po.actualDispatchDate) {
    const due = new Date(po.dueDate);
    const actual = new Date(po.actualDispatchDate);

    status =
      actual <= due
        ? "On Time"
        : "Supplier Delay";
  }

  const matchesStatus =
    statusFilter === "All" || status === statusFilter;

  return matchesSearch && matchesStatus;
});

const deletePO = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this PO?"
  );

  if (!confirmDelete) return;

  try {

    await API.delete(`/po/${id}`);

    alert("Purchase Order Deleted Successfully");

    fetchPOs();

  } catch (error) {
    console.log(error);
  }
};
const exportToExcel = () => {

  const exportData = filteredPOs.map((po) => ({

    "PO Number": po.poNumber,
    "Customer": po.customerName,
    "Supplier": po.supplierName,
    "Qty": po.qty,
    "Due Date": new Date(po.dueDate).toLocaleDateString(),
    "Committed Date": po.committedDispatchDate
      ? new Date(po.committedDispatchDate).toLocaleDateString()
      : "",

    "Actual Dispatch": po.actualDispatchDate
      ? new Date(po.actualDispatchDate).toLocaleDateString()
      : "",

    "Delay Days": getDelayDays(po),

    "Status":
      !po.actualDispatchDate
        ? "Pending"
        : new Date(po.actualDispatchDate) <= new Date(po.dueDate)
        ? "On Time"
        : "Supplier Delay"
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Dispatch Tracker");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "Dispatch_Tracker.xlsx");
};
  return (
    <div className="container mt-4">
      <h2>Purchase Orders</h2>
      <div className="row mb-3">
  <div className="col-12 col-md-8 mb-2">
    <input
      type="text"
      className="form-control"
      placeholder="Search by PO Number, Customer or Supplier..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  
  <div className="col-12 col-md-4">
    <select
      className="form-select"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="All">All</option>
      <option value="Pending">Pending</option>
      <option value="On Time">On Time</option>
      <option value="Supplier Delay">Supplier Delay</option>
    </select>
  </div>
</div>
<div className="mb-3">
  <button
    className="btn btn-success"
    onClick={exportToExcel}
  >
    Export to Excel
  </button>
</div>
      <div className="table-responsive">

<table className="table table-bordered table-hover"></table>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S.No</th>
            <th>PO Number</th>
            <th>Customer</th>
            <th>Supplier</th>
            <th>Qty</th>
            <th>Due Date</th>
            <th>Committed Date</th>
            <th>Actual Dispatch</th>
            <th>Delay Days</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredPOs.map((po, index) => (
           <tr key={po._id}>
  <td>{index + 1}</td>
  <td>{po.poNumber}</td>
  <td>{po.customerName}</td>
  <td>{po.supplierName}</td>
  <td>{po.qty}</td>

  <td>
    {new Date(po.dueDate).toLocaleDateString()}
  </td>

  <td>
    {po.committedDispatchDate
      ? new Date(po.committedDispatchDate).toLocaleDateString()
      : "-"}
  </td>

  <td>
    {po.actualDispatchDate
      ? new Date(po.actualDispatchDate).toLocaleDateString()
      : "-"}
  </td>

  <td>{getDelayDays(po)}</td>

  <td>{getStatus(po)}</td>

  <td>
<button
  className="btn btn-warning btn-sm"
  onClick={() => navigate(`/edit/${po._id}`)}
>
  Update Dispatch
</button>
<button
  className="btn btn-danger btn-sm"
  onClick={() => deletePO(po._id)}
>
  Delete
</button>
  </td>
</tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default POList;