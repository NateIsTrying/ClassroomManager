const app = require("./app");
require("dotenv").config();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

app.post("/register", async (req, res, next) => {
  try {
    const instructor = await prisma.instructor.create({
      data: {
        username: req.body.username, 
        password: req.body.password,
      },
    });
  
    const token = jwt.sign({ id: instrucotr.id }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

app.get("/me", async (req, res, next) => {
  try {
    const instructor = await prisma.instructor.findUnique({
      where: { id: req.user?.id },
    });

    res.json(instructor);
  } catch (error) {
    next(error);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
