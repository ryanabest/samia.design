$('.preview').hover(function() {
  $(this).addClass('focus');
  $('.background').addClass('show');
}, function() {
  $('.background').removeClass('show');
  $(this).removeClass('focus');
})


$(".preview").each(function() {
  $(this).css("top", Math.floor(Math.random() * ($(window).height() - $(this).height())) +100);
  $(this).css("left", Math.floor(Math.random() * ($(window).width() - $(this).width())));
});

//ask brendan to make it in the wrapper and not cover my nav//

$('.filter').click(function() {
  $(this).toggleClass('checked');
  let showElement = $(this).attr("class").includes("checked"); //if its checked or not 
  let element = $(this).attr("class").replace("filter ","").replace("checked",""); //which element we are on 
  if (showElement) {
    $(".preview."+element).css("display","inline-block") //might change after we set up the random bubble
  } else {
    $(".preview."+element).css("display","none")
    console.log("hide all "+element)
  }
})

//how can the text show
