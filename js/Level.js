const TILE_SIZE = 64;
let MAP_NUM_ROWS = 30;
let MAP_NUM_COLS = 30;

const GRID_FLOOR = 0;
const GRID_WALL = 1;
const GRID_DOOR = 2;

const WALL_TEX_GREY = 0.01;
const WALL_TEX_BLUE = 0.02;

const MAP_GRIDS = [
    [
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 1.01, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01, 0.00, 1.01,
    1.01, 0.00, 1.01, 0.00, 1.02, 0.00, 0.00, 0.00, 1.02, 2.01, 1.01, 1.01, 1.01, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 1.01, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 0.00, 1.02, 1.01, 1.01, 1.01, 1.02, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 1.02,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.02, 1.01,
    ],

    [
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03,
    1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 0.00, 1.03, 1.03,
    1.03, 0.00, 0.00, 1.01, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 1.01, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03,
    ],

    [
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 1.01, 0.00, 1.02, 0.00, 0.00, 0.00, 1.02, 2.04, 1.01, 1.01, 1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 1.01, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 0.00, 1.02, 1.01, 1.01, 1.01, 1.02, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.02, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    ],

    [
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 1.01, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 0, 0, 2.01, 0, 1.01, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 1.01,
    1.01, 1.01, 1.01, 1.02, 0, 0, 0, 0, 0, 0, 1.01, 0, 1.01, 0, 1.01, 0, 0, 0, 1.01, 1.01, 1.02, 0, 1.02, 1.01, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 1.01, 0, 1.01, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 1.01, 0, 1.02, 0, 1.02, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0, 1.01, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 1.01, 1.01, 1.01, 1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 1.01, 0, 0, 1.02, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 1.01, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 1.02,
    1.01, 1.01, 1.01, 1.02, 0, 0, 1.01, 1.02, 0, 0, 1.02, 1.01, 1.01, 1.01, 1.01, 0, 0, 0, 1.02, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 0, 1.01, 1.02, 0, 0, 1.02, 1.01, 1.01, 1.01, 1.01, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 1.01, 1.01, 1.02, 0, 1.02, 1.01, 1.02, 0, 0, 1.02, 1.01, 1.01, 1.01, 1.01, 0, 0, 0, 1.02, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 1.01, 1.01, 1.01, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 1.01, 1.01, 1.01, 0, 0, 0, 0, 0, 1.02, 0, 0, 0, 1.01, 0, 0, 0, 0, 1.02, 1.02, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0, 0, 1.01, 1.01, 1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 1.02, 1.02,
    1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 1.02, 0, 0, 0, 1.01, 0, 0, 0, 0, 1.02, 1.02, 1.01,
    1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0, 0, 0, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    1.01, 0, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 1.01, 1.01,
    1.01, 0, 0, 0, 0, 1.02, 1.02, 1.02, 0, 0, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 0, 0, 1.02, 1.02, 1.02, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 1.01, 1.01, 1.01,
    1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0, 0, 1.02, 1.02, 1.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 1.01, 1.01, 1.01,
    1.01, 0, 0, 0, 0, 1.01, 0, 0, 0, 1.02, 0, 0, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.02, 1.02, 1.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 1.01, 1.01, 1.01,
    1.01, 0, 0, 0, 0, 1.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 0, 0, 0, 0, 1.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    ]
];

const levelData = [
    {
        mapGrid: MAP_GRIDS[0],
        width: 15,
        height: 11,
        drawDist: 400,
        colors: {sky: 'rgb(0, 0, 0)', ground: 'rgb(255, 255, 255)'},
        skybox: null,
        start: {x: 128, y: 608, rotation: 0},
        exit: {x: 870, y: 608},
        objects: [
            {type: 'enemy1', x: 300, y: 275, direction: 0},
            {type: 'enemy2', x: 500, y: 100, direction: 0},
            {type: 'health', x: 300, y: 275, direction: 0},
            {type: 'armor', x: 300, y: 608, direction: 0},
            {type: 'green key', x: 500, y: 608, direction: 0},
        ],
        weather: () => {return},
    },

    {
        mapGrid: MAP_GRIDS[1],
        width: 15,
        height: 11,
        drawDist: 600,
        colors: {sky: 'rgb(255, 255, 255)', ground: 'rgb(255, 255, 255)'},
        skybox: null,
        start: {x: 128, y: 608, rotation: 0},
        exit: {x: 870, y: 608},
        weather: spawnSnow,
    },

    {
        mapGrid: MAP_GRIDS[2],
        width: 30,
        height: 30,
        drawDist: 10000,
        colors: {sky: 'rgb(63,63,116)', ground: 'rgb(125, 125, 125)'},
        skybox: 'skybox',
        start: {x: 128, y: 608, rotation: 0},
        exit: {x: 870, y: 608},
        objects: [
            {type: 'enemy1', x: 300, y: 275, direction: 0},
            {type: 'enemy2', x: 500, y: 100, direction: 0},
            {type: 'health', x: 300, y: 275, direction: 0},
            {type: 'armor', x: 300, y: 608, direction: 0},
            {type: 'green key', x: 500, y: 608, direction: 0},
        ],
        weather: () => {return},
    },

    {
        mapGrid: MAP_GRIDS[3],
        width: 30,
        height: 30,
        drawDist: 10000,
        colors: {sky: 'rgb(63,63,116)', ground: 'rgb(125, 125, 125)'},
        skybox: 'skybox',
        start: {x: 200, y: 1700, rotation: 0},
        exit: {x: 1000, y: 1000},
        weather: () => {return},
    },

]

