export class UserDto {
  login;
  email;
  isActivated;
  _id;

  constructor(model) {
    this.login = model.login;
    this.email = model.email;
    this.isActivated = model.isActivated;
    this._id = model._id;
  }
}

export class UserDtoLogin {
  login;
  firstName;
  lastName;
  gender;
  birdayDate;
  email;
  password;
  friends;
  subscribers;
  avatar;
  wasOnline;
  online;
  isActivated;
  _id;

  constructor(model) {
    this.login = model.login;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.gender = model.gender;
    this.birdayDate = model.birdayDate
    this.email = model.email;
    this.password = model.password;
    this.friends = model.friends;
    this.subscribers = model.subscribers;
    this.avatar = model.avatar
    this.wasOnline = model.wasOnline
    this.online = model.online
    this.isActivated = model.isActivated;
    this._id = model._id;
  }
}
