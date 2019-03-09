var table = document.getElementById("table");
var str = table.rows[0].cells[0];
var C = table.rows[0].cells[1];
var del = table.rows[0].cells[2];
var division = table.rows[0].cells[3];// 나중에 바꾸기
var seven = table.rows[1].cells[0];
var eight = table.rows[1].cells[1];
var nine = table.rows[1].cells[2];
var multiple = table.rows[1].cells[3];
var four = table.rows[2].cells[0];
var five = table.rows[2].cells[1];
var six = table.rows[2].cells[2];
var minus = table.rows[2].cells[3]; // 바꾸기
var one = table.rows[3].cells[0];
var two = table.rows[3].cells[1];
var three = table.rows[3].cells[2];
var plus = table.rows[3].cells[3];
var change = table.rows[4].cells[0];
var zero = table.rows[4].cells[1];
var dot = table.rows[4].cells[2];
var result = table.rows[4].cells[3];

var resultWindow = document.getElementById("resultWindow"); //결과창


//아이디어 table에 에드이벤트를 넣고 조건을 판단해서 text를 넣는방식.
// html의 td에서 값을 가져와야함. (인터넷에서 본것같으니 검색 ㄱ)
// 값이 아닌 

function addWord(addText) {
    var curText = resultWindow.textContent;
    resultWindow.textContent = curText + addText;

}


// 결과창에 글자 입력
table.addEventListener('click', function (event) {
    tdContent = event.target.textContent;
    if (0 <= tdContent && tdContent <= 9)
        addWord(tdContent);
    else {
        if (resultWindow.textContent !== '') {
            if (tdContent === 'sqr')
                resultWindow.textContent = `sqr(${resultWindow.textContent})`;
            else if (tdContent === 'C')
                resultWindow.textContent = '';
            else if (tdContent === '←')
                resultWindow.textContent = 'hi';
            else if (tdContent === '÷')
                addWord('/');
            else if (tdContent === 'X')
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

            }
                addWord(tdContent);
            
            else if (tdContent === '=')
                ㅁㄴㅇ
        }
    }

});