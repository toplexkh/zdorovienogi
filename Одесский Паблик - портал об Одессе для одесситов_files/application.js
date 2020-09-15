$(document).ready(function(){
    $('body').on('click','.see_review',function(){
        $(this).parent().siblings('.poll_view').hide();
        $(this).hide();
        $(this).parent().siblings('.poll_review').show();
        $(this).siblings('.see_poll').show();
/*        $('.poll_view').hide();
        $('.see_review').hide();
        $('.see_poll').show();
        $('.poll_review').show();*/
    });
    $('body').on('click','.see_poll',function(){
        $(this).parent().siblings('.poll_review').hide();
        $(this).hide();
        $(this).parent().siblings('.poll_view').show();
        $(this).siblings('.see_review').show();
/*        $('.poll_review').hide();
        $('.see_poll').hide();
        $('.see_review').show();
        $('.poll_view').show();*/
    });

    $('body').on('change','.сhange_period',function(){
        val = $(this).val();
        $.post('/news/gettop',{period:val},function(data){
            $('.top-news-list').html(data);
        });
    });
});

function parseResponse(response)
{
	if (response.error) {
		showError(response.error);
	}
	if (response.refresh) {
		window.location.reload(true);
	}
	if (response.redirect) {
		window.location.href = response.redirect;
	}
	if(response.replaces instanceof Array)
	{
		for(var i = 0, ilen = response.replaces.length; i < ilen; i++)
		{
			$(response.replaces[i].what).replaceWith(response.replaces[i].data);
		}
	}
	if(response.append instanceof Array)
	{
		for(i = 0, ilen = response.append.length; i < ilen; i++)
		{
			$(response.append[i].what).append(response.append[i].data);
		}
	}
	if(response.js)
	{
		$("body").append(response.js);
	}
	jsFunctionsAssign();
}
function jsFunctionsAssign()
{

}
function showError(error)
{
	alert(error);
}



// yii submit form
function submitForm (element, url, params) {
	var f = $(element).parents('form')[0];
	if (!f) {
		f = document.createElement('form');
		f.style.display = 'none';
		element.parentNode.appendChild(f);
		f.method = 'POST';
	}
	if (typeof url == 'string' && url != '') {
		f.action = url;
	}
	if (element.target != null) {
		f.target = element.target;
	}

	var inputs = [];
	$.each(params, function(name, value) {
		var input = document.createElement("input");
		input.setAttribute("type", "hidden");
		input.setAttribute("name", name);
		input.setAttribute("value", value);
		f.appendChild(input);
		inputs.push(input);
	});

	// remember who triggers the form submission
	// this is used by jquery.yiiactiveform.js
	$(f).data('submitObject', $(element));

	$(f).trigger('submit');

	$.each(inputs, function() {
		f.removeChild(this);
	});
}



