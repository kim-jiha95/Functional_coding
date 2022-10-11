/*
이번 장에서 살펴볼 내용
추상 함수
1. 함수형 도구 map(), filter(), reduce()에 대해 배움
2. 배열에 대한 반복문을 함수형 도구로 바꾸는 방법
3, 함수형 도구를 어떻게 구현하는지 알아봄
*/

// map, map() 에 넘기는 함수가 계산이면 map() 을 사용하느 코드도 게산 , map() 에 넘기는 함수가 액션이면 map() 을 사용하느 코드도 액션 / 기본적으로 넘기는 함수가 계산일 때 가장 사용하기 쉽다. 

function emailForCustomers(customers, goods, beats) {
    return map(customers, function (customer) {
        return emailForCustomers(customer, goods, beats);
    });
}

/* 함수를 전달하는 세가지 방법 
    1. 전역으로 정의하기
    2. 지역적으로 정의하기
    3. 인라인으로 정의하기  - 익명함수
*/

map(customers, function (customer) {
    firstName: customer.firstName
    address: customer.address
    lastName: customer.lastName
})

// filter
filter(cuseomers, function (customer) {
    return customer.purchases.length === 0;
})

// null인 항목 없애려면,,

const emailsWithoutNulls = filter(emailWithNulls, function (email) {
    return email !== null; //올바른 이메일만 남겨 둠
})

const example_filter = filter(customers, function (customer) {
    return customer.id % 3 === 0;
})

const example_filter_ = filter(customers, function (customer) {
    return customer.id % 3 !== 0;
})

// reduce

function countAllPurchase(customers) {
    return reduce(
        customers, 0,
        function (total, customer) {
            return total + customer.purchase.length;
        }
    )
}

function sum(numbers) {
    return reduce(
        numbers, 0,
        function (total, number) {
            return total + number
        }
    )
}

function multiply(numbers) {
    return reduce(
        numbers, 1,
        function (total, number) {
            return total * number
        }
    )
}

function min(numbers) {
    return reduce(
        numbers, Number.MAX_VALUE, function (a, b) {
            if (a > b) return b
            else return a
        }
    )
}

/*
 etc.... reduce로 할 수 있는 것들 
     1, 실행 취소, 실행 복귀 - 1) 리스트 마지막 사용자 입력 없애기
     2. 테스트할 때 사용자 입력을 다시 실행하기 - 모든 값 합쳐 현재 상태를 만들기
     3. 시간 여행 디버깅 - 특정 시점 값 보관
     4. 회계 감사 추적 - 과거 과정

     reduce 는 fold()라는 함수와 유사한 기능을 함 - foldLeft(), foldRight() -> **
 */