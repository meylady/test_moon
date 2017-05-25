var calender = new controller();
calender.init();

function controller(target){

    var that =this;
    var m_oMonth = new Date();
    m_oMonth.setDate(1);

    this.init = function(){
      that.renderCalendar();
      that.initEvent();
    }


   this.renderCalendar =function(){
     var arrTable =[];

    arrTable.push('<table class="table table-bordered">');
    arrTable.push('<thead><tr>'); //월화수목금토일

    var arrWeek = "일월화수목금토".split("");

    for(var i=0, len=arrWeek.length; i<len; i++) {
      var sClass = '';
      sClass += i % 7 == 0 ? 'sun' : '';
      sClass += i % 7 == 6 ? 'sat' : '';
      arrTable.push('<td class="'+sClass+'">' + arrWeek[i] + '</td>');
    }
    arrTable.push('</tr></thead>');

    arrTable.push('<tbody>');  //일을 표기하는 표

    var oStartDt = new Date(m_oMonth.getTime());
    // 1일에서 1일의 요일을 빼면 그 주 첫번째 날이 나온다.
    oStartDt.setDate(oStartDt.getDate() - oStartDt.getDay());

    for(var i=0; i<100; i++) {
      if(i % 7 == 0) {
        arrTable.push('<tr>');
      }

      var sClass = 'date-cell ';

      sClass += m_oMonth.getMonth() != oStartDt.getMonth() ? 'not-this-month ' : '';
      sClass += i % 7 == 0 ? 'sun' : '';
      sClass += i % 7 == 6 ? 'sat' : '';

      console.log(sClass);
      if(sClass == 'date-cell not-this-month ' ||sClass == 'date-cell not-this-month sun'||sClass == 'date-cell not-this-month sat' ){
        arrTable.push('<td class="'+sClass+'"></td>');
      }
      else {
        arrTable.push('<td class="'+sClass+'">' + oStartDt.getDate() + '</td>');
      }

      oStartDt.setDate(oStartDt.getDate() + 1);

      if(i % 7 == 6) {
        arrTable.push('</tr>');
        if(m_oMonth.getMonth() != oStartDt.getMonth()) {
          break;
        }
      }
    }

  	arrTable.push('</tbody></table>');
     $('#showtable').html(arrTable.join(""));

    that.changeMonth();
  }


      /* Next, Prev 버튼 이벤트 */
  	this.initEvent = function() {
  		$('#btnPrev').click(that.onPrevCalendar);
  		$('#btnNext').click(that.onNextCalendar);
  	}

    /* 이전 달력 */
  this.onPrevCalendar = function() {
    m_oMonth.setMonth(m_oMonth.getMonth() - 1);
    that.renderCalendar();
  }

    /* 다음 달력 */
  this.onNextCalendar = function() {
    m_oMonth.setMonth(m_oMonth.getMonth() + 1);
    that.renderCalendar();
  }

    /* 달력 이동되면 상단에 현재 년 월 다시 표시 */
  this.changeMonth = function() {
    $('#currentDate').text(that.getYearMonth(m_oMonth).substr(0,9));
  }

    /* 날짜 객체를 년 월 문자 형식으로 변환 */
  this.getYearMonth = function(oDate) {
    return oDate.getFullYear() + '년 ' + (oDate.getMonth() + 1) + '월';
  }
}
