/*

    1. 자원을 공유해서 생기는 버그를 찾는 방법
    2. 안전하게 자원을 공유할 수 있는 자원 공유 기본형을 만드는 방법 이해
    3. 동시성 기본형(concurrency primitive

*/

//타임라인이 전역변수를 공유하면 문제가 될 수 있는데 왜 전역변수 라이브러리를 쓰는걸까?

//js에서 큐 만들기 - 클릭 핸들러와 큐 워커 분리

//old
function add_item_to_cart_(item) {
    cart = add_item(cart, item);
    calc_cart_total(cart, update_total_dom);
}

function calc_cart_total_(cart, callback) {
    var total = 0;
    cost_ajax(cart, function (cost) {
        total += cost;
        shipping_ajax(cart, function (shipping) {
            total += shipping;
            callback(total);
        })
    })
}

//new
function add_item_to_cart(item) {
    cart = add_item(cart, item);
    update_total_queue(cart);
}

function calc_cart_total(cart, callback) {
    var total = 0;
    cost_ajax(cart, function (cost) {
        total += cost;
        shipping_ajax(cart, function (shipping) {
            total += shipping;
            callback(total);
        })
    })
}

var queue_items = [];

function update_total_queue(cart) {
    queue_items.push(cart)
}

// 비동기 작업 반복 구조

var queue_items = [];
var working = false;

function runNext() {
    if (working)
        return;

    working = true;
    var cart = queue_items.shift()
    calc_cart_total(cart, function (total) {
        update_total_dom(total);
        working = false;
        runNext();
    })
}

function update_total_queue(cart) {
    queue_items.push(cart);
    setTimeout(runNext, 0)
}