$(function(){
	
/*	var photo_length = $('.news-photo-wrapper .row .fancybox.news-preview').length;
	if (photo_length == 1) {
		$('.news-photo-wrapper .row .fancybox.news-preview').each(function(key) {
			$(this).wrapAll("<div class='col-xs-12'></div>");
		});
	}
	if (photo_length == 2) {
		$('.news-photo-wrapper .row .fancybox.news-preview').each(function(key) {
			$(this).wrapAll("<div class='col-lg-6 col-md-12 col col-sm-6 col-xs-12'></div>");
		});
	}
	if (photo_length >= 3) {
		$('.news-photo-wrapper .row .fancybox.news-preview').each(function(key) {
			$(this).wrapAll("<div class='col-xl-4 col-lg-6 col-md-12 col-sm-6 col-xs-12'></div>");
		});
	}*/


	$(document).on('submit', 'form.ajax-form', function (event) {
		event.preventDefault();
		var that = this;
		$(that).find('input[type="submit"]').css('pointer-events','none');
		var preloader = $(that).closest('form').find('#message-preloader');
		if (preloader.length > 0) {
			preloader.show();
		}
		jQuery.ajax({'cache': false, 'type': 'POST', 'dataType': 'json', 'data':$(that).serialize(), 'success': function (response) {
			parseResponse(response);
			if (response.this_Complaint==true){
				$(that).find('.'+response.class_mess).attr('style', response.style_mess);
                $(that).find('.'+response.class_mess).append(response.text_mess);
                setTimeout(function () {
					$('.complaint-popup').hide();
					$(that).find('.'+response.class_mess).empty();
					$(that)[0].reset();
				}, 1000);
			}
			if($(that).parent().attr("class")=='coment-popup'){
				$(that).parent().css('display', 'none');
			}
		}, 'error': function (response) {
			alert(response.responseText);
		}, 'beforeSend': function() {

		}, 'complete': function() {
			$(that).find('input[type="submit"]').css('pointer-events','all');
			if (preloader.length > 0) {
				preloader.hide();
			}
		}, 'url': this.action});
		return false;
	});

	$(document).on('submit', 'form.comment-ajax-form', function (event) {
		event.preventDefault();
		var that = this;
		var temp = $(that).attr('id');
		form_id = temp.replace("comment_form", "");
		$(that).find('button[type="submit"]').css('pointer-events','none');
		jQuery.ajax({'cache': false, 'type': 'POST', 'dataType': 'json', 'data':$(that).serialize(),
		 'success': function (response) {
		 	if (form_id==''){
		 		$(response.comment).insertBefore($('#leave-comment'));;
		 	}
		 	else{
		 		$('#comment-'+form_id).append(response.comment);
		 	}
            $('.collapseForm').collapse('hide');
            var target = '#comment-'+response.comment_id;
        	$('html, body').animate({scrollTop:-100+$(target).offset().top}, 800);
            location.hash='#comment-'+response.comment_id;
		}, 'error': function (response) {
			alert(response.responseText);
		}, 'beforeSend': function() {

		}, 'complete': function(json) {
			$(that).find('button[type="submit"]').css('pointer-events','all');
		}, 'url': this.action});
		return false;
	});

	$(document).on('submit', 'form.reviev-ajax-form', function (event) {
		event.preventDefault();
		var that = this;
		var targetDiv = $(that).closest('div.review');
        var divPadding = $(targetDiv).css('padding-left');
        divPadding = parseInt(divPadding) + 10;
        divPadding += 'px';
		jQuery.ajax({'cache': false, 'type': 'POST', 'dataType': 'json', 'data':$(that).serialize(), 'success': function (response) {
			if (response.this_Complaint==true){
				$(that).find('.'+response.class_mess).attr('style', response.style_mess);
                $(that).find('.'+response.class_mess).append(response.text_mess);
                setTimeout(function () {
					$('.complaint-popup').hide();
					$(that).find('.'+response.class_mess).empty();
					$(that)[0].reset();
				}, 1000); 
			}
			else{
				var div = document.createElement('div');
	            $(div).css('padding-left', divPadding);
	            $(div).append(response.comment);
	            targetDiv.after(div);            
	            $('.coment-popup').hide();
	            location.hash='#comment-'+response.comment_id;
	        }
		}, 'error': function (response) {
			alert(response.responseText);
		}, 'beforeSend': function() {

		}, 'complete': function() {
		}, 'url': this.action});
		return false;
	});

	$(document).on('submit', 'form.messages-ajax-form', function (event) {
		event.preventDefault();
		var that = this;
		jQuery.ajax({'cache': false, 'type': 'POST', 'dataType': 'json', 'processData':false, 'contentType': false, 'data': new FormData(this), 'success': function (response) {
			parseResponse(response);
			if (response.this_Complaint==true){
				$('.'+response.class_mess).attr('style', response.style_mess);
                $('.'+response.class_mess).append(response.text_mess);
                setTimeout(function () {
					$('.complaint-popup').hide();
					$(that).find('.'+response.class_mess).empty();
					$(that)[0].reset();
					$(that).find(".img-preview").empty();
				}, 1000); 
			}			
			if($(that).parent().attr("class")=='coment-popup'){
				$(that).parent().css('display', 'none');
			}
		}, 'error': function (response) {
			alert(response.responseText);
		}, 'beforeSend': function() {

		}, 'complete': function() {

		}, 'url': this.action});
		return false;
	});

	
	$(document).on('click', 'a.submit-form-link', function (event) {
		var that = this;
		if(!$(that).data('confirm') || confirm($(that).data('confirm'))) {
			submitForm(
				that,
				that.href,
				$(that).data('params')
			);
			return false;
		} else {
			return false;
		}
	});

	$(document).on('click', 'a.ajax-link', function (event) {
		event.preventDefault();
		var that = this;
		if($(that).data('confirm') && !confirm($(that).data('confirm'))) {
			return false;
		}

		jQuery.ajax({'cache': false, 'type': 'POST', 'dataType': 'json', 'data':$(that).data('params'), 'success': function (response) {
			parseResponse(response);
		}, 'error': function (response) {
			alert(response.responseText);
		}, 'beforeSend': function() {

		}, 'complete': function() {

		}, 'url': that.href});
		return false;
	});
	$(document).on('click', '.preview .panel > .delete', function(e) {

        var selector = $(this);

        $.get(this.href, { },
            function(data) {
                if(data.error === false) {
                    selector.closest('.preview').fadeOut(300, function() {
                        $(this).remove();
                    });
                }
            }, 'JSON'
        );

        return false;
    });
    $(document).on('click', '#delete', function(e) {
    	e.preventDefault();
        $.get($(this).data('url'), { },
            function(data) {
                if(data.error === false) {
                	$(".user-image.img-preview").css({"background-image" : "url(\'/themes/public/images/profile/user-default-image.jpg\')"});
                    $("#delete").removeData("url");
					$("#delete").text("Изменить аватар");					
					$("#delete").attr("id", "load");
					$("#facebook_load").show();
					$("#vkontakte_load").show();					
                }
            }, 'JSON'
        );

        return false;
    });
    $(document).on('click',"#load",function(e){
		e.preventDefault();
		$('#users_models_Users_image_id').click();
	}); 
	$(document).on('click',"#facebook_load, #vkontakte_load",function(e){
		e.preventDefault();
		var $this=$(this);
		$.get($(this).data('url'), { },
            function(response) {
                if(response.error === false) {
                	console.log(response);
                	$(".user-image.img-preview").css({"background-image" : "url(\'"+response.image_src+"\')"});

					$("#load").data("url", response.image_delete);
					$("#load").text("Очистить");
					$("#load").attr("id", "delete");
					$("#facebook_load").hide();
					$("#vkontakte_load").hide();					
                }
            }, 'JSON'
        );
	}); 
	$(document).on('click', '.deleteServiceImage', function() {
        var selector = $(this);

        $.get(this.href, { },
            function(data) {
                if(data.error === false) {
                    selector.closest('.col-xs-4').fadeOut(300, function() {
                        $(this).remove();
                    });
                }
            }, 'JSON'
        );

        return false;
    });

	$('body').on('click','.icon-good',function(){
        // Если есть кнопка с id = btnLoginOpen, значит пользователь не залогинился, нужно ему предложить
        if ($('#btnLoginOpen').val() !== undefined) {
            $('#btnLoginOpen').click();
            return false;
        }

		var $this=$(this);
		$.ajax({
			url: '/comments/up',
			type: 'GET',
			data: {
				id: $this.closest('.review__header').attr('data-id')
			},
			success: function(data){
				$this.closest('.review__header').find('span.good-count').text(data);
				minus = $this.closest('.review__header').find('span.bad-count').text();
				$this.closest('.review__header').find('span.summary-count').text(parseInt(data)-parseInt(minus));
			}
		});
		return false;
	});

	$('body').on('click','.icon-bad',function(){
        // Если есть кнопка с id = btnLoginOpen, значит пользователь не залогинился, нужно ему предложить
        if ($('#btnLoginOpen').val() !== undefined) {
            $('#btnLoginOpen').click();
            return false;
        }

		var $this=$(this);
		$.ajax({
			url: '/comments/down',
			type: 'GET',
			data: {
				id: $this.closest('.review__header').attr('data-id')
			},
			success: function(data){
				$this.closest('.review__header').find('span.bad-count').text(data);
				pluss = $this.closest('.review__header').find('span.good-count').text();
				$this.closest('.review__header').find('span.summary-count').text(parseInt(pluss)-parseInt(data));
			}
		});
		return false;
	});

	$('.review__add-w .review__add').on('click', function (e) {
		e.preventDefault();
		$(this).parent().find('.coment-popup').fadeIn();
		//$('.review__add-w .coment-popup').fadeIn();
	})

	$('.review__add-w .coment-popup .icon-close-btn').on('click', function (e) {
		e.preventDefault();
		$(this).parent().fadeOut();
		//$('.review__add-w .coment-popup').fadeOut();
	})

	$('.review__add-w .coment-popup .btn-submit').on('click', function (e) {
		e.preventDefault();
		$('.review__add-w .coment-popup').fadeOut();
	})

	$('body').on('click', '.ratings .like',function (e) {
		var $parent=$(this).closest('.ratings');
		e.preventDefault();
		$.ajax({
			url: '/favorites/like',
			type: 'GET',
			data: {
				id: $parent.attr('data-id'),
				type: $parent.attr('data-type')
			},
			success: function(json){
				if(json){
					var data=$.parseJSON(json);
					if(data.plus){
						sum = data.plus*1 + data.minus*1;
						percplus = Math.round((data.plus/sum)*100);
						percminus = 100 - percplus;
						$parent.find('.like span').text(data.plus);
						$('.ratings-line .like-line:first-child').css('width',percplus+'%');
						$('.ratings-line .like-line:last-child').css('width',percminus+'%');
						if (percminus == 0) ntext = '100% нравится';
						else ntext = percplus+'% нравится';
						$('p.numbers').text(ntext);
					}
					if(data.minus){
						sum = data.plus*1 + data.minus*1;
						percminus = Math.round((data.minus/sum)*100);
						percplus = 100 - percminus;
						$parent.find('.dislike span').text(data.minus);
						$('.ratings-line .like-line:first-child').css('width',percplus+'%');
						$('.ratings-line .like-line:last-child').css('width',percminus+'%');
						if (percplus == 0) ntext = 'никому не нравится';
						else ntext = percplus+'% нравится';
						$('p.numbers').text(ntext);
					}
					if(data.message)
						if (data.message='login')  {$("#btnLoginOpen").click();
						$("#active-header .container .topbar-plus-2 span").css('display','block');
						}
						else {alert(data.message);
							$("#active-header .container .topbar-plus-2 span").css('display','none');
						}
				}
			}
		});
	})

	$('body').on('click', '.ratings .dislike',function (e) {
		var $parent=$(this).closest('.ratings');
		e.preventDefault();
		$.ajax({
			url: '/favorites/dislike',
			type: 'GET',
			data: {
				id: $parent.attr('data-id'),
				type: $parent.attr('data-type')
			},
			success: function(json){
				if(json){
					var data=$.parseJSON(json);
					if(data.plus){
						sum = data.plus*1 + data.minus*1;
						percplus = Math.round((data.plus/sum)*100);
						percminus = 100 - percplus;
						$parent.find('.like span').text(data.plus);
						$('.ratings-line .like-line:first-child').css('width',percplus+'%');
						$('.ratings-line .like-line:last-child').css('width',percminus+'%');
						if (percminus == 0) ntext = '100% нравится';
						else ntext = percplus+'% нравится';
						$('p.numbers').text(ntext);
					}
					if(data.minus){
						sum = data.plus*1 + data.minus*1;
						percminus = Math.round((data.minus/sum)*100);
						percplus = 100 - percminus;
						$parent.find('.dislike span').text(data.minus);
						$('.ratings-line .like-line:first-child').css('width',percplus+'%');
						$('.ratings-line .like-line:last-child').css('width',percminus+'%');
						if (percplus == 0) ntext = 'никому не нравится';
						else ntext = percplus+'% нравится';
						$('p.numbers').text(ntext);
					}
					if(data.message)
						if (data.message='login') {$("#btnLoginOpen").click();
						$("#active-header .container .topbar-plus-2 span").css('display','block');
						}
						else {alert(data.message);
							$("#active-header .container .topbar-plus-2 span").css('display','none');
						}			
				}
			}
		});
	})

	$('body').on('click', '.service-favorite .add-favorite',function (e) {

		var $parent=$(this).closest('.service-favorite');
		e.preventDefault();
		$.ajax({
			url: '/servicefavorite/favorit',
			type: 'GET',
			data: {
				id: $parent.attr('data-id'),
				type: $parent.attr('data-type')
			},
			success: function(json){
				if(json){
					var data=$.parseJSON(json);
					if(data.add){
						if ($parent.hasClass('oppened_item')) {
							$('.service-favorite[data-type="4"] img').attr('src', '/themes/public/images/icons/'+data.add);
							$('.service-favorite[data-type="3"] img').attr('src', '/themes/public/images/icons/'+data.add_small);
						} else {
							$parent.find('.add-favorite img').attr('src', '/themes/public/images/icons/'+data.add);
						}
					}
					else {
						/*window.location.href = "/users/registration";*/
						$("#btnLoginOpen").click();
					}
				}
			}
		});
	})
});
$(document).ready(function(){
	
    $('#sprite').isotope({
        itemSelector: '.item',
        layoutMode: 'masonry',
        cellsByRow: {
            columnWidth: 200,
            rowHeight: 150
        },
    });

	$('.l_region').click(function(e) {		
		$(this).prev().prop('checked', $(this).prev().is(':checked') ? false : true);
		var checked_option = $('input.c_region:checked');
		var checked_option_cat = $(this).prev().attr('data-cat');
		var res='';
		checked_option.each( function(ind) {			
				res += this.value;
				if (ind < checked_option.length - 1) res +=',';
		});

		console.log(res);

		if(checked_option===undefined)
		{
			alert('Please select both options!');
		}else{
			//alert('Your option - "' +checked_option_radio + '"');
			$.ajax({
				url: '/refbook/load',
				type: 'GET',
				data: {
					region_id: res,
					alias: checked_option_cat
				},
				dataType: 'json',
				success: function(data){
					if (data.table_rows) {
						$("#containerMap").empty();
						$(".bodyt").html(data.table_rows);
					}
					else {
						console.log(data);
					}
				}
			});
		}

	});

	$('.l_region').click(function(e) {		
//		$(this).prev().prop('checked', $(this).prev().is(':checked') ? false : true);
		var checked_option = $('input.c_region:checked');
		var checked_option_cat = $(this).prev().attr('data-cat');
		var res='';
		checked_option.each( function(ind) {			
				res += this.value;
				if (ind < checked_option.length - 1) res +=',';
		});
		if(checked_option===undefined)
		{
			alert('Please select both options!');
		}else{
			//alert('Your option - "' +checked_option_radio + '"');
			$.ajax({
				url: '/refbook/load',
				type: 'GET',
				data: {
					region_id: res,
					alias: checked_option_cat
				},
				dataType: 'json',
				success: function(data){
					if (data.table_rows) {
						$("#containerMap").empty();
						$(".bodyt").html(data.table_rows);
					}
					else {
						console.log(data);
					}
				}
			});
		}

	});
	$('.lm_region').click(function(e) {
		$(this).prev().prop('checked', $(this).prev().is(':checked') ? false : true);
		$('.l_region[for='+$(this).attr('for')+']').click();
	});

	$('.add-foto-w a').click(function(){
		$('#projects_models_ProjectsImages_file_id').click();
	});
});

