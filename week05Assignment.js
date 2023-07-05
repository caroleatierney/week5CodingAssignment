// This assignment will prompt the user to react with the menu

// The object is to display music albums and songs on them
// The user must be able to Create, Review, Update and Delete the information
// It has Full CRUD

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// This is the Album class which holds the album name and an array of songs
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class Album {
    constructor(albumName) {
        this.albumName = albumName; // album name
        this.songsOnAlbum = []; // array of songs on album
    }

    addSong(song) {
        if (song instanceof Song) { // verify if the song is a valid instance of the Song class
            this.songsOnAlbum.push(song); // add song to the array
        } else { // if song is not a valid instance of the Song class
            throw new Error(`The information entered is not an instance of Song ${this.song}`) // show error to user
        }
    }

    describe() {
        return ` ${this.albumName} has ${this.songsOnAlbum.length} songs`; // this method provides the album description in the songs prompt
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// This is the Song class whose objects will be added to the Albums array
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class Song {
    constructor(songName, songTimeLength) {
        this.songName = songName; // song name
        this.songTimeLength = songTimeLength; // length of song
    }

    describe() {
        return `${this.songName} is ${this.songTimeLength} long \n`; // this method provides the description in the albums prompt
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// This is the menu class that will display to the user allowing them to choose
// what option they want. Based on the option a specific method will run
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class Menu {
    constructor() {
        this.artistAlbums = []; // albums array
        this.selectedAlbum = null; // Work with one artist at a time 
    }

    start() {
        let selection = this.showMainMenu; // initially, display the menu using the showManMenu method, selection will be what was returned from the prompt
        while (selection != 0) { // As long as the user does not enter 0, execute the option that was chosen
            switch (selection) {
                case '1':
                    this.createNewAlbum(); // if 1 was chosen, execute the creatNewAlbum method in this class
                    break; // leave switch
                case '2':
                    this.viewAlbum(); // if 2 was chosen, execute the viewAlbum method in this class
                    break; // leave switch
                case '3':
                    this.editAlbum(); // if 3 was chosen, execute the editAlbum method in this class
                    break; // leave switch
                case '4':
                    this.deleteAlbum(); // if 4 was chosen, execute the deleteAlbum method in this class
                    break; // leave switch
                case '5':
                    this.viewAllAlbums(); // if 5 was chosen, execute the viewAllAlbums method in this class
                    break; // leave switch
                default:
                    selection = '0'; // if user does not choose from the above option, set the selection to 0 which will exit the while loop
            }
            selection = this.showMainMenu(); // re-display menu to user after selection
        }
        alert("Goodbye!"); // when user chooses option 0, show them a goodbye message
    }

    showMainMenu() { // this method will display the main menu options to the user as displayed below and return the chosen number
        return prompt(`
    0) Back
    1) Add a new album
    2) View an album
    3) Edit an album name
    4) Delete an album
    5) View all albums
    `);
    }

    showAlbumMenuOptions(albumDescription) { // this method will display the album menu options and the album description (passed in) to the user as displayed below and return the chosen number  
        return prompt(`
    0) Back
    1) Add a new song
    2) Edit a song
    3) Delete an song
    --------------------------
    ${albumDescription}
    `);
    }

    viewAllAlbums() {
        let albumsString = ""; // create a string to hold the list albums
        for (let i = 0; i < this.artistAlbums.length; i++) { // loop for the length of the albims array
            albumsString += i + ') ' + this.artistAlbums[i].albumName + '\n' // in the album string, add the index and the album name
        }
        alert(albumsString); // display the string to the user in the song menu
    }

    createNewAlbum() {
        let albumName = prompt("Enter new album name: "); // Prompt user for new album name
        this.artistAlbums.push(new Album(albumName)); // adds new album to the end of the album array
    }

    viewAlbum() {
    let index = prompt('Enter the index of the album you want to view" '); // Prompt user for index of album they want to view
    if (index > -1 && index < this.artistAlbums.length) { // make sure the number entered is a valid selection
        this.selectedAlbum = this.artistAlbums[index]; // the selected album becomes what is in the array index they selected
        let description = "Album Name: " + this.selectedAlbum.albumName + "\n"; // set description to selected albums name and add a line break
        description += " " + this.selectedAlbum.describe() + "\n"; // execute the album describe method and add it to the description and a line break after it

        // build list of songs
        for (let i = 0; i < this.selectedAlbum.songsOnAlbum.length; i++) { // loop for the length of the songs array
            description += i + ") " + this.selectedAlbum.songsOnAlbum[i].describe(); // execute the song description method and continue adding to the description string the songs in the songs array
        }

        let selection = this.showAlbumMenuOptions(description); // the selection is the index returned from the songs prompt the description is passed into the method that displays the prompt for albums
        switch (selection) {
            case "1":
                this.createSong(); // if 1 was chosen, execute the createSong method defined in the menu class 
                break;
            case "2":
                this.editSong(); // if 2 was chosen, execute the editSong method defined in the menu class 
                break;
            case "3":
                this.deleteSong(); // if 3 was chosen, execute the deleteSong method defined in the menu class 
        }
    }
}

    editAlbum() {
        let index = prompt("Enter the index number of the album you wish modify: "); // set index equal to what the user enters in the prompt
        if (index > -1 && index < this.artistAlbums.length) { // make sure the number entered is a valid selection
            let newName = prompt("Enter the new name for the album: "); // set newName equal to what the user inputs
            this.artistAlbums[index].albumName = newName; // update the albumName value in the artistAlbums array
        }
    }

    deleteAlbum() {
        let index = prompt("Enter the index number of the album you wish to delete: "); // set index equal to what the user enters in the prompt
        if (index > -1 && index < this.artistAlbums.length) { // make sure the number entered is a valid selection
            this.artistAlbums.splice(index, 1); // use the arraymethod, splice to remove one element from the artistAlbums array at the index location
        }
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // These methods are for songs on the album
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    createSong() {
        let songName = prompt("Enter the song you want to add to the album: "); // set song name equal to what the user enters in the prompt
        let songTimeLength = prompt("How long does the song run for? "); // set songTimeLength equal to what the user enters in the prompt
        this.selectedAlbum.addSong(new Song(songName, songTimeLength)); // create an instance of Song and call the addSong method to add it to the songs array
    }

    editSong() {
        let index = prompt("Enter the index number of the song you wish modify: "); // set index equal to what the user enters in the prompt
        if (index > -1 && index < this.selectedAlbum.songsOnAlbum.length) { // make sure the number entered is a valid selection
            let newName = prompt("Enter new song name: "); // set newName equal to song name entered by user in the prompt
            let newSongTimeLength = prompt("Enter new song name's length: "); // set newSongTimeLength equal to the time length entered by user in the prompt
            this.selectedAlbum.songsOnAlbum[index].songName = newName; // update the songName value in the array
            this.selectedAlbum.songsOnAlbum[index].songTimeLength = newSongTimeLength; // update the songTimeLength value in the songs array
        }
    }

    deleteSong() {
        let index = prompt("Enter the index number of the song you wish to delete: "); // set index equal to what the user enters in the prompt
        if (index > -1 && index < this.selectedAlbum.songsOnAlbum.length) { // make sure the number entered is a valid selection
            this.selectedAlbum.songsOnAlbum.splice(index, 1); // use the arraymethod, splice to remove one element from the songsOnAlbum array at the index location
        }
    }
}

let menu = new Menu(); // create an instance of the menu class
menu.start(); // execute the menu object's start method defined in the menu class