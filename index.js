const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override')  // send patch request from html form

const port = 8080;

app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true })); // parse the data

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

let posts = [
  {
    id: uuidv4(),
    username: "alihassan",
    content: "Work, work and just work!",
  },
  {
    id: uuidv4(),
    username: "mhassan",
    content: "I love Coding!",
  },
  {
    id: uuidv4(),
    username: "hamzahsyed",
    content: "Hardworking is the key to success!",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// new form
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// post new post
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// update post
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent
  console.log(post)
  res.redirect("/posts")
});

// Edit
app.get('/posts/:id/edit', (req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=> id===p.id);
  res.render('edit.ejs', {post})
})

app.listen(port, () => {
  console.log(`App is listining on port ${port}`);
});