class Level {
    constructor(levelObject) {
        this.mapGrid = levelObject.mapGrid.slice(0);
        this.height = levelObject.height;
        this.width = levelObject.width;
        this.visibilityDist = levelObject.drawDist;
        this.colors = levelObject.colors;
        this.skybox = levelObject.skybox;
        this.updateWeather = levelObject.weather;

        this.exit = levelObject.exit;

        this.doorStates = [];
        this.doorStates.length = this.mapGrid.length;
        this.doorStates.fill(0);

        this.doorOffsets = this.doorStates.slice();
        this.doorOffsets.fill(64);
    }

    checkLevelCompletion() {
        let distToExit = DistanceBetweenTwoGameObjects(player, this.exit);
        if (distToExit < 50) {
            if (this.index < levelData.length - 1) loadLevel(this.index + 1);
            else loadLevel(0);
        }
    }

    draw() {

        if (debugModeEnabled === false) return;

        for (var eachRow = 0; eachRow < MAP_NUM_ROWS; eachRow++) {
            for (var eachCol = 0; eachCol < MAP_NUM_COLS; eachCol++) {

                //let tileIndex = mapTileToIndex(Math.floor(ray.wallHitX / TILE_SIZE), Math.floor(ray.wallHitY / TILE_SIZE))
                //let tileValue = currentLevel.mapGrid[tileIndex];

                if (currentLevel.mapGrid[mapTileToIndex(eachCol, eachRow)]) {
                    //colorRect(MINIMAP_SCALE_FACTOR * eachCol * TILE_SIZE, MINIMAP_SCALE_FACTOR * eachRow * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE, 'black');

                    let type = Math.floor(currentLevel.mapGrid[mapTileToIndex(eachCol, eachRow)]);
                    let textureIndex = Math.ceil((currentLevel.mapGrid[mapTileToIndex(eachCol, eachRow)] * 100)) - (type * 100);
                    let name = getTileName(type);
                    let texture = textureList[name][textureIndex - 1];

                    canvasContext.drawImage(texture, MINIMAP_SCALE_FACTOR * eachCol * TILE_SIZE, MINIMAP_SCALE_FACTOR * eachRow * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE, MINIMAP_SCALE_FACTOR * TILE_SIZE);
                }

            }
        }
    }

    drawBackground() {
        colorRect(0, 0, canvas.width, canvas.height, this.colors.sky);
        if (this.colors.ground != this.colors.sky && this.visibilityDist < 4500) {
            const lightRadius = canvas.width * (180 / FOV_DEGREES);
            //The distance from the bottom of the screen, to the edge of the visibilityDist
            let viewRadius = (TILE_SIZE / this.visibilityDist) * PROJECTION_PLAIN_DISTANCE;
            viewRadius = canvas.height/2 - viewRadius/2;
            let drawOffsetY = canvas.height + lightRadius - viewRadius;
            let gradient = canvasContext.createRadialGradient(canvas.width/2, drawOffsetY, lightRadius, canvas.width/2, drawOffsetY, lightRadius/2);
                gradient.addColorStop(0, this.colors.sky);
                gradient.addColorStop(0.5, this.colors.ground);
            colorRect(0, canvas.height / 2, canvas.width, canvas.height/2, gradient);
        } else {
            colorRect(0, canvas.height / 2, canvas.width, canvas.height/2, this.colors.ground);
        }

        this.drawSkybox(player.rotationAngle);
    }

    drawSkybox(angle) {
        if (!this.skybox) return;
        const twoPI = Math.PI * 2;
        let boxScale = FOV_RADS / twoPI;
    
        let skyBox = spriteList[this.skybox];
        let skyHeight = PROJECTION_PLANE_HEIGHT/2;
        let boxWidth = skyBox.width * boxScale;
        let xOffset = skyBox.width * (angle / twoPI);
        canvasContext.drawImage(skyBox, xOffset, 0, boxWidth, skyBox.height, 0, 0, canvas.width, skyHeight);
    
        let overDraw = twoPI - player.rotationAngle;
        if (Math.abs(overDraw) <= FOV_RADS) {
            xOffset = canvas.width * (overDraw / FOV_RADS);
            canvasContext.drawImage(skyBox, 0, 0, boxWidth, skyBox.height, xOffset, 0, canvas.width, skyHeight);
        }
    }

