
    var inputValue = " ";
    function displayCharacter(char) {
        inputValue += char;
        updateDisplay();
    }
    function updateDisplay() {
     var display = $(".display");
     display.val(inputValue);
    }
    function clearDisplay() {
        inputValue = "";
        updateDisplay();
    }
    function backSpace() {
      inputValue = inputValue.slice(0, -1);
      updateDisplay();
  }
    function evaluateinputValue() {
        try {
          const result = eval(inputValue);
          inputValue = result.toString();
          updateDisplay();
        } catch (e) {
          inputValue = e.message;
          updateDisplay();
        }
    }
    function SquareRoot() {
        try {
          var result = Math.sqrt(eval(inputValue));
          inputValue = result.toString();
          updateDisplay();
        } catch (e) {
          inputValue = e.message;
          updateDisplay();
        }
    }