const express = require("express");
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Amit", email: "amit@test.com" },
  { id: 2, name: "Riya", email: "riya@test.com" }
];

const notes = [
  { id: 1, title: "Note 1", content: "Content 1", userId: 1 },
  { id: 2, title: "Note 2", content: "Content 2", userId: 2 }
];

// FIX #3
// Original function did not return anything
function getUserById(id) {
  return users.find(user => user.id === id);
}

// FIX #7
// Original code used Math.random() * 1000 which could create duplicate IDs
function generateNoteId() {
  return Date.now();
}

// Added because original code called fetchExternalData()
// but the function was never defined
async function fetchExternalData() {
  return {
    message: "External data fetched successfully"
  };
}

// FIX #1
// Original:
// res.send(userList);
// Error: userList was not defined
app.get("/users", (req, res) => {
  res.json(users);
});

// FIX #2
// Original:
// const id = req.params.id;
// users.find(u => u.id === id)
//
// Error:
// req.params.id is string, user.id is number
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.json(user);
});

// FIX #4
// Original:
// notes.lenght
//
// Error:
// spelling mistake
app.get("/notes/count", (req, res) => {
  const total = notes.length;

  res.json({ total });
});

// FIX #5
// Original:
// const data = fetchExternalData();
//
// Errors:
// 1. fetchExternalData not defined
// 2. Missing await
app.get("/external-data", async (req, res) => {
  try {
    const data = await fetchExternalData();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch external data"
    });
  }
});

// FIX #6
// Original:
// if (notes = [])
//
// Errors:
// 1. Assignment instead of comparison
// 2. Array comparison invalid
app.get("/notes", (req, res) => {

  if (notes.length === 0) {
    return res.status(404).json({
      message: "No notes found"
    });
  }

  res.json(notes);
});

// FIX #8 and #9
// Original:
// const newId = generateNoteId;
//
// Error:
// Stored function reference instead of calling function
//
// Original validation:
// if (!title && !content)
//
// Error:
// Only failed when BOTH values missing
app.post("/notes", (req, res) => {

  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res.status(400).json({
      message: "title, content and userId are required"
    });
  }

  const user = getUserById(Number(userId));

  if (!user) {
    return res.status(404).json({
      message: "User does not exist"
    });
  }

  const newNote = {
    // Fixed by calling function
    id: generateNoteId(),

    title,
    content,
    userId: Number(userId)
  };

  notes.push(newNote);

  res.status(201).json(newNote);
});

// FIX #10
// Original:
// notes.findIndex(n => n.id === id)
//
// Error:
// id was string
//
// Original:
// notes.splice(noteIndex,1)
//
// Error:
// If noteIndex = -1, last note gets deleted
app.delete("/notes/:id", (req, res) => {

  const id = Number(req.params.id);

  const noteIndex = notes.findIndex(
    note => note.id === id
  );

  if (noteIndex === -1) {
    return res.status(404).json({
      message: "Note not found"
    });
  }

  notes.splice(noteIndex, 1);

  res.json({
    message: "Note deleted successfully"
  });
});

// FIX #11
// Original:
// user.name = username;
//
// Error:
// username variable does not exist
app.put("/users/:id", (req, res) => {

  const id = Number(req.params.id);
  const { name } = req.body;

  const user = getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  // Fixed variable name
  user.name = name;

  res.json(user);
});

// FIX #12
// Original:
// n.userId = userId
//
// Error:
// Assignment operator used
//
// It changed data instead of filtering
app.get("/user-notes/:userId", (req, res) => {

  const userId = Number(req.params.userId);

  const userNotes = notes.filter(
    note => note.userId === userId
  );

  res.json(userNotes);
});

// FIX #13 (Security Vulnerability)
// Original:
// email === admin || password === 123456
//
// Problem:
// User could login if either condition was true
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (
    email === "admin@test.com" &&
    password === "123456"
  ) {
    return res.json({
      message: "Login successful"
    });
  }

  res.status(401).json({
    message: "Invalid credentials"
  });
});

// FIX #14
// Original:
// users.filter(...)
//
//
// filter returns array
//
// user.name would be undefined
app.get("/profile/:id", (req, res) => {

  const id = Number(req.params.id);

  const user = getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.json(user);
});

// FIX #15
// Original:
// a + b
//
// Problem:
// "10" + "20" = "1020"
//
// Fixed using Number()
app.post("/sum", (req, res) => {

  const { a, b } = req.body;

  const total = Number(a) + Number(b);

  if (isNaN(total)) {
    return res.status(400).json({
      message: "a and b must be numbers"
    });
  }

  res.json({ total });
});

// FIX #16
// Original:
// app.listen(3000)
// console.log("Server running on port 5000")
//
// Port mismatch
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});