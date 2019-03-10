var table = document.getElementById("table");
var resultWindow = document.getElementById("resultWindow"); //결과창
var form = document.getElementById("form");
var input = document.getElementById("input");
var opCount = 0;

// 결과창에 addText를 표시하는 함수
function addWord(addText) {
    resultWindow.textContent = resultWindow.textContent + addText;

}

 // 현재 결과창에 있는 표시대로 계산하는 함수
function calculate() {
    var curArr = resultWindow.textContent.split('');
    var preArr = [];
    var value = 0;

    while (1) {
        value = curArr.shift();
        if (!(0 <= value && value <= 9 || value === '.')) {  // 연산자가 나오면 계산하기.
            if (value === '+')
                resultWindow.textContent = Number(preArr.join('')) + Number(curArr.join(''));
            else if (value === 'ㅡ')
                resultWindow.textContent = Number(preArr.join('')) - Number(curArr.join(''));
            else if (value === 'x')
                resultWindow.textContent = Number(preArr.join('')) * Number(curArr.join(''));
            else if (value === '/')
                resultWindow.textContent = Number(preArr.join('')) / Number(curArr.join(''));
            break;
        }
            

        preArr.push(value);
    }



}

// 입력창에 숫자만 입력하게 만들어주는 함수
function onlyNumber(event) {
    event = event || window.event;
    var keyID = event.keyCode;
    if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
        return;
    else
        return false;
}
//한글 입력시 지워주는 함수
function removeChar(event) {
    event = event || window.event;
    var keyID = event.keyCode;
    if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
        return;
    else
        event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

function ifEnter(event) {
    event = event || window.event;
    var keyID = event.keyCode;
    if (keyID == 13) {
        addWord(event.target.value);
        event.target.value = '';
        
    }
        
}

// 칸을 클릭하면 결과창에 표시하는 함수
table.addEventListener('click', function (event) {
    var tdContent = event.target.textContent;
    if (0 <= tdContent && tdContent <= 9)
        addWord(tdContent);
    else {
        if (resultWindow.textContent !== '') {
            if (tdContent === 'sqr')
                resultWindow.textContent = resultWindow.textContent * resultWindow.textContent;
            else if (tdContent === 'C') {
                resultWindow.textContent = '';
                input.focus();
            }
            else if (tdContent === '←') {
                var arrStr = input.value.split('');
                arrStr.pop();
                input.value = arrStr.join('');
                input.focus();
                
            }
            else if (tdContent === '÷')
                addWord('/');
            else if (tdContent === 'x')
                addWord(tdContent);
            else if (tdContent === 'ㅡ')
                addWord(tdContent);
            else if (tdContent === '+')
                addWord(tdContent);
            else if (tdContent === '±') {
                if (Number(resultWindow.textContent) > 0)
                    resultWindow.textContent = `-${resultWindow.textContent}`;
                else if (Number(resultWindow.textContent) < 0) {
                    resultWindow.textContent = `${-Number(resultWindow.textContent)}`;
                }

            }
            else if (tdContent === '.') {
                if (!(resultWindow.textContent.indexOf(".") > -1))   // .의 유무 확인
                    addWord(tdContent);
            }
            else if (tdContent === '=') {
                calculate();
            }
                
        }
    }

});

