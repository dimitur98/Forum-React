# DForum
DForum is a site where you can create posts about everything. There are categories which are created by the admin and you can post anything related to them. Each post has votes that are given by users and you can see total count of up and down votes. Also each post has its own comments and each comment can have a sub-comment.
# Build with
## Server
* express
* mongoose
## Front-end
* React
# Functionality
* uploading images with cloudinary
* sending emails for account confimartion with sendGrid
* facebook login
# Accessibility
## User
* can create posts
* can add comments
* can make votes
* can delete only his comments and posts
* can change his avatar photo
* can change his password
## Admin
* can create categoies
* can create posts
* can add comments
* can make votes
* can delete every comment, post or category
* can change his avatar photo
* can change his password
## Non-registered users
* can only read posts and its comments 
# Routes
* / - home page
* /Login - login page
* /Register - register page
* /PostsByCategory - page with posts related to choosen category
* /PostComments - page with comments related to choosen post
* /Account - user posts page
* /ChangePassword - change password page
* /ChangeAvatar - change avatar page
* /EditPost - edit your post content and name
* /Privacy - privacy policy for DForum
# Setup
## Server
```bash
npx nodemon
```
## Front-end
```bash
npm start
```
## Unit tests and snapshots
```bash
npm test
```
## End to End test with cypress
```bash
npx cypress open
```
