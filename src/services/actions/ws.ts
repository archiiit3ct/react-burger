import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from '../constants/ws';
import {TMessages} from '../types';

export const wsActions = {
    wsInit: WS_CONNECTION_START as typeof WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS as typeof WS_CONNECTION_SUCCESS,
    onError: WS_CONNECTION_ERROR as typeof WS_CONNECTION_ERROR,
    onClose: WS_CONNECTION_CLOSED as typeof WS_CONNECTION_CLOSED,
    onMessage: WS_GET_MESSAGE as typeof WS_GET_MESSAGE,
    wsSendMessage: WS_SEND_MESSAGE as typeof WS_SEND_MESSAGE,
};

export type TWsActions = typeof wsActions;

interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START
}

interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS,
    payload: boolean
}

interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR,
    payload: boolean
}

interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED
}

interface IWsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE,
    payload: TMessages
}

interface IWsSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE
}

export type TWsAction =
    IWsConnectionStartAction
    | IWsConnectionSuccessAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsGetMessageAction
    | IWsSendMessageAction;
