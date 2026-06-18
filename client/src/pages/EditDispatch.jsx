import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function EditDispatch() {
  const { id } = useParams();
  const [committedDispatchDate, setCommittedDispatchDate] = useState("");
  const [actualDispatchDate, setActualDispatchDate] = useState("");
  const handleSave = async () => {

  try {

    await API.put(`/po/${id}`, {
      committedDispatchDate,
      actualDispatchDate
    });

    alert("Dispatch Updated Successfully");

  } catch (error) {
    console.log(error);
  }

};

  return (
    <div className="container mt-4">

      <h2>Update Dispatch</h2>

      <div className="mb-3">
        <label>Committed Dispatch Date</label>
        <input
          type="date"
          className="form-control"
          value={committedDispatchDate}
          onChange={(e) =>
            setCommittedDispatchDate(e.target.value)
          }
        />
      </div>

      <div className="mb-3">
        <label>Actual Dispatch Date</label>
        <input
          type="date"
          className="form-control"
          value={actualDispatchDate}
          onChange={(e) =>
            setActualDispatchDate(e.target.value)
          }
        />
      </div>
      <button
  className="btn btn-success"
  onClick={handleSave}
>
  Save Dispatch
</button>

    </div>
  );
}

export default EditDispatch;