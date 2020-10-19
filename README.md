# msgBoard

## To run:

Copy repo to local folder and run `npm install`

You then need to create a `.env` file in the root directory, which contains the config for the app. (the contents of this file)

```
PORT=5000

DB_USER=compare_1
DB_PASSWORD=secret_4_messages
```

This will allow the app to connect to a MLab cloud hosted mongoDB database. Alternatively you could provide you own database and change the uri link in /src/database/database.ts

After which you can start the server `npm start`

There is also a basic test script at `npm run test`

With the time constraints around building this app, I did have to make some decisions as to where to allocate my time. I went for basic functionality, so having schema validation
on requests (Joi). Ensuring some simple security, i.e. express-mongo-sanitize & helmet. Providing some basic tests.

Places I would like to have spent more time.

1)  There is only a basic set of route-based integration tests currently. There is room for improvement here. (Tests should not be relying on other tests for state)
2)  Error handling and logging. Should have a class to handle this, allowing for different levels and output locations.
3)  Build environment would be better suited using webpack and babelify, would allow for absolute paths amongst other things.
4)  Completing CRUD functionality for /messages.
5)  Handling of static files and capability to serve a front end.


