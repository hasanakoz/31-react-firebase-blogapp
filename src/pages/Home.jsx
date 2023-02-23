import React, { useEffect } from "react";

import { BlogCard } from "../components/BlogCard";

import loadingGif from "../assets/loading.gif";
import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { BlogContext } from "../context/BlogContextProvider";
import { AuthContext } from "../context/AuthContextProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  title: {
    fontFamily: "Girassol",
    textAlign: "center",
    color: "#046582",
  },
  mainRoot: {
    marginTop: 70,
  },
}));

const Home = () => {
  const classes = useStyles();
  const { currentBlogs } = useContext(BlogContext);

  return (
    <div className={classes.mainRoot}>
      <Typography className={classes.title} variant="h3" noWrap>
        ──── Blogboard ────
      </Typography>
      <>
        <Grid
          container
          className={classes.root}
          spacing={5}
          justifyContent="center"
        >
          {currentBlogs ? (
            currentBlogs?.map((item, id) => (
              <Grid key={id} item>
                <BlogCard post={item} />
              </Grid>
            ))
          ) : (
            <h1 className={classes.mainRoot}>No data available</h1>
          )}
        </Grid>
      </>
    </div>
  );
};

export default Home;
