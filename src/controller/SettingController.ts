import * as fs from "fs";
import Setting from "../model/Setting.js";
import Assignment from "../model/Assignment.js";
import Mutex from "../util/Mutex.js";

export default class SettingController {
  static getSettings() {
    if (fs.existsSync("./settings.json")) {
      const fileBuffer = fs.readFileSync("./settings.json");
      return Setting.fromJSON(fileBuffer.toString());
    }
    const setting = new Setting([], [], [], []);
    setting.demo();
    return setting;
  }

  static async addAssignment(assignment: Assignment) {
    const unlock = await Mutex.acquire();
    const setting = this.getSettings();
    if (!setting.assignments) {
      setting.assignments = [];
    }
    assignment.id = setting.assignments.length + 1;

    if (assignment.type === "CULTURE") {
      // calculate the value
      const plot = setting.plots.find((p) => p.id === assignment.plot?.id);
      const task = setting.tasks.find((t) => t.id === assignment.task?.id);
      if (!plot || !task) {
        unlock();
        throw "Incorrect values";
      }
      assignment.time = task.speed * plot.area;
    }

    setting.assignments.push(assignment);
    fs.writeFileSync("./settings.json", JSON.stringify(setting));
    unlock();
  }

  static async saveSettings(setting: Setting) {
    const unlock = await Mutex.acquire();
    if (!setting.assignments) {
      setting.assignments = [];
    }
    fs.writeFileSync("./settings.json", JSON.stringify(setting));
    unlock();
  }

  static async removeAssignment(assignmentId: number) {
    const unlock = await Mutex.acquire();
    const setting = this.getSettings();
    if (!setting.assignments) {
      setting.assignments = [];
    }
    setting.assignments = setting.assignments.filter(
      (a) => a.id !== assignmentId
    );
    fs.writeFileSync("./settings.json", JSON.stringify(setting));
    unlock();
  }
}
