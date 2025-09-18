import {Link} from "react-router-dom";
import {BookTable} from '../Components'

function NotFoundPage() {
  const NotFoundPage = () => {
      
    }
  return (
    <div>
      <h1>Ito ay imong guniguni lamang</h1>
      <Link to ={"/"}>
      <button>Go Back Home</button>
      </Link>

      <BookTable />
    </div>
  );
};

export default NotFoundPage;