import {Link} from "react-router-dom";

function NotFoundPage() {
  const NotFoundPage = () => {
      
    }
  return (
    <div>
      <h1>Ito ay imong guniguni lamang</h1>
      <Link to ={"/"}>
      <button>Go Back Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;