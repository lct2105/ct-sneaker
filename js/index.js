window.addEventListener("scroll", function () {
    if ($(this).scrollTop() > 0) {
        $(".sticky-wrapper").addClass("is-sticky");
        $(".main_menu").css("position", "fixed");
        $(".back-to-top").css("display", "flex")
    } else {
        $(".sticky-wrapper").removeClass("is-sticky");
        $(".main_menu").css("position", "absolute");
        $(".back-to-top").css("display", "none")
    }
})

$(document).ready(function () {
    $(".banner-slider").owlCarousel({
        items: 1,
        autoplay: false,
        autoplayTimeout: 3000,
        loop: true,
        dots: true
    });
    $(".best-seller-items").owlCarousel({
        items: 4,
        margin: 40,
        stagePadding: 20,
        autoplay: true,
        autoplayTimeout: 3000,
        loop: true,
        nav: false,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 4,
            }
        }
    });

    var bestSellerItems = $(".best-seller-items")
    $(".next").click(function () {
        bestSellerItems.trigger('next.owl.carousel');
    });

    $(".prev").click(function () {
        bestSellerItems.trigger('prev.owl.carousel');
    });

    $('#priceRange').on('input', function () {
        var price = numberWithCommas($(this).val())
        $('#price-range-value').text(price);
    });

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // TRANG CHI TIẾT SẢN PHẨM

    $('input[name="btnradio_img"]').change(function () {
        if ($(this).is(':checked')) {
            const radioId = $(this).attr('id');

            const labelForRadio = $('label[for="' + radioId + '"]');

            const imagePath = labelForRadio.find('img').attr('src');

            $('.product-main-img img').attr('src', imagePath);
        }
    });

    $('input[name="btnradio_color"]').change(function () {
        if ($(this).is(':checked')) {
            const radioId = $(this).attr('id');

            const labelForRadio = $('label[for="' + radioId + '"]');

            const imagePath = labelForRadio.data('img')
            $('.product-main-img img').attr('src', "../../img/sneaker/" + imagePath + ".png");
        }
    });

    $('input[name="btnradio_cart_color"]').change(function () {
        if ($(this).is(':checked')) {
            const radioId = $(this).attr('id');

            const labelForRadio = $('label[for="' + radioId + '"]');

            const imagePath = labelForRadio.data('img')
            $('#sneaker_cart_1').attr('src', "../../img/sneaker/" + imagePath + ".png");
        }
    });

    const numItems = $('.sneaker-card');
    let currentPage = 1;
    const limit = 6;

    function loadPage(pageNumber) {
        numItems.each((index, item) => {
            const startIndex = (pageNumber - 1) * limit;
            const endIndex = pageNumber * limit - 1;

            if (index >= startIndex && index <= endIndex) {
                $(item).css("display", "block");
            } else {
                $(item).css("display", "none");
            }
        });
    }

    loadPage(currentPage);
    $('input[name="btnradio_page"]').change(function () {
        const selectedPageId = $('input[name="btnradio_page"]:checked').attr('id');
        const selectedPage = selectedPageId.replace('btnradio', '');
        loadPage(selectedPage)
    });


    // Lấy danh sách các nút like-buttons và cart-buttons
    const likeButtons = document.querySelectorAll('.like-buttons');
    const cartButtons = document.querySelectorAll('.cart-buttons');

    likeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            button.classList.toggle('active');
        });
    });

    let product_count = 1
    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            let imgtodrag = $(button).closest('.sneaker-card').find("img");
            console.log(imgtodrag)
            if (imgtodrag.length) {
                let cart = $(".nav-right .fa-cart-shopping");
                let imgclone = imgtodrag.clone()
                    .offset({
                        top: imgtodrag.offset().top,
                        left: imgtodrag.offset().left
                    })
                    .css({
                        'opacity': '0.8',
                        'position': 'absolute',
                        'height': '150px',
                        'width': '150px',
                        'z-index': '100'
                    })
                    .appendTo($('body'))
                    .animate({
                        'top': cart.offset().top + 20,
                        'left': cart.offset().left + 30,
                        'width': 75,
                        'height': 75
                    }, 1000);

                // Đếm số lượng sản phẩm trong giỏ hàng và cập nhật
                setTimeout(function () {
                    product_count++;
                    $("#product_count").text(product_count);
                }, 1500);

                imgclone.animate({
                    'width': 0,
                    'height': 0
                }, function () {
                    $(this).detach();
                });
            }
        });
    });

    // Toggle chat box
    $('#chat-box-toggle').click(function () {
        $('.chat-box').slideToggle();
    });

    const sendChat = (message, className) => {
        const chatMessage = document.createElement("li")
        chatMessage.classList.add("chat", className)
        let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<i class="fa-solid fa-headset"></i>
        <p>${message}</p>`
        chatMessage.innerHTML = chatContent
        return chatMessage
    }

    $("#send-chat").click(function () {
        let userMessage = $(".chat-input textarea").val().trim()
        if (!userMessage) return;
        $(".chat-box-content").append(sendChat(userMessage, "outgoing"))
        $('.chat-input textarea').val('');
    })

    $(".chat-input textarea").keypress(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            let userMessage = $(".chat-input textarea").val().trim()
            if (!userMessage) return;
            $(".chat-box-content").append(sendChat(userMessage, "outgoing"))
            $('.chat-input textarea').val('');
        }
    })
});
