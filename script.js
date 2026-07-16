const myLibrary = [];
const container = document.getElementById("container")

function Book(id, title, author, pages, read) {
    this.id = id
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
    this.info = function() {
        let readInfo = this.read ? "read already" : "not read yet"
        return `${this.title} 
        by ${this.author}
        ${this.pages} pages
        ${readInfo}`
    }
}

Book.prototype.readToggle = function() {
    this.read = this.read === true ? false : true;
}

function addDeleteButton() {
    
}

function displayBook(book) {
    const card = document.createElement("div")
    card.className = "card"

    const title = document.createElement("p")
    title.className = "title"
    title.textContent = book.title

    const author = document.createElement("p")
    author.className = "author"
    author.textContent = `by ${book.author}`

    const pages = document.createElement("p")
    pages.className = "pages"
    pages.textContent = `${book.pages} pages`

    const read = document.createElement("p")
    read.className = "read"
    read.textContent = book.read ? "Read Already" : "Not Read Yet"

    const deleteDiv = document.createElement("div")
    deleteDiv.className = "card-delete"
    const deleteBtn = document.createElement("button")
    deleteBtn.className = "delete"
    deleteBtn.dataset.id = book.id
    deleteDiv.appendChild(deleteBtn)

    const changeReadBtn = document.createElement("button")
    changeReadBtn.className = "change-read"
    changeReadBtn.dataset.id = book.id
    changeReadBtn.textContent = book.read === true ? "Change to not read" : "Change to read"

    card.appendChild(deleteDiv)
    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
    card.appendChild(read)
    card.appendChild(changeReadBtn)
    container.appendChild(card)
}

function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID()
    const newBook = new Book(id, title, author, pages, read);
    myLibrary.push(newBook);
    displayBook(newBook)
}

function displayAllBooks() {
    for (const book of myLibrary) {
        displayBook(book)
    }
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 400, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 300, false);
addBookToLibrary("1984", "George Orwell", 570, true);

const addBtn = document.getElementById("add")
const dialog = document.getElementById("dialog-form");
const form = document.querySelector("form")
const inputs = form.querySelectorAll("input");
const radioBtns = form.querySelector(".checkboxes")
const radios = document.querySelectorAll('input[name="read-status"]');

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
        inputs.forEach((input) => {
            if (!input.checkValidity()) {
                input.style.border = "2px solid red"
            } 
        });
    
        const radioSelected = [...radios].some(radio => radio.checked);
        if (!radioSelected) {
            radioBtns.style.border = "2px solid red"
        }
        return;
    }
    const formData = new FormData(form);
    const title = formData.get("form-title")
    const author = formData.get("form-author")
    const pages = formData.get("form-pages")
    const read = formData.get("read-status")
    addBookToLibrary(title, author, pages, read === 'read' ? true : false)
    dialog.close()
    form.reset(); 
})

container.addEventListener('click', (event) => {
    if (event.target.classList.contains("delete")) {
        const button = event.target;
        const index = myLibrary.findIndex(book => book.id === button.dataset.id);
        myLibrary.splice(index, 1);
        button.closest(".card").remove()
    }
})

const cancel = document.querySelector("#cancel");
cancel.addEventListener("click", () => {
    inputs.forEach((input) => {
        input.style.border = "1px solid black"
    })
    radioBtns.style.border = "none"
    dialog.close();
    form.reset(); 
});

container.addEventListener('click', (event) => {
    if (event.target.classList.contains("change-read")) {
        const button = event.target;
        const changeBook = myLibrary.find(book => book.id === button.dataset.id);
        changeBook.read = changeBook.read === true ? false : true 
        const card = button.closest(".card");
        const readText = card.querySelector(".read");
        readText.textContent = changeBook.read ? "Read Already" : "Not Read Yet";
        button.textContent = changeBook.read === true ? "Change to not read" : "Change to read"
    }
})


 


