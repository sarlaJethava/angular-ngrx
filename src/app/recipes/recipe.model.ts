import { Ingridients } from '../shared/Ingridients';

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingridients[];

  constructor(
    name: string,
    desc: string,
    imagePath: string,
    ingridients: Ingridients[]
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingridients;
  }
}
