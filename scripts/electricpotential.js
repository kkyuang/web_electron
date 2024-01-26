k = 1 //쿨롱상수


class ElectricPotential{
    constructor(min, max, interval, charges){
        this.min = min
        this.max = max
        this.interval = interval
        this.charges = charges

        this.V_list = []

        //범위 내에서 일정 간격만큼 반복하며 전기장 계산
        var k = 0
        for(var i = min.x; i < max.x; i += interval){
            for(var j = min.y; j < max.y; j += interval){
                this.V_list[k] = {"pos": new Vector3(i, j, 0), "V": this.calcElectricPotential(new Vector3(i, j, 0))}
                k++
            }
        }
    }

    //한 점에서 전기장 계산하기
    calcElectricPotential(pos) {
        var V = 0
        for(var i = 0; i < this.charges.length; i++){
            //시험전하가 형성하는 전위
            var Vi = k * 1 * this.charges[i].q / Vector3.distance(pos, this.charges[i].pos)
            //전위 합 더하기
            V+=Vi
        }
        return V
    }
}