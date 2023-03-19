import express, { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  const { user } = req.query;
  res.send(`Hello, ${user ? user : "World"}`);
});

app.get("/user", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });

    res.json({ user });
  } catch (e) {
    console.error(e);
  }
});

app.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findMany({
      where: {
        id: parseInt(id),
      },
      include: {
        posts: true,
      },
    });

    res.json({ user });
  } catch (e) {
    console.error(e);
  }
});

app.post("/user", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({ error: "email is already exist." });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.json({ user: newUser });
  } catch (e) {
    console.error(e);
  }
});

app.post("/post", async (req: Request, res: Response) => {
  try {
    const { title, content, authorId } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    res.json({ post });
  } catch (e) {
    console.error(e);
  }
});

app.get("/post", async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findMany();

    res.json({ post });
  } catch (e) {
    console.error(e);
  }
});

app.get("/post/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ post });
  } catch (e) {
    console.error(e);
  }
});

app.patch("/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      content,
    },
  });

  res.json({ post });
});

app.delete("/post/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.json({ post });
});

app.listen(4000, () => console.log("Server running at port 4000"));
