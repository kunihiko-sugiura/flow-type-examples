/**
 * Created by kuni on 2017/01/28.
 * @flow
 */
import * as Immutable from "immutable";

/***************************
 * Immutable Record with Flow
 ***************************/
// * UserRemarksModel
type UserRemarksType = {
    text: string,
};
const defaultUserRemarks: UserRemarksType = {
    // Normal
    text: '',
    // * Error!
    // text: 1,
};
class UserRemarksModel extends Immutable.Record(defaultUserRemarks) {
    static fromJS(props: UserRemarksType = defaultUserRemarks) {
        return (new this).merge(props);
    }
}

// * UserModel
type UserType = {
    firstName   : string,
    lastName    : string,
    age         : number,
    remarks     : UserRemarksType
};
const defaultUser: UserType = {
    firstName   : '',
    lastName    : '',
    age         : 0,
    remarks     : new UserRemarksModel()
};

class UserModel extends Immutable.Record(defaultUser) {
    static fromJSRoot(key, value) {
        if(Immutable.Iterable.Indexed(value)) {
            let state = new Immutable.List();
            // Immutable.fromJSWithの実装を見るとcallメソッドにより明示的に元のjs objをthisとして呼び出している。
            for (let item of this['']) {
                state = state.push(UserModel.fromJS(item));
            }
            return state;
        }
    }
    static fromJS(props: UserType = defaultUser) {
        if( ! UserModel.validate(props)){
            // Exeption
        }
        props.remarks = UserRemarksModel.fromJS(props.remarks);

        return (new this).merge(props);
    }
    static validate(props: ?UserType){
        return true;
    }
    setName( firstName: string, lastName: string){
        return this.withMutations( s =>
            s.set('firstName', firstName)
                .set('lastName', lastName)
        );
    }
    getFullName(){
        return this.firstName + this.lastName;
    }
}

// ** json object
const json = '[{"firstName":"firstName1","lastName":"lastName1","age":21,"remarks":{"text":"test1"}},{"firstName":"firstName2","lastName":"lastName2","age":22,"remarks":{"text":"test2"}}]';
const state = Immutable.fromJS( JSON.parse(json), UserModel.fromJSRoot );

console.log(state.getIn(['0']) );
// TODO: Why the following code does not Error?
console.log(state.getIn(['unknown']) );


