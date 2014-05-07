=======
webtech2
========

## Individuele labs voor webtech2.

Link to webtech2 repository [LiesbethVanaerschot](https://github.com/LiesbethVanaerschot/webtech2.git)

## Beschrijving

### LAB 1 - Let's GIT to work

Wat is GIT en hoe moeten we er mee werken? Dit hield de eerste opdracht voor Webtech 2 in. In groepjes van 3 of 4 moesten we samen bijdragen aan een repository. Eén iemand moest de repository aanmaken na het installeren van GitHub. 

#####Basis Git commando's:
```
git clone: clones/kopieert de repository map op je computer.
git branch: toont lijst van alle branches en op welke branch je zit (default is master).
git checkout -b (nieuwe branch): creert nieuwe branch en wisselt er meteen naar.
git checkout: wisselen van branch.
git merge (nieuwe branch): merge eigen branch met master.
git branch -d (nieuwe branch): deleten van eigen branch.
git add (bestandsnaam): enkel bestand toevoegen.
git add (foldernaam)/ : een hele folder toevoegen.
git commit -m: de bestanden of veranderingen committen met message.
git push: de veranderingen/bestanden pushen naar de repository online.
git pull: de lokale repository up-to-date brengen met de online versie.
```

#####Git commando's ivm forked repositories:

Als je wil bijdragen aan een repository van een andere git-gebruiker kun je zijn repository forken. Daardoor komt de repo ook in jouw repository overzicht te recht.
```
git clone: clones/kopieert de repository map op je computer.
git remote add upstream (link van geforked repo): upstream wijst naar de originele repo, zo kun je altijd jouw versie updaten.
git fetch upstream: haalt de veranderingen in de originele repo op.
git merge upstream/master: alles samen voegen.
git push origin master: pushen naar jouw forked repo.
```
Daarna kan je een pull request om jouw veranderingen toe te voegen aan de originele repository.

<br/>
<br/>

### LAB 2 - CSS3 animations and transitions

Workshop over CSS3 animaties, transformations en transitions.</br>
Deze lab bevat twee opdrachten:

1. Gekleurde bolletjes die door middel van een klik verplaatsen.
2. IMD-talks animatie on page load.

#####Opdracht 1 - gebruik van CSS3 transformations
```
SYNTAX:
transform : function(value) //;other transform functions//;
transform-origin: left center; //van waaruit de transformatie moet gebeuren//
```
De CSS3 transform eigenschap zorgt er voor dat het uitzicht van het geselecteerde element gemanipuleerd wordt volgens bepaalde transformatie functies. Het geselecteerde element behoudt zijn oorspronkelijke positie en grootte welke transformatie ook wordt uitgevoerd. <br/>
Enkele voorbeelden van zulke transformatie functies zijn:

**rotate(angle)**
   Roteert een element onder een bepaalde hoek.

```
voorbeeld rotate()
```

**scale()**<br/>

   - scale(2): vergroot een element 2 maal.
   - scale(2,4): horizontaal vergroten (x) met 2, verticaal vergroten (y) met 4.
   - scaleX(value) en scaleY(value): meer specifiek vergroten voor afzonderlijk de X- of Y-as.
                                                                                    
```
voorbeeld scale()
```
**skew()**<br/>

    - skew(x,y): schuintrekken volges x- of y-as in één functie.
    - skewX() en skewY(): meer specifiek volges één as schuintrekken.

```
voorbeeld skew()
```
**translate()**<br/>

    - translate(x,y): verplaatsen volgens beide assen.
    - translateX() of translateY(): verplaatsen volgens specifieke as.

```
voorbeeld translate()
```
Voor deze opdracht heb ik de translate() functie gebruikt. Omdat transformations directe manipulaties zijn van het uitzicht van een element zie je direct het eindresultaat. <br/>
Het zou natuurlijk veel fijner zijn moest je deze verandering geanimeerd kunnen waarnemen.<br/>
**Transitions** in combinatie met transformations kunnen hiervoor zorgen.

```
transition: property duration timing-function delay;
```
Transitions worden bijvoorbeeld aangeroepen wanneer er over een element gehoverd wordt. Ze vormen de animatie tussen veranderingen die je op een element wilt uitvoeren.
```
transition voorbeeld
```
Wanneer je transitions en transformations combineert, kun je bijvoorbeeld het volgende doen:
```
voorbeeld animatie
```
Naast de voorgaande 2D transformations heb je ook van sommige functies de **3D transformations**.<br/>
**rotateX() - rotateY() - rotate3d(x, y, z):**<br/>
   Deze functies zorgen er voor dat een element rond een bepaalde as draait.

```
voorbeeld
```
**translateZ() - translate3d(x, y, z):**<br/>
   De z-waarde bij deze functies zorgen er voor dat het element zich naar de user of weg van de user beweegt.

```
voorbeeld
```
**perspective():**<br/>
   Perspective manipuleert het element zelf niet maar voegt een bepaald perspectief, een diepte toe aan de 3D-transformations.

```
voorbeeld
```

<br/>

#####Opdracht 2 - gebruik van CSS3 animation<br/>
```
SYNTAX
Animatie waarbij de eigenschappen apart worden aangeroepen:
#box {
  animation-name: bounce;
  animation-duration: 4s;
  animation-iteration-count: 10;
  animation-direction: alternate;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  animation-delay: 2s;
}

Animatie genoteerd in 1 lijn:
animation: name duration iteration-count direction timing-function fille-mode delay;
animation: bounc 4s 10 alternate ease-out forwards 2s;

```
<br/>
*Waarvoor staan al deze animatie-eigenschappen?*<br/>
 - **name**: naam van de animatie.
 - **duration**: hoelang de animatie zal duren.
 - **iteration-count**: hoeveel keer de animatie herhaalt moet worden.
 - **direction**: in welke richting de animatie moet afgespeeld worden bv: normal,reverse,...
 - **timing-function**: hoe de animatie moet verlopen over zijn duur bv: ease-in-out, lineair,...
 - **fill-mode**: bepaald waar de animatie moet stoppen.
 - **delay**: de vertraging waarmee de animatie moet starten.

*Een animatie kan ook in verschillende stappen gebeuren.*
```
@keyframes [animation-name]{
from{wat er geanimeerd moet worden}
to{wat er geanimeerd moet worden}
}

OF

@keyframes [animation-name]{
0%{}//begin
50%{}//midden
100%{}//einde
}
```
**Animations en transformations combineren**
```
voorbeeld
```
<br/>
<br/>

### LAB 3 - Advanced JS
Voor de opdracht rond de workshop Advanced JS moesten we een simpele todo-app uitwerken. De to-do items zullen gewone list-items zijn in een unordered list, maar de bedoeling is dat we deze als 'done' kunnen aanduiden met Javascript zonder het gebruik van jQuery. Hiervoor schrijven we ons eigen mini-framework.<br/>

Behandelen van:
- object notation
- DRY
- function zijn js classes
- inheritance

### LAB 4 - prototype Weather App

### LAB 5 - Terrapke

### LAB 6 - NODE.js + WEBSOCKETS

*Basic online tutorial: node + express + jade + mongodb + monk*
 http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/

De vragen moesten allemaal gedisplayed kunnen worden in een tweede browser (scherm). Wanneer je je vraag in zond dus onclick moesten je vragen verstuurd worden naar de tweede pagina. Dit doen we met websockets. We zagen twee soorten websockets in de les websocket.io en Faye. Hier en in labX heb ik met Faye gewerkt.
Op de website van Faye staat goed gedocumenteerd hoe je hieraan moet beginnen met een node.js server.
Je installeert eerst Faye via npm installe faye en ziet dat faye ook tussen je te gebruiken dependencies staat.
Dan moet je in je app.js een faye server aanmaken want deze heb je nodig om gegevens te kunnen doorsturen naar de verschillende browsers.
-- server code --

https://github.com/faye/faye

### LAB 7 - SASS

### LAB 8 - BACKBONE.JS 

### LAB X - BESTELAPP

*(misschien) handige links:<br/>*
 http://stackoverflow.com/questions/18696556/mongodb-schema-design-huge-list
 http://stackoverflow.com/questions/9127174/why-does-mongoose-have-both-schemas-and-models
 http://stackoverflow.com/questions/19627631/how-to-get-data-from-mongodb-using-mongoose
 http://stackoverflow.com/questions/8899647/getting-data-from-mongodb-with-mongoose
 http://blog.nodeknockout.com/post/34302423628/getting-started-with-mongoose
 http://stackoverflow.com/questions/17256710/display-the-data-onto-webpage-retrieved-from-mongodb-using-node-js

 http://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/

 http://stackoverflow.com/questions/9230932/file-structure-of-mongoose-nodejs-project
 http://stackoverflow.com/questions/12292544/how-to-reference-mongoose-db-from-external-models
 http://stackoverflow.com/questions/9690186/best-way-to-share-database-connection-param-with-mongoose-node-js

 http://blog.kevinchisholm.com/javascript/node-js/using-mongoose-odm-to-connect-to-mongodb-in-your-node-js-application/

 http://blog.mongodb.org/post/52299826008/the-mean-stack-mistakes-youre-probably-making-with

 http://stackoverflow.com/questions/9960486/defining-mongoose-models-in-separate-module

 
