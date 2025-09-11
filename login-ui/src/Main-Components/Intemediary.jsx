import { useNavigate } from 'react-router-dom';
import { Button } from '../Components/index';

function Intermediary() {
    const navigate = useNavigate();

    return (
        <div>
            <Button name="Account" use="ButtonUserPage" onClick={() => navigate("/UserPage")}/>
            <Button name="Services" use="ButtonServices" onClick={() => navigate("/Services")}/>
        </div>
    );
}

export default Intermediary;