$(document).ready(function() {
	$('.for_translation').each(function(key) {
		$(this).attr('data-id', key);
	});

	$('.alias').each(function(key) {
		$(this).attr('data-id', key);
	});

	$('.for_translation').on('keyup', function() {
		var for_translation_id = $(this).attr('data-id');
		var transliteration_string = $(this).transliteration();

		$('.alias[data-id="' + for_translation_id + '"]').val(transliteration_string);

		return false;
	});
});
(function( $ ) {
	$.fn.transliteration = function() {
		var value = $(this).val();
		var symbols = {
			'А':'A','а':'a','Б':'B','б':'b','В':'V','в':'v','Г':'G','г':'g',
			'Д':'D','д':'d','Е':'E','е':'e','Ё':'Yo','ё':'yo','Ж':'Zh','ж':'zh',
			'З':'Z','з':'z','И':'I','и':'i','Й':'Y','й':'y','К':'K','к':'k',
			'Л':'L','л':'l','М':'M','м':'m','Н':'N','н':'n','О':'O','о':'o',
			'П':'P','п':'p','Р':'R','р':'r','С':'S','с':'s','Т':'T','т':'t',
			'У':'U','у':'u','Ф':'F','ф':'f','Х':'Kh','х':'kh','Ц':'Ts','ц':'ts',
			'Ч':'Ch','ч':'ch','Ш':'Sh','ш':'sh','Щ':'Sch','щ':'sch','Ъ':'','ъ':'',
			'Ы':'Y','ы':'y','Ь':"",'ь':"",'Э':'E','э':'e','Ю':'Yu','ю':'yu',
			'Я':'Ya','я':'ya',' ':'-','W':'W','w':'w','X':'X','x':'x','Q':'Q','q':'q',
			'J':'J','j':'j',
			'0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9'
		}

		var str = new String();
		var en_symbol = [];

		for(key in symbols) en_symbol += symbols[key];

		for(var i = 0; i < value.length; i++) {
			if(typeof(symbols[value[i]]) !== "undefined") {
				str += symbols[value[i]];
			}
			else if(en_symbol.indexOf(value[i]) !== -1) {
				str += value[i];
			}
			else {
				str += "";
			}
		}

		return str.toLowerCase();
	};
})(jQuery);

