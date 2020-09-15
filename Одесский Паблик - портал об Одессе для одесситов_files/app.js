
if (window.innerWidth < 768) {
    $('.wonderful-block').insertBefore('.main-content');
    $(document).ready(function () {
        $('#swiffycontainer').css('height',$('#swiffycontainer').parent('.wonderful-block').find('.swift_sib').outerHeight());
        /*$('.wonderful-block').find('.require_relk').before('<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9887362394644066" data-ad-slot="5313657630" data-ad-format="auto"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>');*/
    });

}
function insertParam(key, value) {
	key = encodeURI(key); value = encodeURI(value);

	var kvp = document.location.search.substr(1).split('&');

	var i=kvp.length; var x;
	while(i--) {
		x = kvp[i].split('=');

		if (x[0]==key)
		{
			x[1] = value;
			kvp[i] = x.join('=');
			break;
		}
	}

	if(i<0) {kvp[kvp.length] = [key,value].join('=');}
	//this will reload the page, it's likely better to store this until finished
	//console.log(kvp.join('&'));
	//document.location.search = kvp.join('&');
	window.location = '#' + kvp.join('&');
}

function changeUrl() {

	var form_array = {
		'label' : $('#label').val(),
		'city' : $('#city').val(),
        'category' : $("#category").val(),
		'price_from' : $('#price_from').val(),
		'price_to' : $('#price_to').val(),
		'image' : $('#ch1').is(':checked'),
		'findall' : $('#ch2').is(':checked'),
		'top' : $('#ch3').is(':checked'),
		'add_favorites' : $('#ch4').is(':checked'),
		'order' : $('#order').val(),
		'currency' : $('.ajax_currencies_list li.active a').data('value'),
		'view' : $('.ajax_views_list li.active a').data('value')
	};

	var params = '';

	jQuery.each(form_array, function( index, value ) {
		if (value != false || value != '') {
			params += '&' + [index,value].join('=');
		}
	});

	//if(window.location.href.split('#').length == 2 && window.location.href.split('#')[1] != '')
	//	params = '#'+window.location.href.split('#')[1];

	window.location = '#' + params;

}
var width_screen = $(window).width();
$( window ).resize(function() {
    width_screen  =	$(window).width();
	//console.log(width_screen);

    // Відміна спрацювання кнопки в обявлениях

});
(function ($, window, document, undefined) {

    $(document).ready(function() {
		//Testing href function


		$('.mansory-news-title').click(function(){
			insertParam('city', 'Одесса')
		});

		//Change services ajax links to active if it was changed
		var ajax_view_links = $('.ajax_view_links li a');
		ajax_view_links.click(function(){
			$(this).closest('ul').find('li').removeClass('active');
			$(this).closest('li').addClass('active');
		});

        //label above inputs
        $('.input-register').on('focus', function(){
            var me = $(this);
            me.siblings('label').fadeTo(500, 1);
            if (me.hasClass('.error')) {
                me.siblings('.error').fadeTo(500, 1);
            }
            me.on('blur', function(){
                me.siblings('label').fadeTo(300, 0)
            })
        });
        $('.input-register').on('focus blur change', function(){
            var me = $(this);
            setTimeout(function () {
                if (me.closest('.input-wrapper').hasClass('error')) {
                    me.siblings('.error').fadeTo(500, 1);
                }
            }, 500);
        });
        $('#register-form #submitRegistration').click(function () {
            setTimeout(function () {
                $('.input-register').each(function () {
                    var me = $(this);
                    if (me.closest('.input-wrapper').hasClass('error')) {
                        me.siblings('.error').fadeTo(500, 1);
                    }
                })
            },500);
        })

        //slidedown log-in modal
        $('#btnRegOpen, #btnLoginOpen, .btnLoginOpen').on('click', function(e){
	        if ($(window).width() < 753) {
                    var var_height_container = '690px';
                    var var_height_log_in_modal = '690px';
                }
                else{
                    var var_height_container = '386px';
                    var var_height_log_in_modal = '375px';
                }

            if (!$("#active-header .container").hasClass('show-popup') || !$("#active-header .log-in-modal").hasClass('show-popup')) {
                $("#active-header .container").addClass("show-popup");
                $("#active-header .container").animate({height: var_height_container}, 500);

                $("#active-header .container .topbar-item-default").slideUp();

                if($('.topbar-plus-2').length) {

                    $("#active-header .container .topbar-plus-2").animate({height: '48px'}, 500);
                    $("#active-header .container .topbar-plus-2 span").css('display','block');
                }

                $("#active-header .log-in-modal").addClass("show-popup");
                $("#active-header .top-menu-hidden").animate({height: '0px'}, 500);
                $("#active-header .log-in-modal").animate({height: var_height_log_in_modal}, 500);
            }
        });


        //slidedown log-in modal
        $('.topbar-close-2').on('click', function() {


            setTimeout(function(){
                if($("#active-header .container").hasClass('show-popup')) {

				$(".social-icons.centered>p").css('opacity','1');
                    $("#active-header .container, .top-menu-profile, .top-menu-hidden").removeClass("show-popup");
                    $("#active-header .container").animate({height: '49px'}, 500);

                    $("#active-header .container .topbar-item-default").slideDown();

                    if($('.topbar-plus-2').length) {
                        $("#active-header .container .topbar-plus-2").animate({height: '0px'}, 500);
                    }

                    if($('.topbar-profile').length) {
                        $("#active-header .container .topbar-profile").animate({height: '0px'}, 500);
                    }

                    if($('.top-menu-profile').length) {
                        $("#active-header .top-menu-profile").animate({height: '0px'}, 500);
                    }

                    $("#active-header .top-menu-hidden").animate({height: '0px'}, 500);


                    if($("#active-header .log-in-modal").hasClass('show-popup')) {
                        $("#active-header .log-in-modal").toggleClass("show-popup");

                        $("#active-header .log-in-modal").animate({height: '0px'}, 500);
                    }

				$("#active-header .container .topbar-plus-2 span").css('display','none');
                } else {
	              if ($(window).width() < 753) {
                        var var_height_container_2 = '626px';
                        var var_height_top_menu_hidden = '626px';
                    }
                    else{
                        var var_height_container_2 = '356px';
                        var var_height_top_menu_hidden = '356px';
                    }
				$(".social-icons.centered >p").css('opacity','0');
                    $("#active-header .container").toggleClass("show-popup");
					if(width_screen >480){
                    $("#active-header .container").animate({height: var_height_container_2}, 700);/**/
					}else if(width_screen <380){
					 $("#active-header .container").animate({height: '440px'}, 700);
					}else if(width_screen>380 &&  width_screen <480){
					 $("#active-header .container").animate({height: '390px'}, 700);
					}
                    $("#active-header .container .topbar-item-default").slideUp();

                    if($('.topbar-plus-2').length) {
                        $("#active-header .container .topbar-plus-2").animate({height: '48px'}, 700);
                    }

                    if($('.topbar-profile').length) {
                        $("#active-header .container .topbar-profile").animate({height: '48px'}, 700);
                    }
                    if(width_screen >480){
                    $("#active-header .top-menu-hidden").toggleClass("show-popup");
                    $("#active-header .top-menu-hidden").animate({height: var_height_top_menu_hidden}, 700);/**/
					}else if(width_screen <380){
					 $("#active-header .top-menu-hidden").animate({height: '440px'}, 700);
					}else if(width_screen>380 &&  width_screen <480){
					 $("#active-header .top-menu-hidden").animate({height: '390px'}, 700);
					}
					$("#active-header .container .topbar-plus-2 span").css('display','block');
                }
            }, 1);
        });

	/*

		var $container = $('#sprite2');
		// init
		if(window.location.href.search('/photo') > 0) {

			$container.packery({
			layoutMode: 'fitRows',
			  itemSelector: '#sprite2 .item',
			  gutter: 1,
			  columnWidth: 213,

			});



		}
		*/
		var $container2 = $('.search-articles');
		// init
		if(window.location.href.search('/search') > 0) {
			$container2.packery({
			  itemSelector: 'article',
			  gutter: 10,
			  columnWidth: 332 
			});

		}

        $('.topbar-plus-2, .log_in').on('click', function() {
            setTimeout(function(){
                if($("#active-header .container").hasClass('show-popup')) {
                    if($("#active-header .log-in-modal").hasClass('show-popup')) {
                        if ($(window).width() < 753) {
                            var var_height_container_2 = '626px';
                            var var_height_top_menu_hidden = '626px';
                        }
                        else{
                            var var_height_container_2 = '356px';
                            var var_height_top_menu_hidden = '356px';
                        }

                        $("#active-header .log-in-modal").toggleClass("show-popup");

                        $("#active-header .top-menu-hidden").toggleClass("show-popup");
                        $("#active-header .top-menu-hidden").animate({height: var_height_top_menu_hidden}, 500);
                        $("#active-header .log-in-modal").animate({height: '0px'}, 500);

                        $("#active-header .container").animate({height: var_height_container_2 }, 700);

                        $(".form_for_login").css('height', '356px');
                        $(".content-w").css('height', '0px');
                    } else {
                         if ($(window).width() < 753) {
                            var var_height_container = '690px';
                            var var_height_log_in_modal = '690px';
                        }
                        else{
                            var var_height_container = '386px';
                            var var_height_log_in_modal = '375px';
                        }

                        $("#active-header .container").animate({height: var_height_container}, 700);

                        $("#active-header .log-in-modal").toggleClass("show-popup");
                        $("#active-header .top-menu-hidden").toggleClass("show-popup");
                        $("#active-header .top-menu-hidden").animate({height: '0px'}, 500);
                        $("#active-header .log-in-modal").animate({height: var_height_log_in_modal}, 500);

                        $(".form_for_login").css('height', '356px');
                        $(".content-w").css('height', '0px');
                    }
                }
            }, 1);
        });
        $('.recover').on('click', function(e) {
             e.preventDefault();
            $(".form_for_login").animate({height: '0px'}, 500);
            $(".content-w").animate({height: '356px'}, 500);
        });
        $('.recover_cancel').on('click', function(e) {
             e.preventDefault();
            $(".form_for_login").animate({height: '356px'}, 500);
            $(".content-w").animate({height: '0px'}, 500);
        });

        $('#btn-edit-profile, .topbar-profile').on('click', function(e) {
            e.preventDefault();
            setTimeout(function(){
                if($("#active-header .container").hasClass('show-popup')) {
                    if($("#active-header .top-menu-profile").hasClass('show-popup')) {
                        $("#active-header .top-menu-profile").toggleClass("show-popup");

                        $("#active-header .top-menu-hidden").toggleClass("show-popup");
                        $("#active-header .top-menu-hidden").animate({height: '356px'}, 500);
                        $("#active-header .top-menu-profile").animate({height: '0px'}, 500);

                        $("#active-header .container").animate({height: '356px'}, 700);
                    } else {
                         if ($(window).width() < 753) {
                            var var_height_container = '100%';
                            var var_top_menu_profile = '100%';
                        }
                        else{
                            var var_height_container = '530px';
                            var var_top_menu_profile = '505px';
                        }
                        $('#top-change-pass').css('display', 'block');
                        $('.block-change-password').css('display', 'none');

                        $("#active-header .container").animate({height: var_height_container}, 300);

                        $("#active-header .top-menu-profile").toggleClass("show-popup");
                        $("#active-header .top-menu-hidden").removeClass("show-popup");
                        $("#active-header .top-menu-hidden").animate({height: '0px'}, 500);
                        $("#active-header .top-menu-profile").animate({height: var_top_menu_profile}, 500);
                    }
                }
            });
        });

        $('#top-change-pass').on('click', function(e) {
            $('#top-change-pass').css('display', 'none');
            $('.block-change-password').css('display', 'block');

            $("#active-header .top-menu-profile").animate({height: '710px'}, 500);
            $("#active-header .container").animate({height: '730px'}, 500);
        });

        $('#cancel-edit-profile').on('click', function(e) {
            $("#active-header .top-menu-profile").toggleClass("show-popup");
            $("#active-header .top-menu-hidden").toggleClass("show-popup");

            $("#active-header .top-menu-hidden").animate({height: '356px'}, 500);
            $("#active-header .top-menu-profile").animate({height: '0px'}, 500);

            $("#active-header .container").animate({height: '356px'}, 700);
        });



        /*$('.topbar-close-2').on('click', function(){
            var clickedElement = $(this);
            var hiddenMenuHeight = $('.top-menu-hidden').height() + 98;
            var headerHeight = $('header').height();
            var topPosition = hiddenMenuHeight - headerHeight;
            *//*console.log($('header').height())
            console.log($('.top-menu-hidden').height() + 40)*//*
            if( $('.top-menu-hidden').css('display') == 'none'){
                $('.top-menu-hidden').slideDown(500, function(){
                    var modal = $(this);
                    $('section').on('click', function(event){
                        clickedElement.animate({top: '50px'}, 500);
                        modal.slideUp('slow', function(){
                            $('body').off();
                        });
                    })
                });
                clickedElement.animate({top: topPosition+'px'}, 500);
            } else {
                $('.top-menu-hidden').slideUp(500);
                //clickedElement.animate({top: '50px'}, 500);
            }

        });*/

        /*$('.topbar-close').on('click', function(){
            var clickedElement = $(this);
            var hiddenMenuHeight = $('.top-menu-hidden').height() + 40;
            var headerHeight = $('header').height();
            var topPosition = hiddenMenuHeight - headerHeight;
            *//*console.log($('header').height())
            console.log($('.top-menu-hidden').height() + 40)*//*
            if( $('.top-menu-hidden').css('display') == 'none'){
                $('.top-menu-hidden').slideDown(500, function(){
                    var modal = $(this);
                    $('section').on('click', function(event){
                        clickedElement.animate({top: '0px'}, 500);
                        modal.slideUp('slow', function(){
                            $('body').off();
                        });
                    })
                });
                clickedElement.animate({top: topPosition+'px'}, 500);
            } else {
                $('.top-menu-hidden').slideUp(500);
                clickedElement.animate({top: '0px'}, 500);
            }

        });*/

        //sidebar accordion
        var timeout = null;
        $('li.drop').hover(
            function(){
                if(timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                var parentLi = $(this);
                var more = parentLi.find('.menu-item-more');
                more.hide();
                parentLi.find('.last').show();
                parentLi.addClass('clicked');
                parentLi.css('width', '400px');

            },
            function(){
                var parentLi = $(this);
                var more = parentLi.find('.menu-item-more');
                timeout = setTimeout(function(){
                    more.show();
                    parentLi.find('.last').hide();
                    parentLi.removeClass('clicked');
                    parentLi.css('width', '160px');
                }, 500);
            }
        );

        //custom selects
        $('.filter select').styler();
        $('.top-ten select').styler();
        $('#lsit_content').styler();

        $('.filter_type .jq-selectbox__select').on('click', function () {
            if ($('.filter_period:visible')) {
                $('.filter_period .jq-selectbox__dropdown').hide();
            }
        });

        $('.filter_period .jq-selectbox__select').on('click', function () {
            if ($('.filter_type:visible')) {
                $('.filter_type .jq-selectbox__dropdown').hide();
            }
        });

        //fancybox init
        $(".fancybox").fancybox({
             helpers: {
                overlay : {
                    locked : true
                }
            },
            beforeShow: function () {
                history.pushState('', '', $(this.element).attr('href'));
//                  window.location=$(this.element).attr('href');
            },
            afterClose: function() {
                history.pushState('', '', '/videos');
            },
            mouseWheel: false,
            scrolling	: 'auto',
            type: 'ajax',
        });
        $(".fbox").fancybox({
            helpers: {
                overlay : {
                    locked : true // try changing to true and scrolling around the page
                }
            },
            beforeShow: function () {
                history.pushState('', '', $(this.element).attr('href'));
//                  window.location=$(this.element).attr('href');
            },
            afterShow : function() {
                $('span.photo_num').text($(this.element).attr('data-co'));
            },
            afterClose: function() {
                history.pushState('', '', $(this.element).attr('data-alburl'));
            },
            mouseWheel: false,
            scrolling   : 'auto',
            type: 'ajax',
        });

        $(".fi").fancybox({
            helpers: {
                overlay : {
                    locked : true // try changing to true and scrolling around the page
                }
            },
            beforeShow: function () {
                history.pushState('', '', $(this.element).attr('href'));
            },
            afterShow : function() {
                $('span.photo_num').text($(this.element).attr('data-co'));
                $('span.photo_count').text($(this.element).attr('data-count'));
            },
            afterClose: function() {
                history.pushState('', '', $(this.element).attr('data-posturl'));
            },
            mouseWheel: false,
            scrolling   : 'auto',
            type: 'ajax',
        });
        $(".fb_comm").fancybox({'type' : 'image','maxWidth': '90%' });

        $(".pool_choice_img").fancybox({'type' : 'image','maxWidth': '90%' });
	//	$(".fi").fancybox({'type' : 'image','maxWidth': '90%' });


        //mansory init
       /* var $container = $('#mansory-wrapper');
        if($container.html()){
            // initialize
            $container.masonry({
                columnWidth: 150,
                itemSelector: '.mansory-item'
            });
        }

        //horizontal calendar
        $(".date").mouseenter(function() {
            if($(this).children().hasClass("time-line-event")){
                $(this).addClass("event-here")
            }
            $(this).find($(".time-line-event")).css("display", "inline-table");
            $(this).find($(".dayofweek")).css("visibility","visible");
        });

        $(".date").mouseleave(function() {
            $(this).find($(".time-line-event")).css("display", "none");
            $(this).find($(".dayofweek")).css("visibility","hidden");
        });*/

        // Show/hide weather tooltips
        $('.top-menu-hidden .weather .temp-air ul li').hover(
            function() {
                $('.top-menu-hidden .weather .temp-air ul li i').each(function() {
                    if ($(this).hasClass('show_tooltip')) {
                        $(this).removeClass('show_tooltip');
                    }
                });
                var $this = $(this);
                setTimeout(function () {
                    if ($this.is(':hover')) {
                        $this.children('span').children('i').addClass('show_tooltip');
                    }
                }, 500);
            },
            function() {
                $(this).children('span').children('i').removeClass('show_tooltip');
            }
        );
        /*$('.top-menu-hidden .weather .temp-air ul li i').hover(
            function() {
                $('.top-menu-hidden .weather .temp-air ul li i').each(function() {
                    if ($(this).hasClass('show_tooltip')) {

                        $(this).removeClass('show_tooltip');
                    }
                });
                var $this = $(this);
                setTimeout(function () {
                    if ($this.is(':hover')) {
                        $this.addClass('show_tooltip');
                    }
                }, 500);
            },
            function() {
                $(this).removeClass('show_tooltip');
            }
        );*/
        /*$('.top-menu-hidden .weather .temp-air ul li i').mouseout(function() {
        });*/
    });


})(jQuery, window, document);

$(window).resize(function () {
      if($(window).width() > 1902) {
        $('#slider').slick({
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: false

        });
    }
     if($(window).width() > 1182 && $(window).width() < 1903) {
        $('#slider-lg').slick({
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: false

        });
    }
   if($(window).width() > 974 && $(window).width() < 1183) {
        $('#slider-md').slick({
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: false

        });
    }
    if($(window).width() > 750 && $(window).width() < 975) {

        $('#slider-sm').slick({
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: false

        });
    }
    if($(window).width() < 751) {
        $('#swiffycontainer').css('height',$('#swiffycontainer').parent('.wonderful-block').find('.swift_sib').outerHeight());
        $('#slider-xs').slick({
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: false

        });
    }
});

$(document).ready(function () {
    if ($('.header-body .menu li').hasClass('current-menu-item') ) {
        var page_url =  $('.current-menu-item a').attr('href').substr(1);
        $('html').addClass(page_url);
    }
});

$(document).ready(function() {
/*
	$(".weather > .temp-air").hover(function(){
		$( ".weather .temp-air.hidden-temp" ).fadeToggle( "swing", "linear" );
	},
	function() {
		$( ".weather .temp-air.hidden-temp" ).css( "display", "none" );
	});*/
    if($(window).width() > 1902) {
        $('#slider').slick({
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: false

        });
    }
    if($(window).width() > 1182 && $(window).width() < 1903) {
        $('#slider-lg').slick({
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: false

        });
    }
    if($(window).width() > 974 && $(window).width() < 1183) {
        $('#slider-md').slick({
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: false

        });
    }
    if($(window).width() > 750 && $(window).width() < 975) {
        $('#slider-sm').slick({
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: false

        });
    }
    if($(window).width() < 751) {
        $('#slider-xs').slick({
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: false

        });
    }
    if($(window).width() > 767) {
        $('#top_banner_wrap > div.mobile').remove()
    } else {
        $('#top_banner_wrap > div.desktop').remove()
    }
    if ($('#top_banner_wrap > div').length > 1) {
        $('#top_banner_wrap').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 6000,
          arrows: true,
          prevArrow: '.custom-pagination_stat span a.prev_days',
          nextArrow: '.custom-pagination_stat span a.next_days',
        });
    }
    $(".custom-pagination_stat .carousel ul").slick({
		slidesToShow: 14,
		slidesToScroll: 3,
		prevArrow: '.custom-pagination_stat span a.prev_days',
		nextArrow: '.custom-pagination_stat span a.next_days',
		responsive: [
		{
		  breakpoint: 767,
		  settings: {
			slidesToShow: 5
		  }
		}
	  ]
	});
    //$(".nano").nanoScroller({scroll: 'top'});
});


 // $(window).resize(function() {
 //  setTimeout(function() {
 //     var mainDivs = $("#poll_edit .poll-inner .pull-left"); //Получаем все элементы с классом column
 //     var maxHeight = 0;
 //     for (var i = 0; i < mainDivs.length; ++i) {
 //       if (maxHeight < $(mainDivs[i]).height()) { //Находим максимальную высоту
 //           maxHeight = $(mainDivs[i]).height();
 //          }
 //      }
 //      for (var i = 0; i < mainDivs.length; ++i) {
 //       $(mainDivs[i]).height(maxHeight); //Устанавливаем всем элементам максимальную высоту
 //      }
 //     }, 10);
 // });
 // $(document).ready(function() {

 //  setTimeout(function() {
 //     var mainDivs = $("#poll_edit .poll-inner .pull-left"); //Получаем все элементы с классом column
 //     var maxHeight = 0;
 //     for (var i = 0; i < mainDivs.length; ++i) {
 //       if (maxHeight < $(mainDivs[i]).height()) { //Находим максимальную высоту
 //           maxHeight = $(mainDivs[i]).height();
 //          }
 //      }
 //      for (var i = 0; i < mainDivs.length; ++i) {
 //       $(mainDivs[i]).height(maxHeight); //Устанавливаем всем элементам максимальную высоту
 //      }
 //     }, 10);
 // });

