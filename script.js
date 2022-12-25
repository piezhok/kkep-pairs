const PAIR_DURATION = 4800000; // В миллисекундах
const SATURDAY_PAIR_DURATION = 4500000;

const PAIRS_HOURSTART = [8, 10, 12, 13];
const PAIRS_MINSTART = [45, 25, 5, 35];
const BREAKS_HOURSTART = [8 ,10, 11, 13];
const BREAKS_MINSTART = [0 ,5, 45, 25];

const SATURDAY_PAIRS_HOURSTART = [8, 10, 11, 13];
const SATURDAY_PAIRS_MINSTART = [45, 10, 35, 0];
const SATURDAY_BREAKS_HOURSTART = [8 ,10, 11, 12];
const SATURDAY_BREAKS_MINSTART = [0 ,0, 25, 50];

const line = document.getElementById('progress_line');
let timeLeft = document.getElementById('timerLeft');
let timePassed = document.getElementById('timerPassed');
let title = document.getElementById('title');
let test = document.getElementById('test');
let emoji = document.getElementById('emoji');
let player = document.getElementById('player');
let bellList = document.getElementById('bell_list');
let saturdayBellList = document.getElementById('saturday_bell_list');
let footer = document.getElementById('buy_phone');
let btn = document.getElementById('btn');

function padTo2(num) {
    if (num === 0) return '00'
    if (num>=10) return `${num}`
    return `0${num}`
}

function getTimeFormatted(date, beforeS){       // beforeS = 'Passed' || 'Left'
    date = new Date(Math.abs(date.getTime()));
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let s = '';
    if (beforeS == 'Left' && seconds != 0 && minutes !=0) {
        minutes += 1;
    }
    if (minutes == 0 && hours == 0)
        s += `${seconds} сек.`;
    if (hours != 0) {
        s += `${hours} час`;
        if (minutes != 0) s += ' ';
    }
    if (minutes != 0) {
        if (minutes % 10 == 1 && (minutes/100).toFixed(1) != 0.1)
            s += `${minutes} минута`;
        else if ((minutes % 10 > 1 && minutes % 10 < 5) && (minutes/100).toFixed(1) != 0.1)
            s += `${minutes} минуты`;
        else 
            s += `${minutes} минут`;
    }
    if (beforeS == 'Passed') {
        if (s.includes('час'))
            timePassed.innerHTML = 'Прошел '+s;
        else if (s.includes('минута'))
            timePassed.innerHTML = 'Прошла '+s;
        else if (s.includes('минут'))
            timePassed.innerHTML = 'Прошло '+s;
        else if (s.includes('сек.'))
            timePassed.innerHTML = 'Прошло '+s;
    }
    else if (beforeS == 'Left') {
        if (s.includes('час'))
            timeLeft.innerHTML = 'Остался '+s;
        else if (s.includes('минута'))
            timeLeft.innerHTML = 'Осталась '+s;
        else if (s.includes('минут'))
            timeLeft.innerHTML = 'Осталось '+s;
        else if (s.includes('сек.'))
            timeLeft.innerHTML = 'Осталось '+s;
    }
    // return `${padTo2(hours)}:${padTo2(minutes)}:${padTo2(seconds)}`;
}

function updatePairProgress(hourStart, minStart, duration) {
    let now = new Date();
    let start = new Date();
    start.setHours(hourStart, minStart, 0);
    let end = new Date();
    if (duration == PAIR_DURATION)
        end.setHours(start.getHours() + 1, start.getMinutes() + 20, 0);
    else
        end.setHours(start.getHours() + 1, start.getMinutes() + 15, 0);
    // timePassed.innerHTML = 'Прошло ' + getTimeFormatted(new Date(start - now));
    // timeLeft.innerHTML = 'Осталось ' + getTimeFormatted(new Date(end - now));
    getTimeFormatted(new Date(start - now), 'Passed');
    getTimeFormatted(new Date(end - now), 'Left');
    let progress = (Math.abs(start - now))/duration * 100;
    line.style.width = `${progress}%`
}

