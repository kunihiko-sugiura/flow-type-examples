/**
 * Created by kuni on 2017/01/23.
 */
declare class Underscore {
    /**
     * GenericによってUnderscoreのfindWhereを定義した例
     */
    findWhere<T>(list: Array<T>, properties: {}): T;
}