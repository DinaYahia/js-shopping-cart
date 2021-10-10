const Cart = require("./services/cart");

let items = []
let totlaAmount = 0
let found

Cart.list().then(response => {
    let data = response.data;
    let table = document.querySelector('#productlist')
    for (let item of data){
        table.innerHTML += `<tr data-id="${item.id}" style="border-style: solid; border-width: 2px; margin:10px">
            <td>${item.id}</td>
            <td data-image><img src="${item.image}" width="150" height="150"/></td>
            <td data-info>
                <div>
                    <h3>${item.title}</h3>
                    <p style="font-size: 14px">${item.description}</p>
                    <h6>${item.price} $</h6>
                    <button data-id="${item.id}" oneitem="${item}" price="${item.price}" title="${item.title}" class="btn btn-sm btn-success">Add to Cart</button>
                </div>
            </td>
        </tr>`
    }
    addToCartListener()
})

function addToCartListener() {
    found = false
    let btns = document.querySelectorAll('button.btn-success')
    btns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            let id = e.target.getAttribute('data-id')
            // console.log('come id', id);
            let price = e.target.getAttribute('price')
            let title = e.target.getAttribute('title')

            if (items.length == 0){
                items.push({id:id, price:price, title:title,amount:1})
            }
            else{
                for(var i=0; i<items.length; i++) {
                    // console.log(items[i].id == id , items[i].id , id);
                    if(items[i].id == id) {
                        found = true
                        items[i].amount+=1
                        break;
                    }else{
                        found = false
                    }
                }
                // console.log(found , 'found');
                if(!found){
                    items.push({id:id, price:price, title:title,amount:1})
                }
            }
            totalPrice()
            represent()
        })
    })
}

window.remove = function(idx, price) {
    items.forEach((item,id) => {
        if (item.id == idx) {
            items.splice(id, 1);
            totalPrice()
        }
    })
    document.querySelector(`#cartlist tr[data-id= "${idx}"]`).remove()
}

function totalPrice(){
    totlaAmount=0
    items.forEach((item,id) => {
        totlaAmount+=(parseFloat(item.price)*parseFloat(item.amount))
    })
    document.querySelector('#cartTotal').innerHTML = `${totlaAmount} $`
}

function represent(){
    // console.log(items.length , 'length to present');
    let ctable = document.querySelector('#cartlist')
    ctable.innerHTML = ""

    for (let item of items){
        ctable.innerHTML += 
            `<tr data-id="${item.id}">
                <td data-info>
                    <p style="font-size: 15px;">${item.title}</p>
                </td>
                <td data-info>
                    <p>${item.price}</p>                   
                </td>
                <td data-info-amount>
                    <p>${item.amount}</p>                   
                </td>
                <td data-info>
                    <button data-id="${item.id}" price="${item.price}" 
                        title="${item.title} class="btn btn-sm btn-danger"
                        style="background-color:red;border:0px" 
                        onclick="remove(${item.id},${item.price})"
                    >
                        Remove
                    </button>
                </td>
            </tr>`
    }
}