function updateBreakProgress(hourBreakStart, minBreakStart, breakDuration) {        // breakDuration в минутах
    let now = new Date();
    let start = new Date();
    start.setHours(hourBreakStart, minBreakStart, 0);
    let end = new Date();
    end.setHours(start.getHours(), start.getMinutes() + breakDuration, 0);
    title
    // timePassed.innerHTML = 'Прошло ' + getTimeFormatted(new Date(start - now))
    // timeLeft.innerHTML = 'Осталось ' + getTimeFormatted(new Date(end - now));
    getTimeFormatted(new Date(start - now), 'Passed');
    getTimeFormatted(new Date(end - now), 'Left');
    let progress = (Math.abs(start-now))/(breakDuration*60000)*100
    line.style.width = `${progress}%`;
}

function getTime(PairHourArray, PairMinArray, breakHourArray, breakMinArray) {
    let now = new Date();
    let nowTime = (now.getHours()*60+now.getMinutes())*60000+now.getSeconds();
    if ( nowTime < 8*3600000  &&  nowTime > 5*3600000 ) {
        timePassed.innerHTML = 'Хорошего';
        timeLeft.innerHTML = 'дня!';
        line.style.width = '0%';
    }
    for (let i = 0; i<4; i++) {
        let start = (PairHourArray[i]*60 + PairMinArray[i])*60000;
        if (PairHourArray != SATURDAY_PAIRS_HOURSTART)
            var end = start + PAIR_DURATION;
        else
            var end = start + SATURDAY_PAIR_DURATION;
        let startBreak = (breakHourArray[i]*60 + breakMinArray[i])*60000;
        
        if (i == 0) {
            var duration = 45;
        } else if (i < 3  &&  PairHourArray != SATURDAY_PAIRS_HOURSTART) {
            var duration = 20;
        } else {
            var duration = 10;
        }
        let endBreak = startBreak + duration*60000;

        if ( nowTime >= start && nowTime < end ) {
            let endHour = Math.floor(end/3600000);
            let endMin = (end/60000)-endHour*60;
            title.innerHTML = `${i+1} пара – ${PairHourArray[i]}:${padTo2(PairMinArray[i])} - ${endHour}:${padTo2(endMin)}`
            if (PairHourArray != SATURDAY_PAIRS_HOURSTART)
                updatePairProgress(PairHourArray[i], PairMinArray[i], PAIR_DURATION);
            else
                updatePairProgress(PairHourArray[i], PairMinArray[i], SATURDAY_PAIR_DURATION);
            return;

        } else if ( nowTime >= startBreak && nowTime < endBreak )  {
            if ( duration != 45 )
                title.innerHTML = `Перерыв – ${duration} минут`;
            else 
                title.innerHTML = `Перерыв`;
            updateBreakProgress(breakHourArray[i], breakMinArray[i], duration);
            return;

        } else if (nowTime > (8*60+25)*60000) {
            timePassed.innerHTML = 'Пары';
            timeLeft.innerHTML = 'кончились!';
            line.style.width = '100%';
        }
    }
}

