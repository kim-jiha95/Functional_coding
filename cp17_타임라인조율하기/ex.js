/*

    1. 타임라인을 조율하기 위한 동시성 기본형을 만들어보기
    2. 시간에 관한 중요한 관점인 순서와 반복을 함수형 개발자들이 어떻게 다루는지 배워보기

*/

// 멀티스레드를 지원하는 언어에서는 스레드가 변경 가능한 상태를 공유하기 위해 -- 원자적 업데이트 -- 사용해야함 하지만 js는 단일 스레드의 장점을 활용 가능

function Cut(num /* 기다릴 타임라인 수 */, callback/* 모든 것이 끝났을 때 실행할 콜백 */) {
    var num_finished = 0; // 카운터를 0으로 초기화
    return function () /* 리턴되는 함수는 타임라인이 끝났을 때 호출 */ {
        num_finished += 1; // 함수가 호출될 때 마다 카운터가 증가
        if (num_finished === num)
            callback() // 마지막 타임라인이 끝났을 때 콜백을 호출
    }
}

// 예제
var done = Cut(3, function () {
    console.log('3 timeline are finished');
})

done()
done()
done()

// console => "3 timeline are finished"
// js 스레드는 하나. 타임라인은 다른 타임라인이 시작되기 전에 완료됨. Cut()은 이런 장점을 활용해 변경활 수 있는 값을 안전하게 공유함

// 여러번 호출해도 한번만 실행되는 동시성 기본형

function sendAddToCartText(number) {
    sendTextAjax(number, "Thank~")
}

//최초 한번만 효과가 발생하는 액션 == 명등원 == justOnce
function JustOnce(action) {
    var alreadyCalled = false;
    return function (a, b, c) {
        if (alreadyCalled) return /* 실행된 적이 있다면 바로 종료함 */;
        alreadyCalled = true; // 함수가 실행됐다고 생각하고 실행한 사실을 기록
        return action /* 인자와 함께 함수를 호출 */(a, b, c);
    }
}

// ** 비동기 이벤트는 새로운 타임라인에서 실행됨