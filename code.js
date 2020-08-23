jQuery(document).ready(function() {
    /*-------Header sticky starts------*/
    var scrollVal = 0;
    jQuery(window).scroll(function() {
        var x = jQuery(this).scrollTop();
        if (x > scrollVal) {
            jQuery("header").addClass("sticky");
        } else {
            jQuery("header").removeClass("sticky");
        }
        scrollVal = x;
    });
    /*-------Header sticky ends------*/

    /*--------Scroll to top, button starts-------*/
    jQuery("#top").click(function() {
        jQuery("html, body").animate({ scrollTop: 0 }, 1000);
    });
    /*--------Scroll to top, button ends-------*/

    /*--------Scroll to bottom, button starts-------*/
    jQuery('#bottom').click(function() {
        jQuery('html, body').animate({ scrollTop: jQuery('html, body').height() }, 1000);
    });
    /*--------Scroll to bottom, button ends-------*/

    /*-------Fadeout the button when reaches top and bottom buttons starts-----*/
    jQuery(window).scroll(function() {
        if ((jQuery(this).scrollTop() + jQuery(this).height()) == jQuery(document).height()) {
            jQuery("#bottom").fadeOut();
        } else {
            jQuery("#bottom").fadeIn();
        }
    });

    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop()) {
            jQuery("#top").fadeIn();
        } else {
            jQuery("#top").fadeOut();
        }
    });
    /*-------Fadeout the button when reaches top and bottom buttons ends-----*/

    /*---------click a link and smooth scroll to linked content starts---------*/
    jQuery("a").on('click', function(event) {
        event.preventDefault();
        if (this.hash !== "") {
            var hash = this.hash;
            jQuery('html, body').animate({
                scrollTop: jQuery(hash).offset().top - jQuery(".header").height()
            }, 1000);
            return false;
        }
    });
    /*---------click a link and smooth scroll to linked content end---------*/

    /*---------Remove anchor tag links from the URL starts---------*/
    const anchorLink = jQuery('.a-link');
    anchorLink.click(() => {
        setTimeout(() => {
            removeHash();
        }, 5);
    });

    function removeHash() {
        history.replaceState('', document.title, window.location.origin + window.location.pathname + window.location.search);
    }
    /*---------Remove anchor tag links from the URL ends---------*/

    /*----------Progress bar starts--------------*/
    jQuery(window).scroll(function() {
        var wintop = jQuery(window).scrollTop(),
            docheight = jQuery('.site-content').height(),
            winheight = jQuery(window).height();
        var totalScroll = (wintop / (docheight - winheight)) * 100;
        jQuery(".progress-bar").css("width", totalScroll + "%");
    });
    /*----------Progress bar ends--------------*/

    /*------------Search field starts----------------*/
    jQuery('[data-toggle=search-form]').click(function() {
        jQuery('.search-form-wrapper').toggleClass('open');
        jQuery('.search-form-wrapper .search').focus();
    });
    jQuery('[data-toggle=search-form]').keydown(function(e) {
        var key = e.keyCode || e.which;
        if (key === 13) {
            jQuery('[data-toggle=search-form]').click();
            return false;
        }
    });
    /*------------Search field ends----------------*/

    // jQuery(document).mouseup(function(e) {
    //     if (jQuery('.search-form-wrapper').hasClass("open")) {
    //         var container = jQuery('.search-form-wrapper');
    //         if (!container.is(e.target) && container.has(e.target).length === 0) {
    //             container.hide();
    //             jQuery(".search-form-wrapper").removeClass("open");
    //         } else {
    //             container.show();
    //         }
    //     } else {
    //         container.show();
    //     }
    // });

    /*---------------User input form label stays above once filled starts--------------------*/
    var formInput;

    function onInputFocus(event) {
        var target = jQuery(event.target);
        var parent = target.parent();
        parent.addClass('input--filled');
    };

    function onInputBlur(event) {
        var target = jQuery(event.target);
        var parent = target.parent();

        if (event.target.value.trim() === '') {
            parent.removeClass('input--filled');
        }
    };


    formInput = jQuery('.input__field');

    // in case there is any value already
    formInput.each(function() {
        if (formInput.val().trim() !== '') {
            var parent = formInput.parent();
            parent.addClass('input--filled');
        }
    });

    formInput.on('focus', onInputFocus);
    formInput.on('blur', onInputBlur);

    /*---------------User input form label stays above once filled ends--------------------*/

    /*------------Allow only alpha letters in text field starts------------*/
    function testInput(event) {
        var value = String.fromCharCode(event.which);
        var pattern = new RegExp(/^[A-Za-z]+$/);
        return pattern.test(value);
    }

    jQuery('.onlyAlpha').bind('keypress', testInput);
    /*------------Allow only alpha letters in text field ends------------*/

    /*-----------------Email entry vailidation starts-------------------*/
    var emailInput;

    jQuery("#email-input").on("focusout", function() {
        emailInput = jQuery(this).val();

        if (validateEmail(emailInput)) {
            jQuery(this).css({
                color: "inherit"
            });
        } else {
            jQuery(this).css({
                color: "red"
            });

            // alert("not a valid email address");
        }
    });


    function validateEmail(email) {
        var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        return jQuery.trim(email).match(pattern) ? true : false;
    }
    /*-----------------Email entry vailidation ends-------------------*/

});