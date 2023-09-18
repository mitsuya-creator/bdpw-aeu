const nameInput = document.getElementById("name");
const p = document.getElementById("left-char");
nameInput.addEventListener("input", () => {
    console.log("jumlah character diketik ", nameInput.value.length);
    console.log("sisa character ", nameInput.maxLength - nameInput.value.length);
    p.innerText = `sisa karakter input = ${nameInput.maxLength - nameInput.value.length}`;
    if ((nameInput.maxLength - nameInput.value.length) <= 2) {
        p.style.color = "red";
    } else {
        p.style.color = "black"
    }
})
nameInput.addEventListener("blur", () => {
    p.style.visibility = "hidden";
})
nameInput.addEventListener("focus", () => {
    p.style.visibility = "visible";
})