$(document).ready(function(){

    /*$(".fbox").fancybox({
        'mouseWheel': false,
        'scrolling'	: 'auto',
        'type': 'ajax'
    });*/
	/*$(".fbox").fancybox({
            beforeShow: function () {
            	$('html').addClass('fancybox-lock');
                $('html').addClass('fancybox-margin');
                history.pushState('', '', $(this.element).attr('href'));
               
//                  window.location=$(this.element).attr('href');
            },
            afterShow : function() {
				$('span.photo_num').text($(this.element).attr('data-co'));
            },
            afterClose: function() {
            	$('html').removeClass('fancybox-lock');
                $('html').removeClass('fancybox-margin');
                history.pushState('', '', $(this.element).attr('data-alburl'));                
            },
            mouseWheel: false,
            scrolling	: 'auto',
            type: 'ajax',
        });*/

//    $('.fancy-attach').fancybox(); // photos inside articles
    $('.message-fancybox').fancybox();

    $('input[type=radio]').change(function(e){
        var $val = $(this).val();
            $('.vote-send').attr("data-choice",$val);
    });
	$('.vote-send').click(function(e) {
		var $choice = $(this).attr('data-choice');
        if($choice!=1){
            var $poll = $(this).attr('data-poll');
            var $show = $(this).attr('data-show');
            var $sidebar = $(this).attr('data-sidebar');
            var $this_poll = $(this).closest('.poll-wrapper');
            var $sidebar_poll = $(this).closest('.poll-sidebar');
            if(!$this_poll.length) {
                $this_poll = $(this).closest('div');
                $this_poll.siblings('div,p').remove();
            }
            e.preventDefault();
            $.ajax({
                url: '/polls',
                type: 'get',
                //dataType: 'json',
                data: {choice:$choice,poll:$poll,show:$show,sidebar:$sidebar},
                success: function(data){
                	$sidebar_poll.replaceWith($(data));
                    $this_poll.replaceWith($(data));
                }
            });
        }else{
            alert('Выберите вариант ответа');
            return false;
        }
	});	 
});

