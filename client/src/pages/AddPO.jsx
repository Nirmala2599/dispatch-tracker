import { useState, useEffect } from "react";
import API from "../services/api";

function AddPO() {
  const [formData, setFormData] = useState({
    poDate: "",
    poNumber: "",
    customerName: "",
    supplierName: "",
    qty: "",
    leadTimeWeeks: "",
    advanceReleaseDate: "",
    dueDate: ""
  });

  useEffect(() => {
    if (formData.advanceReleaseDate && formData.leadTimeWeeks) {
      const date = new Date(formData.advanceReleaseDate);

      date.setDate(
        date.getDate() + Number(formData.leadTimeWeeks) * 7
      );

      setFormData((prev) => ({
        ...prev,
        dueDate: date.toISOString().split("T")[0]
      }));
    }
  }, [formData.advanceReleaseDate, formData.leadTimeWeeks]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const handleSubmit = async () => {
  try {
    const response = await API.post(
      "/po",
      formData
    );

    console.log(response.data);

    alert("PO Saved Successfully");
  } catch (error) {
      console.log(error.response?.data);
  }
};

  return (
    <div className="container mt-4">
      <h2>Add Purchase Order</h2>

      <div className="row">

        <div className="col-md-6 mb-3">
          <label>PO Date</label>
          <input
            type="date"
            name="poDate"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>PO Number</label>
          <input
            type="text"
            name="poNumber"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Customer Name</label>
          <input
            type="text"
            name="customerName"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Supplier Name</label>
          <input
            type="text"
            name="supplierName"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Qty</label>
          <input
            type="number"
            name="qty"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Lead Time (Weeks)</label>
          <input
            type="number"
            name="leadTimeWeeks"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Advance Release Date</label>
          <input
            type="date"
            name="advanceReleaseDate"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            className="form-control"
            readOnly
          />
        </div>

      </div>

      <button className="btn btn-primary" 
      onClick={handleSubmit}
      >
        Save PO
      </button>

    </div>
  );
}

export default AddPO;