/**
 * @flow
 */
import React from "react";
import { UserModel } from "../models/user-model";
import { ActionTypes } from "../actions/types";
import type { ActionType } from "../actions/types";

export type UserPropsType = {
    user: UserModel,
    dispatch: (action: ActionType) => void
};
export class User extends React.Component<void, UserPropsType, void> {
    constructor(props: UserPropsType, context: any) {
        super(props, context);
    }
    dispatch(type: string){
        this.props.dispatch({
            type: type,
            value: {
                id: this.props.user.id
            }
        });
    }
    onclickIncrement(e: SyntheticMouseEvent){
        this.dispatch(ActionTypes.INCREMENT);
    }
    onclickDecrement(e: SyntheticMouseEvent){
        this.dispatch(ActionTypes.DECREMENT);
    }
    render(): any{
        return(
            <div>
                {this.props.user.getFullName()} - {this.props.user.get('age')} -
                <button onClick={this.onclickIncrement.bind(this)}>+</button>
                <button onClick={this.onclickDecrement.bind(this)}>-</button>
            </div>
        );
    }
}
