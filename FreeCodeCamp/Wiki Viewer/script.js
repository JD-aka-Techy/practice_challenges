// uses //cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js
// uses //cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js

$(".search").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            }
        });
    }
});


$('.submit').click(function(e){
  getPages();
})


$('.search').keypress(function (e) {
  if (e.which == 13) {
    getPages();

  }
});

/*
@ page JSON page object from Ajax call
@ returns html card representation of page data
*/
var addPage = function(page){
  var link = 'https://en.wikipedia.org/wiki/' + page.title;
  var card = '';

  card += '<div class="item">';
  card +=   '<a href="' + link + '" target="_blank">';
  card +=      '<header>' + page.title + '</header>'
  card +=      '<article>' + page.snippet + '</article>';
  card +=   '</a>';
  card += '</div>';


  return card;
}

/*
  Makes Ajax call to wiki API and handles response
*/
function getPages() {
  var $search = $('.search');
  $.ajax({
    url: '//en.wikipedia.org/w/api.php',
    dataType: 'jsonp',
    data: {
      action: 'query',
      list: 'search',
      srsearch: $search.val(),
      format: 'json'
    },

    success: function(data) {

      var addToPage = '';

      data.query.search.forEach(function(page){
        addToPage += addPage(page);
      })

      $('.found').html(addToPage);
    }
  });
}
