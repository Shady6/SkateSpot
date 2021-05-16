const translations = {
    "#quick-start": {
        "en": "Quick start",
        "pl": "Szybki start"
    },
    "#present": {
        "en": "All the spots in once place",
        "pl": "Wszystkie spoty w jednym miejscu"
    },
    "#add-spot": {
        "en": "Add",
        "pl": "Dodaj"
    },
    "#view-spots": {
        "en": "View spots",
        "pl": "Przeglądaj"
    },
    "#login-nav": {
        "en": "Login",
        "pl": "Zaloguj"
    },
    "#register-nav": {
        "en": "Register",
        "pl": "Rejestracja"
    },
    "#contact-data": {
        "en": "Contact: skatespot@gmail.com",
        "pl": "Kontakt: skatespot@gmail.com"
    },
    "#copyright": {
        "en": "All rights reserved © SkateSpot by Mikołaj Piekutowski",
        "pl": "Wszelkie prawa zastrzeżone © SkateSpot Mikołaj Piekutowski"
    },
    "#login-text": {
        "en": "Login",
        "pl": "Zaloguj się"
    },
    "#email-address": {
        "en": "Email",
        "pl": "Adres email"
    },
    "#password": {
        "en": "Password",
        "pl": "Hasło"
    },
    "#no-account": {
        "en": "Don't have an account? ",
        "pl": "Nie masz konta? "
    },
    "#register-here": {
        "en": "Register here",
        "pl": "Zarejestruj się tutaj"
    },
    "#login-btn": {
        "en": "Login",
        "pl": "Zaloguj"
    },
    "#register-text": {
        "en": "Register",
        "pl": "Zarejestruj się"
    },
    "#username": {
        "en": "Username",
        "pl": "Nazwa użytkownika"
    },
    "#repeat-password": {
        "en": "Repeat password",
        "pl": "Powtórz hasło"
    },
    "#have-an-account": {
        "en": "Have an account? ",
        "pl": "Masz już konto? "
    },
    "#login-here": {
        "en": "Login here",
        "pl": "Zaloguj się tutaj"
    },
    "#register-btn": {
        "en": "Register",
        "pl": "Zarejestruj"
    },
    "#add-spot-text": {
        "en": "Add spot",
        "pl": "Dodawanie spota"
    },
    "#basic-addon1": {
        "en": "Name",
        "pl": "Nazwa"
    },
    "#description": {
        "en": "Description",
        "pl": "Opis"
    },
    "#spot-photos": {
        "en": "Photos of spot",
        "pl": "Zdjęcia spota"
    },
    "#link-btn": {
        "en": "Link",
        "pl": "Link"
    },
    "#none-btn": {
        "en": "None",
        "pl": "Brak"
    },
    "#surface-score": {
        "en": "Surface score",
        "pl": "Ocena nawierzchni"
    },
    "#obstacles": {
        "en": "Obstacles / Tags",
        "pl": "Przeszkody / Tagi"
    },
    "#ledge": {
        "en": "Ledges",
        "pl": "Murki"
    },
    "#quarter": {
        "en": "Quarter",
        "pl": "Quarter"
    },
    "#downhill": {
        "en": "Downhill",
        "pl": "Downhill"
    },
    "#bank": {
        "en": "Banks",
        "pl": "Banki"
    },
    "#flat": {
        "en": "Flat",
        "pl": "Flat"
    },
    "#stairs": {
        "en": "Stairs",
        "pl": "Schody"
    },
    "#kicker": {
        "en": "Kickers",
        "pl": "Kickery"
    },
    "#rail": {
        "en": "Rails",
        "pl": "Rurki"
    },
    "#skatepark": {
        "en": "Skatepark",
        "pl": "Skatepark"
    },
    "#manualpad": {
        "en": "Manual Pads",
        "pl": "Manual Pady"
    },
    "#location": {
        "en": "Add location",
        "pl": "Dodaj lokalizację"
    },
    "#legend-text": {
        "en": "Legend",
        "pl": "Legenda"
    },
    "#spot-add-btn": {
        "en": "Add",
        "pl": "Dodaj"
    },
    "#address": {
        "en": "Address",
        "pl": "Adres"
    },
    "#added-by": {
        "en": "Added by",
        "pl": "Spota dodał"
    },
    "#logout": {
        "en": "Logout",
        "pl": "Wyloguj"
    }
}

const defaultLanguage = "pl";

const translate = () => {
    let lang = getCookie("language");

    for (key in translations) {
        let element = document.querySelector(key);
        if (element)
            document.querySelector(key).childNodes[0].nodeValue = translations[key][lang];
    }
}

const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setCookie(name, value) {
    var expires = "";

    var date = new Date();
    date.setTime(date.getTime() + (1000 * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

$("document").ready(() => {
    if (getCookie("language") === null)
        setCookie("language", defaultLanguage);
    translate();
})

$("#lang-pl").on("click", () => {
    setCookie("language", "pl");
    translate();
})

$("#lang-en").on("click", () => {
    setCookie("language", "en");
    translate();
})

