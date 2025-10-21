import MCL from '../Images/MCL.jpg'
import { SearchBar, SearchResultList, Button, BookArchive } from '../Components';
import classes from '../CSS/AboutPage.module.css'
import React from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { AiPopUp } from '../../../login-ui/src/Components'

function AboutPage() {
  
  return (
    <div className={classes.MainBody}>
    
  
      <div className={classes.AboutUsContainer}>
        <div className={classes.AboutUs}>
        
          <h1>About Us</h1><br/>
          
          <p>The Manila City Library is a public library that serves as a hub of knowledge, learning, and community engagement in Manila. It offers a wide collection of books, periodicals, and digital resources accessible to students, researchers, and residents. The library also hosts educational programs, cultural activities, and outreach initiatives to promote literacy and lifelong learning. As a public institution, it plays a vital role in preserving history while adapting to modern information needs.</p>
          
        </div>
      </div>

  <div className={classes.MissionVision}>
      <div className={classes.MissionImage}>
        
      </div>

        <div className={classes.Mission}>
          <span className={classes.MissionParagraph}>
            <h1>Mission</h1>
            <p>The Manila City Library aspires to provide an assortment of cultural, informational, 
               recreational needs to sustain literacy among citizens of the City of Manila.</p>
          </span>
        </div>

        <div className={classes.VisionImage}>
          
        </div>

        <div className={classes.Vision}>
          <span className={classes.VisionParagraph}>
            <h1>Vision</h1>
            <p>The Manila City Library is committed to provide free access to materials, 
              resources, and excellent services to support the lifelong learning, opportunities to gather and connect, 
              and to meet the educational, and leisure needs of the people in the City of Manila.
            </p>
          </span>
        </div>
         <AiPopUp/>
    </div>
   
   </div>
  );
}

export default AboutPage;
