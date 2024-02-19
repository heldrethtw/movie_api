import { connect, disconnect } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './models.js';

async function updateUsersAddPassword() {
  await connect('mongodb://localhost:27017/donkeyDB');

  const users = await User.find({});

  for (const user of users) {

    const hashedPassword = await bcrypt.hash('defaultPassword', 10);
    console.log(`Hashed password for user ${user._id}: ${hashedPassword}`)

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          Username: user.Name || user.Username,
          Password: hashedPassword
        },
        $unset: { Name: "" }
      }
    );
  }

  console.log('All users updated with usernames and passwords.');
  await disconnect();
}

updateUsersAddPassword().catch(console.error);
