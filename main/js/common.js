/**
 * File common.js.
 *
 * @package Growww
 */

/**
 * navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */

( function() {
    var container, button, menu, links, subMenus, i, len, body;

    body = document.getElementsByTagName( 'body' )[0];

    container = document.getElementById( 'site-navigation' );
    if ( ! container ) {
        return;
    }

    button = container.getElementsByTagName( 'button' )[0];
    if ( 'undefined' === typeof button ) {
        return;
    }

    menu = document.getElementById( 'nav-wrapper' );

    // Hide menu toggle button if menu is empty and return early.
    if ( 'undefined' === typeof menu ) {
        button.style.display = 'none';
        return;
    }

    menu.setAttribute( 'aria-expanded', 'false' );
    if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
        menu.className += ' nav-menu';
    }

    button.onclick = function() {
        if ( -1 !== container.className.indexOf( 'toggled' ) ) {
            body.className = body.className.replace( ' nav-opened', '' );
            container.className = container.className.replace( ' toggled', '' );
            button.setAttribute( 'aria-expanded', 'false' );
            menu.setAttribute( 'aria-expanded', 'false' );
        } else {
            body.className += ' nav-opened';
            container.className += ' toggled';
            button.setAttribute( 'aria-expanded', 'true' );
            menu.setAttribute( 'aria-expanded', 'true' );
        }
    };

    // Get all the link elements within the menu.
    links    = menu.getElementsByTagName( 'a' );
    subMenus = menu.getElementsByTagName( 'ul' );

    // Set menu items with submenus to aria-haspopup="true".
    for ( i = 0, len = subMenus.length; i < len; i++ ) {
        subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
    }

    // Each time a menu link is focused or blurred, toggle focus.
    for ( i = 0, len = links.length; i < len; i++ ) {
        links[i].addEventListener( 'focus', toggleFocus, true );
        links[i].addEventListener( 'blur', toggleFocus, true );
    }

    /**
     * Sets or removes .focus class on an element.
     */
    function toggleFocus() {
        var self = this;

        // Move up through the ancestors of the current link until we hit .nav-menu.
        while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

            // On li elements toggle the class .focus.
            if ( 'li' === self.tagName.toLowerCase() ) {
                if ( -1 !== self.className.indexOf( 'focus' ) ) {
                    self.className = self.className.replace( ' focus', '' );
                } else {
                    self.className += ' focus';
                }
            }

            self = self.parentElement;
        }
    }

    /**
     * Toggles `focus` class to allow submenu access on tablets.
     */
    ( function( container ) {
        var touchStartFn, i,
            parentLink = container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

        if ( 'ontouchstart' in window ) {
            touchStartFn = function( e ) {
                var menuItem = this.parentNode, i;

                if ( ! menuItem.classList.contains( 'focus' ) ) {
                    e.preventDefault();
                    for ( i = 0; i < menuItem.parentNode.children.length; ++i ) {
                        if ( menuItem === menuItem.parentNode.children[i] ) {
                            continue;
                        }
                        menuItem.parentNode.children[i].classList.remove( 'focus' );
                    }
                    menuItem.classList.add( 'focus' );
                } else {
                    menuItem.classList.remove( 'focus' );
                }
            };

            for ( i = 0; i < parentLink.length; ++i ) {
                parentLink[i].addEventListener( 'touchstart', touchStartFn, false );
            }
        }
    }( container ) );
} )();

/**
 * skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */

(function() {
    var isIe = /(trident|msie)/i.test( navigator.userAgent );

    if ( isIe && document.getElementById && window.addEventListener ) {
        window.addEventListener( 'hashchange', function() {
            var id = location.hash.substring( 1 ),
                element;

            if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
                return;
            }

            element = document.getElementById( id );

            if ( element ) {
                if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
                    element.tabIndex = -1;
                }

                element.focus();
            }
        }, false );
    }
})();

