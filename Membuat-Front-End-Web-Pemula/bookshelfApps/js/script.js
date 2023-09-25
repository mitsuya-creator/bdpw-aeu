window.addEventListener("load", function () {
    if (typeof (Storage) === "undefined") {
        this.alert("Browser yang anda gunakan tidak mendukung Web storage")
        body.classList.add("d-none");
    } else {
        const submitForm = document.getElementById("add-button");
        submitForm.addEventListener("click", function (e) {
            e.preventDefault();
            console.log(titleBook.value, writer.value, yearBooks.value, isRead.checked)
            console.log("submit")
        })
    }
})

let titleBook, writer, yearBooks, isRead;
titleBook = document.getElementById("judul");
writer = document.getElementById("penulis");
yearBooks = document.getElementById("tahun");
isRead = document.getElementById("dibaca");


// const addButton = document.getElementById("add-button");
// addButton.addEventListener("click", function (e) {
//     e.preventDefault();
//     let titleBook = document.getElementById("judul");
//     let writerBook = document.getElementById("penulis");
//     let yearBooks = document.getElementById("tahun");
//     let isRead = document.getElementById("dibaca");
//     checkField(titleBook, writerBook, yearBooks);
//     let id = +new Date();
//     let book = addBook(id, titleBook.value, writerBook.value, yearBooks.value, isRead.checked)
//     for (let content in book) {
//         if (book[content] === "") {
//             alert(`Silakan isi kolom ${content}`)
//             return;
//         }
//     }
//     listBooks.push(book);
//     listBooks.forEach(content => createCard(content.judul, content.penulis, content.tahun, content.isRead));
//     resetValue(titleBook, writerBook, yearBooks, isRead)
//     console.log(listBooks)

// })
// function resetValue(...param) {
//     for (let element of param) {
//         if (element.getAttribute("type") == "checkbox") {
//             element.checked = false;
//         } else {
//             element.value = "";
//         }
//     }
// }
// function checkField(...param) {
//     for (let element of param) {
//         if (element.value == "") {
//             element.classList.add("border-danger");
//         } else {
//             element.classList.remove("border-danger");
//         }
//     }
// }
// function generateBook(id, judul, penulis, tahun, isRead) {
//     return {
//         id, judul, penulis, tahun, isRead
//     }
// }

// function createCard(titleBook, writer, year, isRead) {
//     let cardBook = document.createElement("div");
//     cardBook.classList.add("card-book");
//     cardBook.innerHTML = `<h2>${titleBook}</h2>
//                         <div class="details">
//                             <span>${writer}</span>
//                             <span>${year}</span>
//                         </div>`;
//     let containerButtonAction = document.createElement("div");
//     containerButtonAction.classList.add("container-button-actions");
//     let isReadSpan;
//     if (isRead === true) {
//         isReadSpan = "Belum dibaca";
//     } else {
//         isReadSpan = "Sudah dibaca";
//     }
//     containerButtonAction.innerHTML = `<button type="button" class="btn-succes">${isReadSpan}</button>
//                             <button type="button" class="btn-danger">Hapus buku</button>`;
//     cardBook.appendChild(containerButtonAction);
//     if (isRead === true) {
//         let listRead = document.getElementById("list-read");
//         listRead.appendChild(cardBook);
//     } else {
//         let listUnRead = document.getElementById("list-unread");
//         listUnRead.appendChild(cardBook)
//     }

// }
const listBooks = [];
