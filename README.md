**SMS Web App, Cristea Teodora Madalina, Grupa 1117**

**Link YouTube prezentare video a aplicatiei: [AICI](HTTP://161.35.92.116/).**

**Aplicatia este disponibila [AICI](HTTP://161.35.92.116/).**

### Introducere
Proiectul este reprezentat de o aplicatie web ce permite utilizatorilor sa trimita SMS-uri catre alte persoane care sa includa un mesaj personalizat. De asemenea, utilizatorii pot vedea activitatea recenta de folosire a serviciului, dar doar administratorul aplicatiei poate vedea continutul mesajelor trimise. Aplicatia este impartita in 2 componente:
- Un API REST denumit "backend" ce expune rutele apelate de frontend pentru trimiterea unor SMS-uri noi sau pentru listarea activitatii recente de folosire a serviciului:
	- Pentru trimiterea de SMS-uri este folosit API-ul [Vonage](https://www.vonage.com/ "Vonage"), care ofera un credit gratuit de 2 euro la inregistrare.
	- Pentru notificarea Administratorului de activitatea de folosire a serviciului sunt folosite [Discord Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks "Discord Webhooks")
- O aplicatie de frontend scrisa in React ce apeleaza API-ul de backend si afiseaza informatiile primite de la acesta.

### Descriere Problema
Proiectul a plecat de la necesitatea unei aplicatii web care sa permita:
- Trimiterea de SMS-uri catre un numar de telefon, cu un mesaj personalizat, fara a beneficia de un telefon mobil
- Vizualizarea activitatii de folosire a serviciului in mod public (fara a include continutul mesajelor) pentru a spori increderea si a oferi transparenta
- Accesul la un Audit Log pentru Administrator pentru prevenirea abuzurilor

### Descriere API
API-ul implementat, numit "backend" expune urmatoarele 2 rute:
- `GET /smses` -> Intoarce toate SMS-urile trimise folosind aplicatia, fara continutul mesajelor personalizate. Ca raspuns, se primeste un Array de SMS-uri, unde fiecare SMS contine:
	- Data si ora trimiterii
	- Numele emitatorului
	- Numarul de telefon am receptorului
- `POST /smses` -> Metoda ce trimite un SMS catre receptor folosind **API-ul Vonage**, salveaza SMS-ul in baza de date si trimite un mesaj de audit catre Administrator folosind **API-ul de Discord Webhook**. Primeste urmatorii parametrii:
	- Nume emitator
	- Numar de telefon al receptorului
	- Continutul mesajului personalizat ce va fi inclus in SMS

## Exemple de Request-uri / Response-uri API
1. `GET /smses`:
Request:
```
GET /smses HTTP/1.1
Host: 161.35.92.116:9090
```
Response:
```
{
    "smses": [
        {
            "smsID": 1,
            "senderName": "Teodora",
            "receiverPhoneNumber": "+40740315798",
            "sentAtTime": "2022-05-08T16:55:48.000Z"
        }
],
    "error": null
}
```
2. `POST /smses`:
Request:
```
POST /smses HTTP/1.1
Host: 161.35.92.116:9090
Content-Type: application/json
Content-Length: 97
{
    "senderName": "Teo",
    "receiverPhoneNumber": "+40740315798",
    "smsContent": "Salut"
}
```
Response:
```
{
    "results": {
        "SaveSMSToDB": [
            {
                "fieldCount": 0,
                "affectedRows": 1,
                "insertId": 5,
                "serverStatus": 2,
                "warningCount": 0,
                "message": "",
                "protocol41": true,
                "changedRows": 0
            },
            null
        ],
        "SendSMS": "0",
        "DiscordAuditLog": {
            "statusCode": 204
        }
    },
    "error": null
}
```

### Flux de Date
![FLux de Date](/images/flux_de_date.png)

### Capturi de Ecran
![Screenshot](/images/ss.png)

### Referinte
- Discord Webhooks: https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks
- Vonage SMS API: https://www.vonage.co.uk/
- NodeJS Express: https://expressjs.com/
- ReactJS: https://reactjs.org/

