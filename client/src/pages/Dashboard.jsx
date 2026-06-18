import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [poList, setPoList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/po");
      setPoList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPO = poList.length;

  const pending = poList.filter(
    (po) => !po.actualDispatchDate
  ).length;

  const onTime = poList.filter((po) => {
    if (!po.actualDispatchDate) return false;
    return new Date(po.actualDispatchDate) <= new Date(po.dueDate);
  }).length;

  const delayed = poList.filter((po) => {
    if (!po.actualDispatchDate) return false;
    return new Date(po.actualDispatchDate) > new Date(po.dueDate);
  }).length;

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Dispatch Dashboard</h2>

      <div className="row">

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Total PO</h5>
              <h1>{totalPO}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Pending</h5>
              <h1>{pending}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>On Time</h5>
              <h1>{onTime}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5>Supplier Delay</h5>
              <h1>{delayed}</h1>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;