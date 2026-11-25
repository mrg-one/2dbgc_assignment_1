export type FlushableCanvasRenderingContext2D = CanvasRenderingContext2D & {
    flush: VoidFunction;
};
export interface MouthRect {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}
