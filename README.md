**Description of API-**

This is a Login Authentication API built using Express (minimal and flexible Node.js web application framework) and MongoDB as the Database. We are using the Express-Validator that prevents requests which include invalid username or password. We are also using bcryptjs as a secure method to store passwords in Database using Encryption Techniques (Generating salt and hashing). In addition to these, jsonwebtoken is used as a secure method to transmit information between parties as a JSON object with a Digital Signature.

_Note – Use the command &#39;npm i express mongoose mockgoose chai mocha sinon express-validator body-parser bcryptjs jsonwebtoken &#39; to install the dependencies._

_In order to run the code just use the command &quot;npm run start&quot; on your Bash Terminal._
_(In order to run the tests, use teh command &quot;npm run test&quot; on your Bash Terminal. We have used Mockgoose to mock the operations of the database)_

_Make sure you change the value of the_ _ **MONGOURI** _ _in the db.js file with your MongoDB Definitions (database name, username and password)._

- The site is setup on &#39;localhost:4000&#39;

- The &quot;swagger&quot; Route is used to see a complete documentation of the Code using Swagger.

- The &quot;signup&quot; Route is used to add a new user to the database.

The Signup method takes in username, email and password. It checks the username and password for invalid characters and also checks if the password has a minimum length of 5. The password is encrypted using salting and hashing to ensure secure saving of information.

The User object is then saved into the database with the data entered of username, email and password. An additional CreatedAt attribute is added to the object denoting the date and time of creation of the user account.

It returns the TokenID generated after signing up the user.

- The &quot;login&quot; Route is used to Login an existing user from the database.
- It takes in the Email ID and Password of the User and verifies if it exists in the database with the given credentials. It returns the TokenID generated after logging in the user.

- The &quot;getUserInfo&quot; Route is used to retrieve information about a user from the Database by using the input parameter of Token ID that is received after signup or login of the user. This then returns the User Object from the Database containing details such as Username, EmailID, Password and CreatedAt.

**SWAGGER Documentation -**

1. Swagger is a popular API documentation tool that not only lets you explain your code for future users, but also allows them to access and experiment with the APIs.

2. On completion of the code, we can use the Swagger Online Editor to document it. Swagger provides the [http://editor.swagger.io/](http://editor.swagger.io/) which can be used to quickly configure the YAML definitions. You can either write the documentation directly in JSON format or write it in YAML and then convert it to JSON through this website. I personally followed the latter as I found it easier.

![Alt text](https://github.com/raunakmokhasi/LoginAuthenticationAPI/blob/master/Screens/SwaggerScreen1.JPG?raw=true "Online Swagger Editor")

3. Swagger generates the documentation for the API using a simple YAML file that describes your API (routes, verbs, params and other definitions). This YAML file can then later be converted into JSON format to be integrated with your APIs on your local machine. The YAML file has tags used to describe each function of the API and is really intuitive to understand.

  To integrate the YAML/JSON files with our code we need to follow the following steps -

  On your local terminal (in my case I used the Bash Terminal on Visual Studio Code), use the command &quot;npm i swagger-jsdoc swagger-  ui-express&quot;. This gives us two different methods to document our code using Swagger.

  The &#39;swagger-jsdoc&#39; is used to integrate Swagger using JSDoc Comments in the code. We need to add @swagger on top of a subroutine (for example the POST Request for /signup) and declare the meaning of your code in YAML complying to the OpenAPI specification). The &#39;swagger-jsdoc&#39; will then parse this and output an OpenAPI specification which can be used to integrate any server and client technology as long as both sides comply with the specification.

  The &#39;swagger-ui-express&#39; is a module that allows you to serve auto-generated swagger-ui generated API docs from express, based on a swagger.json file. The result is a living documentation for your API hosted from your API server via a route.

  _Note - I have used the 2nd Method (using &#39;swagger-ui-express&#39;) to create the Swagger documentation._

  In the directory, the loginSwagger.yaml file contains all the definitions in YAML format. This is then converted into the swagger.json file. The &#39;swaggerDocs&#39; constant contains the reference to the JSON file that is used to setup the Swagger UI.

  The Swagger Document is now present on &#39;localhost:4000/swagger&#39;.


4. Once the REST API is defined by configuring the endpoint URLs with the appropriate HTTP/HTTPs security, input parameters and headers we can use the &quot;Try it out&quot; operation to test the API (similar to Postman). Here the parameter content type needs to be selected (it is &#39;application/json&#39; in my case). On filling the appropriate details of the POST Request in JSON we can run it by clicking on the execute button. Based on the content, if the POST request is valid we get a server response with the relevant details.

![Alt text](https://github.com/raunakmokhasi/LoginAuthenticationAPI/blob/master/Screens/SwaggerScreen2.JPG?raw=true "Swagger Request 1")

![Alt text](https://github.com/raunakmokhasi/LoginAuthenticationAPI/blob/master/Screens/SwaggerScreen3.JPG?raw=true "Swagger Request 2")


For further information regarding Swagger, please check out –

[https://swagger.io/docs/specification/2-0/basic-structure/](https://swagger.io/docs/specification/2-0/basic-structure/)
