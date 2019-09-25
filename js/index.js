$(function () {
    var num = [];

    var d = localStorage.songs;
    var songsDetail = [];
    var songsId = [];//保存歌曲ID，方便以后直接根据ID获取歌曲数据

    if (d) {
        d = JSON.parse(d);
        songsDetail = d.playlist.tracks.concat();
        for (var i = 0; i < num.length; i++) {
            songsId.push(data.num[i].id);
        }
    } else {
        $.ajax({
            type: 'GET',
            url: 'http://www.arthurdon.top:3000/top/list?idx=1',

            success: function (data) {

                console.log('data ==> ', data);

                localStorage.setItem('songs', JSON.stringify(data))
                songsDetail = data.playlist.tracks.concat();
                for (var i = 0; i < num.length; i++) {
                    songsId.push(data.num[i].id);
                }
                console.log('songsId', songsId);


            }
        })


    }

    function dealtime(t) {
        var second = Math.floor(t / 1000 % 60);
        second = second >= 10 ? second : '0' + second;
        var minute = Math.floor(t / 1000 / 60);
        minute = minute >= 10 ? minute : '0' + minute;
        return minute + ':' + second;
    }
    for (i = 0; i < 20; i++) {

        // $('.musicname').text(music.title);
        // $('.singer').text(music.author);
        var singer = [];
        for (j = 0; j < d.playlist.tracks[i].ar.length; j++) {
            singer.push(d.playlist.tracks[i].ar[j].name);
        }
        var $list = (`<li class="list" name="0" index="${i}">
                    <span class="paly fl" data-play="0">
                        <img class="auto-img fl"  src="./img/play.png" alt="">
                        <audio class="audio" id="${d.privileges[i].id}" preload></audio>
                    </span>
                    <span class="musicname">${d.playlist.tracks[i].name}</span>
                    <span class="singer">${singer.join('/')}</span>
                    <span class="durTime">${dealtime(d.playlist.tracks[i].dt)}</span>
                </li>`);
        $('.musicnav').append($list);

    }
    var audio = $('.audio')[0];

    audio.oncanplay = function () {
        this.play();



    }
    var img = (`<img class="auto-img" src="" alt="">`);
    $('.author-img').append(img);
    $('.musicnav').on('click', 'li', function () {
        // var status = $(this).find('.paly').attr('data-play');


        //判断同一首歌
        if ($(this).find('.paly').attr('data-play') == 0) {
            audio.play();

            var id = $(this).find('.audio').attr('id');
            audio.src = 'https://music.163.com/song/media/outer/url?id=' + id;
            var index = $(this).attr('index');
            var ac = d.playlist.tracks[index].al.picUrl;
            // console.log('ac', ac);
            var img = (`<img class="auto-img" src="${ac}" alt="">`);
            $('.author-img img').attr('src', ac);

            var palyimg = $(this).find('.paly img');
            palyimg.attr('src', './img/stop.png')
            $(this).siblings().find('.paly img').attr('src', './img/play.png');
            $(this).find('.paly').attr('data-play', 1);
            $('.author-img img').css({animationPlayState: 'running'});
            $('.stop img').attr('src','./img/stop-g.png');
            $('.title').text(d.playlist.tracks[index].al.name);
            $('.name').text(d.playlist.tracks[index].ar[0].name);


        } else {
            audio.pause();
            $(this).find('.paly').attr('data-play', 0);
            $(this).find('.paly img').attr('src', './img/play.png');
            $('.stop img').attr('src','./img/play-g.png');
            $('.author-img img').css({animationPlayState: 'paused'});
        }
        

        // $('.stop').on('click',function(){
        //     audio.pause();
        //     $(this).find('.paly').attr('data-play', 0);
        // })



    })



    var $mask = $('.mask');
    var maskWidth = $mask.width();

    //获取未激活进度条宽度
    var progressWidth = $('.progress').width();

    //滑块移动范围
    var minLeft = 0;
    var maxLeft = progressWidth - maskWidth;

    var $layer = $('.layer');

    //滑块移动
    function move(e) {
        //获取触碰屏幕X坐标
        var x = e.targetTouches[0].pageX;

        // console.log('x ==> ', x);

        //获取当前元素距离屏幕最左端的距离
        var offsetLeft = $(this).offset().left;
        console.log('offsetLeft ==> ', offsetLeft);

        var left = x - offsetLeft - maskWidth / 2;

        left = left >= maxLeft ? maxLeft : left <= minLeft ? minLeft : left;

        $mask.css({
            left: left + 'px'
        })

        //激活进度条的宽度
        var w = x - offsetLeft;
        w = w >= progressWidth ? progressWidth : w <= 0 ? 0 : w;
        $('.progress-active').css({
            width: w + 'px'
        })
    }

    //开始触碰屏幕
    $layer.on('touchstart', function (e) {
        // console.log('e ==> ', e);

        move.call(this, e);
    })

    //触碰移动
    $layer.on('touchmove', function (e) {
        // console.log(e);
        move.call(this, e);
    })

    $('.author-img').on('click', function () {
        $('.musicbox').css({
            display: 'none'
        })
        $('.crmusic').css({
            display: 'block'
        })

    })
})
