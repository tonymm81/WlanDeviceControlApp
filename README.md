# Wlan device controller phone app

## Description
- This react native app controls the local network wlan outlet and wlan pulps. You can also control the electrical table level from this app.

# connected with table_project

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

## version 107
- Now the app is adjusting the lamp color, color temp and brightness. There is now quite good situation and next step is to add table level adjusment to this app.
- Next step is build up timer to wlan devices, but this has to plan carefully, because I have to change the table project json structure.

## version 108

- Now this project is adjusting the wlan sockets, wlan lamps and table distance from floor. Next step is build the save or load setup. Python table project have this kind of feature, so I have only to think that how to connect it to this app.

## version 109

- Updated api.ts for new functions, and I have builded to pythonserver.py router ready for this.
- Now the save settings are working. User can now save the wanted settings to application and also restore wanted settings. I build new component SettingScreen.tsx and there is this funcionality builded.
- User can give a name for wanted save slot and also choose a save slot. 
- I also added the settings button and restart button to home view. Lets build this and test. There is still some features to develope so this is only testing for now.

### bug in version 109
- When user loads the wanted settings, home tsx is showing the old status of devices so SettingsScreen has to update the home.tsx used devices interface.
- When user saves the settings with name, the name is not updating in sdettings view until user navigates to home screen and comes back to settings view.
- When user load the saved settings, the changes is not activate until user navigates the home page.

## version 109.1
- Made some bugfixes but still the version 109 bugs are valid so need to fix this first. No need to connect this branch to main yet

## version 109.2
- Updating the finded bugs and problems. LEts connect this branch to main and create an issue of that bugs.

## version 110

- Adding to settings shutdown pythonserver and refresh the devices in python server buttons. I make the api request functions for this and I also update the settings get data functions to asyncronius, so lets test, what this done to empty settings list bug.

## version 111

- Finished the socket view styles.
- I move the shutdown server button to home view
- I also fix the app header to dark theme and add icon there.
- I add the back button to settings screen.
- Adding the pair device view under settings screen. This route needs to finish in python server.

## version 112
- Modifying app logic. There was some issues related of socket view so I fix it and now we have to build the app and test again. There was also the test boolean true, so the app did not work on prod environment



### Christmas to do in next version.
- move the shutdonw python server to homa screen. (done in version 111)
- Test what is the save / load table adjusment issue.
- Solve the state, when or how program can automaticly scan new devics in wlan.
- Solve, why update wlandevices did not work.
- update the libraries
- finalizing the socket view. It is not complete yet.(done in version 111)
- should we build the wlandevice pairing part of this program? 