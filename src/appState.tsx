import React, { createContext, useContext, useReducer } from 'react';

export enum Action {
  SET_THEME = 'SET_THEME',
  CHANGE_SETTING = 'CHANGE_SETTING'
}

const initialState: IAppState = {
  theme: 'dark',
  settings: {},
}

const actionsFactory = (dispatch: React.Dispatch<IAction>) => ({
  setTheme: (theme: string) => dispatch({ type: Action.SET_THEME, payload: theme }),
  changeSetting: (key: string, value: any) => dispatch({ type: Action.CHANGE_SETTING, payload: { key, value } }),
})

const reducer: AppStateReducer = (state: IAppState, action: IAction) => {
  switch (action.type) {
    case Action.SET_THEME:
      return { ...state, theme: action.payload }
    case Action.CHANGE_SETTING:
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.key]: action.payload.value,
        }
      }
    default:
      return state;
  }
}

const AppContext = createContext<[IAppState, IAppActions]>([initialState, {
  setTheme: (k:string) => {},
  changeSetting: (k:string, v:any) => {},
}]);

const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = actionsFactory(dispatch);

  return (
    <AppContext.Provider value={[state, actions]}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  return useContext(AppContext);
}

interface IAppState {
  theme: 'light' | 'dark';
  settings: { [k: string]: any}
}

interface IAction {
  type: Action;
  payload: any;
}

interface IAppActions {
  setTheme: (theme: string) => void;
  changeSetting: (key: string, value: any) => void;
}

type AppStateReducer = (state: IAppState, action: IAction) => IAppState;

export default AppStateProvider;
