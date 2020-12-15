// console.log('Starting notes.js');

const fs= require('fs');


var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(e) {
        return [];
    }

};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));

};

var addNote = (title, body) => {
    var notes=fetchNotes();
    var note = {
        title:title,
        body
    };

    
    //saving file
    var duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }

};

var getAll = () =>{
   return fetchNotes();
} ;

var getNote = (title) => {
    var notes = fetchNotes();
    //filter note
    var note = {title};
    var readingNotes = notes.filter((note)=> note.title === title);
    return readingNotes[0];
    

    
};

var deleteNote = (title) => {
    // fetch Note
    var notes =fetchNotes();
    var note = {title};
    // filter note, removing the one with title of argument
    var deletingNotes = notes.filter((note)=> note.title!== title);
    //saving new notes array
    saveNotes(deletingNotes);


    return notes.length !== deletingNotes.length;//this line will  return a boolean
};


var logNote = (note) => {
    debugger;
    console.log('------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote: addNote,
    getAll,
    getNote,
    deleteNote,
    logNote
};
