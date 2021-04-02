
import { main } from './main.js'

const { ipcRenderer } = require('electron');
const { handleForm } = remote.require('./index');
const currentWindow = remote.getCurrentWindow();

const submitFormButton = document.querySelector("#ipcForm");


submitFormButton.addEventListener("submit", function (event) {
    //event.preventDefault();   // stop the form from submitting
    let data = {
        vartypes: document.getElementById("vartypes").value.split(','),
        varnames: document.getElementById("varnames").value.split(','),
        camel: document.getElementById("naming1").value,
        kebab: document.getElementById("naming2").value,
        snake: document.getElementById("naming3").value
    }

    //handleForm(currentWindow, data)
    main.variableCollector(data)
});

//ipcRenderer.on('form-received', function (event, args) {
//    main.variableCollector(args)
/*
    you could choose to submit the form here after the main process completes
    and use this as a processing step
*/
//});


