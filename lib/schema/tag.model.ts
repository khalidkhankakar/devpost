import { Schema, model, models, Document } from 'mongoose';


const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  post: [{ type: Schema.Types.ObjectId, ref: 'Post' }], 
  createdAt: { type: Date, default: Date.now },
});

const Tag = models.Tag || model('Tag', TagSchema);

export default Tag;