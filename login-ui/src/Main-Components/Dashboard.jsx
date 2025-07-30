import classes from '/src/CSS-Folder/Dashboard.module.css';

function Dashboard() {
  return (

     <div className={classes.body}>
      <div className={classes.curvedRectangle}>
        <div className={classes.content}>
          <Whitelogo />
          <p className={classes.tagline}>
            "Your premier digital library for borrowing and reading books"
          </p>
        </div>
      </div>
    </div>

  );
}

export default Dashboard;
