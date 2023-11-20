
require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } }); 


window.MonacoEnvironment = { getWorkerUrl: () => proxy }; //  


let proxy = URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = {
        baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
    };
    importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));


require(["vs/editor/editor.main"], function () {

	// Creating the editor panel for js, html, and css
    let editor1 = monaco.editor.create(document.getElementById('editor1-panel'), {
        value: localStorage.getItem('editor1Code') || "// JavaScript \nconst greeting = 'Hello World' \nconsole.log(greeting)",
        language: 'javascript',
        theme: 'vs-dark'
    });

     let editor2 = monaco.editor.create(document.getElementById('editor2-panel'), {
        value: localStorage.getItem('editor2Code') || "<!--HTML--> \n<!DOCTYPE html>\n<html>\n<head>\n<title>Document</title>\n</head>\n<body>\n\n<h1>Hello World👋🌎</h1>\n<p>I am awesome😇</p>\n\n</body>\n</html>",
        language: 'html',
        theme: 'vs-dark'
    }); 

    let editor3 = monaco.editor.create(document.getElementById('editor3-panel'), {
        value: localStorage.getItem('editor3Code') ||  `/*CSS Style*/ \nbody {
        background-color: #000000;
        font-family: sans-serif;
        }`,
        language: 'css',
        theme: 'vs-dark'
    }); 


    // overiding the background color of the previous monaco editor theme
    monaco.editor.defineTheme('myTheme', {
        base: 'vs-dark', 
        inherit: true, 
        rules: [], // This is empty because we don't want to override any existing rules, 
        colors: {
            'editor.background': '#000000', // Replacing the background colour with the new color 
        }
    });

    // Applying the new theme so it can take effect
    editor1.updateOptions({ theme: 'myTheme' });
    editor2.updateOptions({ theme: 'myTheme' });
    editor3.updateOptions({ theme: 'myTheme' });


    // Saving the user's code to localStorage so it can be retrieved later or after the page is refreshed
    editor1.onDidChangeModelContent(function () {
        localStorage.setItem('editor1Code', editor1.getValue());
    });

    editor2.onDidChangeModelContent(function () {
        localStorage.setItem('editor2Code', editor2.getValue());
    });

    editor3.onDidChangeModelContent(function () {
        localStorage.setItem('editor3Code', editor3.getValue());
    });

});


