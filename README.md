# Wlan device controller phone app

## Description
- This react native app controls the local network wlan outlet and wlan pulps. You can also control the electrical table level from this app.

- The device logic is in Rasbperry pi, what is called in my repo table_project. There is PythonServer.py, what handels the communication, what comes from react native.

## version 100

- This is now communicating with flask server. Phone app have list, where is buttons where you can change the wlan devices status. This is tested only in virtual android device. 

- This is beta app. There is lots of work to do with graphics.
- This project needs android studio, virtual devices and sdk tools. But this framework there is not any limitations about communications. If compare to react native expo.

## version 101
- Now I have made the couple of components to program. There is also navigation elements in app.tsx, where user canb navigate between components. Next step is modify the program to use zustand so this how we can share the jsondata and post and get requestes to table project python3 flask server.

- I have to build also logic in the table project pythonserver.py file, how to control the devices but I have a plan about this.

## version 102
- This version is now working with wlan outlets. I manage to solve pythonserver.py problems and old project is now almoust communicating with this phone app. There is still some errors with wlan bulps but lets figure those in next version.

## version 103
- And then my hard disk went broken.... It was quite hard work to build this project up again but I manage to success with that.

- I add to project the /services/api.ts to hande the pythonserver http requestes.
- I add also in project types.ts file, where is builded up the interface, what based on raspberry pi restored devices.json object.

### buildings
- Fix the react native structure, that components are not causing the extra http requestes. Move the home.tsx file http request code to api.ts file and modify the data handling via props and interfaces and build the logic that way that react components rendering is not causing any extra requestes.

- Find out, what is causing problems and errors in pythonserver.py in table project. There is empty value problem, what is causing the api request failing randomly. 

## report

- Added utils folder where we convert json to typescript interface and back to json. There is parseDevices and serializeDevices files.
- Program is working with new structure but there is some issues related to table project pythonserver.py.
- I have to figure out the python server issue before continue developing this app.
. Get requests is working now and post request is causing some errors because python server but it still controlling the wlan deives,

## version 104

- I noticed many different problems with react native data. But now this program control the wlan pulps and sockets.

### bug
- almous every time, when i make POST request, react native keep complaining about post error, but python server still controls the device like wanted. Perhaps some asyck data problem.

### report
- Next step is to build up more functionalies to react native. Like adjust the lamp brightness and adjust the timers etc. Adjust the work desk level etc.

## version 105
- Still searching the random post and get request error. Everything works fine with functionalies for  example react native changes the wlan devices state, but still coming get and post request errors and I dont know why. I have tested this with postman, cmd and my own phone with termux and flaskserver is responding nice but react native app gives a error. Perhaps next step is build up the application and if it wont give the error, then the problem is in the android emulator, not the program

## version 106
- Lets build again this version and test it with real phone. I make the light adjusment and post error did not appear on builded version. There was some data updating issue in python server but it is fixed now and name duplicates was cauusing the server user rights. Program have to access to wright on the file.
- I builded the pulpview component and there is now sliders where user can adjust lamp brightness and color temp. There is also button, where user can turn off the device.

- There is still some issues in python server or react. The lamp proterties did not adjusting how it should