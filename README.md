# Firekamp weather app submission

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## 1. How to Run
### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

#### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## 2. Libraries Used and Why
1. Nativewind: TailwindCSS for React Native. Very cool and useful tool for styling. Not only does it make it easier to style by having to write less code, but the built-in style system is also very useful. Their color library, unit sizes etc, were all chosen with reason and for mathematical reasons. The colors work well together unlike arbitrary colors. The padding/margin/text size increments also utilize design science. It helps the design aspect "just work".

## The screenshot

![alt-screenshot](https://res.cloudinary.com/dk17nppwy/image/upload/c_scale,q_100,w_459/v1696019407/random/firekamp-screenshot_ijvn3x.png)


## What you would do if you had more time?

1. Have an in-depth meeting about what data / functionality is needed. Do we need to show the hourly forecast? Are we using the OpenWeather provided icons, or our own? Do we have a design, or am I making it to my own taste? Do you want the forecasted dates to expand into an in-depth view when tapped? Etc.

2. I would add support for multiple search types (by city, by current location, etc).

3. I would add more data to the current weather at least, and maybe the forecast too.

4. Ability to save cities and view them all

5. I would look deeper into the API docs and see if there is a way to get current and forecast in one request. Would also add a backend so that we can cache the API data and not eat through our rate-limits.

6. Would have the API key in a .env file, but in case whoever is reviewing this code doesnt have one, I just included a key.
