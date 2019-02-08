# NYC Subway Status
Mobile + Web App built with React Native, React Native Web, React Native SVG.

## Setup

### Requirements
- React Native
- Node.js
- MTADelays API -- https://github.com/Atomox/mta-delays (access restricted)

### Local development
1. Setup the MTADelays API locally. See repo for steps.
2. Install XCode on your machine. You will need a version that supports your iOS version.
3. Install React-Native locally.
4. Install React Native SVG, and link it to React Native. (See instructions: https://github.com/react-native-community/react-native-svg)
5. npm install in root of this repository.
6. You'll probably experience errors. Reference this document for known issues: https://github.com/Atomox/ExampleCode/blob/master/Notes/react-native.readme.md (report new errors, so we can keep them documented)
7. react-native run-ios
8. This will compile the app, open a simulator, load it to the simulator.

### Navigating the Simulator
1. Not set to auto-reload, so refresh as you make changes.
2. `Command + D` opens the developer console. NOTE: Debug mode runs the app via the V8 engine, *not iOS*. It will behave differently. Don't assume that compiling in debug mode means it will work in iOS, _particularly with console.log statements_.
