﻿$(function(){
	
	
	var $form = $(".excursion-form"),
		$select = $(".country-select"),
		$fakeSelect = $(".country-select-span"),
		$values = $select.first().find("option:not(:disabled)"),
		$selectInfo = $(".countries"),
		$slider = $(".slider"),
		$window = $(window);
		
	$window.on("resize",function(){
		setTimeout(function(){
			$("#body").css("padding-top",$("header").height());
			$(".active+.description").calcPosition();
		}, 100);
	});
	$window.trigger("resize");
	
	$(".tabs").tabs();
	
	$.extend(true, $.magnificPopup.defaults, {
		tClose: 'Закрыть (Esc)',
		tLoading: 'Загрузка...',
		gallery: {
			tPrev: 'Назад (Клавиша влево)',
			tNext: 'Вперед (Клавиша вправо)',
			tCounter: '%curr% из %total%'
		},
		image: {
			tError: 'Не удалось загрузить <a href="%url%">изображение</a>.'
		},
		ajax: {
			tError: 'Не удалось загрузить <a href="%url%">содержимое</a>.'
		},
		closeMarkup: '<div title="%title%" class="mfp-close">&times;</div>',
		mainClass: 'mfp-fade',
		removalDelay: 300,
		fixedContentPos: false
	});

	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '&#x3c;Пред',
		nextText: 'След&#x3e;',
		currentText: 'Сегодня',
		monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
		dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
		dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		weekHeader: 'Нед',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
	
    $(".date").datepicker($.extend(
		{
			inline: true,
			changeYear: true,
			changeMonth: true,
		},
		$.datepicker.regional['ru']
	));



	$(".date-choose>div").slick({
		infinite:true,
		slidesToScroll:3,
		slidesToShow: 7,
		prevArrow:"<button class='slick-prev'/>",
		nextArrow:"<button class='slick-next'/>",
		//variableWidth: true,
		responsive: [
			{
				breakpoint: 1550,
				settings: {slidesToShow: 7}
			},
			{
				breakpoint: 1280,
				settings: {slidesToShow: 5}
			},
			{
				breakpoint: 600,
				settings: {slidesToShow: 3}
			}
		]
	});
	

	
	$(".excursion-slider").slick({
		infinite:true,
		slidesToScroll:4,
		slidesToShow: 4,
		prevArrow:"<button class='slick-prev'/>",
		nextArrow:"<button class='slick-next'/>",
		responsive: [
			{
				breakpoint: 1280,
				settings: {slidesToShow: 4,slidesToScroll:4}
			},
			{
				breakpoint: 1024,
				settings: {slidesToShow: 3,slidesToScroll:3}
			},
			{
				breakpoint: 768,
				settings: {slidesToShow: 2,slidesToScroll:2}
			}
		]
	});
	
	$(".excursion-slider").magnificPopup({
		delegate:".slick-slide:not(.slick-cloned)",
		type:"image",
		gallery:{
			enabled:true
		}
	});
	
	$(".comments").slick({
		//infinite:true,
		slidesToScroll:1,
		slidesToShow: 1,
		prevArrow:"<button class='slick-prev'/>",
		nextArrow:"<button class='slick-next'/>",
	});

	
	$slider.slick({
		infinite:true,
		slidesToScroll:1,
		slidesToShow: 1,
		//autoplay: true,
		//autoplaySpeed: 2000,
		dots:true,
		prevArrow:"<button class='slick-prev'/>",
		nextArrow:"<button class='slick-next'/>",
	});



	$(".nav-switch").on("click",function(){
		$(".mob-nav-container").fadeToggle();
	});
	$(".basket-switch").on("click",function(){
		$(".mob-basket-container").fadeToggle();
	});


	
	$select.hide();
	$fakeSelect.append(" ").append("<span/>").show();
	$fakeSelect.on("click",function(){
		var	$dialog = $("<div class='white-popup countries-select'/>"),
			$button = $("<div><button class='button primary'>Применить</button></div>");
		$values.each(function(){
			var $span = $("<span data-val='"+$(this).val()+"'><img src='"+$(this).data("image")+"' alt='"+$(this).html()+"'/>"+$(this).html()+"</span>");
			if($(this).prop("selected")){
				$span.addClass("active");
			}
			$dialog.append($span);
		});
		$dialog.on("click","span",function(){
			var $clicked = $(this),
				$option = $select.find("option[value='"+$clicked.data("val")+"']");
			if($clicked.hasClass("active")){
				$option.prop("selected",false);
			}else{
				$option.prop("selected",true);
			}
			$clicked.toggleClass("active");
		});
		
		$button.on("click","button",function(){
			$.magnificPopup.close();
			
		});
		$dialog.append($button);
		$.magnificPopup.open({
			items: {
				src: $dialog,
				type: 'inline'
			},
			callbacks: {
				beforeClose: function() {
					$select.trigger("change");
				}
			}
		});
	});
	$select.on("change",function(){
		$selectInfo.html("");
		$select.first().find("option:selected").each(function(){
			$selectInfo.append("<img src='"+$(this).data("image")+"' alt='"+$(this).html()+"' title='"+$(this).html()+"'/> ");
		});
		$fakeSelect.children("span").html($select.first().find("option:selected").length);
		$slider.find(".slide").height($(".excursion-form").height())
	});
	$select.trigger("change");



	$window.on("scroll",function(){
		if($window.scrollTop()>104){
			$("header").addClass("fixed");
		}else{
			$("header").removeClass("fixed");
		}
		if($window.scrollTop()>600){
			$(".excursion-form-header").slideDown();
		}else{
			$(".excursion-form-header").slideUp();
		}
	});



	$(".radio-select").on("click","label",function(){
		$(this).prev("input").click();
	});
	
	if($("#input-group").length){
		$("#input-group").on("change",function(){
			if($(this).is(":checked")){
				$(".people-count").addClass("disabled").find("input").prop("checked",false).prop("disabled",true);
				$("#input-group-count").prop("disabled",false);
			}else{
				$(".people-count").removeClass("disabled").find("input").prop("disabled",false);
				$(".people-count .count-select input:first-child").prop("checked",true);
				$("#input-group-count").prop("disabled",true).val("");
			}
		});
		$("#input-group").trigger("change");
	}
	$("input[name='excursion-type']").trigger("change");
	
	$(".excursion-card").on("click",".more",function(){
		var $card = $(this).parents(".excursion-card").first(),
			$activeCards = $(".excursion-card.active"),
			$row = $(this).parents(".row"),
			$desc = $card.nextAll(".description").first(),
			show = !$card.hasClass("active");
		$activeCards.each(function(){
			var $active = $(this);
			$active.find(".switchable").slideDown();
			$active.next().slideUp(function(){
				$active.removeClass("active");
			});
		});
		if(show){
			$desc.calcPosition();
			$card.addClass("active");
			$card.find(".switchable").slideUp();
			$desc.hide().slideDown();
		}
		return false;
	});
	
	if($(".button.plus").length){
		var $plus = $(".button.plus"),
			$row = $plus.parents(".row").first(),
			$clone = $row.clone();
		
		$clone.find(".plus").addClass("minus");
		
		$plus.on("click",function(){
			var $cloned = $clone.clone();
			$cloned.on("click",".minus",function(){
				$cloned.remove();
				return false
			});
			$row.after($cloned);
			return false
		});
	}
	
	$(".checkbox-switchable").each(function(){
		var $switchable = $(this),
			$checkbox = $switchable.prev().find("input[type='checkbox']");
		
		if($checkbox.length){
			if(!$checkbox.is(":checked")){
				$switchable.hide();
			}
			$checkbox.on("click change",function(){
				if($checkbox.is(":checked")){
					$switchable.slideDown();
				}else{
					$switchable.slideUp();
				}
			});
		}
	});
	$(".to-anchor").each(function(){
		var $block = $(this),
			$button = $block.find("a"),
			$target = $($button.attr("href")),
			targetPos = $target.offset().top;
		$button.on("click",function(){
			$("body").animate({"scrollTop":targetPos-50},500);
			return false
		});
		$window.on("reszie",function(){
			targetPos = $target.offset().top;
		});
		$window.trigger("resize");
		$window.on("scroll",function(){
			if($window.scrollTop()>300 && $window.scrollTop()<targetPos-300){
				$block.slideDown();
			}else{
				$block.slideUp();
			}
		});
	});
});

$.fn.calcPosition=function(){
	if($(this).length){
		var $desc = $(this),
			$card = $desc.prev(),
			$row = $desc.parents(".row").first();
		$desc.attr("style","");
		var offsetLeft = $row.offset().left-$card.offset().left-parseInt($row.css("margin-left"),0),
			offsetRight = $row.width()+$row.offset().left+parseInt($row.css("margin-right"),0)-$card.offset().left-$card.width();
		if(parseInt(offsetLeft)==0){
			$desc.css("border-top-left-radius",0);
		}
		if(parseInt(offsetRight)==0){
			$desc.css("border-top-right-radius",0);
		}
		$desc.css({
			"margin-left":offsetLeft,
			width:$row.width()+parseInt($row.css("margin-right"),0)+parseInt($row.css("margin-left"),0)
		});
	}
};