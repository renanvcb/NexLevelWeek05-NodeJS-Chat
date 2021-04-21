import { getCustomRepository, Repository } from "typeorm";

import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  username: string;
  chat: boolean;
}

class SettingsService {
  //Attribute available to class only
  private settingsRepository: Repository<Setting>;

  constructor() {
    //Selecting the repository
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ username, chat }: ISettingsCreate) {
    /**
     * This would be the same as:
     * select * from settings where username = "username" limit 1;
     */
    const userAlreadyExists = await this.settingsRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const settings = this.settingsRepository.create({
      username,
      chat
    })

    await this.settingsRepository.save(settings);

    return settings;
  }
}

export { SettingsService };