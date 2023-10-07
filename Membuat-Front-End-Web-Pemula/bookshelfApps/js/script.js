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
        document.dispatchEvent(RENDER_EVENT);

    }
    addBook();
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

function stateBook(id) {
    let update = listBooks.map(book => {
        if (book.id == id) {
            return { ...book, isComplete: !book.isComplete }
        } else {
            return book;
        }
    })
    listBooks = update;
    localStorage.setItem("listBooks", JSON.stringify(listBooks));
    return listBooks;
}
function removeBtn(id) {
    let ask;
    listBooks.forEach(book => {
        if (book.id == id) {
            ask = confirm(`Hapus buku "${book.title}" ?`);
        }
        if (ask) {
            let update = listBooks.filter(book => book.id != id)
            listBooks = update;
            localStorage.setItem("listBooks", JSON.stringify(listBooks));
            Toastify({
                text: `Menghapus "${book.title}"`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "rgb(84, 186, 185)",
                    textAlign: "center",
                }
            }).showToast();
            ask = false;
            return listBooks;
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
            localStorage.setItem("listBooks", JSON.stringify(listBooks));
            Toastify({
                text: `Menambahkan "${titleBook.value}"`,
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "rgb(84, 186, 185)",
                    textAlign: "center",
                }
            }).showToast();
        }
        resetValue(titleBook, writer, isRead, yearBooks);
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

function createCard(id, titleBook, writer, year, isRead) {
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
    containerButtonAction.innerHTML = `<button type="button" class="btn-succes" key=${id}>${isReadSpan}</button>
                            <button type="button" class="btn-danger" key=${id}>Hapus buku</button>`;
    cardBook.appendChild(containerButtonAction);
    return cardBook;
}

const searchBox = document.getElementById("search-box");
const containerShelfBooks = document.getElementById("content");
const searchResult = document.getElementById("search-result");
const searchIcon = document.getElementById("search-icon");
let keyword = "";
function backHome() {
    searchResult.classList.add("d-none");
    containerShelfBooks.classList.remove("d-none")
    searchBox.value = "";
    keyword = "";
}
searchBox.addEventListener("input", function (e) {
    keyword = e.target.value;
})
searchBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchResult.innerHTML = "";
        searchResult.classList.remove("d-none");
        containerShelfBooks.classList.add("d-none");
        document.dispatchEvent(RENDER_EVENT);
    }
})
searchIcon.addEventListener("click", function () {
    if (keyword != "") {
        searchResult.innerHTML = "";
        searchResult.classList.remove("d-none");
        containerShelfBooks.classList.add("d-none");
        document.dispatchEvent(RENDER_EVENT);
    }
})
const RENDER_EVENT = new Event("RENDER_EVENT");
document.addEventListener("RENDER_EVENT", function () {
    if (listUnRead.hasChildNodes()) listUnRead.innerHTML = "";
    if (listRead.hasChildNodes()) listRead.innerHTML = "";
    searchResult.innerHTML = "";
    let todoElement;
    let skip = false;
    listBooks.forEach(content => {
        if (content.isComplete) {
            todoElement = createCard(content.id, content.title, content.author, content.year, content.isComplete);
            listRead.append(todoElement);
        } else {
            todoElement = createCard(content.id, content.title, content.author, content.year, content.isComplete);
            listUnRead.append(todoElement);
        }
        if (skip) return;
        if (content.title.toLowerCase() === keyword.toLowerCase() && keyword !== "") {
            searchResult.innerHTML = "";
            todoElement = createCard(content.id, content.title, content.author, content.year, content.isComplete);
            searchResult.append(todoElement);
            let btnBack = document.createElement("p");
            btnBack.classList.add("flex-justify-center");
            btnBack.innerHTML = "<button type='button' onclick='backHome()'>Kembali</button>";
            searchResult.append(btnBack);
            skip = true;
            return skip
        } else {
            searchResult.innerHTML = `<div class='no-result'><span>Buku "${keyword}" yang kamu cari tidak ada</span><button type='button' onclick="backHome()">Kembali</button></div>`;
        }
    })
    if (listBooks.length == 0) {
        searchResult.innerHTML = `<div class='no-result'><span>Buku "${keyword}" yang kamu cari tidak ada</span><button type='button' onclick="backHome()">Kembali</button></div>`;
    }
    document.querySelectorAll(".btn-succes").forEach(btn => btn.addEventListener("click", function () {
        let id = btn.getAttribute("key");
        stateBook(id);
        document.dispatchEvent(RENDER_EVENT);
    }))
    document.querySelectorAll(".btn-danger").forEach(btn => btn.addEventListener("click", function () {
        let id = btn.getAttribute("key");
        removeBtn(id);
        document.dispatchEvent(RENDER_EVENT);
    }))
    if (listUnRead.hasChildNodes() === false) listUnRead.innerHTML = "<span class='no-book'>Tidak ada buku disini</span>";
    if (listRead.hasChildNodes() === false) listRead.innerHTML = "<span class='no-book'>Tidak ada buku disini</span>";
})