# Secret Santa

A WebApp Used to Organize Secret Santa

## Getting Started

This is a dotnet core web application built using angular in frontend with the usage of material design components for GUI.

### Prerequisites

To run this you need to Visual Studio 2017 and Node Installed

### How to Run The App

A step by step series of explanation to run this application

Go to the folder where package.json is located (here it is SecreatSantaService\SecretSanta\ClientApp) and open CMD to that location and run following command

```
npm install
```

Now run following command at the same location. 
```
npm audit fix
```

This will download all node modules and stated in package.json 
Once this is done Open the .sln file and hit run in visual studio.


## Using the Application

* Step 1 : Add the participants on home page filling up First Name, Last Name and Email(so we don't mess up with people having same names !).
* Step 2 : While filling up the form if the participant wants to be a part of an existing group/family then he can go ahead and select it from the list available or else he can go ahead and create a new group for himself.(If there is only one user in the group then while running the draw, that user will be considered as an individual participant and the group name will be ignored).
* Step 3 : Finally Click on Reveal Secret Santa in the revel Secret Santa page and you will have a list with who is going to gift whom.

## Design Desicions and problems faced

Since this a user friendly Secret Santa Service App, we don't want the users to perform many steps before running the secret Santa draw for example, we don't want users to create a group separately in system and add users to that, which will dissolve the basic idea of user friendly application this forced me to remove all those tedious steps and make it a one form application which improves the usability and friendliness of the application.

## Author

* **Jainam Shah**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
