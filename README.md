# Games Hub

"Games Hub" is an app where users can find games to organize leisure activities for children, teenagers, young adults, and adults. Users can either use existing games or create and add their own. The app works in both online and offline modes, but not all features are available in offline mode.

<p align="center">
<img src="https://github.com/OlenaSonhrova/image/blob/main/GamesHubGif.gif?raw=true" width="150">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<img src="https://github.com/OlenaSonhrova/image/blob/main/GamesHub1.jpg?raw=true" width="150">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/OlenaSonhrova/image/blob/main/GamesHub2.jpg?raw=true" width="150">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://github.com/OlenaSonhrova/image/blob/main/GamesHub5.jpg?raw=true" width="150">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<img src="https://github.com/OlenaSonhrova/image/blob/main/GamesHub7.jpg?raw=true" width="150">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<img src="https://github.com/OlenaSonhrova/image/blob/main/GamesHub8.jpg?raw=true" width="150">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<img src="https://github.com/OlenaSonhrova/image/blob/main/GamesHub9.jpg?raw=true" width="150">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp

# Technologies Used

- react
- react-dom
- react-query
- react-router
- react-native
- react-router-dom
- node
- axios
- json-server
- react-scripts
- web-vitals
- free-solid-svg-icons
- react-native-reanimated
- use-local-storage-state
- react-native-easy-rating


# Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
### `npm test`
Launches the test runner in the interactive watch mode.\
### `npm run build`
Builds the app for production to the `build` folder.\
### `Learn More`
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/OlenaSonhrova/react_first.git
   
2. Navigate to the project directory:
   ```bash
   cd GamesHub
   
3. Install dependencies:
   
   You need to install all necessary dependencies before running the project:
   ```bash
   npm install
   
4. Android Installation:

   - Install Android SDK:
     
      Ensure you have Android Studio installed and the Android SDK set up. If you don’t have it installed:
      - Download and install Android Studio.
      - During the installation, make sure you add necessary SDK components such as Android SDK and Android Virtual Device       (AVD).
     
   - Set environment variables:
   
   You need to add the Android SDK paths to your environment variables. For macOS or Linux, add the following to your         ~/.bash_profile or ~/.zshrc (or the appropriate shell configuration file):
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools

   
For Windows, add these paths through "Environment Variables" in the system settings.

   - Start an emulator or connect a device:
   
      To use an Android emulator, open Android Studio and launch your emulator via the AVD Manager.
      Alternatively, connect your real Android device via USB and enable Developer Mode and USB Debugging.
     
   - Run the app:
   
      You can now run your app on Android using the following command:
      ```bash
      npx react-native run-android
   
   This will start the Metro Bundler and install the app on the connected device or emulator.

5. iOS Installation (for macOS users):

   - Install Xcode
     
     Ensure that Xcode is installed from the Mac App Store. This is necessary for running your React Native project on iOS.
   - Install CocoaPods:
     
     CocoaPods is a dependency manager for iOS. Install it if you haven't already:
     ```bash
     sudo gem install cocoapods
     
   - Navigate to the ios folder of your project and install iOS dependencies:
         ```bash
         cd ios
         pod install
         cd ..
   - Run the iOS app: You can run the app on an iOS simulator or a real device. For the simulator:
     ```bash
     npx react-native run-ios
   
     Alternatively, you can open the .xcworkspace file in Xcode and run the app from there.

6. Troubleshooting:

If you encounter errors, check whether all dependencies and tools are installed correctly and make sure your device or emulator is properly connected.
   
Once done, your app should run on Android.























This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
