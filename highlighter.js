// Luis Omar Leyva Navarrete - A01570367

/* Al no poder leer un archivo de manera local en javascript se crearon 5 casos de prueba
en el documento input.js

Descomente uno de los siguientes para probar cada uno de los casos*/

init(tokens1, tokenContent1);
// init(tokens2, tokenContent2);
// init(tokens3, tokenContent3);
// init(tokens4, tokenContent4);
// init(tokens5, tokenContent5);

/* En esta funcion se revisa que el inicio al inicio se declare 
una variable correctamente */
function init(tokens, tokenContent) {
    if (tokens[0] == "Variable" && tokens[1] == "Asignacion") {
        addHtml(tokens.shift(), tokenContent.shift());
        addHtml(tokens.shift(), tokenContent.shift());
        values(tokens, tokenContent, "inicial");
    } else if (tokens[0] == "Comentario") {
        addHtml(tokens.shift(), tokenContent.shift());
        operations(tokens, tokenContent);
    } else if (tokens == undefined || tokens[0] == undefined) {
        return;
    } else {
        sintaxError(
            tokens,
            tokenContent.shift(),
            "Intento de asignación incorrecto o ausencia de asiganción",
            tokenContent.shift()
        );
    }
}

// Verificamos los valores y variables validos
function values(tokens, tokenContent, type = "") {
    switch (tokens[0]) {
        case "Variable":
            addHtml(tokens.shift(), tokenContent.shift());
            operations(tokens, tokenContent, type);
            break;
        case "Entero":
            addHtml(tokens.shift(), tokenContent.shift());
            operations(tokens, tokenContent, type);
            break;
        case "Real":
            addHtml(tokens.shift(), tokenContent.shift());
            operations(tokens, tokenContent, type);
            break;
        case "Parentesis-inicial":
            addHtml(tokens.shift(), tokenContent.shift());
            checkParentesis(tokens, tokenContent, "final");
            break;
        case undefined:
            return;
        default:
            sintaxError(tokens, tokenContent.shift());
            break;
    }
}

// Verificamos los operadores validos
function operations(tokens, tokenContent, type = "") {
    if (tokens[0] == "Parentesis-final" && type == "inicial") {
        sintaxError(tokens, tokenContent.shift());
    }
    switch (tokens[0]) {
        case "Final-Linea":
            checkEndOfLine(tokens, tokenContent, type);
            break;
        case "Suma":
            addHtml(tokens.shift(), tokenContent.shift());
            values(tokens, tokenContent, type);
            break;
        case "Resta":
            addHtml(tokens.shift(), tokenContent.shift());
            values(tokens, tokenContent, type);
            break;
        case "Multiplicacion":
            addHtml(tokens.shift(), tokenContent.shift());
            values(tokens, tokenContent, type);
            break;
        case "Division":
            addHtml(tokens.shift(), tokenContent.shift());
            values(tokens, tokenContent, type);
            break;
        case "Potencia":
            addHtml(tokens.shift(), tokenContent.shift());
            values(tokens, tokenContent, type);
            break;
        case "Comentario":
            addHtml(tokens.shift(), tokenContent.shift());
            operations(tokens, tokenContent, type);
            break;
        case "Parentesis-final":
            break;
        case undefined:
            break;
        default:
            sintaxError(tokens, tokenContent.shift());
            break;
    }
}

// Se verifica que se cierre el parentesis
function checkParentesis(tokens, tokenContent, type = "") {
    values(tokens, tokenContent, "final");
    if (tokens[0] == "Parentesis-final") {
        addHtml(tokens.shift(), tokenContent.shift());
        operations(tokens, tokenContent, "inicial");
        return;
    } else if (tokens[0] == undefined) {
        return;
    } else {
        sintaxError(tokens, tokenContent.shift());
        return;
    }
}

function checkEndOfLine(tokens, tokenContent, type = "") {
    if (type == "final") {
        sintaxError(tokens, tokenContent[0], "No se cerro el parentesis");
    } else {
        addHtml(tokens.shift(), tokenContent.shift());
        init(tokens, tokenContent);
    }
}

// Aqui se manda el html al index.html
function addHtml(token, tokenContent) {
    if (token == "Final-Linea") {
        document
            .getElementById("content")
            .insertAdjacentHTML("beforeend", `<br>`);
    } else {
        document
            .getElementById("content")
            .insertAdjacentHTML(
                "beforeend",
                `<span class="${token}">${tokenContent} </span>`
            );
    }
}

/* Manejamos el error de sintaxis. En caso de que exista un error se 
detiene el proceso y se manda un mensaje de error al html */
function sintaxError(
    tokens,
    tokenContent,
    mensajeError = "Token invalido",
    content2 = ""
) {
    document
        .getElementById("content")
        .insertAdjacentHTML(
            "beforeend",
            `<span class="Error">${tokenContent} ${content2}</span>`
        );
    document
        .getElementById("content")
        .insertAdjacentHTML(
            "beforeend",
            `<br><span class="Error">${mensajeError}: ${tokenContent}, de tipo ${tokens[0]}</span>`
        );
    return (tokens[0] = undefined);
}

/* La gramatica fue definida por el autor del programa. Esta se basa
en declarar variables a partir de operaciones matematicas validas.
Las operaciones debem de ser declaradas a una variable para funcionar */