$(document).on('click', '#add_news', function () {
	$("#lsit_content :nth-child(1)").attr("selected", "selected");
	$("div#mesages").empty();
	$("div#mesages").append("  Для размещения полной информации, укажите в коментарии краткий обзор новости, категорию и дополнительнюю информацию для администрации сайта");	
 });
 $(document).on('click', '#add_event', function () {
	$("#lsit_content :nth-child(4)").attr("selected", "selected");
	$("div#mesages").empty();
	$("div#mesages").append("  Для размещения полной информации, укажите в коментарии краткий обзор мероприятия, категорию, дату и адрес проведения, цену (можно указать начальную и конечную), распорядок, категорию, предприятие и дополнительнюю информацию для администрации сайта");	
 });
  $(document).on('click', '#add_enterprises', function () {
	$("#lsit_content :nth-child(5)").attr("selected", "selected");
	$("div#mesages").empty();
	$("div#mesages").append("  Для размещения полной информации, укажите в коментарии район размещения предприятия, категорию, адрес, телефоны, время работы и дополнительнюю информацию для администрации сайта");	
 });

$(document).on('change', '#lsit_content', function () {
	switch(this.value) {
    case '1':
        $("div#mesages").empty();
		$("div#mesages").append("  Для размещения полной информации, укажите в коментарии краткий обзор новости, категорию и дополнительнюю информацию для администрации сайта");
        break;
    case '2':
        $("div#mesages").empty();
		$("div#mesages").append("  Для размещения полной информации, укажите в коментарии краткий обзор статьи, категорию и дополнительнюю информацию для администрации сайта");
        break;
    case '3':
        $("div#mesages").empty();
		$("div#mesages").append("  Для размещения полной информации, укажите в коментарии краткий обзор видео, категорию и дополнительнюю информацию для администрации сайта");
        break;
    case '4':
        $("div#mesages").empty();
		$("div#mesages").append("  Для размещения полной информации, укажите в коментарии краткий обзор мероприятия, категорию, дату и адрес проведения, цену (можно указать начальную и конечную), распорядок, категорию, предприятие и дополнительнюю информацию для администрации сайта");
        break;
    case '5':
        $("div#mesages").empty();
		$("div#mesages").append("  Для размещения полной информации, укажите в коментарии район размещения предприятия, категорию, адрес, телефоны, время работы и дополнительнюю информацию для администрации сайта");
        break;  
	}	
});
$(document).ready(function(){
    $(document).on('click','a.delete-message', function(){
        if (!confirm('Удалить сообщение?')) {
            return false;
        }
        var threadID = $(this).attr('data-target');
        var interlocutorID = $(this).attr('data-interlocutor');
        var messageID = $(this).attr('data-messageid');
        var self = $(this);
        $.ajax({
            url: '/profile/services/messages/delete',
            type: 'post',
            data: {thread_id:threadID,interlocutor:interlocutorID,messageid:messageID},
            dataType: 'json',
            success: function(response) {
                if(response.status === true) {
                    self.parent().parent().remove();
                }
            }
        });
        return false;
    });

    $(document).on('click','a.readed-message', function(){
        var url = $(this).attr('href');
        var self = $(this);
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            success: function(response) {
                if(response.status === true) {
	            	var row = self.closest('tr');
	            	row.removeClass('not_readed');
                }
                if (response.unread_count != 0) {
                	$('#active-header .message > span').html('+'+response.unread_count);
                }else {
                	$('#active-header .header-but-nav-container.right').remove();
                }
            }
        });
        return false;
    });

    $(document).on('click', '.table .favorite-remove',function (e) {
    	e.preventDefault();
    	if (!confirm('Удалить из избранных?')) {
            return false;
        }
		var self = $(this);
		$.ajax({
			url: '/servicefavorite/favorit',
			type: 'GET',
			dataType: 'json',
			data: {
				id: $(this).data("id"),
				type: $(this).data("type"),
			},
			success: function(data){
				if(data.add)
					self.parent().parent().remove();				
			}
		});
	});

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    	if($(e.target).data('url')){
		  	var target = $(e.target).attr("href"); // activated tab
		  	var target_par = target;
		  	var data = '';		  	
		 	if($(e.target).data('render')) target = $(e.target).data('render');
		 	var content = target;
		 	if($(e.target).data('content')) content = $(e.target).data('content');
		  	$.ajax({
	            url: $(e.target).data('url'),
	            type: 'post',
	            success: function(response) {
	                $(content).html(response);
	                /*$('#pjax-container').removeAttr('id');*/
	                $(target_par).find('li').removeClass("active");
	                $(target_par).find('[role="tabpanel"]').removeClass("active");
	                $(target).addClass("active");
	                if(content!=target){
	                	$(content).addClass("active");
	                	var linkActive = $('a[href="'+content+'"]');
	                	linkActive.closest('li').addClass("active");	

	                }
	                $(target_par).find('a[href="'+target+'"]').parent().addClass("active");
	            }
	        });
	    }	  
	});
    
	$(document).on('click', '.profile_pager_link > a', function (e) {
		e.preventDefault();
		var target = $(this).closest('[role="tabpanel"]');
		var parTarget = target.closest('.tab-content');
		var regex = new RegExp("[\\?&]page=([^&#]*)");

        results = regex.exec($(this).attr('href'));

  		var page = results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		var url = parTarget.prev().find('li.active a').data('url');
		//console.log($(this).attr('href'));
		$.ajax({
	            url: url,
	            type: 'get',
	            data: "page="+page,
	            success: function(response) {
	                target.html(response);
	               
	            }
	        });
	});
	$(document).on('click', '.count_mes > a', function (e) {	
		e.preventDefault();	
		var target = $(this).attr("href"); // activated tab
	  	var target_par = target;		  	
	  	$(this).tab('show');
	 	if($(this).data('render')) target = $(this).data('render');	 		 	
	  	$.ajax({
            url: $(this).data('url'),
            type: 'post',
            data: "thread="+$(this).data("thread"),
            success: function(response) {
                $(target).html(response);
                $(target_par).find('li').removeClass("active");
                $(target_par).find('[role="tabpanel"]').removeClass("active");
                $(target).addClass("active");
                var linkActive = $('a[href="'+target+'"]');
                var parLink = $('a[href="'+target_par+'"]').closest('ul');
                parLink.find('li').removeClass("active");
                linkActive.parent('li').addClass("active");
                $('a[href="'+target_par+'"]').parent('li').addClass("active");
            }
        });

	});

	$(document).on('click', 'a.listMessage', function (e) {
		e.preventDefault();
		var forRepl = $(this).closest('[role="tabpanel"]');	  	
		$.ajax({
	            url: $(this).attr("href"),
	            type: 'post',
	            success: function(response) {	            	
	                forRepl.html(response);	 
	            	$('[href="#'+forRepl.attr('id')+'"]').parent().removeClass("active");              
	            }
	        });
	});
	$(document).on('change', '#services_models_ServicesMessages_file', function (e) {		
		readURL(this);
	});
	$(document).on('change', '#select_reason', function (e) {		
		if($(this).val()=='other_reason'){
			$(this).next('#other_reason').show();
		}
		else{
			$(this).next('#other_reason').hide();
		}
	});

	$(document).on('click', '.send_reason', function (e) {
		e.preventDefault(); 
		var id = $(this).data("id");
		$.ajax({
            url: $(this).data("url"),
            type: 'post',
            dataType: 'json',
            data:'reason='+$('#select_reason').val()+'&id='+id+'&other_reason='+$('#other_reason').val(),
            success: function(response) {
            	if(response.status === true) {
                    $('#service_'+id).remove();
                    $('#deletService').modal('hide');
                }      
            }
        });
	});

	$(document).on('change', '#select_status', function (e) {	
		$.ajax({
            url: '/profile/services',
            type: 'post',
            data:'status='+$(this).val(),
            success: function(response) {
            	$('#objavlenia').html(response);                    
            }
        });
	});

	$(document).on('click', '.delete_draft', function (e) {
		e.preventDefault(); 
		if (!confirm('Удалить сообщение?')) {
            return false;
        }
		var id = $(this).data("id");
		$.ajax({
            url: $(this).attr("href"),
            type: 'post',
            dataType: 'json',
            data:'id='+id,
            success: function(response) {
            	if(response.status === true) {
                    $('#service_'+id).remove();
                }      
            }
        });
	});
	
});
	$("#add_news").click(function(){
		$('html').css("overflow",'hidden');
	});
	$("#add_event").click(function(){
		$('html').css("overflow",'hidden');
	});
	$("#add_enterprises").click(function(){
		$('html').css("overflow",'hidden');
	});
    $('#add_photo').click(function(){
        $('html').css('overflow', 'hidden');
    });
	$('.close_add_content > a').click(function(){
		$('html').css("overflow",'auto');
	});