/*
 * jQuery autoResize (textarea auto-resizer)
 * @copyright James Padolsey http://james.padolsey.com
 * @version 1.04
 */

(function($){

    $.fn.autoResize = function(options) {

        // Just some abstracted details,
        // to make plugin users happy:
        var settings = $.extend({
            onResize : function(){

            },
            animate : true,
            animateDuration : 150,
            animateCallback : function(){},
            extraSpace : 20,
            limit: 1000
        }, options);

        // Only textarea's auto-resize:
        this.filter('textarea').each(function(){

            // Get rid of scrollbars and disable WebKit resizing:
            var textarea = $(this).css({resize:'none','overflow-y':'hidden'}),

            // Cache original height, for use later:
                origHeight = textarea.height(),


            // Need clone of textarea, hidden off screen:
                clone = (function(){

                    // Properties which may effect space taken up by chracters:
                    var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
                        propOb = {};

                    // Create object of styles to apply:
                    $.each(props, function(i, prop){
                        propOb[prop] = textarea.css(prop);
                    });

                    // Clone the actual textarea removing unique properties
                    // and insert before original textarea:
                    return textarea.clone().removeAttr('id').removeAttr('name').css({
                        position: 'absolute',
                        top: 0,
                        left: -9999
                    }).css(propOb).attr('tabIndex','-1').insertBefore(textarea);

                })(),
                lastScrollTop = null,
                updateSize = function() {
                    // Prepare the clone:
                    clone.height(0).val($(this).val()).scrollTop(10000);

                    // Find the height of text:
                    var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
                        toChange = $(this).add(clone);

                    // Don't do anything if scrollTip hasen't changed:
                    if (lastScrollTop === scrollTop) { return; }
                    lastScrollTop = scrollTop;

                    // Check for limit:
                    if ( scrollTop >= settings.limit ) {
                        $(this).css('overflow-y','');
                        return;
                    }
                    // Fire off callback:
                    settings.onResize.call(this);

                    // Either animate or directly apply height:
                    settings.animate && textarea.css('display') === 'block' ?
                        toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
                        : toChange.height(scrollTop);


                };

            // Bind namespaced handlers to appropriate events:
            textarea
                .unbind('.dynSiz')
                .bind('keyup.dynSiz', updateSize)
                .bind('keydown.dynSiz', updateSize)
                .bind('change.dynSiz', updateSize);

        });

        // Chain:
        return this;

    };

})(jQuery);

