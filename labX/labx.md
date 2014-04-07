#LABX

##De bestel app.
(naam nog bedenken)

##Wat moet het kunnen?

1. Menu van bar/cafe/resto weergeven
2. Klant moet kunnen aanduiden wat ze willen bestellen
3. dit wordt weergegeven in een "winkelmandje"
4. Dit winkelmandje moet je kunnen bevestigen : BESTEL!
5. Controle op ingave tafelnummer
6. Bestelling moet in de zaak op scherm komen/afgeprint worden
7. feedback hoeveelste in wachtrij. --> iets met gemiddelde tijden, bestelling vervalt uit systeem na bep tijd.

##TODO

1. mongodb + nodejs
2. menu ingeven in db
3. menu oproepen (verschillende categoriën)
4. menu items aanvinken
5. menu items opsommen in bestelling
6. bestelling publishen en subscriben

##SCENARIO

Je zit op het terras van een bar/cafe en wilt graag iets bestellen.
Je bekijkt het menu en maakt je keuze. Obers komen geen bestelling opnemen.
Maar je leest dat zij de bestelapp gebruiken.
(je download die van de app store) Je opent de app en selecteert de zaak waarbij je op terras zit.
Misschien een aanmeldingscode zodat je je niet kan vergissen van horeca-zaak?
het menu verschijnt op je smartphone in categoriën: eten - drinken.<br/>
***
*Bij Beans bijvoorbeeld:*<BR/>
**ETEN**<br/>
*Ontbijt<br/>
Yoghurt<br/>
Bagels<br/>
Wraps<br/>
Dessert*<br/>    
**DRINKEN**<br/>
*Koffie<br/>
Koffie specials<br/>
Thee<br/>
Smoothies<br/>
Frisdrank*
***
Je kan aanvinken wat je wilt invullen hoeveel je hiervan wilt.
Door op de knop "toevoegen aan bestelling" te drukken, wordt alles wat je aangeduid hebt toegevoegd aan je bestelmand.
Deze kan je achter af voor de effectieve bestelling nog eens goed herbekijken.
In het bestelmandje ben je verplicht om je tafelnummer in te vullen. 
Ben je zeker van je bestelling klik je op **BESTEL** en wordt je bestelling naar binnen gestuurd. Wanneer je bestelling daar wordt afgedrukt - *Voorlopig met print button, anders automatisch* - krijg je op je smartphone de melding dat je bestelling is ontvangen. Per bestelling duur het gemiddeld 10min/20min op drukke dagen vooraleer je je drinken krijgt. Eten duurt meestal net iets langer, want dit heeft geen voorrang. *hidden id's aan bestellingen meegeven, deze in array met time - out functie?? aantal id's in array x gemiddelde tijd is wachttijd. Wachttijd terug sturen naar klant*