(function($) { 'use strict';

    // Global Vars

    var $window = $(window);
    var wScrollTop = $window.scrollTop();
    var body = $('body');
    var mainHeader = $('#masthead');
    var mainFooter = $('#colophon');
    var mainNav = $('#site-navigation');
    var htmlOffsetTop = parseInt($('html').css('margin-top'));
    var stickyHeader;
    if(body.hasClass('sticky-header')){
        stickyHeader = mainHeader;
    }
    var primary = $('#primary');
    var mainContent = $('#content');
    var mainHeaderHeight;
    var lastScrollTop = 0;

    // Calculate clients viewport
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

    var x = w.innerWidth || e.clientWidth || g.clientWidth, // Viewport Width
        y = w.innerHeight || e.clientHeight || g.clientHeight; // Viewport Height

    // Set featured image as background to his parent

    function imgAsBackground(el) {
        if(el.length){
            var elSrc;

            if(el.find('img').attr('data-lazy-src')){
                elSrc = el.find('img').attr('data-lazy-src');
            }
            else{
                elSrc = el.find('img').attr('src');
            }

            if(el.find('img').length){
                el.css({backgroundImage: 'url('+elSrc+')'});
            }
        }
    }

    // Detect Mobile

    var isMobile = false;

    (function checkOrientation(){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if((window.orientation === 90 || window.orientation === -90) && x < 992){
                isMobile = true;
            }
            else if(window.orientation === 0 && x < 768){
                isMobile = true;
            }
        }
    })();


    $(document).ready(function($){

        // Calculate clients viewport

        x=w.innerWidth||e.clientWidth||g.clientWidth; // Viewport Width
        y=w.innerHeight||e.clientHeight||g.clientHeight; // Viewport Height


        // change newsletter label to inputs placeholder
        if ($('.c-footer__newsletter .mc_merge_var, .c-modal--news .mc_merge_var').length) {
            $('.c-footer__newsletter .mc_merge_var, .c-modal--news .mc_merge_var').find('label').each(function(){
                var placeholder = $(this).text();
                $(this).css('display', 'none').next('input').attr('placeholder', placeholder);
            });
        }

        if ( $('.post-type-archive-product, .tax-product_cat, .single-product').length ) {

            var $pf19slider = $('.post-type-archive-product .products, .tax-product_cat .products, .related .products');

            var scrolling = false,
                stopSlickScroll = false,
                $slideCount = 0;


            $('#scroll-down').on('click', function() {

                if ( $('.post-type-archive-product, .tax-product_cat').length ) {

                    var windowHeight = $(window).height();
                    $('html, body').animate({scrollTop:windowHeight}, '300');

                    $('body').addClass('enable-scroll');
                    stopSlickScroll = true;
                } else {
                    $('html, body').animate({scrollTop:0}, '300');

                    $('body').addClass('enable-scroll');
                    stopSlickScroll = true;
                }

                e.preventDefault();
            })

            $('#back-to-top').on('click', function() {

                $('html, body').animate({scrollTop:0}, '300');
                e.preventDefault();
            })

            if ( $('.post-type-archive-product, .tax-product_cat').length ) {
                if ($(document).scrollTop() > 0) {
                    $('body').addClass('enable-scroll');
                    stopSlickScroll = true;
                }
            } else if ($('.single-product').length) {
                $('body').addClass('enable-scroll');
                stopSlickScroll = true;
            }

            $pf19slider.on('init reInit', function(event, slick){
                $slideCount = slick.slideCount;
            });

            $pf19slider.each(function(index){
                $(this).slick({
                    slide: '.product, .shop-description',
                    dots: false,
                    infinite: false,
                    arrows: false,
                    speed: 800,
                    fade: false,
                    cssEase: 'cubic-bezier(0.77, 0.1, 0.16, 1)',
                    variableWidth: true,
                    touchThreshold: 20,
                    centerMode: false,
                    //draggable: false,
                    draggable: true,
                    slidesToShow: 1,

                    responsive: [
                        {
                            breakpoint: 600,
                            settings: "unslick",
                            /*
                            settings: {
                                //centerMode: true,
                                infinite: false,
                                speed: 100,
                                cssEase: 'ease-out',
                            }*/
                        },
                    ]
                });
            });

            $pf19slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                scrolling = true;
                $pf19slider.addClass('moving');

                // #scroll-down.show

                //var $currentSlide = $pf19slider.slick('slickCurrentSlide');
                var $currentSlide = nextSlide;
                //if ( $('.post-type-archive-product').length ) {
                console.log('current slide ' + $currentSlide);
                console.log('count slides ' + $slideCount);
                if ( $currentSlide + 2 >= $slideCount) {
                    $('#scroll-down').addClass('show');
                } else {
                    $('#scroll-down').removeClass('show');
                }
                //}

            });

            $pf19slider.on('afterChange', function(){
                scrolling = false;
                $pf19slider.removeClass('moving');

            });

            $pf19slider.on('wheel', (function(e) {
                //e.preventDefault();
                if (!scrolling && !stopSlickScroll) {

                    scrolling = true;
                    var $currentSlide = $pf19slider.slick('slickCurrentSlide');

                    if (e.originalEvent.deltaY > 0) {

                        if ( $('.post-type-archive-product, .tax-product_cat').length ) {
                            if ( $currentSlide + 1 >= $slideCount) {
                                $('body').addClass('enable-scroll');
                                stopSlickScroll = true;
                            }
                        }

                        $pf19slider.slick('slickNext');
                    } else {

                        if ($('.single-product').length) {
                            if ( $currentSlide <= 0) {
                                $('body').addClass('enable-scroll');
                                stopSlickScroll = true;
                            }
                        }

                        $pf19slider.slick('slickPrev');
                    }
                    //e.preventDefault();
                } else {

                }

            }));

            $(window).on('scroll', function(e) {

                if ( $('.post-type-archive-product, .tax-product_cat').length ) {
                    if (stopSlickScroll && $(document).scrollTop() == 0) {
                        $('body').removeClass('enable-scroll');
                        stopSlickScroll = false;
                    }


                    if ( $(document).scrollTop() >= ($(window).height())) {
                        $('#back-to-top').addClass('show');
                    } else {
                        $('#back-to-top').removeClass('show');
                    };

                } else if ($('.single-product').length) {

                    if( stopSlickScroll && $(window).scrollTop() + $(window).height() == $(document).height()) {
                        $('body').removeClass('enable-scroll');
                        stopSlickScroll = false;
                    }

                    if (x < 600 ) {
                        if ( $(window).scrollTop() > $('.related.products').offset().top - $(window).height() / 2 ) {
                            $('.summary .cart,.cart-button').css('visibility', 'hidden');
                        } else {
                            $('.summary .cart,.cart-button').css('visibility', 'visible');
                        }
                    }
                }
            });

            $('#slide-right').on('click', function(e) {
                if (!scrolling) {
                    scrolling = true;
                    $pf19slider.slick('slickNext');
                    e.preventDefault();
                }
            });
        }

        if ($('.c-talksoon').length) {

            $(window).on('scroll', function(e) {

                if ( $(window).scrollTop() > $('.site-footer').offset().top - $(window).height() / 2 ) {
                    $('body').addClass('footer-color');
                } else {
                    $('body').removeClass('footer-color');
                }


                /*
                if ( $('.post-type-archive-product').length ) {
                    if (stopSlickScroll && $(document).scrollTop() == 0) {
                        $('body').removeClass('enable-scroll');
                        stopSlickScroll = false;
                    }
                } else if ($('.single-product').length) {

                    if( stopSlickScroll && $(window).scrollTop() + $(window).height() == $(document).height()) {
                        $('body').removeClass('enable-scroll');
                        stopSlickScroll = false;
                    }
                }
                */
            });
        }

        $('.c-link-to').on('click', function(e) {
            var $target = $(this).attr('href');

            $('html, body').animate({
                scrollTop: ($($target).offset().top)
            },500);

            e.preventDefault();
        })

        $('body').on('click', function(e) {
            if( !e ) e = window.event;
            if (body.hasClass('show-modal-signin')) {
                if (!e.target.closest('.c-modal--signin') && !e.target.closest('.singin-link')) {
                    $('body').removeClass('show-modal-signin');
                }
            }
        })

        $('.singin-link a, .c-modal--signin .c-modal__close').on('click', function(e) {

            $('body').toggleClass('show-modal-signin');
            e.preventDefault();
        })

        $('button.cart-button').on('click', function(e) {

            $('body').toggleClass('show-modal-addtocart');
            e.preventDefault();
        })


        // Select2 call for c-form__input
        /*
        if ($('select.c-form__input').length) {
            $('select.c-form__input').select2({
                minimumResultsForSearch: Infinity,
            });
        }
        */

        // Modal open/close function

        if (x > 1024) {

            //if ( body.hasClass('home')) {
            body.on('mouseleave', function (e) {
                if ( Cookies.get('newslettercookie') != 'shown') {
                    Cookies.set('newslettercookie', 'shown', { expires: 1 }); // 1440 - minute , 48 - 30min , 1 - day
                    if (!body.hasClass('show-modal-newsletter') ) {
                        body.toggleClass('show-modal-newsletter');
                    }
                }
            });
            //}
        }

        $('.c-modal--news-block .c-modal__close').on('click', function(e) {
            body.toggleClass('show-modal-newsletter');
            e.preventDefault();
        })

        $('body').on('click', function(e) {
            if( !e ) e = window.event;
            if (body.hasClass('show-modal-newsletter')) {
                if (!e.target.closest('.c-modal--news-block')) {
                    body.removeClass('show-modal-newsletter');
                }
            }
        })

        // Header on scroll

        if(body.hasClass('sticky-header') && x > 767 && !isMobile){
            var pageHeight = $('#page').outerHeight();
            var headerOnScroll = function(){
                if(window.pageYOffset >= (mainHeaderHeight + 200) && !body.hasClass('header-scrolled')){
                    body.addClass('header-scrolled');
                }
                else if(window.pageYOffset < (mainHeaderHeight + 200) && body.hasClass('header-scrolled')){
                    body.removeClass('header-scrolled');
                }

                if($('#jp-relatedposts').length){
                    if(window.pageYOffset >= (pageHeight) ){
                        mainHeader.addClass('related-reached');
                    }
                    else{
                        mainHeader.removeClass('related-reached');
                    }
                }
            };

            $window.on('scroll', function(){
                headerOnScroll();
            });
        }

        // Outline none on mousedown for focused elements

        $(document.body).on('mousedown', '*', function(e) {
            if(($(this).is(':focus') || $(this).is(e.target)) && $(this).css('outline-style') == 'none') {
                $(this).css('outline', 'none').on('blur', function() {
                    $(this).off('blur').css('outline', '');
                });
            }
        });

        // Disable search submit if input empty

        $( '.search-submit' ).prop( 'disabled', true );
        $( '.search-field' ).keyup( function() {
            $('.search-submit').prop( 'disabled', this.value === "" ? true : false );
        });

        // Checkbox and Radio buttons

        //if buttons are inside label
        function radio_checkbox_animation() {
            var checkBtn = $('label').find('input[type="checkbox"]');
            var checkLabel = checkBtn.parent('label');
            var radioBtn = $('label').find('input[type="radio"]');

            checkLabel.addClass('checkbox');

            checkLabel.click(function(){
                var $this = $(this);
                if($this.find('input').is(':checked')){
                    $this.addClass('checked');
                }
                else{
                    $this.removeClass('checked');
                }
            });

            var checkBtnAfter = $('label + input[type="checkbox"]');
            var checkLabelBefore = checkBtnAfter.prev('label');

            checkLabelBefore.click(function(){
                var $this = $(this);
                $this.toggleClass('checked');
            });

            radioBtn.change(function(){
                var $this = $(this);
                if($this.is(':checked')){
                    $this.parent('label').siblings().removeClass('checked');
                    $this.parent('label').addClass('checked');
                }
                else{
                    $this.parent('label').removeClass('checked');
                }
            });
        }

        radio_checkbox_animation();

        // Resize textarea as user types

        if($('textarea').length){
            $('textarea').attr({'rows': '1', 'data-min-rows': '1'});

            $(document)
                .one('focus.textarea', 'textarea', function(){
                    var savedValue = this.value;
                    this.value = '';
                    this.baseScrollHeight = this.scrollHeight;
                    this.value = savedValue;
                })
                .on('input.textarea', 'textarea', function(){
                    var minRows = this.getAttribute('data-min-rows')|0,
                        rows;
                    this.rows = minRows;
                    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 21);
                    this.rows = minRows + rows;
                });
        }

        // Add show class to body

        body.addClass('show');

    }); // End Document Ready

    // Back-forward cache fix

    $window.on('pageshow', function(event) {
        if (event.originalEvent.persisted) {
            window.location.reload();
        }
    });

    // Before Unload

    $(window).on('beforeunload', function(){

        body.removeClass('show');

    });

})(jQuery);
