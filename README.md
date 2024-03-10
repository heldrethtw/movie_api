Welcome to the Donkey Archive, a movie database API. This document will show you how to interact with the API. It will show you how to sign up, sign in and request movie data.

`````json
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
Note: This is to register a new user account. All fields are required.

LOG-IN:

Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/login
Method: POST
Body:{
"Username": "yourUsername",
"Password": "yourPassword"
}
Note: Authenticate and receive a JWT token for accessing protected routes.

Movies
1)Fetch All Movies
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/movies
Method: GET
Authentication: Required (JWT token)

2)Fetch Movie by ID
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/movies/:id
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

5)Create a New Movie
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/movies
Method: Post

Users
1)Fetch All Users
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users
Method: GET
Authentication: Required

2)Fetch User by Username
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/:username
Method: GET
Authentication: Required
Note: Returns the username and favorites. Other user details are restricted.

3)Add a Favorite Movie
Endpoint:https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/:username/movies/:movieId/favorites
Method: PUT
This allows authenticated users to add a movie to their own list of favorites.

4)Viewing User Favorites
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/:username/favorites
Method: GET
Authentication: Required
Retrieves the list of favorite movies for the specified user. This endpoint is open to all users for viewing others' favorites but restricts detailed information to the owner of the profile.

5)Adding Movie Suggestions
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/:username/suggestions
Body

```json
{
  "movieID": "theMovieIdToSuggest"
}

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

Updating User Info
To update user information, use the PUT method on '/api/auth/users/:username'.

Note
Ensure all API requests are made over HTTPS.

This revised README reflects the new endpoints and functionalities, including the more granular control over user data visibility and the addition of movie suggestions. Ensure you adjust the paths and descriptions according to the final implementation details of your API.
/api/tmbd/movies/:id
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
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users
Method: GET
Authentication: Required

2)Fetch User by Username
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/:username
Method: GET
Authentication: Required
Note: Returns the username and favorites. Other user details are restricted.

3)Add a Favorite Movie
Endpoint:https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/:username/movies/:movieId/favorites
Method: PUT
This allows authenticated users to add a movie to their own list of favorites.

4)Viewing User Favorites
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/:username/favorites
Method: GET
Authentication: Required
Retrieves the list of favorite movies for the specified user. This endpoint is open to all users for viewing others' favorites but restricts detailed information to the owner of the profile.

5)Adding Movie Suggestions
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/:username/suggestions
Method: POST
Authentication: Required
**Body**
````json
 {
    "movieId": "theDesiredMovieId"
  }
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

Updating User Info
To update user information, use the PUT method on '/api/auth/users/:username'.

Note
Ensure all API requests are made over HTTPS.

This revised README reflects the new endpoints and functionalities, including the more granular control over user data visibility and the addition of movie suggestions. Ensure you adjust the paths and descriptions according to the final implementation details of your API.

`````
