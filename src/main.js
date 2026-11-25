var cv = document.getElementById('cv');
var ctx = cv.getContext('2d');
ctx.flush = function () {
    ctx.clearRect(0, 0, cv.width, cv.height);
};
var mouthRectBaseHight = 20;
var upper = {
    x: cv.width / 2 - 50,
    y: cv.height / 2 - 30,
    width: 100,
    height: mouthRectBaseHight,
    color: "#22e2ff",
};
var lower = {
    x: cv.width / 2 - 50,
    y: cv.height / 2 + 10,
    width: 100,
    height: mouthRectBaseHight,
    color: "#228dff",
};
var mouth = [upper, lower];
var lastTime;
var fpsTarget = 60;
var requiredElapsed = 1000 / fpsTarget; // desired interval is whatever is the number in fpsTarget
function loop(now) {
    if (!lastTime) {
        lastTime = now;
    }
    var delta = now - lastTime;
    if (delta > requiredElapsed) {
        move(delta);
        draw();
        lastTime = now;
    }
    requestAnimationFrame(loop);
}
function draw() {
    ctx.flush();
    for (var _i = 0, mouth_1 = mouth; _i < mouth_1.length; _i++) {
        var rect = mouth_1[_i];
        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
}
var animationTime = 0;
function move(delta) {
    animationTime += delta;
    var fullAnimationDuration = 2000; // 2 sec
    var cyclePosition = animationTime % fullAnimationDuration;
    // translates to 0.01 px per millisecond for growth/shrink
    var expansion = cyclePosition <= fullAnimationDuration / 2
        ? cyclePosition / 100
        : (fullAnimationDuration - cyclePosition) / 100;
    upper.height = mouthRectBaseHight + expansion;
    lower.height = mouthRectBaseHight + expansion;
    lower.y = cv.height / 2 + 10 - expansion;
}
requestAnimationFrame(loop);
