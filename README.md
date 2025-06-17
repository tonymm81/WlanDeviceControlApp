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