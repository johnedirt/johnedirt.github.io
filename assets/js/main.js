;(function($) {
    'use strict'

    var wprtTheme = {

        // Main init function
        init : function() {
            this.config();
            this.events();
        },

        // Define vars for caching
        config : function() {
            this.config = {
                $window : $( window ),
                $document : $( document ),
            };
        },

        // Events
        events : function() {
            var self = this;

            // Run on document ready
            self.config.$document.on( 'ready', function() {
                // Mega menu
                self.megaMenu();

                // PreLoader
                self.preLoader();

                // Mobile Navigation
                self.mobileNav();

                // Search Icon
                self.searchIcon();

                // Retina Logos
                self.retinaLogo();

                // Featured Media
                self.featuredMedia();

                // Header Fixed
                self.headerFixed();

                // Scroll to Top
                self.scrollToTop();

                // Spacer
                self.widgetSpacer();
            } );

            // Run on Window Load
            self.config.$window.on( 'load', function() {

            } );
        },

        // Mega Menu
        megaMenu: function() {
            $(window).on('load resize', function() {
                var 
                du = $('#main-nav .megamenu > ul'),
                siteNav = $('#main-nav'),
                siteHeader = $( '#site-header' );

                if ( du.length ) {
                    var
                    o = siteHeader.find(".wprt-container").outerWidth(),
                    a = siteNav.outerWidth(),
                    n = siteNav.css("right"),
                    n = parseInt(n,10),
                    d = o-a-n; du.css({ width: o, "margin-left": -d })
                }
            });
        },

        // PreLoader
        preLoader: function() {
            if ( $().animsition ) {
                $('.animsition').animsition({
                    inClass: 'fade-in',
                    outClass: 'fade-out',
                    inDuration: 1500,
                    outDuration: 800,
                    loading: true,
                    loadingParentElement: 'body',
                    loadingClass: 'animsition-loading',
                    timeout: false,
                    timeoutCountdown: 5000,
                    onLoadEvent: true,
                    browser: [
                        '-webkit-animation-duration',
                        '-moz-animation-duration',
                        'animation-duration'
                        ],
                    overlay: false,
                    overlayClass: 'animsition-overlay-slide',
                    overlayParentElement: 'body',
                    transition: function(url){ window.location.href = url; }
                });
            }
        },

        // Mobile Navigation
        mobileNav: function() {
            var menuType = 'desktop';

            $(window).on('load resize', function() {
                var mode = 'desktop';
                var $wrapMenu = $('#site-header-inner .wrap-inner');

                if ( matchMedia( 'only screen and (max-width: 959px)' ).matches )
                    mode = 'mobile';

                if ( mode != menuType ) {
                    menuType = mode;

                    if ( mode == 'mobile' ) {
                        $('#main-nav').attr('id', 'main-nav-mobi')
                            .appendTo('#site-header')
                            .hide()
                                .find('li:has(ul)')
                                .children('ul')
                                    .removeAttr('style')
                                    .hide()
                                    .before('<span class="arrow"></span>');
                    } else {
                        if ( $('body').is('.header-style-2, .header-style-3') )
                            $wrapMenu = $('.site-navigation-wrap .inner');

                        $('#main-nav-mobi').attr('id', 'main-nav')
                            .removeAttr('style')
                            .prependTo($wrapMenu)
                            .find('.sub-menu')
                                .removeAttr('style')
                                .prev().remove();
                                
                        $('.mobile-button').removeClass('active');
                    }
                }
            });

            $(document).on('click', '.mobile-button', function() {
                $(this).toggleClass('active');
                $('#main-nav-mobi').slideToggle();
            })

            $(document).on('click', '#main-nav-mobi .arrow', function() {
                $(this).toggleClass('active').next().slideToggle();
            })
        },

        // Search Icon
        searchIcon: function() {
            $('.header-search-icon').on('click', function() {
                var searchForm = $(this).parent().find('.header-search-form'),
                    searchField = $(this).parent().find('.header-search-field');

                searchForm.stop().fadeToggle(function () {
                    searchField.focus();
                });

                return false;
            });
        },

        // Retina Logos
        retinaLogo: function() {
            var retina = window.devicePixelRatio > 1 ? true : false;
            var $logo = $('#site-logo img');
            var $logo_retina = $logo.data('retina');

            if ( retina && $logo_retina ) {
                $logo.attr({
                    src: $logo.data('retina'),
                    width: $logo.data('width'),
                    height: $logo.data('height')
                });
            }
        },

        // Header Fixed
        headerFixed: function() {
            if ( $('body').hasClass('header-fixed') ) {
                var nav = $('#site-header');

                if ( $('body').is('.header-style-2, .header-style-3') ) {
                    var nav = $('.site-navigation-wrap');
                }

                if ( nav.length ) {
                    var offsetTop = nav.offset().top,
                        headerHeight = nav.height(),
                        injectSpace = $('<div />', {
                            height: headerHeight
                        }).insertAfter(nav);

                    $(window).on('load scroll', function(){
                        if ( $(window).scrollTop() > offsetTop ) {
                            nav.addClass('is-fixed');
                            injectSpace.show();
                        } else {
                            nav.removeClass('is-fixed');
                            injectSpace.hide();
                        }
                    })
                }
            }     
        },

        // Scroll to Top
        scrollToTop: function() {
            $(window).scroll(function() {
                if ( $(this).scrollTop() > 800 ) {
                    $('#scroll-top').addClass('show');
                } else {
                    $('#scroll-top').removeClass('show');
                }
            });

            $('#scroll-top').on('click', function() {
                $('html, body').animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
            return false;
            });
        },

        // Featured Media
        featuredMedia: function() {
            if ( $().slick ) {
                $('.blog-gallery').slick({
                    dots: true,
                    infinite: true,
                    speed: 300,
                    fade: true,
                    cssEase: 'linear'
                });
            }
        },

        // Widget Spacer
        widgetSpacer: function() {
            $(window).on('load resize', function() {
                var mode = 'desktop';

                if ( matchMedia( 'only screen and (max-width: 959px)' ).matches )
                    mode = 'mobile';

                $('.spacer').each(function(){
                    if ( mode == 'mobile' ) {
                        $(this).attr('style', 'height:' + $(this).data('mobi') + 'px')
                    } else {
                        $(this).attr('style', 'height:' + $(this).data('desktop') + 'px')
                    }
                })
            });
        },

    }; // end wprtTheme

    wprtTheme.init();
    // feed.run();

})(jQuery);