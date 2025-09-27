import claases from '../CSS-Folder/NotFoundPage.module.css'
import {Link} from "react-router-dom";
import {BookTable, BookForm} from '../Components'
import Oops from '../Logo/Oppsie.svg'



function NotFoundPage() {
  const NotFoundPage = () => {
      
    }
  return (
    <div>
      <h1>404 NOT FOUND</h1>
      <Link to ={"/"}>
      <button>Go Back Home</button>
      </Link>
      <BookForm/>
      {/* <BookTable /> */}
    </div>
  );
};

export default NotFoundPage;