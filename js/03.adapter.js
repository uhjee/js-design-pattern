        // adopter 패턴 : 객체를 생성하는 패턴이 아니라,
        // 기존에 있던 구조를 새 구조로 유연하게 전환하거나, 새 구조에서 기존 구조로 전환하는 데 사용

        // 국민들의 기본 시스템은 현재 황제를 자동적으로 지지하도록 되어 있다.
        // 다른 사람을 황제로 지지하도록 하고,
        // 그 사람이 황제가 되면, 다시금 현 황제를 지지하도록 구현해보자

        // 01. 현 시스템 생성 - adapter를 인자로 받아 생성된다.
        var SenateSystem = (function(){
            function SenateSystem(adapter) {
                this.adapter = adapter;
            }

            SenateSystem.prototype.vote = function(){
                this.adapter.vote();
            }
            return SenateSystem;
        })();


        // 02. 인자가 될 어댑터들 생성
        var currentAdapter = {
            vote: function(){
                console.log("현 황제를 계속 지지합니다.");
            }
        }

        var rufusAdapter = {
            vote: function(){
                console.log("루푸스를 황제로 추대합니다.");
            }
        }

        // 03. 구현
        //현 황제 지지  - 현 구조로 전환
        senateSystem = new SenateSystem(currentAdapter);
        senateSystem.vote();

        //루푸스 지지 - 새로운 구조로 전환
        senateSystem = new SenateSystem(rufusAdapter);
        senateSystem.vote();

        var galbaAdapter = {
            vote: function () {
                console.log("갈바를 황제로 추대합니다.");
            }
        }

        // 갈바를 황제로 지지 - 또 다른 구조로 전환
        senateSystem = new SenateSystem(galbaAdapter);
        senateSystem.vote();

        // 황제 추대 후, 현 황제 지지로 전환
        senateSystem = new SenateSystem(currentAdapter);
        senateSystem.vote();
