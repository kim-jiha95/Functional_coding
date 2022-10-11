// 함수 본문을 콜백으로 바꾸기

function arraySet(array, idx, value) {
    var copy = array.slice(); // 이 부분을 함수로 뺍니다.
    copy[idx] = value;
    return copy;
}

// ==> 본문을 함수로 빼주기 

function arraySet_(array, idx, value) {
    return withArrayCopy(array);
}


function withArrayCopy(array) {
    var copy = array.slice();
    copy[idx] = value; // 이부분을 콜백으로 뺍니다
    return copy
}

// ==> 본문을 콜백으로 빼주기
function arraySet__(array, idx, value) {
    return withArrayCopy(
        array,
        function (copy) {
            copy[idx] = value
        }
    )
}
// 카피 온 라이트 원칙을 따르고 재사용할 수 있는 함수
function withArrayCopy_(array, modify /* 콜백 */) {
    var copy = array.slice()
    modify(copy);
    return copy;
}

//예제 풀이
function push(array, elem) {
    var copy = array.slice()
    copy.push(elem)
    return copy
}

// ==> 인자 콜백 만들기

function push_(array, elem) {
    return withArrayPush(array,
        function (copy) {
            copy.push(elem)
        }
    )
}

// 함수를 리턴하는 함수

try {
    saveUserData(user);
} catch (err) {
    logToSnapError(err)
}
// 로그를 남기지 않는 함수를 변환하기 위해 wrapLogging() 함수를 부릅니다
// 함수를 리턴하는 함수는 함수 팩토리와 같다. ==> 

function wrapLogging(f) {
    return function (arg) {
        try {
            f(arg)
        } catch (err) {
            logToSnapError(err)
        }
    }
}
var fetchProductWithLogging = wrapLogging(fetchProductWithLogging) // 이런 식으로 로그를 남기는 함수로 바꿀 수 있음

var saveUserDataWithLogging = wrapLogging(saveUserDataWithLogging) //로그를 남기지 않는 함수를 변환하기 위해 WrapLogging() 함수를 부른다


/*
wrapLogging 함수의 시각화
    1. 원래 동작  // saveUserData
    2. 고차 함수로 전달
    3. 고차 함수 행동을 새로운 함수로 감싸 실행을 이룸 // wrapLogging
    4. 새로운 함수를 리턴
    5. 원래 행동에 슈퍼파워가 추가. saveUserDataWithLogging
*/

/*
인자가 여러 개인 함수를 받으려면 어떻게 해야 할까?
es6 rest argument, spread operator를 사용해야 함

보통은 아래와 같이 사용함
*/
function wrapLogging(f) {
    return function (a1, a2, a3, a4) {
        try {
            return f(a1, a2, a3, a4)
        } catch (err) {
            logToSnapError(err)
        }
    }
}