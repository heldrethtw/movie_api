import mongoose, { connect, disconnect } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './models/schemas.js';
import dotenv from 'dotenv';


dotenv.config();

connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB with Mongoose'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const DEFAULT_PASSWORD = 'password';

async function updateUsersAddPassword() {
  try {
    await connect(process.env.MONGO_URI);

    const users = await User.find({});
    for (const user of users) {
      user.hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
      await User.updateOne({ _id: user._id },
        {
          $set: {
            Username: user.Name || user.Username,
            Password: hashedPassword,
          },
          $unset: { Name: "" }
        });

      console.log(`Updated user: ${user.Username} with a new hashed password`);
    }
    console.log('All users updated with hashed passwords');
  } catch (error) {
    console.error('Error updating users:', error);
  }
  finally {
    await disconnect();
  }
}

updateUsersAddPassword().catch(console.error);


