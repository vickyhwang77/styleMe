# StyleMe App
## Introduction
StyleMe is a personal styler react app. Sign up using your gmail and input your location and style preferences to receive daily outfit reccomendations that change according to the weather!

## How to Use
1. Make sure you have the following software installed:
   - Node.js
   - npm
2. Clone the repository.
3. Open two terminals and navigate to the project directory in both.
4. Install necessary dependencies: 
  - One terminal will be the client (front-end):
     - Navigate to the client folder: ```cd client```
     - Install dependencies: ```npm install react react-dom react-router-dom boostrap @react-oauth/google jwt-code axios```
  - Another terminal will be the server (back-end):
     - Navigate to the server folder: ```cd server```
     - Install dependencies: ```npm install express mongoose cors axios```
6. To run:
  - In the client terminal: ```npm run dev```
  - In the server terminal: ```npm start```
7. Navigate to browser using the web address provided in the client terminal