$(document).ready(function()
{
    $('.autoresizing').autoResize();

});




$(document).ready(function(){

$('.review-i .custom_submit1 input[type="submit"]').on('click',function() {
$('.coment-popup').css('display','none');
});
jQuery.each(jQuery('textarea#data-autoresize'), function() {
    var offset = this.offsetHeight - this.clientHeight;

    var resizeTextarea = function(el) {
        jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
    };
    jQuery(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
});

/*
 $('#sprite2').isotope({
    itemSelector: '.item',
    masonry: {
      columnWidth: 150,
	  height:100
    }
  });
*/
/*
  setTimeout(function(){
$('#sprite2').masonry({
  // options
  itemSelector: '.item',
  gutter: 4,
  columnWidth: 170
});
},1000);
*/
col_height = $('.hidden-xs.right-collom').height();
$('.photo-all #sprite2').css('min-height',col_height-100+'px');


});

$(window).load(function() {
$('#sprite2').masonry({
  // options
  itemSelector: '.item',
  gutter: 4,
});

});

$(document).ready(function(){
 $('.gall').masonry({
  itemSelector: '.gall-item',
});
});


$(document).ready(function(){
    $('#album_selection select').change(
        function(){
            var album = $(this).val();
            $.ajax({
                url: '/profile/ProposecontentPhoto/selectAlbum',
                type: 'post',
                data: {album_id: album},
                dataType: 'json', //html or something else
                success: function(response) {
                    if (response) {
                        if (!response.error) {
                            $('#add_photo_form #form-fields').html(response.form);
                        }
                    }
                }
            });
            return false;
        }
    );
    $('#add_photo_form').submit(
        function(){
            var errors = false;
            $('div.errorMessage').hide();
            if ($('input#album-id').val() != '777777') {
                if ($('#photo_models_Photo_label').val() == '') {
                    $('#photo_models_Photo_label_em_').text('Укажите, пожалуйста, название фотоальбома').show();
                    errors = true;
                }

                if ($('#photo_models_Photo_author').val() == '') {
                    $('#photo_models_Photo_author_em_').text('Укажите, пожалуйста, автора фотоальбома').show();
                    errors = true;
                }

                if (($('input#album-id').val() == 'new_album') && ($('#photo_models_Photo_comment_user').val() == '')) {
                    $('#photo_models_Photo_comment_user_em_').text('Укажите, пожалуйста, необходимость создания нового фотоальбома').show();
                    errors = true;
                }
            }

            if(!$('input[name^=images]').val()) {
                $('div#photo-dropzone').after(
                    $('<div/>').attr('class', 'errorMessage').text('Вы не выбрали ниодного фото')
                );
                errors = true;
            }

            if (errors === true) {
                return false;
            }
        }
    );
    $(document).addtocopy(
        {
            //Текст, который добавляется при текста с сайта
            htmlcopytxt: '<br>Источник - <a href="'+window.location.href+'">'+window.location.href+'</a>',
            // Минимальное количество символов выделенного текста, меньше которого ссылка на источник добавляться не будет
            minlen:5,
            addcopyfirst: false
        }
    );
});

$('#callbeck_').on('click',function(){

$('.contact_callbeck').slideToggle('700');

});

$(document).ready(function(){
	//$('.label-result .percent_4 span.hight-result').parent().next().find(".result-bar").css('background','#860e0b');
	$('.label-result .percent_4 span.hight-result').parent().next().addClass('best-result');





});

$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});

