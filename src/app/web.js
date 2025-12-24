import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import apiRouter from "../routers/api.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import dummyApi from "../routers/dummy.js";

const web = express();

web.use(cors());
web.use(cookieParser());
web.use(bodyParser.json());

web.use("/img", express.static("public/img"));

web.use(apiRouter);
web.use("/api-dummy", dummyApi);

web.use(errorMiddleware.RouteNotFound);
web.use(errorMiddleware.ErrorHandler);

export { web };
