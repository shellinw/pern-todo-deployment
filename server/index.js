if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000 || 5000;
const todosController = require("./Controller/todosController");
const errorhandler = require("./errorhandler");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //allow us to access req.body

app.get("/todos/:id?", todosController.getTodos);
app.post("/todos", todosController.createTodo);
app.put("/todos/:id", todosController.updateTodo);
app.delete("/todos/:id", todosController.deleteTodo);
app.listen(port, () => {
    console.log(`Running Sunshins ${port}C`);
});
app.use(errorhandler);