//// scroll to #comment
$(document).ready(function(){
   //location.hash = "#comment";
    if(location.hash.substring(0, 8) =='#comment'){
        //  hash = location.hash;
        var target = location.hash;
        $('html, body').animate({scrollTop:-100+$(target).offset().top}, 800);
       // console.log('success');
    }
    $('.comment-ico').click(function () {
        var target = "#comment";
        $('html, body').animate({scrollTop:-100+$(target).offset().top}, 800);
    });

    $('.review-i').on('mouseleave', function () {
        $('.coment-popup, .complaint-popup').fadeOut();
    });


    /*if ($("#ev_callendar li:nth-child(3)").hasClass('current-day') && || $("#ev_callendar li:nth-child(3)").hasClass('now-day')) {
        $('#ev_callendar li:nth-child(2) .month').css({'display': 'none'});
    }*/

    ///// сторінка товару
    $('.contact-info li .show-cont').click(function() {
           $(this).siblings().addClass('size');
            $(this).remove();
    });

    $('.show_all_cat li').click(function () {
        if($('.category-list li').hasClass('hidde')) {
            $('.category-list li.hidde').attr("data-show", "1");
            $('.category-list li.hidde').slideDown(300);
            $('.category-list li[data-show]').removeClass("hidde");
            $(this).find('i').text('Спрятать');
        } else {
            $('.category-list li[data-show]').slideUp(300);
            $('.category-list li[data-show]').addClass("hidde");
            $('.category-list li[data-show]').removeAttr("data-show");
            $(this).find('i').text('Открыть все');
        }
    });

    // Відміна спрацювання кнопки в обявлениях
    $('.my-panel4 .share_serv').on("click", function(e) {
        if ($('.pluso.services').hasClass('collaps')){
            $('.pluso.services').removeClass("collaps");
        } else {
            $('.pluso.services').addClass("collaps");
        }
    });


    $(document).on("click", ".share", function () {
        pluso.start();
        $('.pluso').toggle();
        return false;
    });
    $(document).on("click", ".share_a2a", function () {
        $(this).siblings('.a2a_kit').toggle();
    });

    $(document).on("click", "#toggle_menu", function () {
        if ($('.menu').hasClass('open')) {
            $('.menu').slideUp(300);
            $('.menu').removeClass('open')
        } else {
            $('.menu').slideDown(300);
            $('.menu').addClass('open')
        }
    });

});

