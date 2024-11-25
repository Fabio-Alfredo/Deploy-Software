import { Schema, model } from "mongoose";
import { TODO_STATE } from "../utils/constants/todoState.utils.js";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: [TODO_STATE.PENDING, TODO_STATE.COMPLETE, TODO_STATE.PROGRESS],
      default: TODO_STATE.PENDING,
    },
    color: {
      type: String,
      default: "#000000",
    },
    reminder: {
      type: Date,
      default: Date.now(),
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    id_pomodoro: {
      type: Schema.Types.ObjectId,
      ref: "Pomodoro",
    },
  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);
export default Todo;
