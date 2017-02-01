/**
 * Created by kuni on 2017/01/28.
 * @flow
 */
import * as Immutable from "immutable";

/***************************
 * Immutable Record with Flow
 ***************************/
// * UserRemarksModel
export type UserRemarksType = {
    text: string
};
export const defaultUserRemarks: UserRemarksType = {
    // Normal
    text: '',
    // * Error!
    // text: 1,
};
export class UserRemarksModel extends Immutable.Record(defaultUserRemarks) {
    static fromJS(props: UserRemarksType = defaultUserRemarks): UserRemarksModel {
        return (new this).merge(props);
    }
}

// * UserModel
export type UserType = {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    remarks: UserRemarksType
};
export const defaultUser: UserType = {
    id          : 0,
    firstName   : '',
    lastName    : '',
    age         : 0,
    remarks     : new UserRemarksModel()
};

export class UserModel extends Immutable.Record(defaultUser) {
    static fromJSRoot(key: any, value: any): any {
        if (Immutable.Iterable.Indexed(value)) {
            let users = Immutable.List();
            // Immutable.fromJSWithの実装を見るとcallメソッドにより明示的に元のjs objをthisとして呼び出している。
            for (let user of this['']) {
                users = users.push(UserModel.fromJS(user));
            }
            // HACK:理由がわからないんだけどreactComponentのstateをimmutable.jsのobjectをそのまま突っ込むとsetStateした時におかしくなる
            return {users: users};
        }
    }
    static fromJS(props: UserType = defaultUser): UserModel {
        UserModel.validate(props);
        props.remarks = UserRemarksModel.fromJS(props.remarks);

        return (new this).merge(props);
    }
    static validate(props: ?UserType): void {
        // throw new Error();
    }
    setName( firstName: string, lastName: string): UserModel {
        return this.withMutations( s =>
            s.set('firstName', firstName)
                .set('lastName', lastName)
        );
    }
    getFullName(): string {
        return this.firstName + ' - ' + this.lastName;
    }
    incrementAge(){
        return this.set( 'age', this.get('age') + 1);
    }
    decrementAge(){
        return this.set( 'age', this.get('age') - 1);
    }
}