//кнопка Вверх
var top_show = 150; // В каком положении полосы прокрутки начинать показ кнопки "Вверх"
var delay = 300; // Задержка прокрутки
$(document).ready(function() {
    /*$(window).scroll(function () {
    if ($(this).scrollTop() > top_show) $('.to-top').fadeIn();
    else $('.to-top').fadeOut();
    });
    $('.to-top').click(function () {
    var scTop = $('body').scrollTop();
    $('.to-top').css('display','block').toggleClass('changed');
    $('body, html').animate({
        scrollTop: 0
        }, delay, "linear");
    });

    if (window.pageYOffset > top_show) {
        $(".to-top").css("display","block");
    } */
    var scroll_to_top=$(".to-top");
    scroll_to_top.on("click",function(){
        if(scroll_to_top.hasClass("has_position")){
            scroll_to_top.removeClass("has_position");
            //$.scrollTo(window.last_scroll_position,500,{axis:"y"});
            $('html, body').animate({scrollTop: window.last_scroll_position}, 500);
            window.last_scroll_position=0;
            scroll_to_top.attr("title","Наверх");
            scroll_to_top.find('span').html('Вверх')
        }
        else{
            scroll_to_top.addClass("has_position");
            window.last_scroll_position=window.pageYOffset;
            //$.scrollTo(0,500,{axis:"y"});
            $('html, body').animate({scrollTop: 0}, 500);
            scroll_to_top.attr("title","Вниз");
            scroll_to_top.find('span').html('Вниз')
        }
        return false
    });
    var last_position=0;var is_show=false;
    $(window).scroll(function(){
        if(window.pageYOffset>40){
            if(!is_show){
                scroll_to_top.removeClass("hidden");
                is_show=true;
                scroll_to_top.find('span').html('Вверх')
            }
        }
        else{
            if(is_show){
                scroll_to_top.addClass("hidden");
                is_show=false
            }
        }
        if(last_position<window.pageYOffset){
            if(scroll_to_top.hasClass("has_position")){
                scroll_to_top.removeClass("has_position")
            }
        }
        else{

        }
        last_position=window.pageYOffset
    });
});

