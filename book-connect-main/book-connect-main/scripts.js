import {books} from "./data.js";
import {genres} from "./data.js";
import {authors} from "./data.js";
import {BOOKS_PER_PAGE} from "./data.js";

//declared the variables so that we can store and manipulate data in the code later
const matches = books
let page = 1;

 //if (!books && !Array.isArray(books)) throw new Error('Source required')
 //if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}
const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}



// create a function to show the books on the page
/**
 * This function loads the home page of the website with
 * the books shown in a list of 36 at a time.
 * @param {imported object} books
 */

const appendBooks = (books) => {
  /**
   * used imported variable which stored the number of books that can be on the page at a time
   * in a for loop to loop through the books and add only 36 at time
   */
  for (let i = 0; i < BOOKS_PER_PAGE; i++) {//get the books from index 0 in the books object
      const book = books[i];
      //create a button element for the books so each book is in its own card
      const button = document.createElement('button');
        button.classList.add('preview'); //introduced a class and call it preview.
             // Set the button's data-preview attribute to the book's id.
         button.dataset.preview = book.id;
    // Set the button's inner HTML to the book's title and author.
    button.innerHTML =/* HTML markup for the book cards */
    `
     <img class="preview__image" src="${book.image}" />
     <div class="preview__info">
       <h3 class="preview__title">${book.title}</h3>
       <div class="preview__author">${authors[book.author]}</div>
     </div>
   `;
  // Append the button to the fragment.
  fragment.appendChild(button);
}
   // Append the fragment to the data-list-items div.
   document.querySelector('[data-list-items]').appendChild(fragment);
SHOW_MORE_BTN.innerHTML = `Show more (${updateBooksLeft()})`
  }

/**
 * For the buttons, the following event listeners are for the search button and a search cancel button on a web page. When the search button is clicked, it displays a search overlay element. When the search cancel button is clicked, it hides the search overlay element.
 */
const searchbutton = document.querySelector("[data-header-search]");
searchbutton.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "block";
})
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "none";
})
//Settings
const settingbutton = document.querySelector("[data-header-settings]")
settingbutton.addEventListener('click', (event) => {
 document.querySelector("[data-settings-overlay]").style.display = "block";
})
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', (event) => {
document.querySelector("[data-settings-overlay]").style.display = "none";
})

//Changing the themes
/**
 *A save button in a dialog box on a web page. When the save button is clicked, 
 *it changes the color theme of the website based on a user's input in a settings theme dropdown menu.
 *introduced the if statemnets 
 */
const dataSettingsTheme = document.querySelector('[data-settings-theme]')//A dropdown menu element in a settings overlay on the website.
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
saveButton.addEventListener('click', (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
      }
} )

//search options
const authorSelect = document.querySelector("[data-search-authors]");
for (const authorId in authors) {
  const optionElement = document.createElement('option')
  optionElement.value = authorId
  optionElement.textContent = authors[authorId]
  authorSelect.appendChild(optionElement)
}
const genreSelect = document.querySelector("[data-search-genres]");
for (const genreId in genres) {
  const optionElement = document.createElement('option')
  optionElement.value = genreId
  optionElement.textContent = genres[genreId]
//   console.log( optionElement.value +' '+ optionElement.textContent)
  genreSelect.appendChild(optionElement)
}

//create a html fragment to hold the books
const fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)//made this a global variable because used in many functions

//This is the button used to add more books to the page as you scrolldown.
const SHOW_MORE_BTN = document.querySelector('[data-list-button]');
//make the text on button more transparent
SHOW_MORE_BTN.setAttribute("style", "color: rgba(255, 255, 255, 0.6)");
/**
 * This function updates the number of books left and then prints
 * that number on the button used to show more books.
 * @returns { number } the number of books left that haven't been
 * loaded to the page
 */
const updateBooksLeft = () => {
    /**
     * fetch the books that are already on the page then count them and
     *use the number of books left in the books object to add more books so the button
     *can stop adding more books when all the books in the object have been added
     */
const booksOnPage = document.querySelectorAll('preview');
const booksOnPageCount = booksOnPage.length;
//subtract books on page from total books in object
const booksLeft = books.length - booksOnPageCount;
//add the text to the button element
return booksLeft
   }
   
    /**
     * This function will add more books to the page and update
     * the number in the show more button everytime it is clicked
     * until there are no more books left in the books object.
     */
const showMoreAction = (event) => {
    event.preventDefault()
        /**
         *fetch the books that are already on the page then count them and
         *use the number of books left in the books object to add more books so the button
         *can stop adding more books when all the books in the object have been added
         */
    const booksOnPage = document.querySelectorAll('.preview');
    const booksOnPageCount = booksOnPage.length;
    //subtract books on page from total books in object
    const booksLeft = books.length - booksOnPageCount;
    //add the text to the button element
    //check if there are still books left in the books object
    if(booksLeft > 0) {
        /**
        *add 36 more books to the page using the appendBooks function
        *where the books object is altered by slicing out books
        *from where the first function call ended to 36 more books
        */
        appendBooks(books.slice(booksOnPageCount, booksOnPageCount + 36))
    }
        SHOW_MORE_BTN.innerHTML = `Show more (${booksLeft})`
        /**
        *make the summary overlay show when a book is clicked
        *Used a for loop to iterate over all the book buttons so that
        *each one can be clicked on
        *NOTE - added here too so it can still work after the first
        *36 books are added
        */
 const bookList = document.querySelectorAll('.preview')
 for (let z = booksOnPageCount; z < books.length; z++ ) {
    bookList[z].addEventListener("click", descritionOverlay )
 }
    };
const descritionOverlay = (event) => {
    //fetch the dialog box where the overlay will be appended
    const bookSummary = document.querySelector('[data-list-active]')
    //get the book that is clicked
    const book = event.target.closest('.preview');
    //get a book id to use to fetch book information
    const bookId = book.getAttribute('data-preview');
    //for loop to iterate over the book object lloking for matchind ids
    for (let i = 0; i < books.length; i++) {
        //check if the id in the books object matches that of the clicked book
        if (books[i].id === bookId) {
        //create the overlaay div html
        bookSummary.innerHTML = /*html*/
        `<div class="overlay__preview">
        <img class="overlay__blur" data-list-blur="" src="${books[i].image}">
        <img class="overlay__image" data-list-image="" src="${books[i].image}">
        </div>
        <div class="overlay__content">
        <h3 class="overlay__title" data-list-title="">${books[i].title} (${new Date(books[i].published).getFullYear()})</h3>
        <div class="overlay__data" data-list-subtitle="">${authors[books[i].author]}</div>
        <p class="overlay__data overlay__data_secondary" data-list-description="">${books[i].description}</p>
        </div>
        <div class="overlay__row">
        <button class="overlay__button overlay__button_primary" data-list-close="">Close</button>
        </div>`
        }
    }
        //show the book summary overlay when its done being created
        bookSummary.showModal()
        //when the close button is clicked, the overlay should be removed
        document.querySelector('[data-list-close]').addEventListener("click", () => {
            bookSummary.close()
        })
}

// calling the function to load page with book list using an event listener for when the page first loads
document.addEventListener("click", appendBooks(books))
//used event listener to make the button load more books with the showMoreAction function
document.querySelector('[data-list-button]').addEventListener("click", showMoreAction)
/**
 *make the summary overlay show when a book is clicked,
 *Used a for loop to iterate over all the book buttons so that each one can be clicked on
 */
 const bookList = document.querySelectorAll('.preview')
 for (let z = 0; z < books.length; z++ ) {
    bookList[z].addEventListener("click", descritionOverlay )
 }