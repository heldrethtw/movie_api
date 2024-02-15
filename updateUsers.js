import { connect, disconnect } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './models.js'; // Adjust the path as necessary

async function updateUsersAddPassword() {
  await connect('mongodb://localhost:27017/donkeyDB'); 

  const users = await User.find({}); // Fetch all users

  for (const user of users) {
    // Hash a default password
    const hashedPassword = await bcrypt.hash('defaultPassword', 10); 
console.log(`Hashed password for user ${user._id}: ${hashedPassword}`)
    // Update user document
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          Username: user.Name || user.Username, // Set Username based on Name, fallback to existing Username
          Password: hashedPassword // Add the hashed password
        },
        $unset: { Name: "" } // Remove the Name field, if desired
      }
    );
  }

  console.log('All users updated with usernames and passwords.');
  await disconnect();
}

updateUsersAddPassword().catch(console.error);