function updateEmoji(PairHourArray, PairMinArray, breakHourArray, breakMinArray) {
    let now = new Date();
    let nowTime = (now.getHours()*60+now.getMinutes())*60000+now.getSeconds();
    if ( nowTime < 5*3600000) {
        // if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
        //     player.src = 'Stickers/Sunday.webm';
        //     emoji.style.display = "none";
        // }
        // else {
        //     emoji.src = 'Stickers/Sunday.tgs';
        //     player.style.display = "none";
        // }
        emoji.src = 'Stickers/Sunday.tgs';
        return;
    }
    else if ( nowTime < 8*3600000  &&  nowTime > 5*3600000 ) {
        // if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
        //     player.src = 'Stickers/Start.webm';
        //     emoji.style.display = "none";
        // }
        // else {
        //     emoji.src = 'Stickers/Start.tgs';
        //     player.style.display = "none";
        // }
        emoji.src = 'Stickers/Start.tgs';
        return;
    }
    for (let i = 0; i<4; i++) {
        let start = (PairHourArray[i]*60 + PairMinArray[i])*60000;
        if (PairHourArray != SATURDAY_PAIRS_HOURSTART)
            var end = start + PAIR_DURATION;
        else
            var end = start + SATURDAY_PAIR_DURATION;
        let startBreak = (breakHourArray[i]*60 + breakMinArray[i])*60000;
        if (i == 0) {
            var duration = 45;
        } else if (i < 3  &&  PairHourArray != SATURDAY_PAIRS_HOURSTART) {
            var duration = 20;
        } else {
            var duration = 10;
        }
        let endBreak = startBreak + duration*60000;
        if ( nowTime >= start && nowTime < end ) {
            // if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
            //     player.src = 'Stickers/Pair.webm';
            //     emoji.style.display = "none";
            // }
            // else {
            //     emoji.src = 'Stickers/Pair.tgs';
            //     player.style.display = "none";
            // }
            emoji.src = 'Stickers/Pair.tgs';
            return;

        } else if ( nowTime >= startBreak && nowTime < endBreak )  {
            // if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
            //     player.src = 'Stickers/Break.webm';
            //     emoji.style.display = "none";
            // }
            // else {
            //     emoji.src = 'Stickers/Break.tgs';
            //     player.style.display = "none";
            // }
            emoji.src = 'Stickers/Break.tgs';
            return;

        } else if (nowTime > (8*60+25)*60000) {
            // if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
            //     player.src = 'Stickers/End.webm';
            //     emoji.style.display = "none";
            // }
            // else {
            //     emoji.src = 'Stickers/End.tgs';
            //     player.style.display = "none";
            // }
            emoji.src = 'Stickers/End.tgs';
        }
    }
}

function highlight(list) {
    // let i = 1
    // let j = 0.5
    // timer = setInterval(function() {
    //     i += 0.5;
    //     list.style.padding = `3vw ${i}vw`
    //     if (list.style.padding == '3vw 10vw') {
    //         clearInterval(timer)
    //         return;
    //     }
    // }, 15)
    list.style.backgroundClip = 'padding-box';
    list.style.border = '0.5vw solid transparent';
    return;
}

let today = new Date().getDay();
if (today != 6 && today !=0) {
    updateEmoji(PAIRS_HOURSTART, PAIRS_MINSTART, BREAKS_HOURSTART, BREAKS_MINSTART);
    setInterval(getTime, 1000, PAIRS_HOURSTART, PAIRS_MINSTART, BREAKS_HOURSTART, BREAKS_MINSTART);
    highlight(bellList);
} else if (today == 6) {
    updateEmoji(SATURDAY_PAIRS_HOURSTART, SATURDAY_PAIRS_MINSTART, SATURDAY_BREAKS_HOURSTART, SATURDAY_BREAKS_MINSTART);
    setInterval(getTime, 1000, SATURDAY_PAIRS_HOURSTART, SATURDAY_PAIRS_MINSTART, SATURDAY_BREAKS_HOURSTART, SATURDAY_BREAKS_MINSTART);
    highlight(saturdayBellList);
}
else if (today == 0) {
    title.innerHTML = `Выходной`
    timePassed.innerHTML = 'Приятного';
    timeLeft.innerHTML = 'отдыха!';
    line.style.width = '100%';
    // if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    //     player.src = 'Stickers/Sunday.webm';
    //     emoji.style.display = "none";
    // }
    // else {
    //     emoji.src = 'Stickers/Sunday.tgs';
    //     player.style.display = "none";
    // }
    emoji.src = 'Stickers/Sunday.tgs';
}

if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {     // Чтоб Тим Кук сдох
    emoji.removeAttribute("loop")
    // First we check if you support touch, otherwise it's click:
    let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
    // Then we bind via that event. This way we only bind one event, instead of the two as below
    emoji.addEventListener(touchEvent, function () {
            emoji.seek(0);
            emoji.play();
        });
    // emoji.onclick = function () {
    //     emoji.seek(0);
    //     emoji.play();
    // }
}