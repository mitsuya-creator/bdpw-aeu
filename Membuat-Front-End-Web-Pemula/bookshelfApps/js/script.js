window.addEventListener("load", function () {
    if (typeof (Storage) === "undefined") {
        this.alert("Browser yang anda gunakan tidak mendukung Web storage")
        body.classList.add("d-none");
    }
})

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", function (e) {
    e.preventDefault();
    let titleBook = document.getElementById("judul");
    let writerBook = document.getElementById("penulis");
    let yearBooks = document.getElementById("tahun");
    let isRead = document.getElementById("dibaca");
    checkField(titleBook, writerBook, yearBooks);
    let id = +new Date();
    let book = addBook(id, titleBook.value, writerBook.value, yearBooks.value, isRead.checked)
    for (let content in book) {
        if (book[content] === "") {
            alert(`Silakan isi kolom ${content}`)
            return;
        }
    }
    listBooks.push(book);
    resetValue(titleBook, writerBook, yearBooks, isRead)
    console.log(listBooks)

})
function resetValue(...param) {
    for (let element of param) {
        if (element.getAttribute("type") == "checkbox") {
            element.checked = false;
        } else {
            element.value = "";
        }
    }
}
function checkField(...param) {
    for (let element of param) {
        if (element.value == "") {
            element.classList.add("border-danger");
        } else {
            element.classList.remove("border-danger");
        }
    }
}
function addBook(id, judul, penulis, tahun, isRead) {
    return {
        id, judul, penulis, tahun, isRead
    }
}
const listBooks = [];
const RENDER_BOOKS = "render-books";
