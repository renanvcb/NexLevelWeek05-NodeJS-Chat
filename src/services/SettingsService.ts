import { getCustomRepository } from "typeorm";

import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  username: string;
  chat: boolean;
}

class SettingsService {
  async create({ username, chat }: ISettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository);

    /**
     * This would be the same as:
     * select * from settings where username = "username" limit 1;
     */
    const userAlreadyExists = await settingsRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const settings = settingsRepository.create({
      username,
      chat
    })

    await settingsRepository.save(settings);

    return settings;
  }
}

export { SettingsService };