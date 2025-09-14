import MCL from '../Images/MCL.jpg'
import { SearchBar, SearchResultList, Button, BookArchive } from '../Components';
import classes from '../CSS/AboutPage.module.css'

function AboutPage() {
  
  return (
    <div>

          <div className={classes.HeaderContainer}>
          <span className={classes.ManilaAbove}>MANILA</span>
          <span className={classes.LibraryAbove}>
            City <br /> Library
          </span>
        </div>

       <main className={classes.main}>
        <img src="/src/Images/MCL.jpg" alt="Library" className={classes.backgroundImage} />
        <div className={classes.overlayText}>
         <h2>About Us</h2>
          <p>
            The Manila City Library is a public library that serves as a hub of knowledge, learning, and community engagement in Manila. It offers a wide collection of books, periodicals, and digital resources accessible to students, researchers, and residents. The library also hosts educational programs, cultural activities, and outreach initiatives to promote literacy and lifelong learning. As a public institution, it plays a vital role in preserving history while adapting to modern information needs.
          </p>
        </div>
        
        

        <div className={classes.bar}></div>

        <section className={classes.section}>
          <h2>Our Vision</h2>
          <p>
            The Manila City Library aspires to provide an assortment of cultural, informational, and recreational needs to sustain literacy among citizens of the City of Manila.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Our Mission</h2>
          <p>
            The Manila City Library is committed to provide free access to materials, resources, and excellent services to support lifelong learning, opportunities to read and connect, and the educational and leisure needs of the people in the City of Manila.
          </p>
        </section>
      </main>


    </div>
  );
}

export default AboutPage;
