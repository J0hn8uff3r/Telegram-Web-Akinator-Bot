// ==UserScript==
// @name        Telegram Web Akinator Bot
// @namespace   Telegram Web Akinator Bot
// @author      J0hn8uff3r
// @require     https://code.jquery.com/jquery-3.3.1.js
// @description This bot let the user to play with another one via Telegram Web and guess the character that the other human being is thinking about
// @icon        https://i.snag.gy/8NjKnH.jpg
// @include     http*://web.telegram.org/#/im?p=@*
// @version     1
// @grant       none
// ==/UserScript==

$(window).on("load", function() {
    var script = document.createElement( 'script' );
    script.src = 'https://rawgit.com/J0hn8uff3r/Telegram-Web-Akinator-Bot/master/script.js';
    $("body").append( script );

    var script2 = document.createElement( 'script' );
    script2.src = 'https://cdn.rawgit.com/J0hn8uff3r/Telegram-Web-Akinator-Bot/master/apinator.js';
    $("body").append( script2 );

    $( ".im_send_buttons_wrap" ).append( "<img src='https://i.snag.gy/8NjKnH.jpg' onclick='start();' >" );
});
