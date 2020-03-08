import express from "express";

const app = express();
app.use(express.json());
// app.set("view engine", "ejs");

const generateId = (
  notes: Array<{
    id: number;
    content: string;
    date: number;
    important: boolean;
  }>
) => {
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxID + 1;
};

const port: number = 8080;

let notes = [
  {
    id: 1,
    content: "Hello World",
    date: Date.now(),
    important: true
  },
  {
    id: 2,
    content: "number two",
    date: Date.now(),
    important: false
  },
  {
    id: 3,
    content: "number three",
    date: Date.now(),
    important: false
  },
  {
    id: 4,
    content: "number four",
    date: Date.now(),
    important: true
  }
];

// const test: string[] = ["foo", "bar", "baz"];

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json(notes);
});

app.get("/:id", (req: express.Request, res: express.Response) => {
  const id: number = +req.params.id;
  const note = notes.filter((note) => note.id === id);

  note.length > 0 ? res.status(200).json(note) : res.status(404).json("Not found");
});

app.delete("/:id", (req: express.Request, res: express.Response) => {
  const id: number = +req.params.id;
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post("/", (req: express.Request, res: express.Response) => {
  const body: {
    content: string;
    important?: boolean;
  } = req.body;

  console.log(body);

  if (!body.content) {
    res.status(400).send("Not a valid input");
  }

  const note = {
    id: generateId(notes),
    content: body.content,
    date: Date.now(),
    important: body.important || false
  };

  notes = [...notes, note];
  res.status(200).json(note);
});

app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}..`));
