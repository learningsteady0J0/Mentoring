var table = document.getElementById("table");
var resultWindow = document.getElementById("resultWindow"); //결과창
var form = document.getElementById("form");
var input = document.getElementById("input");
var preNumber = 0; // 연산자 입력전 숫자 
var curOp = 0; // 현재 연산 ->   0:없음, 연산자이름:해당 연산자가 입력되어있음

// 결과창에 addText를 표시하는 함수
function addWordToWindow(addText) {
    resultWindow.textContent = resultWindow.textContent + addText;
}
// input창에 addText를 표시하는 함수
function addWordToInput(addText) {
    input.value = input.value + addText;
}

// 3자리단위로 콤마를 넣어주는 함수 
function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

// 결과창에 콤마를 적용하는 함수
function addResultComma() {
    resultWindow.textContent = addComma(resultWindow.textContent);
}

// 인풋창에 콤마를 적용하는 함수
function addInputComma() {
    input.value = addComma(input.value);
}

 // 계산하는 함수.
function calculate(value) {
    var result;
    if (curOp === '+') {
        result = Number(preNumber) + Number(value);
    }
    else if (curOp === '-') {
        result = Number(preNumber) - Number(value);
    }
    else if (curOp === '*') {
        result = Number(preNumber) * Number(value);
    }
    else if (curOp === '/') {
        result = Number(preNumber) / Number(value);
    }
    else
        return false;

    return result;
}

// 입력된 키에 따라 작동하는 함수
function keyInput(event) {
    event = event || window.event;
    var keyID = event.keyCode;
    if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID === 8 || keyID === 46 ||
        keyID === 37 || keyID === 39 || keyID === 190 || keyID === 110)
        return; // 숫자입력
    else if (keyID == 13) { // 엔터시
        inputOperator('=');
    }
    else if ((event.shiftKey === true && keyID === 187) || keyID === 107) { // +입력
        inputOperator('+');
    }
    else if (keyID === 189 || keyID === 109) { // -입력
        inputOperator('-');
    }
    else if ((event.shiftKey === true && keyID === 56) || keyID === 106) { // *입력
        inputOperator('*');
    }
    else if (keyID === 111) { // /입력
        inputOperator('/');
    }
    else
        return false;
}

//한글 입력시 지워주는 함수
function removeChar(event) {
    event = event || window.event;
    var keyID = event.keyCode;
    if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
        return;
    else {
        var count = (input.value.match(/[.]/g) || []).length;
        console.log(count);
        if (count < 2) { // .의 유무 확인
            if (input.value.indexOf(".") === 0)  // .이 처음에 나오면 지우기
                event.target.value = event.target.value.replace(/[^0-9]/g, "");
            else
                event.target.value = event.target.value.replace(/[^0-9.]/g, "");
        }
        else
            input.value = input.value.slice(0, -1);

    }
}


// 연산자가 존재 하면 true
function hasOperator() {
    if (curOp !== 0)
        return true;
    else
        return false;
}
// 계산기 입력창에 값이 있으면 true
function hasValueInInput() {
    if (input.value !== '')
        return true;
    else
        return false;
}
// 연산전 입력숫자가 존재하면 true
function hasPreNumber() {
    if (preNumber !== 0)
        return true;
    else
        return false;
}

    
// 연산자가 입력되거나 선택될 때 수행되는 함수
function inputOperator(op) {
    function returnOperator() {
        if (op === '+')
            return '+';
        else if (op === '-')
            return '-';
        else if (op === '*')
            return '*';
        else if (op === '/')
            return '/';
    }

    var result;
    if (op === '=') {
        if (hasOperator() && hasValueInInput()) {
            result = calculate(input.value);
            input.value = result;
            preNumber = result;
            curOp = 0;
            resultWindow.textContent = '';
            input.value.focus();
        }
    }
    else {
            if (hasValueInInput()) {
                if (hasPreNumber()) {
                    result = calculate(input.value);
                    curOp = returnOperator();
                    if (result !== false) {
                        preNumber = result;
                        resultWindow.textContent = result;
                        addWordToWindow(returnOperator());
                    }
                    else {
                        addWordToWindow(input.value + returnOperator());
                    }
                }
                else { // preNumber가 없는경우에는 curOp도 0임
                    curOp = returnOperator();
                    preNumber = input.value;
                    addWordToWindow(input.value + returnOperator());
                }
            }
            else {
                resultWindow.textContent = resultWindow.textContent.slice(0, -1);
                curOp = returnOperator();
                addWordToWindow(returnOperator());
            }
        }

        input.value = '';
        input.focus;
}

// 칸을 클릭하면 인풋창에 표시하는 함수
table.addEventListener('click', function (event) {
    var tdContent = event.target.textContent;
    if (0 <= tdContent && tdContent <= 9) {
        addWordToInput(tdContent);
        input.focus();
    }
    else {
        if (tdContent === 'sqr') {
            input.value = input.value * input.value;
            input.focus();
        }
        else if (tdContent === 'C') {
            preNumber = 0;
            curOp = 0;
            resultWindow.textContent = '';
            input.value = '';
            input.focus();
        }
        else if (tdContent === '←') {
            input.value = input.value.slice(0, -1);
            input.focus();
        }
        else if (tdContent === '+')
            inputOperator('+');
        else if (tdContent === 'ㅡ')
            inputOperator('-');
        else if (tdContent === 'x')
            inputOperator('*');
        else if (tdContent === '÷')
            inputOperator('/');
        else if (tdContent === '±') {
            if (Number(input.value) > 0)
                input.value = `-${input.value}`;
            else if (Number(input.value) < 0) {
                input.value = `${-Number(input.value)}`;
            }
        }
        else if (tdContent === '.') {
            if (!(input.value.indexOf(".") > -1)) // .의 유무 확인
                addWordToInput('.');
            input.focus();
        }
        else if (tdContent === '=') {
            inputOperator('=');
        }
    }

});

