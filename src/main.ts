
const cv = document.getElementById('cv') as HTMLCanvasElement;

export type FlushableCanvasRenderingContext2D = CanvasRenderingContext2D & { flush: VoidFunction };

const ctx = cv.getContext('2d') as FlushableCanvasRenderingContext2D;

ctx.flush = () => {
    ctx.clearRect(0, 0, cv.width, cv.height);
}

export interface MouthRect {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
}
const mouthRectBaseHight = 20;

const upper: MouthRect = {
    x: cv.width / 2 - 50,
    y: cv.height / 2 - 30,
    width: 100,
    height: mouthRectBaseHight,
    color: "#22e2ff",
};

const lower: MouthRect = {
    x: cv.width / 2 - 50,
    y: cv.height / 2 + 10,
    width: 100,
    height: mouthRectBaseHight,
    color: "#228dff",
}

const mouth = [upper, lower];

let lastTime: number | undefined;
const fpsTarget = 60
const requiredElapsed = 1_000 / fpsTarget; // desired interval is whatever is the number in fpsTarget


function loop(now: number) {

    if (!lastTime) { lastTime = now; }
    const delta = now - lastTime;

    if (delta > requiredElapsed) {
        move(delta)
        draw();
        lastTime = now;
    }

    requestAnimationFrame(loop);

}

function draw() {

    ctx.flush();
    for (const rect of mouth) {
        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

}

let animationTime = 0;
function move(delta: number) {
    animationTime += delta;

    const fullAnimationDuration = 2_000; // 2 sec

    const cyclePosition = animationTime % fullAnimationDuration;

    // translates to 0.01 px per millisecond for growth/shrink
    const expansion = cyclePosition <= fullAnimationDuration / 2
        ? cyclePosition / 100
        : (fullAnimationDuration - cyclePosition) / 100;

    upper.height = mouthRectBaseHight + expansion;
    lower.height = mouthRectBaseHight + expansion;
    lower.y = cv.height / 2 + 10 - expansion;
}

requestAnimationFrame(loop);