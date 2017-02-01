/**
 * Created by kuni on 2017/01/30.
 * @flow
 */
import React from "react";
import ReactDOM from "react-dom";
import * as Immutable from "immutable";
import { UserModel, UserRemarksModel} from "./immutable";

/**********************
 * json
 **********************/
const json = '[{"id":1,"firstName":"firstName1","lastName":"lastName1","age":21,"remarks":{"text":"test1"}},{"id":2,"firstName":"firstName2","lastName":"lastName2","age":22,"remarks":{"text":"test2"}}]';
const initState = Immutable.fromJS( JSON.parse(json), UserModel.fromJSRoot );

/**********************
 * State
 **********************/
const ActionTypes = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
};
type StateType = {
    users: Immutable.List<UserModel>
};
type ActionType =
    { type: string, value: { id: number } };

function reducer( state: StateType = { users: Immutable.List() }, action: ActionType ): StateType {
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

/**********************
 * Users
 **********************/
class Users extends React.Component<void, any, StateType> {
    state: StateType;
    constructor(props: any, context: any) {
        super(props, context);
        this.state = initState;
    }
    dispatch(action: ActionType): void{
        this.setState(
            reducer( this.state, action )
        );
    }
    render() {
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

/**********************
 * User
 **********************/
type UserPropsType = {
    user: UserModel,
    dispatch: (action: ActionType) => void
};
class User extends React.Component<void, UserPropsType, void> {
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
    render(){
        return(
            <div>
                {this.props.user.getFullName()} - {this.props.user.get('age')} -
                <button onClick={this.onclickIncrement.bind(this)}>+</button>
                <button onClick={this.onclickDecrement.bind(this)}>-</button>
            </div>
        );
    }
}

ReactDOM.render(
    <Users/>,
    document.getElementById('app')
);
