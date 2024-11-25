import { POMODORO_STATE } from "./constants/pomodoroStates.utils.js";

const MIN_TIME = 0;
const MAX_BREAK_TIME = 300;
const MAX_WORK_TIME = 1500;

export const assignPomodoroState = (time, state) => {
  let response = {
    time: time,
    state: state,
  };
  switch (state) {
    case POMODORO_STATE.WORK:
      return pomdoroTimeHandlerForWork(time);
    case POMODORO_STATE.BREAK:
      return pomdoroTimeHandlerForBreak(time);
    default:
      return response;
  }
};

const pomdoroTimeHandlerForWork = (time) =>
  time === MIN_TIME
    ? { time: MAX_BREAK_TIME, state: POMODORO_STATE.BREAK }
    : { time, state: POMODORO_STATE.WORK };

const pomdoroTimeHandlerForBreak = (time) =>
  time === MIN_TIME
    ? { time: MAX_WORK_TIME, state: POMODORO_STATE.WORK }
    : { time, state: POMODORO_STATE.BREAK };
