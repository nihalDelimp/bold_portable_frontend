
// describe categorys
$(".describe--categorys--list .describe--categorys--item").mouseenter(function(){

    var data_category = $(this).attr("data-category");
    $(".describe--category--items .describe--category--item").removeClass("active--cat--img");
    $("#"+data_category).addClass("active--cat--img");
    $(".describe--categorys--list .describe--categorys--item").removeClass("active--item");
    $(this).addClass("active--item");
});

// describe categorys end


// port--types--categorys

$(".port--types--categorys--list .port--types--categorys--item h3").click(function(){

        var data_category2 = $(this).parent().attr("data-category");
        $(".port--types--category--items .port--types--category--item").removeClass("active--port--type");
        $("#"+data_category2).addClass("active--port--type");
        $(".port--types--categorys--list .port--types--categorys--item").removeClass("active--item");
        $(this).parent().addClass("active--item");
});

// port--types--categorys end

// scroll animation

var rotate = gsap.timeline({
  scrollTrigger:{
    trigger: ".hero--banner",
    pin: false,
    scrub:1,
    start: 'bottom bottom',
    end:'+=1000',
  }
})
.to('.left--sq--box', {
  rotation:25,
  duration:1, ease:'none',
});

var rotate2 = gsap.timeline({
    scrollTrigger:{
      trigger: ".hero--banner",
      pin: false,
      scrub:1,
      start: 'bottom bottom',
      end:'+=1000',
    }
  })
  .to('.right--sq--box', {
    rotation:-25,
    duration:1, ease:'none',
  })



  // hero slider

  $('#hero--slider').owlCarousel({
    loop:true,
    margin:0,
    autoplay:true,
    nav:false,
    dots: false,
    autoplayTimeout:3000,
    autoplaySpeed: 3000,
    mouseDrag: false,
    touchDrag: false,
    animateIn: 'fadeIn', 
    animateOut: 'fadeOut', 
    responsive:{
      0:{
        items:1
      },
        1000:{
            items:1
        }
    }
})

  // customer slider

  $('#customer--slider').owlCarousel({
    loop:true,
    margin:0,
    autoplay:true,
    nav:false,
    dots: false,
    autoplayTimeout:2000,
    autoplaySpeed: 1000,
    responsive:{
        0:{
            items:3
        },
        600:{
            items:5
        },
        1000:{
            items:8
        }
    }
})

// blog slider

$('#blog--slider').owlCarousel({
  loop:true,
  margin:80,
  autoplay:true,
  nav:false,
  dots: false,
  autoplayTimeout:2000,
  autoplaySpeed: 1500,
  autoplayHoverPause:true,
  responsive:{
      0:{
          items:1,
          margin:20
      },
      
      450:{
        items:1,
        margin:30
    },
    500:{
      items:2,
      margin:30
  },
    767:{
      items:3,
      margin:30
  },
      1024:{  
          items:3,
          margin:30
      },
      1920:{
          items:4
      }
  }
})

// rentals slider

$('#rentals--slider').owlCarousel({
  loop:true,
  margin:0,
  autoplay:true,
  nav:true,
  dots: false,
  autoplayTimeout:2000,
  autoplaySpeed: 1500,
  autoplayHoverPause:true,
  responsive:{
      0:{
          items:1,
          margin:15
      },
      500:{
        items:2
      },
      600:{
          items:3
      },
      1025:{
          items:4
      },
      1380:{
        items:5
    }
  }
});

// height issue rental;

setTimeout(function(){
  var rental__item__height = $(".rentals--slider .owl-item.active .rentals--item").height();
  $(".rentals--slider > .rentals--slider--wrapper > .owl-carousel > .owl-stage-outer").height(rental__item__height);
}, 1500)

$('.product--img--slider').owlCarousel({
  loop:true,
  margin:0,
  autoplay:false,
  nav:false,
  dots: true,
  autoplayTimeout:1000,
  autoplaySpeed: 1000,
  responsive:{
      0:{
          items:1
      }
  }
});

 
// mega menu

$(".hamburger").click(function(){
  $(this).toggleClass("active--hamburger");
    $(".nav--menu--wrapper").toggleClass("active--nav");
});

