import Plot from "./Plot.js";
import Task from "./Task.js";
import Driver from "./Driver.js";
import Farm from "./Farm.js";
import Assigment from "./Assignment.js";

export default class Setting {
  constructor(
    public drivers: Driver[],
    public farms: Farm[],
    public plots: Plot[],
    public tasks: Task[],
    public assignments?: Assigment[]
  ) {}

  demo() {
    this.drivers = [
      new Driver(1, "JERÔME"),
      new Driver(2, "MORGAN"),
      new Driver(3, "HENRY"),
      new Driver(4, "VANILLE"),
      new Driver(5, "JEAN PIERRE"),
    ];
    this.farms = [new Farm(1, "ETANGS"), new Farm(2, "MARET")];

    this.plots = [
      new Plot(1, "BEAUCHEVALIER", 1, 11.67),
      new Plot(2, "BEAUCHVALIER Calcaire", 1, 5.57),
      new Plot(3, "BORIE BASSE", 1, 7.53),
      new Plot(4, "borie basse prairie", 2, 0.38),
      new Plot(5, "borie basse prairie", 1, 1),
      new Plot(6, "BORIE DE DOMME BAS", 1, 6.98),
      new Plot(7, "BORIE DE DOMME HAUT", 2, 3.68),
      new Plot(8, "BORIE DE DOMME prairie", 1, 1.73),
      new Plot(9, "BORIE NEUVE", 1, 8.87),
      new Plot(10, "BORIE NEUVE CARRE", 1, 1.45),
      new Plot(11, "BORIE NEUVE CARRE prairie", 1, 0.9),
      new Plot(12, "BORIE NEUVE réserve prairie", 2, 0.29),
      new Plot(13, "DELIVRON 5,19ha", 2, 5.19),
      new Plot(14, "DELIVRON 12ha", 2, 12.1),
      new Plot(15, "DELIVRON 14ha", 2, 0.39),
      new Plot(16, "DROITE ROUTE LE MAS", 2, 2.23),
      new Plot(17, "EGLISE", 2, 4.27),
      new Plot(18, "FORAGE prairie", 2, 1.17),
      new Plot(19, "GAZ prairie", 2, 0.57),
      new Plot(20, "GENETS DROITE", 1, 4.21),
      new Plot(21, "GENETS GAUCHE", 1, 9.76),
      new Plot(22, "GOURJOU CARRE", 2, 1.57),
      new Plot(23, "LA CHAPELLE", 2, 7.63),
      new Plot(24, "LA PETITE MOTHE", 1, 4.71),
      new Plot(25, "LAMARTINIE Droite", 1, 9.4),
      new Plot(26, "LAMARTINIE GAUCHE PRAIRES", 2, 1.58),
      new Plot(27, "LAMARTINIE GAUCHE", 2, 12.87),
      new Plot(28, "Lauterie carré", 1, 1.69),
      new Plot(29, "Lauterie château", 1, 3),
      new Plot(30, "Lauterie longe", 1, 3.3),
      new Plot(31, "Lauterie prairie 1,15ha", 1, 1.15),
      new Plot(32, "Lauterie prairie 2,17ha", 1, 2.17),
      new Plot(33, "Lauterie prairie 2,43ha", 1, 2.43),
      new Plot(34, "Lauterie prairie 8,04ha", 1, 8.04),
      new Plot(35, "Lauterie prairie 8,32ha", 1, 8.32),
      new Plot(36, "LE DEBAT 1,33", 2, 1.33),
      new Plot(37, "LE DEBAT 7,55", 2, 7.55),
      new Plot(38, "LE MAINE", 2, 4.71),
      new Plot(39, "LE MAS AGONAC 0,5ha", 2, 0.5),
      new Plot(40, "LE MAS AGONAC 0,73ha", 2, 0.73),
      new Plot(41, "LE MAS AGONAC 0,74ha", 2, 0.74),
      new Plot(42, "LE MAS AGONAC 4,58ha", 2, 4.58),
      new Plot(43, "LE MAS DROITE", 2, 2.84),
      new Plot(44, "LE MAS PENCHANT 0,33ha", 2, 0.33),
      new Plot(45, "LE MAS PENCHANT 4,01ha", 2, 4.01),
      new Plot(46, "LE PEYRAT 1 2,76ha", 2, 2.76),
      new Plot(47, "LE PEYRAT 2 0,57ha", 2, 0.57),
      new Plot(48, "LE VIGNAUD prairie", 1, 2.93),
      new Plot(49, "LE VIGNAUD", 1, 4.78),
      new Plot(50, "LECONTE", 1, 4.51),
      new Plot(51, "LEGER", 2, 1.84),
      new Plot(52, "LES COMBES jerome", 2, 2.26),
      new Plot(53, "LES COMBES petit carré", 1, 0.66),
      new Plot(54, "LES COMBES longe jerome", 2, 1.68),
      new Plot(55, "Loseille grande", 1, 5.81),
      new Plot(56, "Loseille petite", 1, 1.92),
      new Plot(57, "Loseille prairie", 1, 1.1),
      new Plot(58, "MARET PENCHANT 1,5ha", 2, 1.5),
      new Plot(59, "MARET PENCHANT 3,04ha", 2, 3.04),
      new Plot(60, "Mellet 2,83ha", 1, 2.83),
      new Plot(61, "Mellet 3,46ha", 1, 3.46),
      new Plot(62, "Mellet prairies 6,67", 1, 0.44),
      new Plot(63, "Parcelle 164", 2, 5.43),
      new Plot(64, "PUYLAURAUD MALIGNE", 2, 6.2),
      new Plot(65, "PUYLAURAUD PUIT", 2, 13.23),
      new Plot(66, "PUYLAURAUD triangle", 2, 0.84),
      new Plot(67, "PUYLAURAUD tunel", 2, 1.11),
      new Plot(68, "Rivaux petite", 1, 1.61),
      new Plot(69, "Rivaux grande", 1, 3.95),
      new Plot(70, "Rivaux prairies", 1, 4.87),
      new Plot(71, "TOUBLAN D", 1, 2),
      new Plot(72, "TOUBLAN D irrigué", 1, 0.6),
      new Plot(73, "TOUBLAN G 1,58ha", 1, 1.58),
      new Plot(74, "TOUBLAN G 2,88ha", 1, 2.88),
      new Plot(75, "TOUBLAN G irrigué", 1, 1.19),
      new Plot(76, "TRIANGLE DROIT", 2, 1.5),
      new Plot(77, "TRIANGLE GAUCHE", 2, 5),
      new Plot(78, "TRIANGLE Jean-Pierre", 2, 2.4),
    ];
    this.tasks = [
      new Task(1, "CULTIMER 1", 0.5),
      new Task(2, "CULTIMER 2", 0.5),
      new Task(3, "CULTIMER 3", 0.5),
      new Task(4, "HERSE 1", 0.4),
      new Task(5, "HERSE 2", 0.4),
      new Task(6, "COMBINE", 0.5),
      new Task(7, "MONOGRAINE", 0.5),
      new Task(8, "BINAGE", 0.5),
      new Task(9, "ENGRAIS 1", 0.2),
      new Task(10, "ENGRAIS 2", 0.2),
      new Task(11, "ENGRAIS 3", 0.2),
      new Task(12, "ENGRAIS 4", 0.2),
      new Task(13, "PULVE 1", 0.2),
      new Task(14, "PULVE 2", 0.2),
      new Task(15, "PULVE 3", 0.2),
      new Task(16, "PULVE 4", 0.2),
      new Task(17, "PULVE 5", 0.2),
      new Task(18, "PULVE AZOTE LIQUIDE", 0.333333333),
      new Task(19, "BROYEUR", 0.5),
      new Task(20, "DISQUES 1", 0.5),
      new Task(21, "DISQUES 2", 0.5),
      new Task(22, "LISIER 1", 2),
      new Task(23, "LISIER 2", 2),
      new Task(24, "FUMIER", 1),
    ];
  }

  static fromJSON(str: string): Setting {
    const json = JSON.parse(str);
    return new Setting(
      json.drivers,
      json.farms,
      json.plots as Plot[],
      json.tasks as Task[],
      json.assignments as Assigment[]
    );
  }
}
