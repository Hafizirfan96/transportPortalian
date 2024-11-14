import { LogLevel } from '@/enums';
import { logService } from '@/services/LogService';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

type ErrorHandler = (error: Error, isFatal: boolean) => void;

const jsErrorHandler: ErrorHandler = e => {
  // console.log(`Js exception - ${e}`);
  e.name &&
    logService.logInfo({
      LogLevel: LogLevel.Error,
      Message: `Js exception - ${e}`,
    });
};

const nativeErrorHandler = (e: string) => {
  // console.log(`Native exception - ${e}`);
  logService.logInfo({ LogLevel: 4, Message: `Native exception - ${e}` });
};

export const initErrorHandling = () => {
  setJSExceptionHandler(jsErrorHandler, true);

  setNativeExceptionHandler(nativeErrorHandler);
};
