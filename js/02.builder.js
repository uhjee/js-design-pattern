// Builder 패턴 : 옵션이 많은 경우에 유용하다.

// 두개의 부대가 있다고 생각하자. 또 그 부대는 리더, 부관, 병력 등을 갖고 있지만,
// 세부적인 설정은 모두 다를 수 있다.

let Legion = (function () {
  function Legion(leader, adjutants, number) {
    this.leader = leader;
    this.adjutants = adjutants || null;
    this.number = number || 0;
  }

  Legion.prototype.attack = function (target) {
    console.log(`${this.leader}가 ${target.leader}를 공격합니다.`);
  };

  return Legion;
})();

var makeLegion = function (leader) {
  let adjutants = null;
  let army = null;

  return {
    setAdjutant: function (list) {
      adjutants = list;
      // chain method 가능
      return this;
    },
    setArmy: function (number) {
      army = number;
      return this;
    },
    build: function () {
      // 위에서 만든 생성자 함수 사용
      return new Legion(leader, adjutants, army);
    },
  };
};

// 부대 생성
let galbaLegion = makeLegion('galba').setAdjutant(['otho', 'vindex', 'vitellius']).setArmy(8000).build();

let rufusLegion = makeLegion('rufus').setArmy(10000).build();

console.log(galbaLegion);
console.log(rufusLegion);

//  ====================================================================================================
// Http Request Qeury 예제 - class 사용

// 01. request class
class Request {
  constructor() {
    this.url = '';
    this.method = '';
    this.data = null;
  }
}

// 02. request builder class
class RequestBuilder {
  constructor() {
    this.request = new Request();
  }

  setUrl(url) {
    this.request.url = url;
    return this;
  }

  useMethod(method) {
    this.request.method = method;
    return this;
  }

  setData(data) {
    this.request.data = data;
    return this;
  }

  build() {
    return this.request;
  }
}

// 03. builder를 통해 객체 생성
let getRequest = new RequestBuilder().setUrl('https://github.com/uhjee').useMethod('GET').build();

let postRequest = new RequestBuilder()
  .setUrl('https://github.com/uhjee')
  .useMethod('POST')
  .setData({
    id: 'uhjee01',
  })
  .build();

console.log(getRequest);
console.log(postRequest);
