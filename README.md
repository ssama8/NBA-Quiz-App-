## Overview

This app connects to a server to display the logos and user data which is queried from MongoDB. Users can take quizzes on different NBA teams with stats from the 2017-2018 seasin. A hashed session id using local storage is stored everytime someone logs in and that id is used to mange state across the app for when the user is not logged in and when the user is logged in. All of the users previous quizzes are stored in the History tab where users can sort the teams by different parameters like the newest quizzes they've taken, or their highest scores.

## Home

The homepage has a ssection with all 30 teams that you can choose to take a mini quiz on. You can choose to have between 4-10 questions and you will get be asked questions about that players on that team during the 2017-2018 season

## History

The history page showcases all of the quizzes that you've taken so far with a timer that tells you how long it has been since you've last taken that quiz. You can sort the teams alphabetically, by the percent you scored, and by how recent yo've taken that quiz. If you retake a quiz on that team and the result is better, than it will replace the score.

## SignUp

If you don't already have an account you can create one with a unique username and a password. If the username has already been taken, than it will alert you to choose another username.

## Login

Validated your sign in details and checks to see if there is an account in the database with the same username and password.
