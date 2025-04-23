import { Menu } from "./menu";

export interface Assessment {
    menu: Menu;
    type: 'snack' | 'lunch';
    assessment: 'like' | 'deslike';
}