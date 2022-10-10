function setPriceByName(cart, name, price) {
    var item = cart(name);
    var newItem = ObjectSet(item, 'price', price);
    var newCart = ObjectSet(cart, name, newItem);
    return newCart
}

function setQuantityByName(cart, name, price) {
    var item = cart(name);
    var newItem = ObjectSet(item, 'quantity', price);
    var newCart = ObjectSet(cart, name, newItem);
    return newCart
}
/*
 'price' , 'quantity 와 같이 특정 문자열만 다른 함수( ** 암묵적 인자 가 존재하는)는
 1. 함수 구현이 거의 똑같고
 2. 함수 이름이 구현의 차이를 만들는 특징을 보이므로 지양해야 합니다.
*/

// 암묵적 인자를 드러내기

function setPriceByName(cart, name, price) {
    var item = cart(name);
    var newItem = ObjectSet(item, 'price', price);
    var newCart = ObjectSet(cart, name, newItem);
    return newCart
}

// == > 

function setFieldByName(cart, name, field, value/* 원래 인자는 일반적인 이름으로 바꿉니다*/)
var newItem = ObjectSet(item, field, value);
var newCart = ObjectSet(item, name, newItem);

//연습문제

function multiplyByFour(x) {
    return x * 4;
}

function multiplyByPi(x) {
    return x * 3.14159;
}

// 위 두 함수의 암묵적 인자를 드러내 보시오
function multipleSomething(value, someNumber) {
    return someNumber * value
}
/*
ps 정적타입 vs 동적 타입            
정적 타입 : 컴파일 할 때 타입을 검사하는 언어
동적 타입 : 런타임에 타입을 확인하는 언어
JS 는 동적 타입임.
*/


//익명함수
for (var i = 0; i < foods.length; i++) {
    var dish = foods[i]
    cook(food)
    eat(food)
}

// == >

forEach(foods, function (food) /* 익명함수 */ {
    cook(food)
    eat(food)
})

// 함수 본문을 콜백으로 바꾸기

function withLogging() {
    try {
        saveUserData(user)
    } catch (err) {
        logToSnapErrors(error);
    }
}

withLogging()

// == >
function withLogging(f) {
    try {
        f()  /* 원래 본문이 있던 곳에서 인자르 받은 함수를 호출 합니다 */
    } catch (err) {
        logToSnapErrors(err)
    }
}

withLogging(function () { /* 본문을 전달합니다 */
    saveUserData(user); /* 한 줄짜리 익명함수 */
})

/*  
1. 본문과 본문의 앞부분과 뒷부분을 구분
2. 전체를 함수로 빼냄
3. 본문 부분을 빼낸 함수의 인자로 전달한 함수로 바꾼다.
*/


// 인라인 함수 ==> (쓰는 곳에서 바로 정의하는 함수)
function someFunction() {
    var saveCurrentuserData = function () {
        saveUserData(user);
    }
    withLogging(saveCurrentuserData)
    /* ==>
    withLogging(function() { saveCurrentuserData(user)})
    */

}

withLogging(function () { saveCurrentuserData(user) }) // 인라인 함수 


// 실행 조건
withLogging(
    function () {
        saveCurrentuserData(user);
    } // 함수 호출 전까지 실행 안됨
)