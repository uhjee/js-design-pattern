// 로마 제국 69년. 네 황제의 해라고 불리던 시기를 프로그래밍으로 구현
// 황제, 총독, 장군, 원로원 정치인 등 모두 따로 따로 만들기에는 중복 코드가 많아 진다
// 모든 유형의 사람은 서로를 공격할 수 있다.
// -> 추상팩토리 사용
let abstractCharacterFactory = (function () {
  let jobs = {};

  return {
    // 다양한 유형의 직업을 받고, 이후 create 메소드로 실제 객체 생성
    addJob: function (job, Character) {
      // attack() 메소드가 있어야만 등록 가능
      if (Character.prototype.attack) {
        jobs[job] = Character;
      }
    },
    create: function (job, options) {
      var Character = jobs[job];
      return Character ? new Character(options) : null;
    },
  };
})();

//  ------------------------------------------------------
// 01. 직업 만들기
//          황제 만들기
let Emperor = (function () {
  function Emperor(options) {
    this.name = options.name;
  }
  Emperor.prototype.attack = function (target) {
    console.log(`${this.name} 가  ${target.name}을 공격합니다.`);
  };
  Emperor.prototype.proclaim = function () {
    console.log(`${this.name} 가 스스로를 황제라고 칭했습니다.`);
  };
  return Emperor;
})();

//          총독 만들기
let Governor = (function () {
  function Governor(options) {
    this.name = options.name;
  }
  Governor.prototype.attack = function (target) {
    console.log(`${this.name} 가  ${target.name}을 공격합니다.`);
  };
  Governor.prototype.betray = function () {
    console.log(`${this.name} 가 황제를 배신합니다.`);
  };
  return Governor;
})();

// 02. 추상팩토리에 등록, 객체 생성
abstractCharacterFactory.addJob('emperor', Emperor);
abstractCharacterFactory.addJob('governor', Governor);

let nero = abstractCharacterFactory.create('emperor', {
  name: 'Nero',
});

let vindex = abstractCharacterFactory.create('governor', { name: 'Vindex' });
let galba = abstractCharacterFactory.create('governor', { name: 'Galba' });
let otho = abstractCharacterFactory.create('governor', { name: 'Otho' });
let vitellius = abstractCharacterFactory.create('governor', { name: 'Vitellius' });
let rufus = abstractCharacterFactory.create('governor', { name: 'Rufus' });

// 03. Gobvernor들의 반란
vindex.betray();
galba.betray();
otho.betray();
vitellius.betray();

// 추상 팩토리 패턴은 하나의 팩토리로 여러 종류의 팩토리를 동시에 운영하는 것
// 위의 예시에서는 Emperor와 Governor가 여러 종류의 팩토리에 해당한다.
