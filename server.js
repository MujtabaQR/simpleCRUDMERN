const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

//mongoose
mongoose.connect(
  "mongodb+srv://mujtaba:indkalxqka@cluster0.r18l5dv.mongodb.net/moviesDB?retryWrites=true&w=majority"
);

//data schema and model
const movieSchema = {
  title: String,
  genre: String,
  year: String,
};

const Movie = mongoose.model("Movie", movieSchema);

//API routes
//List movies
app.get("/movies", function (req, res) {
  //res.send("express is running")
  Movie.find().then((movies) => res.json(movies));
});
//Add a movie
app.post("/newmovie", function (req, res) {
  //res.send("express is running")
  const title = req.body.title;
  const genre = req.body.genre;
  const year = req.body.year;

  const newMovie = new Movie({
    title,
    genre,
    year,
  });
  newMovie.save();
});
//Delete a movie
app.delete("/deletemovie/:id", function (req, res) {
  const id = req.params.id;
  Movie.findByIdAndDelete({ _id: id }, function (err) {
    if (!err) {
      console.log("movie deleted");
    } else {
      console.log(err);
    }
  });
});

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("client/build"));
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log("express is running");
});
