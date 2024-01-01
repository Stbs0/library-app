const myLibrary = [];
class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = this.read === "read" ? "wishlist" : "read";
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  // Re-render the table after deletion
  insertContentInTable(myLibrary);
}

const showDialog = document.querySelector(".add-book");
const dialog = document.querySelector("#dialog");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const conform = document.querySelector("#conform");
const cancel = document.querySelector("#cancel");
const tbody = document.querySelector(".data");

showDialog.addEventListener("click", () => {
  dialog.showModal();
});

cancel.addEventListener("click", () => {
  dialog.close();
});

conform.addEventListener("click", (event) => {
  dialog.returnValue = "";

  const selection = document.querySelectorAll("input[name='read']");
  let checked;

  for (let i = 0; i < selection.length; i++) {
    if (selection[i].checked) {
      checked = selection[i].value;
      break;
    }
  }

  const book1 = new Book(
    authorInput.value,
    titleInput.value,
    pagesInput.value,
    checked
  );
  addBookToLibrary(book1);

  // Clear input fields
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";

  // Re-render the table after adding a new book
  insertContentInTable(myLibrary);

  event.preventDefault();
  dialog.close(dialog.returnValue);
});

// Use event delegation to handle delete button clicks
tbody.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    const index = event.target.dataset.index;
    deleteBook(index);
  }
});

function insertContentInTable(arr) {
  // Clear the table before re-rendering
  tbody.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    const tr = tbody.insertRow();

    // Insert data cells
    const tdTitle = tr.insertCell();
    tdTitle.textContent = arr[i].title;

    const tdAuthor = tr.insertCell();
    tdAuthor.textContent = arr[i].author;

    const tdPages = tr.insertCell();
    tdPages.textContent = arr[i].pages;

    const tdRead = tr.insertCell();
    tdRead.textContent = arr[i].read;

    // Insert delete button cell
    const tdDelete = tr.insertCell();
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.index = i;
    tdDelete.appendChild(deleteButton);
    // insert  read button
    const tdToggle = tr.insertCell();
    const toggleButton = document.createElement("button");
    toggleButton.setAttribute("class", "toggle");
    toggleButton.textContent = "Toggle Read Status";
    toggleButton.dataset.index = i;
    tdToggle.appendChild(toggleButton);
  }
}

// Event delegation for toggle buttons
tbody.addEventListener("click", (event) => {
  if (event.target.classList.contains("toggle")) {
    const index = event.target.dataset.index;
    myLibrary[index].toggleReadStatus();
    insertContentInTable(myLibrary);
  }
});
