console.log("HELLO WORLD")



const buyButtons = document.getElementsByClassName("rp_purchase");
const prodName = document.getElementsByClassName("productName");
const prices = document.getElementsByClassName("productPrice");

let formData = {};



for( let i=0; i<buyButtons.length; i++){
    buyButtons[i].addEventListener( "click", () => {
        formData["product_name"] = prodName[i].textContent;
        formData["price"] = prices[i].textContent;
        console.log(`name = ${prodName[i].textContent} | price = ${prices[i].textContent}`);
        console.table(formData);


        fetch("/payment/orders-paypal/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then( (response) => {
                return response.json();
            })
            .then( (data) => {
                console.log(data);
            })
            .catch( (error) => {
                console.error("Error:", error);
            });
    });
}
