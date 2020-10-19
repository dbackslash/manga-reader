import { useState, useEffect } from 'react';
const electron = window.require('electron');

export function useLazyQuery<T>(channel: string): [MainCaller, QueryState<T>] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const callMain = (...args: any) => {
    setError(undefined);
    setLoading(true);
    callIpcQuery(channel, ...args)
      .then((res: any) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      })
  }

  return [callMain, { data, loading, error, refetch: callMain }];
}

export function useQuery<T>(channel: string, ...args: any) {
  const [callMain, state] = useLazyQuery<T>(channel);

  useEffect(() => {
    callMain(...args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

export function callIpcQuery(channel: string, ...args: any): Promise<any> {
  return electron.ipcRenderer.invoke(channel, ...args);
}

type MainCaller = (...args: any) => void;

interface QueryState<T> {
  data?: T;
  loading: boolean;
  error?: Error;
  refetch: MainCaller;
}
