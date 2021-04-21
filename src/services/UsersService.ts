import { getCustomRepository, Repository } from "typeorm";

import { User } from "../entities/User";
import { UserRepository } from "../repositories/UsersRepository";

class UsersService {
  //Attribute available to class only
  private usersRepository: Repository<User>;

  constructor() {
    //Selecting the repository
    this.usersRepository = getCustomRepository(UserRepository);
  }

  async create(email: string) {
    //Check if user already exists
    const userAlreadyExists = await this.usersRepository.findOne({ email });

    //If it exists, return user
    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    //If it does not exists, save in DB
    const user = this.usersRepository.create({ email });

    await this.usersRepository.save(user);

    return user;
  }
}

export { UsersService };