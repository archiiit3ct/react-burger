import {
    WS_CONNECTION_PRIVATE_CLOSED,
    WS_CONNECTION_PRIVATE_ERROR,
    WS_CONNECTION_PRIVATE_START,
    WS_CONNECTION_PRIVATE_SUCCESS,
    WS_GET_MESSAGE_PRIVATE,
    WS_SEND_MESSAGE_PRIVATE,
} from '../constants/ws-private';
import {TMessages} from '../types';

export const wsPrivateActions = {
    wsInit: WS_CONNECTION_PRIVATE_START as typeof WS_CONNECTION_PRIVATE_START,
    onOpen: WS_CONNECTION_PRIVATE_SUCCESS as typeof WS_CONNECTION_PRIVATE_SUCCESS,
    onError: WS_CONNECTION_PRIVATE_ERROR as typeof WS_CONNECTION_PRIVATE_ERROR,
    onClose: WS_CONNECTION_PRIVATE_CLOSED as typeof WS_CONNECTION_PRIVATE_CLOSED,
    onMessage: WS_GET_MESSAGE_PRIVATE as typeof WS_GET_MESSAGE_PRIVATE,
    wsSendMessage: WS_SEND_MESSAGE_PRIVATE as typeof WS_SEND_MESSAGE_PRIVATE,
};

export type TWsPrivateActions = typeof wsPrivateActions;

interface IWsConnectionPrivateStart {
    readonly type: typeof WS_CONNECTION_PRIVATE_START;
}

interface IWsConnectionPrivateSuccess {
    readonly type: typeof WS_CONNECTION_PRIVATE_SUCCESS,
    payload: boolean;
}

interface IWsConnectionPrivateError {
    readonly type: typeof WS_CONNECTION_PRIVATE_ERROR;
    payload: boolean;
}

interface IWsConnectionPrivateClosed {
    readonly type: typeof WS_CONNECTION_PRIVATE_CLOSED;
}

interface IWsGetMessagePrivate {
    readonly type: typeof WS_GET_MESSAGE_PRIVATE;
    readonly payload: TMessages;
}

interface IWsSendMessagePrivate {
    readonly type: typeof WS_SEND_MESSAGE_PRIVATE;
}

export type TWsPrivateAction =
    IWsConnectionPrivateStart
    | IWsConnectionPrivateSuccess
    | IWsConnectionPrivateError
    | IWsConnectionPrivateClosed
    | IWsGetMessagePrivate
    | IWsSendMessagePrivate;