$('.main_link').click(function(){
	$('.main_author').stop().fadeToggle();
})

$("#publications .tab").click(function() {
  $("#publications .tab").removeClass("active").eq($(this).index()).addClass("active");
  $(".tab_item").hide().eq($(this).index()).fadeIn()
 });
$(".tab_content .tabRow1").click(function() {
  $(".tab_content .tabRow1").removeClass("active").eq($(this).index()).addClass("active");
  $(".tab_itemRow1").hide().eq($(this).index()).fadeIn()
 });
$(".tab_content .tabRow2").click(function() {
  $(".tab_content .tabRow2").removeClass("active").eq($(this).index()).addClass("active");
  $(".tab_itemRow2").hide().eq($(this).index()).fadeIn()
 });
$(".tab_content .tabRow3").click(function() {
  $(".tab_content .tabRow3").removeClass("active").eq($(this).index()).addClass("active");
  $(".tab_itemRow3").hide().eq($(this).index()).fadeIn()
 });
$(".tab_content .tabRow4").click(function() {
  $(".tab_content .tabRow4").removeClass("active").eq($(this).index()).addClass("active");
  $(".tab_itemRow4").hide().eq($(this).index()).fadeIn()
 });
$("#activity .tab_a").click(function() {
  $("#activity .tab_a").removeClass("active").eq($(this).index()).addClass("active");
  $(".tab_item_a").hide().eq($(this).index()).fadeIn()
 });
