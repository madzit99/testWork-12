import config from "./config";
import Photo from "./models/Photo";
import User from "./models/User";
import mongoose from "mongoose";

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  const collections = ["users", "photos"];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [admin, user] = await User.create(
    {
      username: "admin@gmail.com",
      password: "123321",
      confirmPassword: "123321",
      role: "admin",
      token: crypto.randomUUID(),
      displayName: "admin",
      avatar: "fixtures/admin.avif",
    },
    {
      username: "user@gmail.com",
      password: "123321",
      confirmPassword: "123321",
      token: crypto.randomUUID(),
      displayName: "user",
      avatar: "fixtures/user.avif",
    }
  );

  await Photo.create(
    {
      user: admin,
      title: "Админ 1",
      photo: "fixtures/adminPhoto1.jpeg",
    },

    {
      user: admin,
      title: "Админ 2",
      photo: "fixtures/adminPhoto2.jpg",
    },
    {
      user: admin,
      title: "Админ 3",
      photo: "fixtures/adminPhoto3.webp",
    },
    {
      user: user,
      title: "Пользователь  1 ",
      photo: "fixtures/userPhoto1.jpg",
    },
    {
      user: user,
      title: "Пользователь  2 ",
      photo: "fixtures/userPhoto2.jpg",
    },
    {
      user: user,
      title: "Пользователь  3",
      photo: "fixtures/userPhoto3.jpeg",
    }
  );

  await db.close();
};

void run();
