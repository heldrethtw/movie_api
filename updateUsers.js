import { connect, disconnect } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './models.js';
import dotenv from 'dotenv';

dotenv.config();

async function updateUsersAddPassword() {
  await connect(process.env.CONNECTION_URI);
    
  const users = await User.find({});

  for (const user of users) {
    const hashedPassword = await bcrypt.hash('defaultPassword', 10);
    console.log(`Updating ${user.Username}`)

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          Username: user.Name || user.Username,
          Password: hashedPassword,
          isPasswordTemporary: true
        },
        $unset: { Name: "" }
      }
    );
  }

  console.log('All users updated with usernames and passwords.');
  await disconnect();
}

updateUsersAddPassword().catch(console.error);
