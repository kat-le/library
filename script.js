function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readInfo = this.read ? "read already" : "not read yet"
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readInfo}`
    }
}

const book = new Book("The Hobbit", "J.R.R Tolkien", 295, true);
console.log(book.info());