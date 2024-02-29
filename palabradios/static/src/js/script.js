document.addEventListener("DOMContentLoaded", function() {
    var divElement = document.createElement("div");
    var body = document.body;
    body.insertBefore(divElement, body.firstChild);

    divElement.style.backgroundColor = "black";
    divElement.style.color = "white";
    divElement.style.fontSize = "14px";
    divElement.style.paddingLeft = "50px";


    function cambiarFrase() {
        var phrases = [
            "(Proverbios 11:25) El que es generoso prospera; el que reanima será reanimado.",
            "(Deuteronomio 10:16) Circuncidad, pues, el prepucio de vuestro corazón, y no endurezcáis más vuestra cerviz.",
            "(Deuteronomio 23:17) No haya ramera de entre las hijas de Israel, ni haya sodomita de entre los hijos de Israel.",
            "(Salmo 137:9) ¡Dichoso el que agarre a tus pequeños y los estrelle contra las rocas!",
            "(2 Reyes 2:24) Y mirando él atrás, los vio, y los maldijo en el nombre de Jehová. Y salieron dos osos del monte, y despedazaron de ellos a cuarenta y dos muchachos.",
            "(Mateo 9:12) Al oír esto Jesús, les dijo: Los sanos no tienen necesidad de médico, sino los enfermos.",
            "(Abraham Mateo 19:98) Sexy señorita",
            "(Juan 11:25) Le dijo Jesús: Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá.",
            "(Eclesiástes 1:18) Francamente, mientras más sabiduría, más problemas; mientras más se sabe, más se sufre.",
            "(Judas 1:2) Que reciban misericordia, paz y amor en abundancia."

        ];

        var randomIndex = Math.floor(Math.random() * phrases.length);
        var randomPhrase = "\t\t"+phrases[randomIndex];

        divElement.textContent = randomPhrase;
    }

    cambiarFrase();

    setInterval(cambiarFrase, 10000);
});
