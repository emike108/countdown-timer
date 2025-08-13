# Multifunction Countdown Timer App

This application is a countdown timer where a user inputs the number of minutes they want to countdown from, once the countdown has begun the user can pause the countdown, speed up the countdown, and start the countdown over/start a new one if needed.

The application also displays the time the countdown will end in 3 other time zones: London, New York, and Salt Lake City.

Halfway through the countdown time the app will render a notification stating half of the time has elapsed, once the countdown is at 20 seconds or less the countdown font color changes to red,
when the countdown reaches 10 seconds or less the countdown font will start blinking, and lastly once the countdown has ended a message stating the countdown has ended appears.

See images below for a brief demonstration:

![initial state](/images/initial_state.png)
![time added](/images/time_added.png)
![halfway mark](/images/halfway_mark.png)
![20 seconds left](/images/20_seconds_left.png)
![countdown complete](/images/countdown_complete.png)

## Development

This app was duplicated from an existing project.

## Initial Setup

1. Clone the repository to your local machine using:

   ```
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```
   cd <project_directory>
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm start
   ```

5. Open your web browser and navigate to `http://localhost:3000` to view the application.

NOTE: This project was created using Create React App (CRA). As such it abstracts away the complex configurations for tools like Webpack, Babel, ESLint, and Jest, allowing developers to focus on building their applications without worrying about the underlying build tools.
