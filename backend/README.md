# Garbage Hunter (Backend)

This repository is the backend part for the project `Garbage Hunter` that is made during the course "Advanced Web Development" in Hochschule Darmstadt in SS19.

## API Reference

### api/messages

| API                         | Request | Authorization | Usage                      |
| --------------------------- | ------- | ------------- | -------------------------- |
| `api/messages`              | GET     | -             | Get all messages or get some messages by URL query |
| `api/messages`              | POST    | Bearer Token  | Create a new message           |
| `api/messages`              | PUT     | Bearer Token  | Update message's information          |
| `api/messages`              | DELETE  | Bearer Token  | Delete a message           |
| `api/messages/:messageid`   | GET     | -             | Get a single message by message id       |
| `api/messages/delete_all`   | DELETE  | Bearer Token  | Delete all messages        |
| `api/messages/download`     | GET     | -             | Export all messages as CSV |
| `api/messages/image_upload` | POST    | Bearer Token  | Upload image to AWS S3     |
| `api/messages/delete_image` | POST    | Bearer Token  | Delete image from AWS S3   |

### api/users

| API                              | Request | Authorization | Usage                   |
| -------------------------------- | ------- | ------------- | ----------------------- |
| `api/users`                      | GET     | -             | Get all users or get some users by URL query          |
| `api/users`                      | POST    | -             | Create a new user           |
| `api/users/:token`               | PUT     | -             | Update a user by user token           |
| `api/users`                      | DELETE  | -             | Delete a user by user id          |
| `api/users/:userid`              | GET     | -             | Get a single user by user id       |
| `api/users/get_all/:token`       | GET     | -             | Get a all user by user token. But just admin account can do that   |
| `api/users/login`                | POST    | -             | Get a user by email and password ( the first time login)    |
| `api/users/login/:token`         | GET     | -             | Get a user by user token (auto login after the first time)      |
| `api/users/register`             | POST    | -             | Create a new user (register)       |
| `api/users/update/:token`        | PUT     | -             | Update a user by user token     |
| `api/users/delete/:token`        | GET     | -             | Delete a user by user token    |
| `api/users/confirm_email/:token` | GET     | -             | Confirm email after login by user token       |
| `api/users/delete_all`           | DELETE  | -             | Delete all users        |
| `api/users/download`             | GET     | -             | Export all users as CSV |

### api/comments

| API                                        | Request | Authorization | Usage                         |
| ------------------------------------------ | ------- | ------------- | ----------------------------- |
| `api/comments`                             | GET     | -             | Get all comments or get some comments by URL query      |
| `api/comments`                             | POST    | -             | Create a new comment              |
| `api/comments/:commentid`                  | PUT     | -             | Update a comment by comment id         |
| `api/comments/:commentid`                  | DELETE  | -             | Delete a comment by comment id         |
| `api/comments/:commentid`                  | GET     | -             | Get a comment by comment id       |
| `api/comments/get_by_messageid/:messageid` | GET     | -             | Get a comment by message id |
| `api/comments/delete_all`                  | DELETE  | -             | Delete all comments           |

### api/categories

| API                          | Request | Authorization | Usage                 |
| ---------------------------- | ------- | ------------- | --------------------- |
| `api/categories`             | GET     | -             | Get all categories or get some categories by URL query    |
| `api/categories`             | POST    | -             | Create a new category     |
| `api/categories/:categoryid` | PUT     | -             | Update a category by category id     |
| `api/categories/:categoryid` | DELETE  | -             | Delete a category by category id   |
| `api/categories/:categoryid` | GET     | -             | Get a category by category id |
| `api/categories/delete_all`  | DELETE  | -             | Delete all categories |

### api/message_category

| API                                       | Request | Authorization | Usage                         |
| ----------------------------------------- | ------- | ------------- | ----------------------------- |
| `api/message_category`                    | GET     | -             | Get all message_category or get some message_categories by URL query      |
| `api/message_category`                    | POST    | -             | Create a message_category    |
| `api/message_category/:messagecategoryid` | PUT     | -             | Update a message_category by message_category id    |
| `api/message_category/:messagecategoryid` | DELETE  | -             | Delete a message_category by message_category id     |
| `api/message_category/:messagecategoryid` | GET     | -             | Get a message_category by message_category id|
| `api/message_category/delete_all`         | DELETE  | -             | Delete all message_category |

### api/user_category

| API                                 | Request | Authorization | Usage                      |
| ----------------------------------- | ------- | ------------- | -------------------------- |
| `api/user_category`                 | GET     | -             | Get all user_category or get some user_categories by URL query    |
| `api/user_category`                 | POST    | -             | Create a user_category     |
| `api/user_category/:usercategoryid` | PUT     | -             | Update a user_category by user_category id     |
| `api/user_category/:usercategoryid` | DELETE  | -             | Delete a user_category by user_category id     |
| `api/user_category/:usercategoryid` | GET     | -             | Get a user_category by user_category id |
| `api/user_category/delete_all`      | DELETE  | -             | Delete all user_category   |

### api/email

| API         | Request | Authorization | Usage       |
| ----------- | ------- | ------------- | ----------- |
| `api/email` | GET     | -             | Send email to a subcriber by URL query : userId ( subcriber) and messageId |

