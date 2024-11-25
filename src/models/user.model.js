import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";
import { config } from "../configs/config.js";
import { ROLES_USER } from "../utils/constants/roles.utils.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token:{
      type: String,
      default: '',
    }
    ,
    id_pomodoro: {
      type: Schema.Types.ObjectId,
      ref: "Pomodoro",
    },
    id_todos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
    roles:
      {
        type: [String],
        enum:[ROLES_USER.ADMIN, ROLES_USER.USER, ROLES_USER.MODERATOR, ROLES_USER.SYSADMIN],
        default: ROLES_USER.USER,
      }
    
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    this.password = await hash(this.password, parseInt(config.salt));
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await compare(password, this.password)
}

const User = model("User", userSchema);

export default User;