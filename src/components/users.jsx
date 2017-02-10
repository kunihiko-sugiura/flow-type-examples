/**
 * @flow
 */
import React from "react";
import { reducer } from "../reducer";
import type { StateType } from "../reducer";
import type { ActionType } from "../actions/types";
import { User } from "../components/user.jsx";
import * as Immutable from "immutable";
import { UserModel } from "../models/user-model";

export class Users extends React.Component<void, any, StateType> {
    state: StateType;
    constructor(props: any, context: any) {
        super(props, context);

        const json = '[{"id":1,"firstName":"Brian","lastName":"Eno","age":69,"remarks":{"text":"ambient"}},{"id":2,"firstName":"Terry","lastName":"Rilley","age":82,"remarks":{"text":"minimal"}}]';
        this.state = Immutable.fromJS( JSON.parse(json), UserModel.fromJSRoot );
    }
    dispatch(action: ActionType): void{
        this.setState(
            reducer( this.state, action )
        );
    }
    render(): any {
        let elmUsers = [];
        for( let user of this.state.users ){
            elmUsers.push(<User key={user.id} user={user} dispatch={this.dispatch.bind(this)} />);
        }
        return(
            <div>
                {elmUsers}
            </div>
        );
    }
}