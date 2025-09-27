import { useEffect, useState } from "react";
import api from "../api/api";

function TestingPage (){

const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [ageData, setAgeData] = useState([]);

  // Load all services for dropdown
  useEffect(() => {
    api.get("/routes/services").then((res) => setServices(res.data));
  }, []);

  // Load age data when a service is selected
  useEffect(() => {
    if (selectedService) {
      api.get(`/Statsreports/${selectedService}/age`).then((res) =>
        setAgeData(res.data)
      );
    }
  }, [selectedService]);

  return (
    <div>
      <h3>Age Groups by Service</h3>

      {/* Dropdown */}
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">-- Select Service --</option>
        {services.map((s) => (
          <option key={s.library_service_id} value={s.library_service_id}>
            {s.library_service_name}
          </option>
        ))}
      </select>

      {/* Results Table */}
      {ageData.length > 0 && (
        <table border="1" style={{ marginTop: "15px", width: "100%" }}>
          <thead>
            <tr>
              <th>Service</th>
              <th>Age Group</th>
              <th>Total Users</th>
            </tr>
          </thead>
          <tbody>
            {ageData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.library_service_name}</td>
                <td>{row.age_group}</td>
                <td>{row.total_users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TestingPage;