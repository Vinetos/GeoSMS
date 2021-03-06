# GeoSMS

> Geolocalize a smartphone with an SMS  

The **emergency services** receive more than [2,5 thousand calls per day in France](https://www.gouvernement.fr/risques/connaitre-les-numeros-d-urgence).  
We **have** to know **3 pieces of information** :
> - Who am I ?
> - Why I'm calling ?
> - **Where am I ?**  

And this is on **its last point** we are working to **improve answers**.
When you are calling rescue team, **you might don't know where you are** :
> - You are in the forest
> - **You are confused**
> - You don't know where exactly you are
> - And **so many cases**...  

This web-application will **help emergency organisations** to add this new tool and **help them to locating patients** in need.

## How it work  
The operator **enter the phone number** of the patient and click on the **send button**.  
Then, the patient will **receive an SMS** with a **one-time link**.  
The patient must **activate an internet connection**, click on the link and **allow the website** to use the **localization** (GPS).  
The operator will get **a marker** with **the patient location** and its **GPS coordinates** on the map.  

## Build Setup  
Default dev url : ``localhost:8080``  
``` bash
# install dependencies
npm install

# Serve the application with hot reload at localhost:8080
npm run dev

# Start the redis.io server (for communication between patient and operator)
npm run server

# Or build for production with minification
npm run build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## License
```
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
   
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
   
You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```  

> Copyright (C) 2018 Valentin Chassignol
