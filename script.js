let got = new Book("Game of Thrones", "George RR Martin", 300, true);
let container = document.getElementById("container");
const addBook = document.getElementById("add-book");
const addBookModal = document.getElementById("modal");
const submitBook = document.getElementById("submit-book");

let myLibrary = [got];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
  createBookCard(book);
}

function createBookCard(e) {
  let card = document.createElement("div");
  card.className = "card";
  const author = document.createElement("h3");
  const authorTextNode = document.createTextNode(e.author);
  author.appendChild(authorTextNode);

  const title = document.createElement("h3");
  const titleTextNode = document.createTextNode(e.title);
  title.appendChild(titleTextNode);

  const pages = document.createElement("h3");
  const pagesTextNode = document.createTextNode(e.pages + " pages");
  pages.appendChild(pagesTextNode);

  const read = document.createElement("button");
  const readTextNode = document.createTextNode("Read");
  read.className = "read-button";
  read.appendChild(readTextNode);

  read.addEventListener("click", (e) => {
    const index = myLibrary.findIndex(
      (book) =>
        book.author == e.path[1].childNodes[0].innerHTML &&
        book.title == e.path[1].childNodes[1].innerHTML
    );
    myLibrary[index].read = !myLibrary[index].read;
    myLibrary[index].read
      ? (read.textContent = "Read")
      : (read.textContent = "Not Read");
  });

  const removeButton = document.createElement("button");
  const rBtnNode = document.createTextNode("Remove");
  removeButton.className = "remove-button";
  removeButton.appendChild(rBtnNode);

  removeButton.addEventListener("click", (e) => {
    //author
    console.log(e.path[1].childNodes[0].innerHTML);
    //title
    console.log(e.path[1].childNodes[1].innerHTML);
    //path[1].childNodes[0].innerHTML
    const index = myLibrary.findIndex(
      (book) =>
        book.author == e.path[1].childNodes[0].innerHTML &&
        book.title == e.path[1].childNodes[1].innerHTML
    );
    // console.log(e.path[1]);
    e.path[1].remove();
    console.log(index);
    myLibrary.splice(index, 1);
    console.log(myLibrary);
  });

  card.appendChild(author);
  card.appendChild(title);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(removeButton);
  container.appendChild(card);
}

function displayBooks() {
  myLibrary.forEach((e) => {
    createBookCard(e);
  });
}

addBook.addEventListener("click", () => {
  addBookModal.style.display = "flex";
});

document.getElementById("book-form").addEventListener("submit", (e) => {
  // e.preventDefault();
  const temp = new Book(
    document.getElementById("author").value,
    document.getElementById("title").value,
    document.getElementById("pages").value,
    false
  );
  addBookToLibrary(temp);
  addBookModal.style.display = "none";
});

displayBooks();
console.log(myLibrary);
