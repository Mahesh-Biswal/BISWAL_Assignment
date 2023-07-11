function Mathoperations() {

    this.power = function(base, exponent) {
        return Math.pow(base, exponent);
    }
    this.squareRoot = function(num) {
        return Math.sqrt(num);
    }
    this.fibonacci = function(num) {
        if (num <= 1) {
        return num;
        }

        var a = 0;
        var b = 1;

        for (var i = 2; i <= num; i++) {
        var next = a + b;
        a = b;
        b = next;
        }

        return b;
    }

};