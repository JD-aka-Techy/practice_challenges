// uses cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js

// TODO: deal with secondary decimals points


$(function(){

  var calc = [];
  var num = '';
  var swaps = { '×':'*', '÷':'/' } // swap to js math operators.

  $('.key').click(function(){
    // grab key content
    var key = $(this).text();

    if(!isNaN(key) || key === '.'){
      num += key;
      setOut(num);
    }
    else if (key ==='AC'){
      calc = [];
      num = '';
      setOut('0');
    }
    else if (key ==='CE'){
      num = '';
      setOut('0');
    }
    else if(key === "="){
      calc.push(num);
      var total = eval(calc.join(' '));

      if(total != undefined){
        addRecord(calc.join(' ') + ' = ' + total);
      }

      calc = [];
      if(total !== undefined){
        num = total;
      }
      else{
        num = '';
      }

      setOut(total);
    }
    else {
      calc.push(num);
      num = '';
      if(swaps[key]){key = swaps[key]}
      calc.push(key);

    }

  });

  function setOut(out){
    $('.output').text(out);
  }

  function addRecord(sum){
    var record = document.createElement('div');
    $(record).addClass('record').html(sum);
    $('.records').prepend(record)
  }

})
