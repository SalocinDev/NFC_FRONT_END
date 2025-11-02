import React, { useEffect, useState } from "react";
import classes from '../CSS-Folder/SurveyForm.module.css';
import { Button } from '../Components';
import api from "../api/api";

const SurveyForm = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [responses, setResponses] = useState({});
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [duplicateServices, setDuplicateServices] = useState([]);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // 🟢 New state for validation message

  const checkSurveySubmission = async (userId) => {
    try {
      const res = await api.get(`/survey/has-submitted/${userId}`);
      setHasSubmittedToday(res.data.hasSubmitted);
    } catch (err) {
      console.error("Error checking today's survey:", err);
    }
  };

  //Function to get user session
  const fetchUserSession = async () => {
    try {
      const res = await api.get("/session/get-session");
      if (res.data.loggedIn) {
        setUser(res.data);
        await checkSurveySubmission(res.data.user_id);
        await fetchAvailableServices(res.data.user_id);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching session:", err);
    } finally {
      setLoading(false);
    }
  };
  //Function to fetch today’s services
  //Fetch services that the user hasn’t submitted feedback for today
  const fetchAvailableServices = async (userId) => {
    try {
      const res = await api.get(`/survey/available-services/${userId}`);
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching available services:", err);
    }
  };

  //Function to submit the survey
  const submitSurvey = async () => {
    try {
      const payload = {
        user_id: user.user_id,
        responses,
        comment,
      };
      const res = await api.post("/survey/submit", payload);

      if (res.data.success) {
        setSubmitted(true);
        setDuplicateServices(res.data.duplicates || []);
      }
    } catch (err) {
      console.error("Error submitting survey:", err);
    }
  };

  //useEffect runs once to initialize session
  useEffect(() => {
    fetchUserSession();
  }, []);

  //Handle change in rating
  const handleRatingChange = (serviceId, value) => {
    setResponses((prev) => ({
      ...prev,
      [serviceId]: value,
    }));
    setErrorMsg(""); // clear error once user rates a service
  };

  //Handle submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validation to Check if user rated ALL services before allowing submission
    const allRated = services.every(
      (service) => responses[service.library_service_id]
    );

    if (!allRated) {
      setErrorMsg("Please rate all the services you availed before submitting a comment.");
      return;
    }

    // Only allow comment submission after rating all services
    if (!comment.trim()) {
      setErrorMsg("Please provide a comment before submitting.");
      return;
    }

    setErrorMsg("");
    submitSurvey();
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to access the survey.</p>;
  if (hasSubmittedToday)
    return (
      <div className={classes.MainDiv}>
        <h2>Library Service Feedback</h2>
        <p>You have already submitted a survey today. Thank you!</p>
      </div>
    );

  return (
    <div className={classes.MainDiv}>
      <h2>Library Service Feedback</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className={classes.Form}>
            {services.length === 0 ? (
              <p>You’ve already submitted feedback for all your services today. Thank you!</p>
            ) : (
              services.map((service) => (
                <div key={service.library_service_id} className={classes.RadioheadContainer}>
                  <label>
                    <strong>{service.library_service_name}</strong>
                  </label>
                  <div className={classes.Radiohead}>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <label key={num}>
                        {num}
                        <input
                          type="radio"
                          name={`service-${service.library_service_id}`}
                          value={num}
                          checked={responses[service.library_service_id] === num}
                          onChange={() =>
                            handleRatingChange(service.library_service_id, num)
                          }
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={classes.FeedbackContainer}>
            <label>Additional Comments:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
            ></textarea>
          </div>

          {errorMsg && (
            <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>
          )}

          <Button type="submit" name="Submit" use="SubmitFeedback" />
        </form>
      ) : (
        <div>
          <p>Thank you! Your feedback has been submitted.</p>

          {duplicateServices.length > 0 && (
            <p style={{ color: "orange" }}>
              You already submitted feedback today for:
              <ul>
                {duplicateServices.map((id) => {
                  const svc = services.find(
                    (s) => s.library_service_id === parseInt(id)
                  );
                  return (
                    <li key={id}>
                      {svc ? svc.library_service_name : `Service ID ${id}`}
                    </li>
                  );
                })}
              </ul>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
