/**
 * 트리구조에 사용하는 패턴(전체 - 부분 관계)
 *
 * Composite : 하나 이상의 유사한 객체들로 구성된 객체 ex) 중대들로 구성된 대대, 대대들로 구성된 군단
 * 목적: client는 단일 객체인지, 복합 객체인지 신경쓰지 않고, 취급할 수 있도록 해야 한다.
 *
 * jQuery가 복합체 패턴을 따른다.
 *      예를 들면 $('#zero')로 하나의 태그를 선택할 수 있고,
 *      $('p')로 모든 p태그를 선택할 수도 있다.
 *      하지만, 개수와 관계없이 모두 attr, css 같은 메소드를 사용할 수 있다.
 *
 *  예제) 하나의 군단(Legion) 아래에 10개의 대대(Cohort)
 *         대대 아래에는 6개의 중대(Century)
 *          중대 아래에는 10개의 분대(Contuberium)
 *
 */

// 각 단위는 모두 병력의 수, 리더의 이름 을 알려주는 메소드를 갖고 있다.

//      중대
let Century = (function () {
  function Century(leader) {
    this.leader = leader;
  }

  Century.prototype.getLeader = function () {
    return this.leader;
  };
  Century.prototype.getNumber = function () {
    return 80; // 중대는 80명 가정
  };

  return Century;
})();

//      대대
let Cohort = (function () {
  function Cohort(leader) {
    this.leader = leader;
    this.centuries = [];
  }

  Cohort.prototype.getLeader = function () {
    return this.leader;
  };
  Cohort.prototype.getNumber = function () {
    let sum = 0;
    this.centuries.forEach((century) => {
      sum += century.getNumber();
    });
    return sum;
  };

  Cohort.prototype.addCentury = function (century) {
    this.centuries.push(century);
    return this;
  };
  return Cohort;
})();

//      군단
let Legion = (function () {
  function Legion(leader) {
    this.leader = leader;
    this.cohorts = [];
  }

  Legion.prototype.getLeader = function () {
    return this.leader;
  };
  Legion.prototype.getNumber = function () {
    let sum = 0;
    this.cohorts.forEach((cohort) => {
      sum += cohort.getNumber();
    });
    return sum;
  };
  Legion.prototype.addCohort = function (cohort) {
    this.cohorts.push(cohort);
    return this;
  };

  return Legion;
})();

// ------- 실제 코드 작성
/**
 *  복합 객체(군단, 대대) , 단일 객체(중대)에 상관없이 같은 인터페이스로 사용하며
 *  복합 객체는 자신이 갖고 있는 단일 객체들의 정보를 갖고 있다.
 *
 */

let century1 = new Century('A');
let century2 = new Century('B');
let century3 = new Century('C');
let century4 = new Century('D');
let century5 = new Century('E');
let century6 = new Century('F');

let cohort1 = new Cohort('AAA');
let cohort2 = new Cohort('BBB');

let legion = new Legion('BOSS');

cohort1.addCentury(century1).addCentury(century2).addCentury(century3);
cohort2.addCentury(century4).addCentury(century5).addCentury(century6);

legion.addCohort(cohort1).addCohort(cohort2);

console.log(legion.getLeader());
console.log(legion.getNumber());
console.log(cohort1.getNumber());
console.log(century1.getLeader());
