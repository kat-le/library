const myLibrary = [];
const container = document.getElementById("container")

const themes = [
    {
        cover: "#ead6ff",
        border: "#a051f5",
        spineLight: "#c491fb",
        spineDark: "#be85fc"
    },
    {
        cover: "#d6e9ffff",
        border: "#5193f5ff",
        spineLight: "#91c4fbff",
        spineDark: "#85a7fcff" 
    },
     {
        cover: "#ffd6f3ff",
        border: "#f551a6ff",
        spineLight: "#fb91d9ff",
        spineDark: "#fc85ceff"
    },
     {
        cover: "#fff5d6ff",
        border: "#f5d751ff",
        spineLight: "#fbe991ff",
        spineDark: "#fce685ff"
    },
]

function Book(id, title, author, pages, read) {
    this.id = id
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
    this.info = function() {
        let readInfo = this.read ? "read" : "not read"
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readInfo}`
    }
}

Book.prototype.readToggle = function() {
    this.read = this.read === true ? false : true;
}

Book.prototype.getRead = function() {
    return this.read;
}

let themeIndex = 0;
function displayBook(book) {
    const theme = themes[themeIndex];
    themeIndex = (themeIndex + 1) % themes.length;

    const card = document.createElement("div")
    card.className = "card"
    card.style.setProperty("--cover", theme.cover)
    card.style.setProperty("--border", theme.border);
    card.style.setProperty("--spine-light", theme.spineLight);
    card.style.setProperty("--spine-dark", theme.spineDark);

    const title = document.createElement("p")
    title.className = "title"
    title.textContent = book.title

    const author = document.createElement("p")
    author.className = "author"
    author.textContent = `by ${book.author}`

    const pages = document.createElement("p")
    pages.className = "pages"
    pages.textContent = `${book.pages} pages`

    const deleteDiv = document.createElement("div")
    deleteDiv.className = "card-delete"
    const deleteBtn = document.createElement("button")
    deleteBtn.className = "delete"
    deleteBtn.dataset.id = book.id
    deleteDiv.appendChild(deleteBtn)

    const changeReadBtn = document.createElement("button")
    const readStatus = book.getRead();
    changeReadBtn.className = "change-read"
    changeReadBtn.dataset.id = book.id
    changeReadBtn.textContent = readStatus === true ? "Read" : "Not Read Yet"
    changeReadBtn.style.backgroundColor = readStatus === true  ? "#a6d053ff" : "#d96e6cff"
    changeReadBtn.style.border = readStatus === true  ? "3px solid #659505ff" : "3px solid #bd110eff"
    changeReadBtn.style.color = readStatus === true  ? "#659505ff" : "#bd110eff"

    const bookmark = document.createElement("div")
    bookmark.className = "bookmark"
    bookmark.dataset.id = book.id
    bookmark.style.backgroundColor = readStatus === true  ? "#a6d053ff" : "#d96e6cff"

    card.appendChild(deleteDiv)
    card.appendChild(bookmark)
    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
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
            radioBtns.style.borderRadius = "20px"
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
        input.style.border = "none"
    })
    radioBtns.style.border = "none"
    dialog.close();
    form.reset(); 
});


container.addEventListener('click', (event) => {
    if (event.target.classList.contains("change-read")) {
        const button = event.target;
        const changeBook = myLibrary.find(book => book.id === button.dataset.id);

        changeBook.readToggle();

        const readStatus = changeBook.getRead();
        button.textContent = readStatus === true ? "Read" : "Not Read Yet"
        button.style.backgroundColor = readStatus === true ? "#a6d053ff" : "#d96e6cff"
        button.style.border = readStatus === true ? "3px solid #89ba28ff" : "3px solid #c63330ff"
        button.style.color = readStatus === true  ? "#659505ff" : "#bd110eff"


        const bookmark = document.querySelector(
            `.bookmark[data-id="${changeBook.id}"]`
        );
        bookmark.style.backgroundColor = readStatus === true ? "#a6d053ff" : "#d96e6cff"
    }
})


 


