
# Netflix API 

The Netflix-like Streaming Platform API is a comprehensive RESTful web service that emulates the features of popular OTT (Over-The-Top) streaming platforms. It provides a wide range of functionalities, including user authentication, password reset via email, movie recommendations, movie search, watchlist management, and user streaming history. In addition, the API manages user subscriptions and access to streaming content, ensuring that media streaming is available exclusively to subscribed users.




## API Reference

#### Base URL

```http
https://netflix-api-g992.onrender.com
```
### User Routes
All the data to be sent in JSON format in request body.

```http
POST https://netflix-api-g992.onrender.com/login
```

```http
POST https://netflix-api-g992.onrender.com/register
```

```http
GET https://netflix-api-g992.onrender.com/logout
```

```http
POST https://netflix-api-g992.onrender.com/forgotpassword
```

```http
GET https://netflix-api-g992.onrender.com/profile
```

| Route |     Description                 |
| :----------- :------------------------- |
| Login | Email And Password |
| Register | Username,Email and Password |
| Forgot Password | Email |


### Media Routes
All these routes requires that the user is first logged in. Otherwise it does not allow to access the data.

```http
  GET https://netflix-api-g992.onrender.com/media
```

```http
  GET https://netflix-api-g992.onrender.com/media/${mediaid}
```

```http
  GET https://netflix-api-g992.onrender.com/media/watchlist/${userid}
```

```http
  GET https://netflix-api-g992.onrender.com/media/watchlist/${mediaid}/${userid}
  POST https://netflix-api-g992.onrender.com/media/watchlist/${mediaid}/${userid}
```
```http
  POST https://netflix-api-g992.onrender.com/media/stream/${mediaid}/${userid}
```

```http
  GET https://netflix-api-g992.onrender.com/media/history/${userid}
```

```http
  POST https://netflix-api-g992.onrender.com/media/history/${userid}/${mediaid}
```

```http
  GET https://netflix-api-g992.onrender.com/media/search/${search}
```
```http
  GET https://netflix-api-g992.onrender.com/media/recommend/${userid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userid`      | `string` | **Required**. Id of User to fetch |
| `mediaid`      | `string` | **Required**. Id of the specific media to fetch |

#### Note:
1) The watchlist routes and the media streaming can only be accessed if user is logged in and Subscribed
2) In watchlist route the POST request is for adding in the watchlist and GET request for removing from the watchlist


### Subscription Route

```http
  POST https://netflix-api-g992.onrender.com/payment
```





## Tech Stack

**Server:** Node, Express

**DataBase:** MongoDB


## Run Locally

Clone the project

```bash
  git clone https://github.com/Xaverick/NetflixAPI.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon app.js
```