$("#activity .tab_in").click(function() {
  $("#activity .tab_in").removeClass("active").eq($(this).index()).addClass("active");
  $(".tab_item_in").hide().eq($(this).index()).fadeIn()
 });


function readURL(input) {
	if (input.files) {
		var allfiles = input.files;
		var i=0;
		while(i<allfiles.length){
			$(input).prev().empty();
			var reader = new FileReader();
			reader.onload = function (e) {
		    	$(input).prev().append("<div style='float:left; margin:2px; width:50px; height: 50px; background-size: cover; background-image: url("+e.target.result+")'></div>");    	
		    	
		    }
		    reader.readAsDataURL(input.files[i]);
		    i++;
		}		
	}
}
var cPhones = 2;
function addNewPhone() {
    html  = '<div class="controls input-group" style="clear:both">';
    html  += '<div class="input-group-addon"><i class="fa fa-phone"><\/i><\/div>';
    html  += '<input id="in_phone_'+cPhones+'" class="span6 form-control" name="in_phone[value][]" type="text">';
    html  += '<input type="hidden" name="in_phone[id][]" value="0">';
    html  += '<button type="button" onclick="$(this).parent().remove();" data-toggle="tooltip" title="Remove" class="btn btn-danger"><i class="fa fa-minus-circle"><\/i><\/button>'; 
    html  += '<\/div>'; 
    html  += '<script>jQuery("#in_phone_'+cPhones+'").mask("+38(999)9999999");</script>';
  	$('#phone_container').append(html);
  	cPhones++;
}