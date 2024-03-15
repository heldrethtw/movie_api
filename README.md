Welcome to the Donkey Archive, a movie database API. This document will show you how to interact with the API. It will show you how to sign up, sign in and request movie data.

````json
Getting started as a new user:

SIGNING UP

Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users
Method: POST
Body:
{
"Username": "desiredUsername",
"Password": "yourPassword",
"Email": "yourEmail@example.com",
"Birth": "YYYY-MM-DD"
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

Log Out:

Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api.auth/logout
Method: POST
Request Headers:
Authorization: Bearer Token
Success response:
Code: 200 OK
Content: 'Logged out successfully.'
Error Response:
Code: 500 Internal Server Error
Content: Error message indicating the reason for failure.


Movies(Creating, Viewing and managing Movies)

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

5)Fetch Movie by Genre
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/movies/genre/:genre
Method: GET
Authentication: Required

6)Create a New Movie
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/movies
Method: Post
Authentication: required
Body:
{
  "Title": "example of a title",
  "Description": "describe",
  "Genre": "type of genre",
  "Director": "name of director"
}

7)Update a Movie's Genre or Description
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/movies/:id
Method: PUT
Authentication: Required
Body:
{
  "newGenres": ["New Genre"],
  "newDescriptions": ["New Description"]
}
Note: Allows users to update the genre or description of a movie without altering existing data.


Users

1)Fetch User by Username
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/:username
Method: GET
Authentication: Required
Note: Returns the username and favorites. Other user details are restricted.

2)Update User Profile
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/auth/users/:username
Method: PUT
Note: Updates to other users are not permitted.

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

2)Create a New Genre
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/genres
Method: POST
Authentication: Required
Body: {
  "Name": "Genre Name",
  "Description": "Genre Description"
}

3)Fetch a Genre by Id
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/genres/:id
Method: GET

4)Update a Genre
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/genres/:id
Method: POST
Authorization: Required
Body:
{
  "Name"
}
Directors
1)Fetch All Directors
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/directors
Method: GET
Authentication: Required

2)Create a New Director
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/directors
Method: POST
Authentication: Required

3)Fetch a Director by Id
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/directors/:id
Method: GET

4)Update a Director
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/tmbd/directors/:id

Admin Operations

1)View All Users
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/admin/users
Method: GET
Authentication: Required

2)Delete a User
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/admin/users/:username
Authentication: Required

3)Delete a Movie
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/admin/movies/:id
Method: DELETE
Authentication: Required

4)Delete a Genre
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/admin/genres/:id
Method: DELETE
Authentication: Required

5)Delete a Director
Endpoint: https://donkey-archive-af41e8314602.herokuapp.com/api/admin/directors/:id
Method: DELETE
Authentication: Required



Ensure all API requests are made over HTTPS.

This revised README reflects the new endpoints and functionalities, including the more granular control over user data visibility and the addition of movie suggestions.
This README now includes the updated movie update endpoint, which specifically allows users to update a movie's genre or description, ensuring that users cannot remove existing information or make other unrestricted modifications.
Ensure you adjust the paths and descriptions according to the final implementation details of your API.

````
