import classes from '../CSS-Folder/SettingPage.module.css';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; 
import { Button, ImageUpload, Input } from '../Components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../Services/SessionUtils';
import { updateAccount, updateAddress } from '../Services/UpdateAccount';

function SettingPage() {
  const navigate = useNavigate(); 
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));

  const [FN, setFN] = useState("");
  const [MN, setMN] = useState("");
  const [LN, setLN] = useState("");
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [DoB, setDoB] = useState("");
  const [Gender, setGender] = useState("");
  const [Contact, setContact] = useState("");
  const [School, setSchool] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [Zip, setZip] = useState("");
  const [File, setFile] = useState();

  const genderOptions = ["Man", "Woman", "Mayonnaise"];

  useEffect(() => {
    if (storedUser) {
      setFN(storedUser.user_firstname || "");
      setMN(storedUser.user_middlename || "");
      setLN(storedUser.user_lastname || "");
      setEmail(storedUser.user_email || "");
      setDoB(storedUser.user_date_of_birth ? storedUser.user_date_of_birth.split("T")[0] : "");
      setGender(storedUser.user_gender || "");
      setContact(storedUser.user_contact_number || "");
      setSchool(storedUser.user_school || "");
    }
  }, []);


  const handleUpdateAcc = async () => {
    const updatedFields = {};

    if (LN !== storedUser.lastName) updatedFields.lastName = LN;
    if (FN !== storedUser.firstName) updatedFields.firstName = FN;
    if (MN !== storedUser.middleName) updatedFields.middleName = MN;
    if (Email !== storedUser.email) updatedFields.email = Email;
    const storedDoB = storedUser.user_date_of_birth ? storedUser.user_date_of_birth.split("T")[0] : "";
    if (DoB !== storedDoB) updatedFields.dob = DoB;
    if (Gender !== storedUser.gender) updatedFields.gender = Gender;
    if (Contact !== storedUser.contact) updatedFields.contact = Contact;
    if (School !== storedUser.school) updatedFields.school = School;
    if (newPass) {
      updatedFields.oldPassword = Pass;
      updatedFields.newPassword = newPass;
    }

    if (Object.keys(updatedFields).length === 0) {
      alert("No changes detected.");
      return;
    }

    const result = await updateAccount(updatedFields, navigate);
    if (!result.success) return;
    if (updatedFields.newPassword || updatedFields.email) {
      await logOut();
      navigate("/");
    }
  };

  const handleUpdateAddress = () => {
    const updatedAddress = {};
    if (Address) updatedAddress.address = Address;
    if (City) updatedAddress.city = City;
    if (Zip) updatedAddress.zip = Zip;

    if (Object.keys(updatedAddress).length === 0) {
      alert("No address changes detected.");
      return;
    }

    updateAddress(updatedAddress, navigate);
  };
  return (
    <div className={classes.SettingMain}>
      <div className={classes.PersonalDetail}>
        <h1>ACCOUNT SETTING</h1>
        <div className={classes.ImageContainer}>
        <ImageUpload/>
        </div>
        <div className={classes.InputGrid}>
          <div className={classes.InputField}>
            <label>Surname</label>
            <Input type="text" placeholder="Surname" value={LN} onChange={(e) => setLN(e.target.value)} />
          </div>

          <div className={classes.InputField}>
            <label>Contact</label>
            <PhoneInput
              country={'ph'}
              value={Contact}
              onChange={setContact}
              specialLabel=""
              buttonClass={classes.myDropdown}
              inputClass={classes.input}
              dropdownClass={classes.myCountryList}
              searchable={true}
              disableSearchIcon={true}
            />
          </div>

          <div className={classes.InputField}>
            <label>First Name</label>
            <Input type="text" placeholder="First Name" value={FN} onChange={(e) => setFN(e.target.value)} />
          </div>

          <div className={classes.InputField}>
            <label>Email</label>
            <Input type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className={classes.InputField}>
            <label>Middle Name</label>
            <Input type="text" placeholder="Middle Name" value={MN} onChange={(e) => setMN(e.target.value)} />
          </div>

          <div className={classes.InputField}>
            <label>University</label>
            <Input type="text" placeholder="Your University" value={School} onChange={(e) => setSchool(e.target.value)} />
          </div>

          <div className={classes.InputField}>
            <label>Birth Date</label>
            <Input type="date" value={DoB} onChange={(e) => setDoB(e.target.value)} />
          </div>

          <div className={classes.InputField}>
            <label>Old Password</label>
            <Input type="password" placeholder="Enter Your Old Password" value={Pass} onChange={(e) => setPass(e.target.value)} />
          </div>

          <div className={classes.InputField}>
            <label>Gender Identity</label>
            <select value={Gender} onChange={(e) => setGender(e.target.value)} className={classes.GenderInput}>
              <option value="" disabled hidden>Choose gender</option>
              {genderOptions.map((g, i) => (
                <option key={i} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className={classes.InputField}>
            <label>New Password</label>
            <Input type="password" placeholder="Enter Your New Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
          </div>

          <Button name="Update Account" use="ConfirmPassButton" onClick={handleUpdateAcc} />
        </div>

        <h1>LOCATION SETTING</h1>
        <div className={classes.InputField}>
          <label>Address</label>
          <Input type="text" placeholder="Please Enter Your Address" value={Address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className={classes.InputField}>
          <label>City</label>
          <Input type="text" placeholder="Please Enter Your City" value={City} onChange={(e) => setCity(e.target.value)} />
        </div>

        <div className={classes.InputField}>
          <label>Zip Code</label>
          <Input type="text" placeholder="Please Enter Your Zip Code" value={Zip} onChange={(e) => setZip(e.target.value)} />
        </div>   
       
          <Button name="Update Address" use="UpdateProfileButton" onClick={handleUpdateAddress}/>
          
      </div>
    </div>
  );
}

export default SettingPage;
