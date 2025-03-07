export default class Plot {
  id: number;
  name: string;
  idFarm: number;
  area: number;

  constructor(id: number, name: string, idFarm: number, area: number) {
    this.id = id;
    this.name = name;
    this.idFarm = idFarm;
    this.area = area;
  }
  static from(plot: Plot) {
    return new Plot(plot.id, plot.name, plot.idFarm, plot.area);
  }
}
