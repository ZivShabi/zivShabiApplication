# API_ROUTES Documentation

This document provides a detailed description of the API routes used in the project. Each section corresponds to a specific feature.

---

## Table of Contents
- [Users](#users)
- [Messages](#messages)
- [Posts](#posts)
- [Post Responses](#post-responses)
- [Cards](#cards)
- [Ratings](#ratings)

---

### Users
| Action               | Method | Route                                   |
|----------------------|--------|-----------------------------------------|
| Register             | POST   | `/users/register`                      |
| Login                | POST   | `/users/login`                         |
| Change Password      | POST   | `/users/changePassword`                |
| Get User Data        | GET    | `/users`                               |
| Update User Image    | PATCH  | `/users/updateImage/:id`               |
| Update User Info     | PATCH  | `/users/:id`                           |
| Google Authentication| GET    | `/users/auth/google`                   |
| Delete Account       | DELETE | `/users/:id`                           |

---

### Messages
| Action               | Method | Route                                   |
|----------------------|--------|-----------------------------------------|
| Get All Messages     | GET    | `/messages`                            |
| Send Message         | POST   | `/messages/:recipientId`               |
| Mark as Read         | PATCH  | `/messages/:messageId/read`            |
| Delete Message       | DELETE | `/messages/:messageId`                 |
| Update Message Count | PATCH  | `/messages/:userId/messageCount`       |
| Get Message by ID    | GET    | `/messages/:id/message/:messageId`     |

---

### Posts
| Action               | Method | Route                                   |
|----------------------|--------|-----------------------------------------|
| Get All Posts        | GET    | `/posts`                               |
| Like Post            | PATCH  | `/posts/:postId/like`                  |
| Create Post          | POST   | `/posts`                               |
| Delete Post          | DELETE | `/posts/:postId`                       |
| Add Image            | PATCH  | `/posts/:postId/addImage`              |
| Add Audio            | PATCH  | `/posts/:postId/addAudio`              |
| Update Audio Status  | PATCH  | `/posts/:postId/audioStatus`           |
| Add Video            | PATCH  | `/posts/:postId/addVideo`              |

---

### Post Responses
| Action               | Method | Route                                   |
|----------------------|--------|-----------------------------------------|
| Get All Responses    | GET    | `/PostResponseRoutes`                  |
| Create Response      | POST   | `/PostResponseRoutes/:responseId`      |
| Delete Response      | DELETE | `/PostResponseRoutes/:responseId`      |
| Edit Response        | PATCH  | `/PostResponseRoutes/:responseId`      |
| Like Response        | PATCH  | `/PostResponseRoutes/:responseId/like` |
| Unlike Response      | PATCH  | `/PostResponseRoutes/:responseId/unlike`|

---

### Cards
| Action               | Method | Route                                   |
|----------------------|--------|-----------------------------------------|
| Get All Cards        | GET    | `/cards`                               |
| Create Card          | POST   | `/cards`                               |
| Get User's Cards     | GET    | `/cards/mycards`                       |
| Like Card            | PATCH  | `/cards/:id/like`                      |
| Unlike Card          | PATCH  | `/cards/:id/unlike`                    |
| Delete Card          | DELETE | `/cards/:id`                           |
| Get Card by ID       | GET    | `/cards/:id`                           |

---

### Ratings
| Action               | Method | Route                                   |
|----------------------|--------|-----------------------------------------|
| Add Rating           | POST   | `/ratings`                             |
| Get Average Rating   | GET    | `/ratings`                             |

---

## Notes
- Dynamic parameters in routes are denoted by `:param`.
- Ensure all dynamic parameters (e.g., `:id`, `:postId`) are correctly replaced with actual values when making requests.