    updateDoors() {
        for (let d = 0; d < this.doorStates.length; d++) {
            if (Math.floor(this.mapGrid[d]) != 2) continue;
            if (this.doorStates[d] != 0) {
                this.doorOffsets[d] -= this.doorStates[d];
            }

            if (this.doorOffsets[d] < 0 || this.doorOffsets[d] > 64) {
                this.doorStates[d] = 0;
                this.doorOffsets[d] = Math.min(this.doorOffsets[d], 64);
                this.doorOffsets[d] = Math.max(this.doorOffsets[d], 0);
            }
        }
    }

    toggleDoor(index) {
        let doorPosition = mapIndexCoords(index);
        if (circleRectOverlap(player.x, player.y, player.radius, doorPosition.x, doorPosition.y, TILE_SIZE, TILE_SIZE)) return;
        for (let o of objects) {
            if (circleRectOverlap(o.x, o.y, o.radius, doorPosition.x, doorPosition.y, TILE_SIZE, TILE_SIZE)) return;
        }

        if (this.doorStates[index] === 0) {
            if (this.doorOffsets[index] === 0) this.doorStates[index] = -1;
            else if (this.doorOffsets[index] === 64) this.doorStates[index] = 1;
        } else {
            this.doorStates[index] *= -1;
        }
    }

    toggleDoors() {
        for (let d = 0; d < this.doorStates.length; d++) {
            if (Math.floor(this.mapGrid[d]) === 2) {
                this.toggleDoor(d);
            }
        }
    }
}

function generateMap() {
    for (var i = 0; i < (MAP_NUM_COLS * MAP_NUM_ROWS); i++) {

    }
}

function mapTileToIndex(tileCol, tileRow) {
    return (tileCol + MAP_NUM_COLS * tileRow);
}

function getTileTypeAtPixelCoord(pixelX, pixelY) {
    var tileCol = pixelX / TILE_SIZE;
    var tileRow = pixelY / TILE_SIZE;

    // we'll use Math.floor to round down to the nearest whole number
    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    // first check whether the player is within any part of the wall
    if (tileCol < 0 || tileCol >= MAP_NUM_COLS ||
        tileRow < 0 || tileRow >= MAP_NUM_ROWS) {
        return GRID_WALL; // avoid invalid array access, treat out of bounds as wall
    }

    var gridIndex = mapTileToIndex(tileCol, tileRow);
    return currentLevel.mapGrid[gridIndex];
}

function getTileCoordinates(index) {
    let x = (index % MAP_NUM_COLS);
    let y = ((index - x) / MAP_NUM_COLS) * TILE_SIZE;
    x *= TILE_SIZE;

    return {
        x: x,
        y: y
    };
}

function getTileName(type) {
    switch (type) {
        case 1:
            return 'wall';
        case 2:
            return "door";
        default:
            return 'wall';
    }
}

function loadLevel(index) {
    let data = levelData[index];
    MAP_NUM_ROWS = data.height;
    MAP_NUM_COLS = data.width;
    currentLevel = new Level(data);
    currentLevel.index = index;
    
    player.x = data.start.x;
    player.y = data.start.y;
    player.rotationAngle = data.start.rotation;
    player.keys = [];

    if (data.objects) loadLevelObjects(data);
    else initTestObjects();
}

function loadLevelObjects(levelData) {
    objects.length = 0;
    for (let object of levelData.objects) {
        let newObject;
        let ox = object.x ? object.x : 0;
        let oy = object.y ? object.y : 0;
        let oAngle = object.direction ? object.direction : 0;
        switch(object.type) {
            case 'enemy1':
                newObject = new Character(ox, oy, spriteList['enemy1'], -0.2, 0.8, oAngle);
                //(x, y, speed, pic, altitude, scale, angle) {
                break;
            case 'enemy2':
                newObject = new Character(ox, oy, spriteList['enemy2'], -0.2, 0.8, oAngle);
                break;
            case 'health':
                newObject = new Item(ox, oy, -0.5, 0.2, oAngle, 'health');
                break;
            case 'armor':
                newObject = new Item(ox, oy, -0.5, 0.2, oAngle, 'armor');
                break
            case 'green key':
                newObject = new Item(ox, oy, -0.5, 0.2, oAngle, 'green key');
                break;
            case 'red key':
                newObject = new Item(ox, oy, -0.5, 0.2, oAngle, 'red key');
                break;
            case 'blue key':
                newObject = new Item(ox, oy, -0.5, 0.2, oAngle, 'blue key');
                break;
            default:
                continue;
        }
        objects.push(newObject);
    }
}

function spawnSnow() {
    for (var i = 0; i < 2; i++) {
        var offsetAng = player.rotationAngle + (Math.random() * Math.PI / 2) - (Math.PI / 4);
        var part = new Projectile(player.x + Math.cos(offsetAng) * (64 + Math.random() * 64), //x
            player.y + Math.sin(offsetAng) * (64 + Math.random() * 64), //y
            20, //speed
            spriteList['snow'], //sprite 
            Math.floor(Math.random() * 1.5), //height
            Math.random(), //scale
            0.5, //angle
            true); //variable Height

        part.draw2D = function () {
            return
        };
        part.radius = 0;
        part.lifeTime = 8;
        part.owner = player;
        objects.push(part);
    }
}