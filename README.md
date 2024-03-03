Welcome to the Donkey Archive, a movie database API. This document will show you how to interact with the API. It will show you how to sign up, sign in and request movie data. 


Getting started as a new user:

SIGNING UP

Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users
Method: POST
Body:
{
  "Username": "desiredUsername",
  "Password": "yourPassword",
  "Email": "yourEmail@example.com",
  "Birthday": "YYYY-MM-DD"
}
This is to register a new user account. All fields required.

LOG-IN:

Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/login
Method: POST
Body:{
  "Username": "yourUsername",
  "Password": "yourPassword"
}
Authenticate and receive a JWT token for accessing protected routes.

Movies
  1)Fetch All Movies
  Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/movies
  Method: GET
  Authentication: Required (JWT token)
  
  2)Fetch Movie by ID
  Endpoint: /api/tmbd/movies/:id
  Method: GET
  Authentication: Required
  
  3)Fetch Movie by Title
  Endpoint: https://donkey-archive-af41e8314602.herokuapp.com /api/tmbd/movies/title/:title
  Method: GET
  Authentication: Required
  
  4)Fetch Movies by Director
  Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/movies/director/:director
  Method: GET
  Authentication: Required
  
Users
  1)Fetch All Users
  Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/users
  Method: GET
  Authentication: Required
  
  2)Fetch User by Username
  Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/users/:username
  Method: GET
  Authentication: Required
  
Genres
  1)Fetch All Genres
  Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/genres
  Method: GET
  Authentication: Required
  
Directors
  1)Fetch All Directors
  Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/directors
  Method: GET
  Authentication: Required

Performing Actions
  1)Adding a Favorite Movie: To add a movie to a user's favorites, send a PUT request to /api/tmbd/users/:username/add-favorite/:movieID.

  2)Updating User Info: To update user information, use the PUT method on /api/tmbd/users/:username.

  3)Deleting a User: Send a DELETE request to /api/tmbd/users/:username.

Note
Ensure all API requests are made over HTTPS.

