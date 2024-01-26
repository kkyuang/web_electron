$(document).ready(function () {
    var canvas = $("#myCanvas")[0];
    fundermentalDrawing(canvas)

    //전하 생성
    charges = [new Charge(new Vector3(0, 0, 0), 1),new Charge(new Vector3(-3, 3, 0), 1),new Charge(new Vector3(0, 3, 0), -1) ,new Charge(new Vector3(5, 0, 0), -1)]
    electricField = new ElectricField(new Vector3(-12, -9, 0), new Vector3(12, 9, 0), 1, charges)
    electricPotential = new ElectricPotential(new Vector3(-12, -9, 0), new Vector3(12, 9, 0), 0.1, charges)

    //전위블록 그리기
    for(var i = 0; i < electricPotential.V_list.length; i++){
        drawPotential(electricPotential.V_list[i].pos, electricPotential.V_list[i].V, electricPotential.interval, canvas)
    }
    //전하 그리기
    for(var i = 0; i < charges.length; i++){
        drawCharge(charges[i].pos, canvas)
    }
    //전기장 화살표 그리기
    for(var i = 0; i < electricField.E_list.length; i++){
        dpArrow(electricField.E_list[i].pos, electricField.E_list[i].E, canvas)
    }
});