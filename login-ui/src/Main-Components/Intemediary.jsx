import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import classes from "../CSS-Folder/Intemediary.module.css";
import { SurveyWhite } from "../Logo";
import { Button, LogoComponent } from "../Components";

function Intemediary() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={classes.body}>
      <div className={classes.curvedRectangle}>
        <div className={classes.content}>
          <div className={classes.tagline}>
            <div>
            <img src={SurveyWhite} alt="Logo" className={classes.NfcLogo} />
            <p className={classes.TextServices}>Navigate through available services.</p>
            </div>
            <Button
              name="Services"
              use="ButtonServices"
              onClick={() => navigate("/Services")}
            />
          </div>
        </div>
      </div>

      <div className={classes.Ewan}>
        <div className={classes.Logo}>
          <LogoComponent />
          <p className={classes.Text}>Navigate through your account.</p>

          <div>
            <Button
              name="Account"
              use="ButtonUserPage"
              onClick={() => navigate("/UserPage")}
            />
          <Button
            name="Services"
            use="extraBtn"
            onClick={() => navigate("/Services", { state: { loggedIn: true } })}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intemediary;
