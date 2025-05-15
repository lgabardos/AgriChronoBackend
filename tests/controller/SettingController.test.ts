import { expect, test, vi } from 'vitest';
import SettingController from '../../src/controller/SettingController.js';
import Assignment, { AssignmentType } from '../../src/model/Assignment.js';
import Driver from '../../src/model/Driver.js';
import Plot from '../../src/model/Plot.js';
import Task from '../../src/model/Task.js';
import Setting from '../../src/model/Setting.js';

vi.mock('fs', () => ({
  existsSync: vi.fn().mockImplementation(() => {
    return getExistValue();
  }),
  readFileSync: vi.fn().mockImplementation(() => {
    return defaultFileContent;
  }),
  writeFileSync: vi.fn().mockImplementation((path: string, content: string) => {
    spyWrite(path, content);
    console.log(content);
  }),
}));

let existFile = false;
const getExistValue = () => {
  return existFile;
};
let defaultFileContent = Buffer.from(`{ "drivers": [ { "id": 1, "name": "driver test" } ] }`);
const spyWrite = vi.fn();

test('Get settings file not exists', () => {
  const settings = SettingController.getSettings();
  expect(settings.drivers.length).toBe(5);
});

test('Get settings file not exists', () => {
  existFile = true;
  const settings = SettingController.getSettings();
  expect(settings.drivers.length).toBe(1);
  expect(settings.drivers[0]!.name).toBe('driver test');
});

test('addAssignment', async () => {
  const date = new Date();
  const assignment = new Assignment(
    1,
    new Driver(2, 'driver test'),
    date,
    AssignmentType.OTHER,
    12,
    'fake comment',
    Plot.from({ id: 3, name: 'fake plot', area: 42, idFarm: 4 }),
    Task.from({ id: 5, name: 'fake task', speed: 123 }),
    10
  );
  await SettingController.addAssignment(assignment);
  expect(spyWrite).toHaveBeenNthCalledWith(
    1,
    './settings.json',
    `{"drivers":[{"id":1,"name":"driver test"}],"assignments":[{"id":1,"worker":{"id":2,"name":"driver test"},"date":"${date.toJSON()}","type":"OTHER","time":12,"comment":"fake comment","plot":{"id":3,"name":"fake plot","idFarm":4,"area":42},"task":{"id":5,"name":"fake task","speed":123},"value":10}]}`
  );

  defaultFileContent = Buffer.from(
    `{ "drivers": [ { "id": 1, "name": "driver test" } ], "assignments": [] }`
  );
  await SettingController.addAssignment(assignment);
  expect(spyWrite).toHaveBeenNthCalledWith(
    2,
    './settings.json',
    `{"drivers":[{"id":1,"name":"driver test"}],"assignments":[{"id":1,"worker":{"id":2,"name":"driver test"},"date":"${date.toJSON()}","type":"OTHER","time":12,"comment":"fake comment","plot":{"id":3,"name":"fake plot","idFarm":4,"area":42},"task":{"id":5,"name":"fake task","speed":123},"value":10}]}`
  );
});

test('save settings', async () => {
  const settings = new Setting([], [], [], []);
  await SettingController.saveSettings(settings);
  expect(spyWrite).toHaveBeenNthCalledWith(
    3,
    './settings.json',
    `{"drivers":[],"farms":[],"plots":[],"tasks":[],"assignments":[]}`
  );

  const settingsWithAssignments = new Setting([], [], [], [], []);
  await SettingController.saveSettings(settingsWithAssignments);
  expect(spyWrite).toHaveBeenNthCalledWith(
    4,
    './settings.json',
    `{"drivers":[],"farms":[],"plots":[],"tasks":[],"assignments":[]}`
  );
});

test('removeAssignment', async () => {
  defaultFileContent = Buffer.from(
    `{ "drivers": [ { "id": 1, "name": "driver test" } ], "assignments": [{ "id": 13 }] }`
  );
  await SettingController.removeAssignment(12);
  expect(spyWrite).toHaveBeenNthCalledWith(
    5,
    './settings.json',
    `{"drivers":[{"id":1,"name":"driver test"}],"assignments":[{"id":13}]}`
  );

  defaultFileContent = Buffer.from(
    `{ "drivers": [ { "id": 1, "name": "driver test" } ], "assignments": [{ "id": 12 }] }`
  );
  await SettingController.removeAssignment(12);
  expect(spyWrite).toHaveBeenNthCalledWith(
    6,
    './settings.json',
    `{"drivers":[{"id":1,"name":"driver test"}],"assignments":[]}`
  );

  defaultFileContent = Buffer.from(`{ "drivers": [ { "id": 1, "name": "driver test" } ] }`);
  await SettingController.removeAssignment(12);
  expect(spyWrite).toHaveBeenNthCalledWith(
    7,
    './settings.json',
    `{"drivers":[{"id":1,"name":"driver test"}],"assignments":[]}`
  );
});
