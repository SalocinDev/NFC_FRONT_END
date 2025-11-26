import classes from '../CSS-Folder/SettingPage.module.css';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; 
import { Button, ImageUpload, Input } from '../Components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../Services/SessionUtils';
import { updateAccount, updateAddress } from '../Services/UpdateAccount';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.warn("No changes detected.");
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
      toast.warn("No address changes detected.");
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

            <Input type="text" label="Surname" placeholder="Surname" value={LN} onChange={(e) => setLN(e.target.value)} />
         
          <div className={classes.InputField}>
          
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
            <label className={classes.inputLabel}>Contact Number</label>
          </div>

      
            
            <Input type="text" label="First Name" value={FN} onChange={(e) => setFN(e.target.value)} />
            <Input type="email" label="Email"  value={Email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="text" label="Middle Name"  value={MN} onChange={(e) => setMN(e.target.value)} />     
            <Input type="text"  label="University"  value={School} onChange={(e) => setSchool(e.target.value)} />
            <Input type="date" label="Date of Birth" value={DoB} onChange={(e) => setDoB(e.target.value)} />
            <Input type="password" label="Password"  value={Pass} onChange={(e) => setPass(e.target.value)} />
      
         
            <div className={classes.InputField}>
            <select value={Gender} onChange={(e) => setGender(e.target.value)} className={classes.GenderInput}>
              <option value="" disabled hidden>Choose gender</option>
              {genderOptions.map((g, i) => (
                <option key={i} value={g}>{g}</option>
              ))}
            </select>
            <label className={classes.inputLabel}>Gender</label>
            </div>

            <Input type="password" label="Old Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
     
          <Button name="Update Account" use="ConfirmPassButton" onClick={handleUpdateAcc} />
        </div>

        {/* <h1>LOCATION SETTING</h1>
          <Input type="text" label="Address" value={Address} onChange={(e) => setAddress(e.target.value)} />
          <Input type="text" label="City"  value={City} onChange={(e) => setCity(e.target.value)} />
          <Input type="text" label="Zip Code"  value={Zip} onChange={(e) => setZip(e.target.value)} />
          <Button name="Update Address" use="UpdateProfileButton" onClick={handleUpdateAddress}/> */}
      </div>
    </div>
  );
}

export default SettingPage;
