import { connect, disconnect } from 'mongoose';
import { User } from './models.js'; // Adjust the path as necessary

async function updateUsers() {
  await connect('mongodb://localhost:27017/donkeyDB'); 

  const users = await User.find({}); // Fetch all users

  for (const user of users) {
    await User.updateOne(
      { _id: user._id },
      {
        $set: { Username: user.Name }, // Set the Username field based on the Name field
        $unset: { Name: "" } // Optionally remove the Name field
      }
    );
  }

  console.log('All users updated.');
  await disconnect();
}

updateUsers().catch(console.error);
