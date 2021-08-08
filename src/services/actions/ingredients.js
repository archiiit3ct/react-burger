export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL';
export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT';

const API = 'https://norma.nomoreparties.space/api/ingredients';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });

    fetch(API)
      .then((res) => {
        if (res.ok) return res.json();
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          value: `Ошибка ${res.status}`
        })
      })
      .then((data) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: data.data
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          value: `Ошибка ${e}`
        })
      });
  };
}