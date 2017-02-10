/**
 * @flow
 */
export const ActionTypes = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
};
export type ActionType =
    { type: string, value: { id: number } };
