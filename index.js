import express from "express";
import path from 'path';
import cookieParser from "cookie-parser";
import { connectToMongoDB } from "./connect.js";
import { URL } from './models/url.js';
import { checkForAuthentication, restrictTo } from './middlewares/auth.js';

import { urlRoute } from './routes/url.js';
import { staticRoute } from "./routes/staticRouter.js";
import { userRouter } from "./routes/user.js";

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("MongoDB connecteed!"));

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRouter);
app.use("/", staticRoute);

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
  {
    shortId
  }, 
  { $push: {
      visitHistory: {
        timestamps: Date.now(),
      },
    },
  });

  if (!entry) {
    return res.status(404).send('URL not found');
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});
