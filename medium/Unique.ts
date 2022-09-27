type Res = Unique<[1, 1, 2, 2, 3, 3]>; // expected to be [1, 2, 3]
type Res1 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // expected to be [1, 2, 3, 4, 5, 6, 7]
type Res2 = Unique<[1, "a", 2, "b", 2, "a"]>; // expected to be [1, "a", 2, "b"]
type Res3 = Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // expected to be [string, number, 1, "a", 2, "b"]

type Equal<A, B> = A extends B ? (B extends A ? true : false) : false;

type Includes<T extends any[], U> = T extends [infer A, ...infer Rest]
  ? Equal<A, U> extends true
    ? true
    : Includes<Rest, U>
  : false;

type Unique<T extends any[], Result extends any[] = []> = T extends [
  infer A,
  ...infer Rest
]
  ? Includes<Result, A> extends true
    ? Unique<Rest, Result>
    : Unique<Rest, [...Result, A]>
  : Result;

export {};
