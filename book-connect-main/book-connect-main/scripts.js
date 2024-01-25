import {books} from "./data.js";
import {genres} from "./data.js";
import {authors} from "./data.js";
import {BOOKS_PER_PAGE} from "./data.js";

// Declared variables for data manipulation
const matches = books
let page = 1;

 // Theme color configurations for day and night modes
const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}
const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

/**
 * Function to load the home page of the website with books shown in a list of 36 at a time.
 * @param {Array} books - The array of books to be displayed on the page.
 */

const appendBooks = (books) => {
  for (let i = 0; i < BOOKS_PER_PAGE; i++) {//get the books from index 0 in the books object
      const book = books[i];
      const button = document.createElement('button');

      //introduced a class and call it preview.
        button.classList.add('preview'); 

      // Set the button's data-preview attribute to the book's id.
         button.dataset.preview = book.id;
         
    // Set the button's inner HTML of the buton to display book information
    button.innerHTML =
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

// Event listeners for search and settings buttons
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

// Function to change website theme based on user input
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
saveButton.addEventListener('click', (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    // Change to day time
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
  }
  if (dataSettingsTheme.value === 'night') {
    // Change to night
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
      }
} )

// Creating HTML options for author and genre selection
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

//create a document fragment to hold the books
const fragment = document.createDocumentFragment()
const extracted = books.slice(0, 36)

// Button for loading more books
const SHOW_MORE_BTN = document.querySelector('[data-list-button]');
SHOW_MORE_BTN.setAttribute("style", "color: rgba(255, 255, 255, 0.6)");

/**
 * This function updates the number of books left and then prints
 * that number on the button used to show more books.
 * @returns { number } the number of books left that haven't been
 * loaded to the page
 */
const updateBooksLeft = () => {
  const booksOnPage = document.querySelectorAll('preview');
  const booksOnPageCount = booksOnPage.length;
  const booksLeft = books.length - booksOnPageCount;
  return booksLeft
   }
   
  /**
   * Function to add more books to the page and update the number in the "Show more" button.
   * It is called every time the button is clicked until there are no more books left in the 'books' object.
   * @param {Event} event - The click event on the "Show more" button.
   */
const showMoreAction = (event) => {
    event.preventDefault()
    const booksOnPage = document.querySelectorAll('.preview');
    const booksOnPageCount = booksOnPage.length;
    const booksLeft = books.length - booksOnPageCount;

    if(booksLeft > 0) {
       // Add 36 more books to the page using the appendBooks function
        appendBooks(books.slice(booksOnPageCount, booksOnPageCount + 36))
    }

      // Update the text on the "Show more" button
        SHOW_MORE_BTN.innerHTML = `Show more (${booksLeft})`
      
    // Make the summary overlay show when a book is clicked
    const bookList = document.querySelectorAll('.preview')
    for (let z = booksOnPageCount; z < books.length; z++ ) {
        bookList[z].addEventListener("click", descritionOverlay )
     }
    }; 

  /**
   * Function to display a summary overlay when a book is clicked.
   * It fetches book information and creates an overlay with the details.
   * @param {Event} event - The click event on a book button.
   */
const descritionOverlay = (event) => {
    const bookSummary = document.querySelector('[data-list-active]')
    const book = event.target.closest('.preview');
    const bookId = book.getAttribute('data-preview');

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === bookId) {
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
        bookSummary.showModal()
       
        document.querySelector('[data-list-close]').addEventListener("click", () => {
            bookSummary.close()
        })
}

// Event listener to load the page with book list when the page first loads
document.addEventListener("click", appendBooks(books))

// Event listener to load more books when the "Show more" button is clicked
document.querySelector('[data-list-button]').addEventListener("click", showMoreAction)

// Event listener to show book summary
 const bookList = document.querySelectorAll('.preview')
 for (let z = 0; z < books.length; z++ ) {
    bookList[z].addEventListener("click", descritionOverlay )
 }
