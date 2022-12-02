import { Schema, model } from 'mongoose';

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User1' },
  refreshToken: { type: String, required: true },
})


export default model('Token', TokenSchema);
