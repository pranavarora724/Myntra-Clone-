console.log("Inside BagScript");
let bagItemsObject;

onLoad();

function onLoad(){
    initializeBagItems();
    define_bagItemsObject();
    display_bag_items();
}

function initializeBagItems(){
    let bagItemsObjectStr = localStorage.getItem("bagItemsObject");

    if(bagItemsObjectStr == undefined)
    {
        bagItemsObject = [];
    }
    else{
        bagItemsObject = JSON.parse(bagItemsObjectStr);
    }
}

function define_bagItemsObject(){

    bagItemsObject = bagItems.map((itemId) =>{
        for(let i = 0;i<items.length;i++)
        {
            if(itemId == items[i].id)
            return items[i];
        }
    });

    bagItemsObjectStr = JSON.stringify(bagItemsObject);
    localStorage.setItem("bagItemsObject",bagItemsObjectStr);
}

function display_bag_items()
{
    let bag_items_container = document.querySelector(".bag_items_container");
    bag_items_container.innerHTML = ``;
    let TotalMRP = 0;
      let DiscountOnMRP = 0;
      let TotalAmount = 0;
      let ind= 0;
    bagItemsObject.forEach((bagItem)=>{
        bag_items_container.innerHTML = bag_items_container.innerHTML + 
      `
      <div class="bag_item_container">
                <div class="bag_item_photo_container">
                    <img class="bag_item_photo" src="${bagItem.image}" alt="">
                </div>
                <div class="bag_item_content">
                    <!-- <div class="item_rating">4.5⭐ | 1k</div> -->
                    <span class="item_company">${bagItem.company}</span>
                    <div class="item_name">${bagItem.item_name}</div>
                    <div class="item_price">
                        <span class="discounted_price">Rs ${bagItem.current_price}</span>
                        <span class="original_price">${bagItem.original_price}</span>
                        <span class="discount">${bagItem.discounted_price}% off</span>
                    </div>

                    <div class="return_available"><strong>14 days </strong> return available</div>
                    <div>Delivery by  <span class="delivery_date"><strong>12th Feb 2024</strong></span></div>
                    <a class="crossbtn" onclick="removeFromBag(${ind})">X</a>

                </div>
            </div>

      `; 
      TotalMRP = TotalMRP + Number(bagItem.original_price);
      TotalAmount = TotalAmount + Number(bagItem.current_price);
      
     ind++; 
    });
    DiscountOnMRP = TotalMRP - TotalAmount;
    TotalAmount = TotalAmount + 99;

    let total_MRP = document.querySelector(".total_MRP");
    let discount_on_MRP = document.querySelector(".discount_on_MRP");
    let total_amount = document.querySelector(".total_amount");

    total_MRP.innerText = `Rs ${TotalMRP}`;
    discount_on_MRP.innerText = `Rs ${DiscountOnMRP}`;
    total_amount.innerText = `Rs ${TotalAmount}`;
}

function removeFromBag(ind){
  bagItems.splice(ind , 1);
  bagItemsObject.splice(ind , 1);

  localStorage.setItem("bagItems" , JSON.stringify(bagItems));
  localStorage.setItem("bagItemsObject" , JSON.stringify(bagItemsObject));

  display_bag_items();
}