/**
 * Created by kuni on 2017/01/28.
 * @flow
 */
import * as Immutable from "immutable";

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
