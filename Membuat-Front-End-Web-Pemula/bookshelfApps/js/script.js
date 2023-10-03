let listBooks = [];
window.onload = () => {
    if (typeof (Storage) === "undefined") {
        this.alert("Browser yang anda gunakan tidak mendukung Web storage")
        body.classList.add("d-none")
        return false;
    }
    if (localStorage.getItem("listBooks") !== null) {
        listBooks = localStorage.getItem("listBooks");
        listBooks = JSON.parse(listBooks);
        loadFromLocalStorage(listBooks);
    }
    addBook();
    document.dispatchEvent(RENDER_EVENT);
}
const btnRead = document.getElementById("read");
const btnUnRead = document.getElementById("unread");
const listRead = document.getElementById("list-read");
const listUnRead = document.getElementById("list-unread");
btnRead.addEventListener("click", function () {
    if (listRead.classList.contains("d-none")) {
        listRead.classList.remove("d-none");
        listUnRead.classList.add("d-none");
    }
    if (btnUnRead.classList.contains("active")) {
        btnUnRead.classList.remove("active");
        btnRead.classList.add("active");
    }
})
btnUnRead.addEventListener("click", function () {
    if (listUnRead.classList.contains("d-none")) {
        listUnRead.classList.remove("d-none");
        listRead.classList.add("d-none");
    }
    if (btnRead.classList.contains("active")) {
        btnRead.classList.remove("active");
        btnUnRead.classList.add("active");
    }
})

function loadFromLocalStorage(listBooks) {
    if (listUnRead.hasChildNodes()) listUnRead.innerHTML = "";
    if (listRead.hasChildNodes()) listRead.innerHTML = "";
    let todoElement;
    listBooks.forEach(content => {
        if (content.isComplete) {
            todoElement = createCard(content.title, content.author, content.year, content.isComplete);
            listRead.append(todoElement);
        } else {
            todoElement = createCard(content.title, content.author, content.year, content.isComplete);
            listUnRead.append(todoElement);
        }
    })
}
function addBook() {
    const submitForm = document.getElementById("add-button");
    submitForm.addEventListener("click", function (e) {
        e.preventDefault();
        let checkForm = checkField(titleBook, writer, yearBooks);
        if (checkForm?.num == -1) {
            alert(`Silahkan isi kolom ${checkForm.el}`)
            return false;
        } else {
            let id = +new Date();
            let yearBooksInt = parseInt(yearBooks.value);
            let book = generateBook(id, titleBook.value, writer.value, yearBooksInt, isRead.checked);
            listBooks.push(book);
            let objToStr = JSON.stringify(listBooks);
            localStorage.setItem("listBooks", objToStr);
        }
        resetValue(titleBook, writer, isRead, yearBooks);
        if (listUnRead.hasChildNodes()) listUnRead.innerHTML = "";
        if (listRead.hasChildNodes()) listRead.innerHTML = "";
        let todoElement;
        listBooks.forEach(content => {
            if (content.isComplete) {
                todoElement = createCard(content.title, content.author, content.year, content.isComplete);
                listRead.append(todoElement);
            } else {
                todoElement = createCard(content.title, content.author, content.year, content.isComplete);
                listUnRead.append(todoElement);
            }
        })
        document.dispatchEvent(RENDER_EVENT);
    })
}
let titleBook, writer, yearBooks, isRead;
titleBook = document.getElementById("judul");
writer = document.getElementById("penulis");
yearBooks = document.getElementById("tahun");
isRead = document.getElementById("dibaca");


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
    let result;
    for (let element of param) {
        if (element.value == "") {
            element.classList.add("border-danger");
            result = {
                num: -1,
                el: element.getAttribute("id")
            }
            return result;
        } else {
            element.classList?.contains("border-danger") && element.classList.remove("border-danger")
            result = {
                num: 1
            }
        }
    }
    return result;
}
function generateBook(id, title, author, year, isComplete) {
    return {
        id, title, author, year, isComplete
    }
}

function createCard(titleBook, writer, year, isRead) {
    let cardBook = document.createElement("div");
    cardBook.classList.add("card-book");
    cardBook.innerHTML = `<h2>${titleBook}</h2>
                        <div class="details">
                            <span>${writer}</span>
                            <span>${year}</span>
                        </div>`;
    let containerButtonAction = document.createElement("div");
    containerButtonAction.classList.add("container-button-actions");
    let isReadSpan;
    if (isRead === true) {
        isReadSpan = "Belum dibaca";
    } else {
        isReadSpan = "Sudah dibaca";
    }
    containerButtonAction.innerHTML = `<button type="button" class="btn-succes">${isReadSpan}</button>
                            <button type="button" class="btn-danger">Hapus buku</button>`;
    cardBook.appendChild(containerButtonAction);
    return cardBook;
}

const RENDER_EVENT = new Event("RENDER_EVENT");
window.addEventListener("RENDER_EVENT", function () {
    console.log(document.querySelectorAll(".btn-succes"));
})