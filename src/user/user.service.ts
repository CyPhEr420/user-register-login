import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

const nodemailer = require('nodemailer');

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async checkUser(email, password): Promise<any> {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (user.password === password) {
      return 'User found';
    }
    return 'User not found';
  }

  async createUser(user: User): Promise<any> {
    const newUser = new this.userModel({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    const result = await newUser.save();
    return result;
  }

  async SendResetPasswordEmail(email): Promise<any> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gamilcom',
        pass: 'yourpassword',
      },
    });

    let mailOptions = {
      from: 'youremail@gamilcom',
      to: email,
      subject: 'Change Password',
      text: `
        Password Reset Link:
        change reset-password with the password you want to change 
        and email with the email
        Get : http://localhost:3000/reset-password/:email/:newpassword
      `,
    };

    let user = await this.userModel
      .findOne({ email: email })
      .exec()
      .then((user) => {
        if (user) {
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return error;
            } else {
              return 'Email sent successfully';
            }
          });
        } else {
          return 'User not found';
        }
      });
  }

  resetPassword(email, password): any {
    return this.userModel.findOneAndUpdate(
      { email: email },
      { $set: { password: password } },
    );
  }
}
