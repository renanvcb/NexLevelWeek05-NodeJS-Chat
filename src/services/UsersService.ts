import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UsersRepository";

class UsersService {
  async create(email: string) {
    //Selecting the repository
    const userRepository = getCustomRepository(UserRepository);

    //Verifying if user already exists
    const userAlreadyExists = await userRepository.findOne({ email });

    //If it exists, return user
    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    //If it does not exists, save in DB
    const user = userRepository.create({ email });

    await userRepository.save(user);

    return user;
  }
}

export { UsersService };