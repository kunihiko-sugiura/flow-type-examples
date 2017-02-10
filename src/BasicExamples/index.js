/*
 * @flow
 * 弱いチェックモード
 * flow weak
 */

/***************************
 * Interface
 ***************************/
class TestInterface {
    x: string;
    y: number;
    constructor(x: string) {
        this.x = x;
    }
    foo(): string {
        return this.x;
    }
    bar(y: number): void {
        this.y = y;
    }
}
interface ILikeC {
    x: string,
    y: number,
    foo(): string,
    bar(y: number): void,
}
function takesAnILikeC(c: ILikeC): string {
    return c.foo();
}
let testInterface: TestInterface = new TestInterface("implements ILikeC");
let s: string = takesAnILikeC(testInterface);


/***************************
 * Type inference
 ***************************/
//型推論によりnullチェックをしてると、以下のコードも怒られない。
function length(x) {
    if (x !== null) {
        return x.length;
    } else {
        return 0;
    }
}
let total = length('Hello') + length(null);

// 以下は怒られます。
// function length(x) {
//     return x.length;
// }
// var toal = length('Hello') + length(null);
