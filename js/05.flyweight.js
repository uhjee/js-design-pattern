/*
        플라이급 패턴

        5만명의 병사 개개인을 구현해보자
           */

// 01. 생성자 함수를 사용해 구현
var Legionary = (function () {
  function Legionary(name) {
    this.name = name;
  }

  // 병사들은 아래의 것들은 모두 같은 메모리를 공유하며, 위의 이름만 개별적으로 갖게 된다.
  Legionary.prototype.hp = 50;
  Legionary.att = 5;
  Legionary.prototype.attack = function (target) {
    console.log(`${this.name}이 ${target}을 공격합니다.`);
  };
  return Legionary;
})();

// 02. 병사 생성
let soldier1 = new Legionary('oneName');
let soldier2 = new Legionary('twoName');
let soldier3 = new Legionary('threeName');

console.log(soldier1.hp); // 50
soldier1.hp = 40;
console.log(soldier1.hp); //   40;
// 프로토타입을 공유하지만, soldier1 의 hp를 바꾸어도 soldier2와는 상관이 없기 때문에, 따로 hp를 관리할 수 있다.
// 즉 메모리를 아끼면서도 특성도 관리할 수 있는 것...
console.log(soldier2.hp); //   50;
