/*
1. 해시 맵에 저장된 값을 다루기 위한 고차 함수를 만듭니다
2. 중첩된 데이터를 고챃 마수로 쉽게 다루는 방법을 배웁니다
3. 재귀를 이해하고 안전하게 재귀를 사용하느 방법을 살펴봅니다
4. 깊이 중첩된 엔티티에 추상화 벽을 적용해서 얻을 수 있는 장점 이해
*/

function incrementQuantity(item) {
    var quantity = item['quantity'];
    var newQuantity = quantity + 1;
    var newItem = Objectset(item, 'quantity',
        newQuantity);
    return newItem;
}

// => 

function incrementField(item, field /* 필드명을 명시적인 인자로 만들기 */) {
    var value = item['field']
    var newValue = value + 1;
    var newItem = Objectset(item, field, newValue);
    return newItem;
}

function update(object, key, modify) {
    const value = object[key];
    const newValue = modify(value)
    const newObject = objectSet(object, key, newValue);
    return newObject
}

// 값을 바꾸기 위한 update 사용
const employee = {
    name: 'Kim',
    salary: 120000
};

function release10Percent(salary) {
    return salary * 1.1;
}

const a = update(employee, 'salary', release10Percent)
console.log(a, 'a');