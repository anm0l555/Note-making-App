// console.log('Starting app');

// const fs = require('fs');
// const os= require('os');
// const notes= require('./notes');


// console.log(_.isString(true), function (err)  {
//     if (err)
//     {
//         console.log('error');
//     }
// });
// console.log(_.isString('true'), function (err)  {
//     if (err)
//     {
//         console.log('error');
//     }
// });
// var filteredArray = _.uniq(['Andrew']);
// console.log(filteredArray);
// var user= os.userInfo();

// fs.appendFile('greetings.txt' , `hello ${user.username}! You are ${notes.age} years old.`, function (err){
//     if (err)
//     {console.log('error occurs');}
// });

// const addtwonumbers = notes.add(3, 5);
// console.log('Result: ',notes.add(4, -2 ));





// console.log('Starting app ');

const _ = require('lodash');
const notes= require('./notes');
const yargs= require('yargs');

const titleOptions = {
    describe: 'Title of Note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    descrie:'Body of the Note',
    demand: true,
    alias:'b'
};
const argv = yargs.command('add','Add a new Note', {
    title : titleOptions,
    body: bodyOptions
})
.command('list','List all Notes')
.command('read', 'Read a note', {
    title: titleOptions
})
.command('delete','To delete a Note', {
    title:titleOptions
})
.help()
.argv;
// console.log(argv);
var command = argv._[0];
// console.log('Command:',command);

if(command==='add') {
    var note = notes.addNote(argv.title,argv.body);
    if( note){
        console.log('note created');
        notes.logNote(note);
    } else {
        console.log('note exists, title taken');
        
    }
}
else if(command === 'read')
{
    var noteToBeRead = notes.getNote(argv.title);
    if(noteToBeRead){
        notes.logNote(noteToBeRead);
        console.log('note found');
    } else {
        console.log('Note not found');
    }
}
else if(command === 'delete')
{
    var noteRemoved = notes.deleteNote(argv.title);
    var message = noteRemoved ? 'Note was removed': 'Note doesnt exist';
    console.log(message);
}
else if(command === 'list')
{
    var allNotes=notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach ((note) => {
        notes.logNote(note);
    });
} else {
    console.log('Command not recognized');
}