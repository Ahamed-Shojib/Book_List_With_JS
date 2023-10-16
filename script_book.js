//Add event Listener
document.getElementById('ty').addEventListener('submit',addbook);
document.getElementById('book_list').addEventListener('click',removeBook);


//Create class
class book{
    constructor(title,author,icn){
        this.book = title;
        this.author = author;
        this.icn = icn;
    }
}
class UI{
    constructor(){

    }
    addtotable(book){
        let tbody = document.getElementById('book_list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.book}</td>
        <td>${book.author}</td>
        <td>${book.icn}</td>
        <td><a href='#' class="text-decoration-none text-danger">X</a></td>`
        tbody.appendChild(row);
        
    }
    clearfield(){
        document.getElementById('book_name').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isc').value = "";
    }

    showAlert(mess,erreoClass){
        let DIV = document.createElement('div');
        DIV.className = `alert ${erreoClass}`;
        DIV.appendChild(document.createTextNode(mess));
        let container = document.querySelector('.container');
        let form = document.getElementById('ty');
        container.insertBefore(DIV,form);

        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3300);
    }
    removeFromBook(e){
        if(e.hasAttribute('href')){
            let ui = new UI();
            e.parentElement.parentElement.remove();
            storage.removeFromStorage(e.parentElement.previousElementSibling.textContent.trim());
            ui.showAlert("Book Successfully Removed","success");
        }
    }

}

//Local Storage...................

class storage{
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addbook(book){
        let books = storage.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static displaybook(){
        let books = storage.getBook();

        books.forEach(book => {
            let ui = new UI()
            ui.addtotable(book);
        });
    }
    static removeFromStorage(icn){
        let books = storage.getBook();
        books.forEach((book,index)=>{
            if(book.icn === icn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

function addbook(e){
    let title = document.getElementById('book_name').value,
    author = document.getElementById('author').value,
    icn = document.getElementById('isc').value;
    let ui = new UI();
    if(title === '' || author === '' || icn === ''){
        ui.showAlert("Empty Fill Decteded!","error");
    }else{
        let book_list = new book(title,author,icn);
        ui.addtotable(book_list);
        ui.showAlert("Congratulation! Book Added","success");
        ui.clearfield();
        storage.addbook(book_list);
    }
}

function removeBook(e){
    let ui = new UI();
    ui.removeFromBook(e.target);
}

document.addEventListener('DOMContentLoaded', storage.displaybook);