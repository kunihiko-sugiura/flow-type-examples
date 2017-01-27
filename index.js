// @flow
// * 弱いチェックモード
/* flow weak */

//region ** Premitive Types

/***************************
 * String
 ***************************/
let strType: string  = 'hello world!';
// * Normal
(strType: string);
((100 + "%") : string);
(null: string|null);
(undefined: string|void);
// * Error
// strType = 1;


/***************************
 * Boolean
 ***************************/
let boolType: boolean   = true;
// * Normal
(true: boolean);
(false: boolean);
// * Error
// (1: boolean);


/***************************
 * Number
 ***************************/
let numType: number  = 0;
// * Normal
(3.14: number);
(42: number);
(NaN: number);                          // Caution!! Nan is number.
(parseFloat("not a number"): number);   // the value is NaN
// * Error
// ('test': number);


/***************************
 * Any 型チェックの放棄
 ***************************/
var anyTest:any = null;

// * Declare ambient variant
// グローバル変数として露出する変数の型を握りつぶす場合は、次のように書くらしい。
declare var $:any; // example jquery

// TODO:declare するとどう違うのか

/***************************
 * Array
 ***************************/
let numArr: number[] = [1, 2, 3.14, 42];
let strArr: Array<?string> = ["an alternate", "syntax", "for arrays", null];


/***************************
 * Array Tupple(define each element type)
 * こんなの
 ***************************/
// * Normal
let tupleArr: [string, number, boolean, void] = ["foo", 0, true, undefined];
// * Error
// let tupleArr2: [string] = [1];

// * Notes
// 以下はエラーになるはずだけど通っちゃう。
var tup = ["1", 1, 2, "positive"];
tup.unshift(1);
console.log(tup[1] * tup[2]); // number * string


/***************************
 * Basic Function
 ***************************/
function func_basic(num1: number, num2: number): number {
    return num1 + num2;
}
// * Normal
let ret_func_basic1 = func_basic(1, 2);
// * Error
// let ret_func_basic2 = func_basic(1, 'a');


/***************************
 * Polymorphic functions
 ***************************/
function polymorphicFunctions<T>(x: T): T { return x; }
var pfx: number  = polymorphicFunctions(0);
var pfyy: string = polymorphicFunctions('');









/***************************
 * Basic Class
 ***************************/
class BasicClassA {
    x: string;
    y: number;
    constructor() {}
    foo() {
        return this.x;
    }
    bar(y:number) {
        this.y = y;
    }
}
class BasicClassB extends BasicClassA {}
let basicClassA = new BasicClassA();
let basicClassB = new BasicClassB();
// * Normal
(basicClassA: BasicClassA);
(basicClassB: BasicClassA);
(basicClassB: BasicClassB);
// * Error
// (basicClassA: BasicClassB);
// (basicClassA: UnknownClassC);


/***************************
 * Genericsに関して
 * 型引数の名前にはTを使用することが多いが、2つ以上の場合はアルファベット順にT,U,V,やT1,T2,T3などが慣習的に使用される
 * 通常必要ないが、例えば「この2つの機能は型を除けばそっくりな処理を行っている」というケースに出会うことがある。そういうときに、コードを短くまとめるには、型を抽象的に扱う機能が必要とされる。それがTypeScriptの場合はジェネリックである。
 *
 * - ジェネリックは、使用されるまで不明の任意の型を利用する技術
 * - 型引数が、任意の型に対応する
 * - 値が変化するときは引数。型が変化する時は型引数で関数をまとめられる
 * - 引数は関数に付けるものだが、型引数はクラスやインターフェースにも付けられる
 * - 型引数は複数あってよい
 * - 型引数は、引数、戻り値の型指定、関数やクラスの内部にも使用できる
 * - 型引数の型はコンパイラが推論してくれるが、頼りすぎは禁物
 * - 型には制約を付けることができる
 * - ジェネリックは、コレクションと相性がよい
 * - 一般的に、コードサイズが大きくなっていくと、ジェネリックの出番が増えていく
 *
 ***************************/
class ClassGeneric<T> {
    _value: T;
    constructor(value: T) {
        this._value = value;
    }
    get(): T {
        return this._value;
    }
}

/***************************
 * Mixins
 ***************************/





/***************************
 // * Type Aliases
 ***************************/
