import { Request, Response } from "express";

import { SettingsService } from "../services/SettingsService";

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, chat } = request.body;

    const settingsService = new SettingsService();

    //Tries the regular process, if not able, treats errors
    try {
      const settings = await settingsService.create({ username, chat });

      return response.json(settings);
    } catch (err) {
      return response.status(409).json({
        message: err.message
      })
    }
  }
}

export { SettingsController };