const express = require('express');
const app = express();

app.use(express.json());

const student = [
    {
        id: 1,
        name: "John",
        age: 20,
        enroll:true,
        key: "1234567890"
    },
    {
        id: 2,
        name: "Jane",
        age: 21,
        enroll:true,
        key: "0987654321"
    },
    {
        id: 3,
        name: "Jack",
        age: 22,
        enroll:true,
        key: "5647382910"
    }
]

app.get("/", (req, res) => {
    res.send("Node js api")
})

app.get("/api/student", (req, res) => {
    res.send(student);
})

app.get("/api/student/:id", (req, res) => {
    const studentFound = student.find(c => c.id === parseInt(req.params.id));
    if (!studentFound)
        return res.status(404).send("No se encontró al estudiante con el id " + req.params.id);
    else res.send(studentFound);
})

app.post("/api/student", (req, res) => {
    const student = {
        id: student.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age), 
        enroll: (req.body.enroll === "true")
    };

    student.push(student);
    res.send(student);
})

app.delete("/api/student/:id", (req, res) => {
    const student = student.find(c => c.id === parseInt(req.params.id));
    if(!student) res.status(404).send("Estudiante no encontrado");
    else {
        const index = student.indexOf(student);
        student.splice(index, 1);
        res.send(student);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`))