$(document).ready(function(){

var t = document.getElementsByTagName('textarea');
var i = 0;while(t[i]){
    if(/comment-submit/.test(t[i].className)){
        t[i].onkeydown = function(e){
            e = window.event || e;
            if(e.keyCode == 13 && e.ctrlKey){
                $(this).closest('form').submit();
            }
        }
    }
    ++i;
}
});

/*(function($){
    var h=$.scrollTo=function(a,b,c){
        $(window).scrollTo(a,b,c)
    };
    h.defaults={
        axis:"xy",duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true
    };
    h.window=function(a){
        return $(window)._scrollable()
    };
    $.fn._scrollable=function(){
        return this.map(function(){
            var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])!=-1;if(!isWin)return a;
            var b=(a.contentWindow||a).document||a.ownerDocument||a;
            return/webkit/i.test(navigator.userAgent)||b.compatMode=="BackCompat"?b.body:b.documentElement
        })
    };
    $.fn.scrollTo=function(e,f,g){
        console.log(e);
        console.log(f);
        console.log(g);
        if(typeof f=="object"){
            g=f;f=0
        }
        if(typeof g=="function")g={
            onAfter:g
        };
        if(e=="max")e=9e9;g=$.extend({},h.defaults,g);
        f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;
        g.offset=both(g.offset);g.over=both(g.over);
        return this._scrollable().each(function(){
            if(e==null)return;
            var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is("html,body");
            switch(typeof targ){
                case"number":case"string":
                if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){
                    targ=both(targ);
                    break
                }
                targ=$(targ,this);
                if(!targ.length)return;
                case"object":if(targ.is||targ.style)toff=(targ=$(targ)).offset()
            }
            $.each(g.axis.split(""),function(i,a){
                var b=a=="x"?"Left":"Top",pos=b.toLowerCase(),key="scroll"+b,old=d[key],max=h.max(d,a);
                if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);
                    if(g.margin){
                        attr[key]-=parseInt(targ.css("margin"+b))||0;
                        attr[key]-=parseInt(targ.css("border"+b+"Width"))||0
                    }
                    attr[key]+=g.offset[pos]||0;
                    if(g.over[pos])attr[key]+=targ[a=="x"?"width":"height"]()*g.over[pos]
                }
                else{
                    var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=="%"?parseFloat(c)/100*max:c
                }
                if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);
                if(!i&&g.queue){
                    if(old!=attr[key])animate(g.onAfterFirst);
                    delete attr[key]
                }
            });
            animate(g.onAfter);
            function animate(a){
                $elem.animate(attr,f,g.easing,a&&function(){
                    a.call(this,targ,g)
                })
            }
        }).end()
    };
    h.max=function(a,b){
        var c=b=="x"?"Width":"Height",scroll="scroll"+c;if(!$(a).is("html,body"))
        return a[scroll]-$(a)[c.toLowerCase()]();
        var d="client"+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;
        return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])
    };
    function both(a){
        return typeof a=="object"?a:{top:a,left:a}
    }
})(jQuery);*/



$(document).ready(function () {
    $('.profile.notice_wrap').hover(function (e) {
        $(this).addClass('hovered');
            var parentOffset = $(this).parent().offset();
            //or $(this).offset(); if you really just want the current element's offset
            var relX = e.pageX - parentOffset.left;
            var relY = e.pageY - parentOffset.top;
            if (relX > $(this).width()-300) {
                $(this).find('.notice').css('left', 'inherit');
                $(this).find('.notice').css('right', 0);
            } else {
                $(this).find('.notice').css('left', relX);
            }
    },function () {
        $(this).removeClass('hovered');
    });
});