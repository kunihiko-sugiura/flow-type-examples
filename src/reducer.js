/**
 * Created by kuni on 2017/02/10.
 * @flow
 */
import * as Immutable from "immutable";
import {ActionTypes} from "./actions/types";
import type {ActionType} from "./actions/types";
import {UserModel} from "./models/user-model";

export type StateType = {
    users: Immutable.List<UserModel>
};

export function reducer( state: StateType = { users: Immutable.List() }, action: ActionType ): StateType {
    const index: number = state.users.findIndex((u: UserModel): boolean => u.id == action.value.id);

    switch( action.type ) {
        case ActionTypes.INCREMENT:
            return {
                users: state.users.set( index,
                    state.users.get(index).incrementAge()
                )
            };
        case ActionTypes.DECREMENT:
            return {
                users: state.users.set( index,
                    state.users.get(index).decrementAge()
                )
            };
        default:
            return state;
    }
}
