This example demonstrates how to use [Express](http://expressjs.com/) 4.x and
[Passport](http://passportjs.org/) to authenticate users using Facebook.  Use
this example as a starting point for your own web applications.

## Instructions

To install this example on your computer, clone the repository and install
dependencies.

```bash
$ git clone git@github.com:passport/express-4.x-facebook-example.git
$ cd express-4.x-facebook-example
$ npm install
```

The example uses environment variables to configure the consumer key and
consumer secret needed to access Facebook's API.  Start the server with those
variables set to the appropriate credentials.

```bash
$ FACEBOOK_CLIENT_ID=__FACEBOOK_CLIENT_ID__ FACEBOOK_CLIENT_SECRET=__FACEBOOK_CLIENT_SECRET__ node server.js
```

Open a web browser and navigate to [http://localhost:8080/](http://localhost:8080/)
to see the example in action.


