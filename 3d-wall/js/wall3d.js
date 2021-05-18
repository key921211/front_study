(function() {

    const stageElem = document.querySelector('.stage');
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const selectCharacterElem = document.querySelector('.select-character');
    const mousePos = { x: 0, y: 0 };
    let maxScrollValue;

    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;  //현재문서 높이에서 윈도우 높이를 뺀 값
    }
    window.addEventListener('scroll', function() {
        const scrollPer = pageYOffset / maxScrollValue; // 전체에서 얼만큼 스크롤 했는지 
        const zMove = scrollPer * 980 - 490; //css house에 준 -490 값을 똑같이 적용
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

        /* progress bar */
        barElem.style.width = scrollPer * 100 + '%';
    });

    window.addEventListener('mousemove', function(e) {
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
        stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) + 'deg) rotateY(' + (mousePos.x * 5) + 'deg)'; //x축을 기준으로니까 y값, y축을 기준으로니까 x값

    });

    window.addEventListener('resize', resizeHandler); //창사이즈가 바뀔때 값을 갱신 해준다.

    stageElem.addEventListener('click', function(e) {
        new Character({
            xPos: e.clientX / window.innerWidth * 100,
            speed: Math.random() * 0.5 + 0.2
        });
    });

    selectCharacterElem.addEventListener('click', function (e) {
        const value = e.target.getAttribute('data-char');
        document.body.setAttribute('data-char', value);
    });

    resizeHandler();   
})();