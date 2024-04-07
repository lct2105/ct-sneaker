window.addEventListener("scroll", function() {
    if ($(this).scrollTop() > 0) {
        $(".sticky-wrapper").addClass("is-sticky");
        $(".main_menu").css("position", "fixed");
    } else {
        $(".sticky-wrapper").removeClass("is-sticky");
        $(".main_menu").css("position", "absolute");
    }
})

$(document).ready(function(){
    $(".banner-slider").owlCarousel({
        items:1,
        autoplay:true,
        autoplayTimeout: 3000,
        loop:true,
        dots:true
    });
    $(".best-seller-items").owlCarousel({
        items:4,
        margin: 40,
        stagePadding: 20,
        autoplay:true,
        autoplayTimeout: 3000,
        loop:true,
        nav:false,
        dots: false,
    });

    var bestSellerItems = $(".best-seller-items")
    $(".next").click(function () {
        bestSellerItems.trigger('next.owl.carousel');
    });
   
    $(".prev").click(function () {
        bestSellerItems.trigger('prev.owl.carousel');
    });

    $('#priceRange').on('input', function() {
        var price = numberWithCommas($(this).val())
        $('#price-range-value').text(price);
    });

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // TRANG CHI TIẾT SẢN PHẨM

    $('input[name="btnradio_img"]').change(function() {
        if ($(this).is(':checked')) {
            const radioId = $(this).attr('id');

            const labelForRadio = $('label[for="' + radioId + '"]');
      
            const imagePath = labelForRadio.find('img').attr('src');
      
            $('.product-main-img img').attr('src', imagePath);
        }
    });

    $('input[name="btnradio_color"]').change(function() {
        if ($(this).is(':checked')) {
            const radioId = $(this).attr('id');

            const labelForRadio = $('label[for="' + radioId + '"]');
      
            const imagePath = labelForRadio.find('img').attr('src');
            console.log(imagePath)
            $('.product-main-img img').attr('src', imagePath);
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
    $('input[name="btnradio_page"]').change(function() {
        const selectedPageId = $('input[name="btnradio_page"]:checked').attr('id');
        const selectedPage = selectedPageId.replace('btnradio', '');
        console.log(selectedPage)
        loadPage(selectedPage)
    });
});
  