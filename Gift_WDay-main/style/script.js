window.addEventListener('load', () => {
    const messages = [
        "Chúc bạn một ngày 20/10 thật là ý nghĩa, vui tươi, ngập tràn hạnh phúc  🌸",
        "Ngày 20/10 tôi xin dành tặng bạn lời chúc sức khỏe, vui vẻ, hát hay như chim sẻ. Và có nhiều tài lẻ, nói chung là làm gì cũng suôn sẻ.💖",
        "Nhân ngày 20/10, chúc một nửa thế giới luôn thành công trong cuộc sống và đặc biệt luôn duyên dáng, xinh đẹp trong mắt đàn ông.💕",
        "Nhân ngày 20/10, chúc em: Trẻ trung như heo sữa, bốc lửa như heo hơi. Chịu chơi như heo nái, hăng hái như heo con. Sắc son như heo đất, đủ chất như…heo thịt.🌷",
        "Chúc một nửa thế giới luôn xinh đẹp rạng ngời, trẻ mãi không già. Luôn nhiều năng lượng và không bao giờ muộn phiền.🌼",
        "Chúc bạn bắt đầu từ hôm nay xinh đẹp và giỏi giang hơn bao ngày trước. Và cứ đẹp mãi, giỏi mãi không ngừng nghỉ.💫"
    ];

    const msgEl = document.getElementById('message');
    let i = 0;
    msgEl.style.opacity = 1;
    setInterval(() => {
        msgEl.style.opacity = 0;
        setTimeout(() => {
            i = (i + 1) % messages.length;
            msgEl.textContent = messages[i];
            msgEl.style.opacity = 1;
        }, 800);
    }, 4800);

    const falling = [];
    for (let k = 1; k <= 12; k++) falling.push(`style/img/Anh (${k}).png`);

    const activePositions = [];
    function createFallingImage() {
        let left;
        const safe = 8;
        const minDistance = 10;
        let tries = 0;
        do {
            left = safe + Math.random() * (100 - 2 * safe);
            tries++;
        } while (activePositions.some(x => Math.abs(x - left) < minDistance) && tries < 20);

        const el = document.createElement('img');
        el.className = 'falling-img';
        el.src = falling[Math.floor(Math.random() * falling.length)];
        el.style.left = left + 'vw';

        let min = 80, max = 120;
        if (window.innerWidth <= 480) { min = 40; max = 70; }
        else if (window.innerWidth <= 768) { min = 60; max = 90; }
        el.style.width = (min + Math.random() * (max - min)) + 'px';
        el.style.animationDuration = (8 + Math.random() * 4) + 's';
        el.style.transform = `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(el);
        activePositions.push(left);

        setTimeout(() => {
            el.remove();
            const idx = activePositions.indexOf(left);
            if (idx !== -1) activePositions.splice(idx, 1);
        }, 14000);
    }

    setInterval(createFallingImage, 1100);

    const bgm = document.getElementById('bgm');
    const toggle = document.getElementById('soundToggle');
    let playing = false;

    toggle.addEventListener('click', async () => {
        try {
            if (!playing) {
                bgm.currentTime = 68;
                await bgm.play();
                toggle.textContent = "🔈";
                playing = true;
            } else {
                bgm.pause();
                toggle.textContent = "🔇";
                playing = false;
            }
        } catch (err) {
            console.log("Không thể phát", err);
        }
    });
});
