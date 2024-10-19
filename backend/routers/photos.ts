import express from "express";
import { Request, Response, NextFunction } from "express";
import Photo from "../models/Photo";
import auth, { RequestWithUser } from "../middleware/auth";
import { imagesUpload } from "../multer";
import mongoose from "mongoose";
import permit from "../middleware/permit";

const photosRouter = express();

photosRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let photos;

      if (req.query.user) {
        photos = await Photo.find({ user: req.query.user }).populate(
          "user",
          "displayName"
        );
      } else {
        photos = await Photo.find().populate("user", "displayName");
      }

      res.send(photos);
      return;
    } catch (error) {
      next(error);
    }
  }
);

photosRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const photo = await Photo.findById(req.params.id);
      res.send(photo);
    } catch (error) {
      next(error);
    }
  }
);

photosRouter.post(
  "/",
  auth,
  imagesUpload.single("photo"),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const photo = await Photo.create({
        user: req.user?._id,
        title: req.body.title,
        photo: req.file ? req.file.filename : null,
      });

      await photo.save();

      res.send(photo);
      return;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).send(error);
        return;
      } else {
        return next(error);
      }
    }
  }
);

photosRouter.delete(
  "/:id",
  auth,
  permit("admin"),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const photoId = req.params.id;
      const photo = await Photo.findById(photoId);
      if (!photo) {
        res.status(404).send({ error: "Фото не найдено!" });
        return;
      }

      await Photo.findByIdAndDelete(photo);
      res.send({ message: "Фото удалено!" });
      return;
    } catch (error) {
       return next(error);
    }
  }
);



export default photosRouter;
