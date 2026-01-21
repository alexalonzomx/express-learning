import express from 'express';

const app = express();

// Hability to parse the body of the request
app.use(express.json());

// routes import
import router from './routes/user.route.js';
import postRouter from './routes/post.route.js';

// routes declaration
app.use("/api/v1/users", router);

app.use("/api/v1/posts", postRouter);

export default app;