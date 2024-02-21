import { connect, disconnect } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './models.js';
import dotenv from 'dotenv';


dotenv.config();

async function updateUsersAddPassword() {
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
  const users = await User.find({});

  for (const user of users) {
    const hashedPassword = await bcrypt.hash('NewSecurePassword', 10);
    console.log(`Updating password ${user.Username}`)

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          Password: hashedPassword,
          isPasswordTemporary: true
        },
        $unset: { Name: "" }
      }
    );
  }

  console.log('All users updated with usernames and passwords.');
} catch (error) {
  console.error('failed to update users:',error);
} finally {
  await disconnect();
}
}

updateUsersAddPassword().catch(console.error);
