# Dynamic Events:
NextJS and NestJs application that allows a user to create events in a calendar with different views.

## Set Up with Docker:
Run the next commands on the root of the project:
```sh
  docker-compose ./docker-compose.yml up
```
Then the app must be exposed in the url ``http://localhost:3000``

## Set up manually:
Run the next commands on the root of the project:
```sh
  yarn
  yarn workspace @dynamic-events/services start:dev
  yarn workspace @dynamic-events/client dev
```
The app is exposed in ``http://localhost:3000`` and the services in ``http://localhost:3001``

## Technical decisions:
- NestJS exposes the API to interact with the database
- To avoid downloading a heavy image there's a postgreSQL data
  base that will store the data.
- To handle global state the app includes Zustand and React    Query.
- Due to time constraints the events are restricted to 1 hour and the user must select one of the 24hrs hours. But there can be more than one event at the same hour.

## Technical Debt;
Due to time constraints some features are missing but here's the explanation of how I would approach the implementation:

1. Drag N Drop:
As all the UI of the calendar and its views is already done and structured in a way that's easy to integrate this feature. My plan was to use the library React DnD, use the containers of the events in each view as drop places and add the drag functionality to the EventCard, when the user drops a card on a drop place an update to the event would occur asynchronously
and the UI would be updated.

2. Weather API integration:
To integrate this my plan was to include a field in the Event entity of the database to store the weather values, and request them from the Weather API at the moment the user tries to create a new Event. And finally update the UI to display the weather in the EventCard either by value or an Icon.

3. User Access:
This was a feature in progress, the idea was to store the events for each user and add a simple authentication system by using the email of the user to identify them.
