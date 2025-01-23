# ExpressJS-Quiz-Application
Express js and ejs based quiz application


Ibnul - Contributed with the updated CSS for the application
 - Worked on the css and updated look on the html
   -added new background, fonts, and fixed issues with the previous html files

Sabanta - Contributed with the html and css, javascript ideas and concepts.
 - Worked on the html and css on how the pages would look and what styles should go where and the title of the project.
   - How the quiz page should look, i.e similar to flashcards and the look of Quizlet
 - Contributed ideas to ideas for the javascript and what features should be added 

Wilson - Worked on converting the old application from html, css, and javascript over to expressjs and ejs, routing pages, and worked on storing data into the MongoDb database
  - worked on adding the new homePage, questionPage, resultPage, and displayResults
    - added and updated new elements to the css to add depth to the appliction 
    - converted the previous html files into ejs files
  - worked on the new script file to ensure methods worked properly in the files
  - implemented application so that the questions were taken from the Trivia Database API instead of the previous JSON file
  - connected all the user information to the MongoDB database
  - worked on the routes and ensured that the correct page was loaded and that the proper information was being moved
    - accessing the database
    - adding new user's signup information and checking if either their username or email is already taken
    - implementing the signin page so that the user can signin
    - adds the user's quiz score to the database and retrieves it so that they can be displayed
    - gets the user's highscore and dislays it and update when the user gets a new highscore
  
Features:
 - Timer
 - Keeping a track of score
 - Randomized questions
 - Displays highscore and previosu attempt scores
 - Sign up and Sign in 

To run the application, you must install nodemon to run it smoothly.
 - In the terminal run "npm install -g nodemon" then run "nodemon" which should run the application and be fully ready use the application.
