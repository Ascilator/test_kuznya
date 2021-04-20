



paralax();
tabs();
form();
function paralax() {
    let paralax_item = document.querySelector('.paralax_item');

    let width = paralax_item.getBoundingClientRect().width;
    let height = paralax_item.getBoundingClientRect().height;
    let pos = {
        x: paralax_item.getBoundingClientRect().left,
        y: paralax_item.getBoundingClientRect().top
    }
    console.log(paralax_item);

    paralax_item.addEventListener('mousemove', function (e) {
        pos.x = paralax_item.getBoundingClientRect().left
        pos.y = paralax_item.getBoundingClientRect().top




        this.classList.remove('_non_hover')

        let x = e.clientX - pos.x - width / 2;
        let y = e.clientY - pos.y - height / 2;

        // //((y) / height * 20)
        paralax_item.style.transform = `rotateX(${(-1 * y / height * 20)}deg) rotateY(${(x / width * 20)}deg)`;

    });
    paralax_item.addEventListener('mouseleave', function (e) {
        this.classList.add('_non_hover')
        paralax_item.style.transform = `rotateX(0deg) rotateY(0deg)`;

    })
}

function tabs() {
    $(".tabs_body_item").not(":first").hide();
    $('.tab_header_item').click(function () {
        $('.tab_header_item').removeClass('_active');
        $(this).addClass('_active');
        $(".tabs_body_item").hide().eq($(this).index()).fadeIn()
    });

    $('.tabs_acc_title').on('click', function () {
        $(this).siblings().slideToggle();
        $(this).toggleClass('_active')
    })
    for (let i = 0; i < $('.tabs_body_item').length; i++) {
        $('.tabs_body_item').eq(i).children('.tabs_item').eq(0).children('.tabs_acc_body').slideDown()
        $('.tabs_body_item').eq(i).children('.tabs_item').eq(0).children('.tabs_acc_title').addClass('_active')

    }
}

function form() {
    $('.drop_down_title').click(function () {
        $('.drop_body').slideToggle();
        $('.drop_down_title').toggleClass('_active');
    })
    $('._drop_item').click(function () {
        $('.drop_down_title').children('.text').text($(this).children('.text').text())
        $('.input_drop').addClass('_active');
        $('.drop_body').slideUp();
        $('.drop_down_title').removeClass('_active');

        $('._drop_item').not(this).removeClass('_active')
        $('._drop_item').eq($(this).index()).addClass('_active')
    })

    $('.input_phone_number>input').on('focus', function () {
        $(this).val('');
        $(this).parent().removeClass('_error');
    })
    $('.input_phone_number>input').on('blur', function () {
        if ($(this).val() === "") {

            $(this).val('Номер телефона *');
        }
    })


    $('textarea').on('focus', function () {

        $('.drop_title_1').addClass('_active');
        $('textarea').val('')
    })
    $('textarea').on('blur', function () {
        if ($('textarea').val() == '') {
            $('textarea').val('Коротко о чем-то ещё')
            $('.drop_title_1').removeClass('_active');
        }
    })
    $('textarea').on('keydown', function () {
        var self = this;

        setTimeout(function () {


            $('.drop_title_1').addClass('_active');
            $(self)
                .css('height', 'auto')
                .css('height', self.scrollHeight + 'px');
        }, 0);
    });







    $('form').on('submit', function (e) {
        e.preventDefault();

        if (validate($('.input_phone_number>input').val())) {
            location.reload()
        } else {
            $('.input_phone_number').addClass('_error');
        }

        function validate(email) { const re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/; return re.test(String(email).toLowerCase()); }

    })


    let formImg = $('#upload_img');
    formImg.on("change", function (e) {
        let img = formImg[0].files[0];

        console.log(formImg[0].files);

        let reader = new FileReader();
        document.querySelector('.choose_fiel').innerHTML = "";
        reader.onload = function (e) {
            for (let i = 0; i < formImg[0].files.length; i++) {
                document.querySelector('.choose_fiel').innerHTML += `<div class="file_item">
                                                    <div class="text">${formImg[0].files[i].name}</div>
                                                    <div class="cross"><img src="../img/cross.svg"></div>                                
                                                </div>`

            }
        }
        reader.readAsDataURL(img);



    });
}