// Array
type TArrStr = Array<string>;
var tArrStr: TArrStr = [];
// * Normal
tArrStr[2] = 'test';
// * Error
// tArrStr["Hi"] = 2;

// ユーザの名前と画像を持ったデータ型
type TypeUser = {
    id:number;
    name:string;
}
type TypeUsers = Array<TypeUser>;


// Object
type TObj = { val:number };
// * Normal
var tObj: TObj = { val: 1};
// * Error
// var tObj: TObj = { val: 'test'};
// var tObj: TObj = [];



/***************************
 * Union types
 * 指定された型のうちどれか1つを満たす型
 ***************************/
type EnumRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    | "Jack"
    | "Queen"
    | "King"
    | "Ace";

// * Normal
let rank:EnumRank = 1;
rank = 'Jack';

// * Error
// rank = 11;
// rank = 'unknown';

/***************************
 * Intersection types
 * 指定された型をすべて満たす型
 ***************************/
type TypeA = { a: string };
type TypeB = { b: number };

type TypeU = TypeA | TypeB; // Union
type TypeI = TypeA & TypeB; // Intersecion

({ a: 'hoge' }:         TypeU); // OK!
({ b: 1 }:              TypeU); // OK!
({ a: 'hoge', b: 1 }:   TypeU); // OK!
// ({ c: true }:           TypeU); // Error!

({ a: 'hoge', b: 1 }:   TypeI); // OK!
// ({ a: 'hoge' }:         TypeI); // Error!
// ({ b: 1 }:              TypeI); // Error!
// ({ c: true }:           TypeI); // Error!





/***************************
 * Maybe types
 * Maybe types have the type T|void|null for some type T.
 ***************************/
function maybe_fun(foo: ?string) {
    (foo: string|void|null);
}
maybe_fun("foo");
maybe_fun(undefined);
maybe_fun();
maybe_fun(null);


// * Type Any:なんでもOK、でも安全じゃないよ
// any is simultaneously a supertype of all types and a subtype of all types.
// Intuitively, an any value can take the place of “any” other value,
// and Flow will understand that to be well-typed.
function takes_any(unsafe: any): void {}
takes_any(null);
takes_any(undefined);
takes_any(0);
takes_any("");
takes_any({ foo: "bar" });
takes_any(BasicClassA);     // Class
takes_any(basicClassA);     // Class Instance

// * global variant type
// 外部ライブラリにちゃんと型を定義する方法
// interfaces/underscore.jsに定義
declare var _: Underscore;
var pizzas = [
    { title: 'Four cheese', vegetarian: true },
    { title: 'Hawaiian', vegetarian: false },
];
function vegetarianPizzas() {
    return _.findWhere(pizzas, {vegetarian: true});
}
vegetarianPizzas();


// * Mixed
// TODO:これあんまりよくわかってない。
// Mixed Like any,
// mixed is a supertype of all types.
// Unlike any, however, mixed is not a subtype of all types.
// This means mixed is like a safe but somewhat annoying version of any.
// It should be preferred over any whenever possible.
function takes_mixed(x: mixed): void {}
takes_mixed(0);
takes_mixed("");
takes_mixed({ foo: "bar" });
takes_mixed(null);
takes_mixed(undefined);



// * Null
let nullType: null      = null;
// check
(null:null);
// (undefined:null);//    error!
// (1:null);        //    error!

// * Void
let voidType: void      = undefined;
// check
(undefined:void);
// (null:void);     // error!






// * string or void Type
let voidableStrType: ?string  = null;
voidableStrType  = 'test';
voidableStrType  = undefined;

// check
('':?string);
(null:?string);
(undefined:?string);
//endregion




// function optional_fun(foo?: string): void {
//     (foo: string|void);
// }




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
    x: string;
    y: number;
    foo(): string;
    bar(y: number): void;
}
function takesAnILikeC(c: ILikeC): string {
    return c.foo();
}
var testInterface: TestInterface = new TestInterface("implements ILikeC");
var s: string = takesAnILikeC(testInterface);



// * Type inference

//型推論によりnullチェックをしてると、以下のコードも怒られない。
function length(x) {
    if (x !== null) {
        return x.length;
    } else {
        return 0;
    }
}

var total = length('Hello') + length(null);


// 以下は怒られます。
// function length(x) {
//     return x.length;
// }
// var total = length('Hello') + length(null);

