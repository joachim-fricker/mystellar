# mystellar

Goal is to write an WebApp for managing the pictures which i haven taken with my unistellar evscope 2.

First phase is the buildCatalog node application which parses a local directory structure and creates the catalog.json file which contains all information about the varaious deep sky objects i have vistited :-)

## data.json
The files contains information about a particular deep sky object. Example for M64

```javascript
{
    "name": "M64 - Blackeye-Galaxie ",
    "description": "Messier 64 (auch als NGC 4826 oder Blackeye-Galaxie bezeichnet) ist eine Spiralgalaxie. Sie besitzt eine große ovale Dunkelwolke nördlich des Kerns mit einer Ausdehnung von etwa 8000 Lichtjahren, die wahrscheinlich durch Verschmelzung mit einer kleinen, sehr staubreichen Galaxie vor rund einer Milliarde Jahren entstanden ist. Damit ließen sich die einseitige Konzentration der Dunkelwolken und die vielen in Kernnähe stehenden Regionen mit ungewöhnlich kräftiger Sternentstehung erklären.",
    "distance": "24 Mio",
    "diameter": "800", 
    "age": "1 Mrd",
    "constellation": "Haar der Berenike",
    "mag": "8.5",
    "discoveryDate": "1779",
    "dicoveredBy": "Edward Pigott,Johann Elert Bode",
    "urls": [
        "https://de.wikipedia.org/wiki/Messier_64",
        "https://www.astrofreunde-franken.de/?p=3081"
    ],
    "images": [
        "https://www.nasa.gov/sites/default/files/thumbnails/image/black-eye-galaxy-print.jpg",
        "https://seescho.files.wordpress.com/2021/06/m64.jpg"
    ],
    "locationImage" : "https://www.nasa.gov/sites/default/files/thumbnails/image/m64.jpg"
}
```            
As part of the processing information about the images found in the same folder will added and written to the catalog.json file which later will be read from the Web Application

```javascript

...
"locationImage": "https://www.nasa.gov/sites/default/files/thumbnails/image/m64.jpg",
 "pictures": [
 {
   "path": "/Users/joachimfricker/mystellar/m64/Copym64.png",
   "date": "2022-03-28T18:05:14.741Z"
 },
 {
   "path": "/Users/joachimfricker/mystellar/m64/eVscope-20220327-202356.png",
    "date": "2022-03-28T18:04:24.167Z"
  },
  {
    "path": "/Users/joachimfricker/mystellar/m64/eVscope-20220327-203126.png",
    "date": "2022-03-28T18:04:50.991Z"}
```            
