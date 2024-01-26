k = 1 //쿨롱상수


class ElectricField{
    constructor(min, max, interval, charges){
        this.min = min
        this.max = max
        this.interval = interval
        this.charges = charges

        this.E_list = []

        //범위 내에서 일정 간격만큼 반복하며 전기장 계산
        var k = 0
        for(var i = min.x; i < max.x; i += interval){
            for(var j = min.y; j < max.y; j += interval){
                this.E_list[k] = {"pos": new Vector3(i, j, 0), "E": this.calcElectricField(new Vector3(i, j, 0))}
                k++
            }
        }
    }

    //한 점에서 전기장 계산하기
    calcElectricField(pos) {
        var E = new Vector3(0, 0, 0)
        for(var i = 0; i < this.charges.length; i++){
            //단위벡터
            var rhat = Vector3.unitvector(Vector3.sub(pos, this.charges[i].pos))
            //시험전하의 전기력
            var force = k * 1 * this.charges[i].q / (Vector3.distance(pos, this.charges[i].pos)**2)
            //전기장 합 더하기
            E = Vector3.add(E, Vector3.scalarmul(rhat, force))
        }
        return E
    }
}