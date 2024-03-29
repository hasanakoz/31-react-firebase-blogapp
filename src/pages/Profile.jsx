import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 25,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 500,
    marginTop: 100,
  },
  image: {
    borderRadius: "50%",
    width: "100px",
  },
});

export const Profile = () => {
  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);

  return (
    <div className={classes.mainDiv}>
      <Card className={classes.root}>
        <img
          src={currentUser?.photoURL}
          className={classes.image}
          alt="profile"
        />
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Display Name
          </Typography>
          <Typography variant="h5" component="h2">
            {currentUser?.displayName || "Not Found!"}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Email
          </Typography>
          <Typography variant="body2" component="p">
            {currentUser?.email || "Not Found!"}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
