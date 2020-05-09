import { Schema, Model, model, Document } from 'mongoose';
import { Password } from '../services/password';

/**
 * Create interface to connect TypeScript with mongoose model
 */

interface UserProps {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(props: UserProps): UserDoc;
}

/**
 * interface that describes props that UserDocument has
 */
interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String, // it's build in JS type, not TypeScript!
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; // plain JS, delete keys from object
      },
      versionKey: false,
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

/**
 * define additional builder method to have type check
 * @param props User model properties
 */
userSchema.statics.build = (props: UserProps) => new User(props);

const User = model<UserDoc, UserModel>('User', userSchema);

export { User };
