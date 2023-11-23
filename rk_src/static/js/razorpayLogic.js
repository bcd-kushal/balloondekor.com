// var options = {
//     "key": "",
//     "amount": "",
//     "currency": "INR",
//     "name": "RK Group",
//     "description": "test payment",
//     "order_id": "",
//     "handler": function(response){
//         alert(response.razorpay_payment_id);
//         alert(response.razorpay_order_id);
//         alert(response.razorpay_signature);
//     },
//     "theme": {
//         "color": "#99cc33"
//     }
// };

// var rzp1 = new Razorpay(options);
// rzp1.on( "payment.failed", (res) => {
//     alert(res.error.code);
//     alert(res.error.description);
//     alert(res.error.source);
//     alert(res.error.step);
//     alert(res.error.reason);
//     alert(res.error.metadata.order_id);
//     alert(res.error.metadata.payment_id);    
// });

// document.getElementById("rzp-button1").addEventListener("click", ( e ) => {
//     rzp1.open();
//     e.preventDefault();
// })