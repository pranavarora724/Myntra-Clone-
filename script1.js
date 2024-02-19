let bagItems ;

onLoad();

function onLoad(){
    letItem();
    display_Items();
}

function letItem(){
    let bagItemsString = localStorage.getItem("bagItems");
if(bagItemsString == undefined)
{
    bagItems = [];
}
else{
    bagItems = JSON.parse(bagItemsString);
}
}


function display_Items(){
console.log("Iside function");
    // console.log(items);

    let items_container = document.querySelector(".items_container");

    // If we inerit script1.js iside another page 
    // That page will not have items_container 
    // So put this condition check
    
     if(items_container == null)
    {
        return ; 
    }

    items_container.innerHTML = ``;
    items.forEach((item)=>
    {
        items_container.innerHTML = items_container.innerHTML + 
        `
        <div class="item_container">
            <div class="image_container">
                <img class="item_image" src="${item.image}" alt="">
            </div>
            <div class="item_rating">${item.rating.stars}⭐ | ${item.rating.count}</div>
            <div class="item_company">${item.company}</div>
            <div class="item_name">${item.item_name}
            </div>
            <div class="item_price">
                <span class="discounted_price">${item.current_price}</span>
                <span class="original_price">${item.original_price}</span>
                <span class="discount">${item.discounted_price}% off</span>
            </div>
            <button class="add_to_bag" onclick="add_to_bag(${item.id})" >Add To Bag</button>
        </div>
        `;
    });
}

function add_to_bag(itemID){
    console.log(itemID);
    let addbtn = document.querySelector(".add_to_bag");
    
    bagItems.push(itemID);
    let bagstr = JSON.stringify(bagItems);
    localStorage.setItem("bagItems" , bagstr);
    console.log(bagItems);

    
}