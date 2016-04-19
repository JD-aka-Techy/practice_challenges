// uses https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.1/masonry.pkgd.min.js
// uses //cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js

/* This version of freecodecamp news was written before the re-arrangement of the course to teach angular
   before this particular zipline */

$(function(){
  // get posts
  $.getJSON('http://www.freecodecamp.com/stories/hotStories', function(json){
    // loop posts
    for(var post of json){
      // grab content we need.
      var head = post.headline;
      /* converts headline to url ready string 'based on http://www.freecodecamp.com/news/newsHead requirements'
      * change of ziplines requirements and api format means this is no longer relevant
      * also removed comment counter with default 0 value.
      * var newsHead = head.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s/g, '-');
      */
      var newsHead = post.storyLink;
      var link = post.link;
      var uName = post.author.username;
      var uPic = post.author.picture;
      // card image is post-image OR User-pic OR default picture.
      var img = post.image || uPic || 'https://dl.dropboxusercontent.com/u/34065618/AK29YaTf.png?raw=1';
      var upVotes = post.upVotes  ? post.upVotes.length : 0 ;


      var date = formatDate(post.timePosted);
      // url to fcc/news discussion page.
      var cmtsLink = 'http://www.freecodecamp.com/news/' + newsHead;
      var post = buildPost();
      // add content to layout.//should really do this before adding whole set to dom
      var content = $('.masonry').html()
      $('.masonry').html(content + buildPost())
    }

    // initialise masonry plugin.
    var container = document.querySelector('.masonry');
    var masonry = new Masonry(container, {
    columnWidth: 40,
    itemSelector: '.card',
    isFitWidth: true,
    });
    // hide load once done
    $('.loading').css('display','none');

    /* function assembles each post into a card */
    function buildPost() {
    // because meh to handlebars :S
      var card = "<a target='_blank' href='" + link + "'class='post'>" +
                   "<article class='card container'>" +
                     "<img src='" + img + "'alt='article picture'>" +
                     "<main>" +
                       "<p><i class='fa fa-user'></i>" + uName + "</p>" +
                         head +
                     "</main>" +
                     "<footer class='row'>" +
                       "<p class='comments col-md-6'>" +
                         "<a target='_blank' href='"+ cmtsLink +"'><i class='fa fa-comments comments'></i>discuss</a>" +
                         "<i alt='UpVotes'class='fa fa-thumbs-up upV'></i>" + upVotes +
                      "</p>" +
                      "<p alt='date' class='col-md-6 date'>" + date + "</p>" +
                    "</footer>" +
                  "</article>" +
                "</a>";

    return card;
    }

  });

/* takes dateCode returns date formatted eg: 'Jan 13,2015' */
function formatDate(dateCode){
    var months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct","Nov", "Dec"];
    var date = new Date(dateCode);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return months[month] + ' ' + day + ',' + year;
  }

});


// Card layout
/*
 <a href="#">
<article class="card container">
  <img src="https://unsplash.it/300/400" alt="article picture">
  <main>
    <p><i class="fa fa-user"></i> username</p>
    I am the content for this post, it should wrap around nicely and cause the overall size to change which is good.
  </main>
  <footer class="row">
    <p class="comments col-md-6">
      <i class="fa fa-comments"></i> 0
      <i class="fa fa-thumbs-up"></i> 0
    </p>
    <p class="date col-md-6">Aug 13, 2015</p>
  </footer>
</article>
</a>
*/
