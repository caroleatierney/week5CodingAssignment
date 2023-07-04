// This assignment will prompt the user to react with the menu

// The object is to display Musicians and their Albums and Songs on them
// The user must Create, Review, Update and Delete the information
// It will have Full CRUD

class Song {
    constructor(songName, songTimeLength) {
        this.songName = songName;
        this.songTimeLength = songTimeLength;
    }

    describe() {
        return `${this.songName} is ${this.songTimeLength} long \n`;
    }
}

class Album {
    constructor(albumName) {
        this.albumName = albumName;
        this.songsOnAlbum = [];
    }

    addSong(song) {
        if (song instanceof Song) {
            this.songsOnAlbum.push(song);
        } else {
            throw new Error(`The information entered is not an instance of Song ${this.song}`)
        }
    }

    describe() {
        return `    ${this.albumName} has ${this.songsOnAlbum.length} songs`;
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// This is the menu class that will display to the user allowing them to choose
// what option they want. Based on the option a specific method will run
class Menu {
    constructor() {
        this.artistAlbums = [];
        this.selectedAlbum = null; // Work with one artist at a time 
    }

    start() {
        let selection = this.showMainMenu;
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createNewAlbum();
                    break;
                case '2':
                    this.viewAlbum();
                    break;
                case '3':
                    this.editAlbum();
                    break;
                case '4':
                    this.deleteAlbum();
                    break;
                case '5':
                    this.viewAllAlbums();
                    break;
                default:
                    selection = '0';
            }
            selection = this.showMainMenu();
        }
        alert("Goodbye!");
    }

    // this method will display the main menu options to the user
    showMainMenu() {
        return prompt(`
    0) Back
    1) Add a new album
    2) View an album
    3) Edit an album name
    4) Delete an album
    5) View all albums
    `);
    }

    // this method will display the album menu options to the user   
    showAlbumMenuOptions(songName) {
        return prompt(`
    0) Back
    1) Add a new song
    2) edit a song
    3) Delete an song
    --------------------------
    ${songName}
    `);
    }

    viewAllAlbums() {
        let albumsString = "";
        for (let i = 0; i < this.artistAlbums.length; i++) {
            albumsString += i + ') ' + this.artistAlbums[i].albumName + '\n'
        }
        alert(albumsString);
    }

    // Prompt user for new album name
    createNewAlbum() {
        let albumName = prompt("Enter new album name: ");
        this.artistAlbums.push(new Album(albumName));
    }

    // View specific album
    viewAlbum() {
        let index = prompt('Enter the index of the album you want to view" ');
        if (index > -1 && index < this.artistAlbums.length) { // make sure the number entered is a valid selection
            this.selectedAlbum = this.artistAlbums[index];
            let description = "Album Name: " + this.selectedAlbum.albumName + "\n";
            description += " " + this.selectedAlbum.describe() + "\n";

            // build list of songs
            for (let i = 0; i < this.selectedAlbum.songsOnAlbum.length; i++) {
                description += i + ") " + this.selectedAlbum.songsOnAlbum[i].describe();
            }

            let selection = this.showAlbumMenuOptions(description);
            switch (selection) {
                case "1":
                    this.createSong();
                    break;
                case "2":
                    this.editSong();
                    break;
                case "3":
                    this.deleteSong();
            }
        }
    }

    editAlbum() {
        let index = prompt("Enter the index number of the album you wish modify: ");
        if (index > -1 && index < this.artistAlbums.length) {
            let newName = prompt("Enter the new name for the album: ");
            this.artistAlbums[index].albumName = newName;
            console.log(this.artistAlbums);
        }
    }

    deleteAlbum() {
        let index = prompt("Enter the index number of the album you wish to delete: ");
        if (index > -1 && index < this.artistAlbums.length) {
            this.artistAlbums.splice(index, 1);
        }
    }

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // These methods are for songs on the album
    createSong() {
        let songName = prompt("Enter the song you want to add to the album: ");
        let songTimeLength = prompt("How long does the song run for? ");
        this.selectedAlbum.addSong(new Song(songName, songTimeLength));
    }

    editSong() {
        let index = prompt("Enter the index number of the song you wish modify: ");
        if (index > -1 && index < this.selectedAlbum.songsOnAlbum.length) {
            let newName = prompt("Enter new song name: ");
            let newSongTimeLength = prompt("Enter new song name's length: ");
            this.selectedAlbum.songsOnAlbum[index].songName = newName;
            this.selectedAlbum.songsOnAlbum[index].songTimeLength = newSongTimeLength;
        }
    }

    deleteSong() {
        let index = prompt("Enter the index number of the song you wish to delete: ");
        if (index > -1 && index < this.selectedAlbum.songsOnAlbum.length) {
            this.selectedAlbum.songsOnAlbum.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();