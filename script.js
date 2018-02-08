function getUserName() {
	var name = $(".tg_head_peer_title").html();
	name = name.replace(/(<([^>]+)>)/ig,""); //Variable nombre sin html con emojis
	name = name.replace(/(:([^:]+):)/ig,""); //Variable nombre sin html ni emojis :fish:
	return name;
}

function getUserNameEmoji() {
	var name_emoj = $(".tg_head_peer_title").html();
	name_emoj = name_emoj.replace(/(<([^>]+)>)/ig,""); //Variable nombre sin html con emojis
	return name_emoj;
	// return $(".tg_head_peer_title").html().replace(/(<([^>]+)>)/ig,"");//Variable nombre sin html con emojis
}

function start() {

name = getUserName();//Cogemos el nombre del user fuera del bucle por si cambia de chat
name_emoj = getUserNameEmoji();//Nombre del user con emojis (si tiene)

//Empezamos la interacción con el usuario
var message = "**Hola "+name_emoj+", ¿Te apetece jugar a un juego conmigo?**\n\n";
message += "**Piensa en un personaje real o ficticio y lo adivino...**\n\n\t\t";
message += "**Escribe sí o no (s/n S/N)**";
$('.composer_rich_textarea').html(message);
$('.im_submit').trigger('mousedown');

last_msg = $('.im_message_body:contains("'+name+'") .im_message_text').last().html().toUpperCase();

var juega = setInterval(function() {//Cambiar por evento onchange texto en lugar de un setInterval 1ms
	//Corregir, si el último mensaje era sí antes de haberle preguntado, el juego empieza
	var curr_msg = $('.im_message_body:contains('+name+') .im_message_text').last().html().toUpperCase();
	if (curr_msg != last_msg) {//Hay un mensaje nuevo
    if (curr_msg == "S" || curr_msg == "SI" || curr_msg == "SÍ") {
        clearInterval(juega);//Elimina la comprobación del último mensaje si contesta sí
        console.log("Sí");
        play();//Empieza el juego porque ha contestado sí
    } else if (curr_msg == "N" || curr_msg == "NO") {
    	$('.composer_rich_textarea').html("**De acuerdo, jugamos en otro momento entonces.**");
    	$('.im_submit').trigger('mousedown');
    	console.log("No");
    	clearInterval(juega);//Elimina la comprobación del último mensaje si contesta no
    } else {
    	console.log("Otra cosa");
    }
}
}, 1);

}

function play() {
//Inicializa la API

            // api.hello(function(question, answers) {
            
            //     //var i = Math.floor(Math.random() * 1);
            //     var i = Math.round(Math.random()); //Genera 0/1 Sí/No
            //     //var i = 1;
            //     console.log(cont, question.text, answers[i].text);
            //     api.sendAnswer(answers[i].id);
            //     cont++;
            // });

ask();

// $('.composer_rich_textarea').html(pregunta + "\n0 - Sí\n1 - No\n2 - No lo sé\n3 - Probablemente\n4 - Probablemente no\n");
// $('.im_submit').trigger('mousedown');

var last_msg = $('.im_message_body:contains('+name+') .im_message_text').last().html();
// setInterval(function() {
// 	var curr_msg = $('.im_message_body:contains('+name+') .im_message_text').last().html();
//     if (curr_msg != last_msg) {//Hay un mensaje nuevo
//         last_msg = $('.im_message_body:contains('+name+') .im_message_text').last().html();
//     }
// }, 1);

send_reply(last_msg);

// switch(last_msg) {
//     case 0:
//         api.sendAnswer(answers[0].id);
//         console.log("Cero");
//         break;
//     case 1:
//         api.sendAnswer(answers[1].id);
//         break;
//     case 2:
//         api.sendAnswer(answers[2].id);
//         break;
//     case 3:
//         api.sendAnswer(answers[3].id);
//         break;
//     case 4:
//         api.sendAnswer(answers[4].id);
//         break;
//     default:
//         alert("Respuesta incorrecta.");
// }

}

function ask() {
	var api = new Apinator();
	var cont = 0;

	api.hello(function(question, answers) {
	console.log(cont, question.text, question.id);
	var pregunta = "Nº " + cont + " **" + question.text + "** id: " + question.id;
	
	$('.composer_rich_textarea').html(pregunta + "\n0 - Sí\n1 - No\n2 - No lo sé\n3 - Probablemente\n4 - Probablemente no\n");
	$('.im_submit').trigger('mousedown');

	// api.sendAnswer(answers[1].id);
	cont++;
	});

	// $('.composer_rich_textarea').html(pregunta);
	// $('.im_submit').trigger('mousedown');
}

function send_reply (respuesta) {
	var api = new Apinator();
	console.log("send_reply: " + respuesta);

	api.hello(function(question, answers) {
	api.sendAnswer(answers[respuesta].id);
	console.log("Respuesta: " + respuesta + " enviada");
	});

}

// function dataHandler() {
//     var myArray = ["21/06/2016"];
//     return myArray;
// }

// (function(yourArray) {
//     console.log(yourArray);
// })(dataHandler());

// https://stackoverflow.com/questions/37947647/passing-a-variable-to-a-self-invoking-function

// <span class="emoji  emoji-spritesheet-1" style="background-position: -126px -18px;" title="fish">:fish:</span> Saatana Vittu Perkele
// smile = String.fromCharCode(55357) + String.fromCharCode(56835);
// alert(smile);
// getUserName();
