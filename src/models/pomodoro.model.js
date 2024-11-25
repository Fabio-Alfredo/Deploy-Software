import { Schema, model } from "mongoose";
import { POMODORO_STATE } from "../utils/constants/pomodoroStates.utils.js";

const pomodoroSchema = new Schema(
  {
    time: {
      type: Number,
      default: 1500,
    },
    state: {
      type: String,
      enum: [POMODORO_STATE.WORK, POMODORO_STATE.BREAK, POMODORO_STATE.NONE],
      required: true,
      default: POMODORO_STATE.NONE,
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id_todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Pomodoro = model("Pomodoro", pomodoroSchema);
export default Pomodoro;
