const TILE_SIZE = 64;
let MAP_NUM_ROWS = 30;
let MAP_NUM_COLS = 30;

const GRID_FLOOR = 0;
const GRID_WALL = 1;
const GRID_DOOR = 2;

const WALL_TEX_GREY = 0.01;
const WALL_TEX_BLUE = 0.02;

const FACING_E = 0;
const FACING_NE = Math.PI * 1.75;
const FACING_N = Math.PI * 1.5;
const FACING_NW = Math.PI * 1.25;
const FACING_W = Math.PI;
const FACING_SW = Math.PI * 0.75;
const FACING_S = Math.PI * 0.5;
const FACING_SE = Math.PI * 0.25;

const MAP_GRIDS = [
    [
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 2.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 1.02, 1.01, 1.01, 1.01, 1.01, 2.01, 1.01, 1.01, 2.01, 1.01, 1.01,
    1.01, 1.01, 2.01, 1.01, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.01, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 1.01, 0.00, 1.01, 1.01, 0.00, 1.01,
    1.01, 1.02, 2.02, 1.02, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.01, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 1.01, 1.02, 2.01, 1.02, 1.01, 0.00, 1.01, 1.01, 0.00, 0.00, 1.02,
    1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.01, 1.02, 2.04, 1.02,
    1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 1.01, 0.00, 1.01, 1.02, 0.00, 1.02,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 2.04, 1.01,
    ],

    [
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03,
    1.03, 1.03, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03,
    1.03, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 0.00, 0.00, 1.03,
    1.03, 1.03, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 1.01, 1.01, 1.01, 0.00, 0.00, 1.03, 0.00, 0.00, 1.03, 0.00, 1.02, 1.03,
    1.03, 0.00, 0.00, 2.04, 0.00, 1.01, 0.00, 0.00, 1.03, 1.03, 0.00, 1.03, 0.00, 0.00, 1.03,
    1.03, 1.03, 0.00, 1.01, 1.01, 1.01, 0.00, 1.03, 1.03, 0.00, 0.00, 1.03, 0.00, 0.00, 1.03,
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 0.00, 1.03, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03,
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03,
    ],

    [
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 1.02, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 1.01, 1.01, 1.01, 1.02, 1.02, 1.01,
    1.01, 1.01, 1.01, 2.01, 1.01, 1.01, 0.00, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 1.02, 1.02, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.02, 1.02, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 2.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 1.02, 1.02, 1.01,
    1.01, 1.01, 1.01, 2.01, 1.01, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 1.01, 1.01, 1.01, 1.02, 1.02, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    ],

    [
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 1.01, 0.00, 1.01, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.02, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 1.01, 0.00, 1.02, 0.00, 1.02, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 1.01, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.02, 0.00, 0.00, 1.01, 1.02, 0.00, 0.00, 1.02, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 2.01, 0.00, 0.00, 1.01, 1.02, 0.00, 0.00, 1.02, 1.01, 0.00, 0.00, 2.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.02, 2.01, 1.02, 1.01, 1.02, 0.00, 0.00, 1.02, 1.01, 0.00, 1.01, 1.01, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.01, 0.00, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 1.01, 2.02, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 1.02, 1.02, 1.02, 2.04, 1.02, 1.02, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.02, 0.00, 1.02, 0.00, 1.01,
    1.01, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.02, 2.04, 1.02, 0.00, 1.01,
    1.01, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 0.00, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    1.01, 0.00, 1.02, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 1.01, 1.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 1.02, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 1.01, 1.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 1.02, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 1.01, 1.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01,
    1.01, 2.03, 1.01, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 1.02, 1.02, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 0.00, 0.00, 0.00, 2.03, 0.00, 1.01,
    1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 1.01, 1.01, 1.01,
    1.01, 0.00, 1.01, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 1.01,
    1.01, 0.00, 1.01, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    ],

    [
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03,
    1.03, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 1.03, 1.03, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 1.03, 1.03, 0.00, 0.00, 1.03, 0.00, 1.03, 1.02, 0.00, 0.00, 1.02, 1.03,
    1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 1.03, 1.02, 0.00, 1.02, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 1.03, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.03, 0.00, 0.00, 1.03, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 2.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 1.03, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 1.01, 0.00, 0.00, 0.00, 1.02, 1.02, 1.02, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.01, 0.00, 0.00, 0.00, 1.02, 0.00, 1.02, 0.00, 0.00, 1.01, 0.00, 0.00, 1.03, 1.03, 1.02, 0.00, 1.02, 1.03,
    1.03, 0.00, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.01, 1.01, 1.01, 1.01, 1.02, 2.01, 1.02, 1.01, 1.01, 1.01, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 1.03, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 1.03, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.01, 1.02, 1.02, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.01, 1.02, 0.00, 2.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02, 0.00, 0.00, 0.00, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.01, 1.02, 1.02, 1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.01, 1.01, 1.01, 1.01, 0.00, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.03,
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03,
    ],

    [
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 1.02, 1.01, 0.00, 1.01, 0.00, 1.02, 0.00, 1.01, 0.00, 1.01, 1.02, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 1.01, 1.01, 1.01, 1.01, 1.02, 0.00, 0.00, 1.02, 0.00, 1.01, 0.00, 1.02, 1.02,
    1.01, 0.00, 1.01, 0.00, 0.00, 0.00, 2.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.02,
    1.01, 0.00, 1.01, 1.01, 1.01, 1.01, 1.02, 0.00, 0.00, 1.02, 0.00, 1.01, 0.00, 1.02, 1.02,
    1.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 0.00, 1.02, 1.01, 0.00, 1.01, 0.00, 1.02, 0.00, 1.01, 0.00, 1.01, 1.02, 0.00, 1.01,
    1.01, 0.00, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 1.01, 0.00, 0.00, 0.00, 0.00, 1.01,
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    ],
];

const levelData = [
    {
        mapGrid: MAP_GRIDS[0],
        width: 15,
        height: 11,
        drawDist: 400,
        colors: {sky: 'rgb(0, 0, 0)', ground: 'rgb(255, 255, 255)'},
        skybox: null,
        music: "klaim-banquise",
        start: {x: 416, y: 608, rotation: FACING_N},
        exit: {x: 864, y: 608},
        objects: [
            {type: 'enemy1', x: 96, y: 540, direction: FACING_NE},
            {type: 'enemy1', x: 224, y: 540, direction: FACING_NW},
            {type: 'enemy1', x: 672, y: 96, direction: FACING_W},
            {type: 'enemy1', x: 672, y: 160, direction: FACING_W},
            {type: 'enemy1', x: 600, y: 540, direction: FACING_N},
            {type: 'enemy1', x: 800, y: 470, direction: FACING_N},
            {type: 'health', x: 800, y: 416, direction: 0},
            {type: 'armor', x: 352, y: 96, direction: 0},
            {type: 'blue key', x: 160, y: 160, direction: FACING_S},
            {type: 'red key', x: 160, y: 544, direction: FACING_N},
            {type: 'green key', x: 672, y: 608, direction: FACING_N},
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
        music: "klaim-banquise",
        ambient: "klaim-tempest",
        start: {x: 128, y: 608, rotation: 0},
        exit: {x: 280, y: 344},
        objects: [
            {type: 'enemy1', x: 780, y: 520, direction: FACING_N},
            {type: 'enemy1', x: 500, y: 100, direction: FACING_E},
            {type: 'enemy1', x: 480, y: 224, direction: FACING_NE},
            {type: 'enemy1', x: 480, y: 288, direction: FACING_NE},
            {type: 'enemy1', x: 608, y: 416, direction: FACING_N},
            {type: 'health', x: 96, y: 160, direction: 0},
            {type: 'green key', x: 608, y: 492, direction: FACING_N},
        ],
        weather: spawnSnow,
    },

    {
        mapGrid: MAP_GRIDS[2],
        width: 20,
        height: 20,
        drawDist: 10000,
        music: "klaim-glacier",
        colors: {sky: 'rgb(63,63,116)', ground: 'rgb(125, 125, 125)'},
        skybox: 'skybox',
        start: {x: 96, y: 640, rotation: FACING_E},
        exit: {x: 1120, y: 608},
        objects: [
            {type: 'enemy1', x: 480, y: 192, direction: FACING_W},
            {type: 'enemy1', x: 480, y: 256, direction: FACING_W},
            {type: 'enemy1', x: 480, y: 320, direction: FACING_W},
            {type: 'enemy1', x: 480, y: 384, direction: FACING_W},
            {type: 'enemy1', x: 480, y: 448, direction: FACING_W},
            {type: 'enemy1', x: 480, y: 832, direction: FACING_W},
            {type: 'enemy1', x: 480, y: 896, direction: FACING_W},
            {type: 'enemy1', x: 480, y: 960, direction: FACING_W},
            {type: 'enemy1', x: 480, y: 1024, direction: FACING_W},
            {type: 'enemy1', x: 480, y: 1088, direction: FACING_W},
            {type: 'enemy1', x: 608, y: 224, direction: FACING_W},
            {type: 'enemy1', x: 608, y: 288, direction: FACING_W},
            {type: 'enemy1', x: 608, y: 352, direction: FACING_W},
            {type: 'enemy1', x: 608, y: 416, direction: FACING_W},
            {type: 'enemy1', x: 608, y: 480, direction: FACING_W},
            {type: 'enemy1', x: 608, y: 864, direction: FACING_W},
            {type: 'enemy1', x: 608, y: 928, direction: FACING_W},
            {type: 'enemy1', x: 608, y: 992, direction: FACING_W},
            {type: 'enemy1', x: 608, y: 1056, direction: FACING_W},
            {type: 'enemy1', x: 608, y: 1120, direction: FACING_W},
            {type: 'enemy1', x: 800, y: 480, direction: FACING_W},
            {type: 'enemy1', x: 800, y: 544, direction: FACING_W},
            {type: 'enemy1', x: 800, y: 608, direction: FACING_W},
            {type: 'enemy1', x: 800, y: 672, direction: FACING_W},
            {type: 'enemy1', x: 800, y: 736, direction: FACING_W},
            {type: 'boost1', x: 96, y: 96, direction: 0},
            {type: 'boost2', x: 1184, y: 96, direction: 0},
            {type: 'boost1', x: 96, y: 1184, direction: 0},
            {type: 'boost2', x: 1184, y: 1184, direction: 0},
        ],
        weather: () => {return},
    },

    {
        mapGrid: MAP_GRIDS[3],
        width: 30,
        height: 30,
        drawDist: 1000,
        music: "klaim-banquise",
        colors: {sky: 'rgb(0,0,0)', ground: 'rgb(255, 255, 255)'},
        skybox: null,
        start: {x: 224, y: 1696, rotation: FACING_E},
        exit: {x: 1696, y: 992},
        objects: [
            {type: 'enemy1', x: 96, y: 736, direction: FACING_E},
            {type: 'enemy1', x: 96, y: 864, direction: FACING_E},
            {type: 'enemy1', x: 96, y: 608, direction: FACING_E},
            {type: 'enemy1', x: 736, y: 96, direction: FACING_W},
            {type: 'enemy1', x: 736, y: 160, direction: FACING_W},
            {type: 'enemy1', x: 1824, y: 1248, direction: FACING_W},
            {type: 'enemy1', x: 864, y: 96, direction: FACING_S},
            {type: 'enemy1', x: 1568, y: 608, direction: FACING_N},
            {type: 'enemy1', x: 1720, y: 608, direction: FACING_N},
            {type: 'enemy1', x: 1568, y: 800, direction: FACING_N},
            {type: 'enemy1', x: 1720, y: 800, direction: FACING_N},
            {type: 'enemy1', x: 1120, y: 1056, direction: FACING_NW},
            {type: 'health', x: 1824, y: 1568, direction: 0},
            {type: 'health', x: 1824, y: 1632, direction: 0},
            {type: 'health', x: 736, y: 736, direction: 0},
            {type: 'armor', x: 800, y: 672, direction: 0},
            {type: 'armor', x: 96, y: 160, direction: 0},
            {type: 'armor', x: 160, y: 1120, direction: 0},
            {type: 'boost2', x: 96, y: 1696, direction: 0},
            {type: 'boost1', x: 96, y: 1760, direction: 0},
            {type: 'boost2', x: 96, y: 1824, direction: 0},
            {type: 'green key', x: 732, y: 292, direction: FACING_N},
            {type: 'blue key', x: 152, y: 796, direction: FACING_E},
            {type: 'red key', x: 1052, y: 276, direction: FACING_N},
        ],
        weather: () => {return},
    },

    {
        mapGrid: MAP_GRIDS[4],
        width: 30,
        height: 30,
        drawDist: 600,
        music: "klaim-banquise",
        colors: {sky: 'rgb(255, 255, 255)', ground: 'rgb(255, 255, 255)'},
        skybox: null,
        ambient: "klaim-tempest",
        start: {x: 224, y: 1696, rotation: FACING_E},
        exit: {x: 1120, y: 1120},
        objects: [
            {type: 'enemy1', x: 1600, y: 1450, direction: FACING_W, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 1600, y: 1700, direction: FACING_W, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 1700, y: 1600, direction: FACING_W, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 1700, y: 1700, direction: FACING_W, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 1800, y: 500, direction: FACING_S, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 1700, y: 400, direction: FACING_S, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 800, y: 100, direction: FACING_E, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 700, y: 100, direction: FACING_E, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 800, y: 200, direction: FACING_E, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 700, y: 200, direction: FACING_E, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 1056, y: 1248, direction: FACING_SW, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 1184, y: 1248, direction: FACING_SW, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 96, y: 928, direction: FACING_E, health: 120, timeToShoot: 60},
            {type: 'enemy1', x: 288, y: 1120, direction: FACING_E, health: 120, timeToShoot: 60},
            {type: 'health', x: 1560, y: 1070, direction: 0},
            {type: 'health', x: 928, y: 1824, direction: 0},
            {type: 'health', x: 96, y: 1184, direction: 0},
            {type: 'armor', x: 1500, y: 428, direction: 0},
        ],
        weather: spawnSnow,
    },

    {
        mapGrid: MAP_GRIDS[5],
        width: 15,
        height: 11,
        drawDist: 300,
        music: "klaim-ice_wizard-intro",
        colors: {sky: 'rgb(0, 0, 0)', ground: 'rgb(255, 255, 255)'},
        skybox: null,
        start: {x: 864, y: 352, rotation: FACING_W},
        exit: {x: null, y: null},
        objects: [
            {type: 'enemy2', x:224, y: 352, direction: FACING_E, health: 1000, timeToShoot: 16},
        ],
        weather: () => {return},
    },

]

class Level {
    constructor(index, levelObject) {
        this.index = index;
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
        this.musicTrack = new BackgroundMusicClass(levelObject.music);
        if(levelObject.ambient)
            this.ambientTrack = new BackgroundMusicClass(levelObject.ambient);
    }

    checkLevelCompletion() {
        let distToExit = DistanceBetweenTwoGameObjects(player, this.exit);
        if (distToExit < 50) {
            return true;
        }

        if (currentLevel.index === 5 && currentLevel.stats.enemiesKilled > 0 && currentLevel.stats.totalItems === 0){
            var newObject = new Item(224, 352, -0.5, 0.2, 0, 'green key');
            currentLevel.stats.totalItems++;
            objects.push(newObject);
        }

        if (currentLevel.index === 5 && currentLevel.stats.itemsCollected > 0){
            return true;
        }


    }

    draw() {

        if (debugModeEnabled === false) return;

        colorRect(0, 0, TILE_SIZE * MAP_NUM_COLS * MINIMAP_SCALE_FACTOR, TILE_SIZE * MAP_NUM_ROWS * MINIMAP_SCALE_FACTOR, 'black');

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
        if (this.colors.ground != this.colors.sky && this.visibilityDist < 4500) {
            const lightRadius = canvas.width * (180 / FOV_DEGREES);
            //The distance from the bottom of the screen, to the edge of the visibilityDist
            let viewRadius = (TILE_SIZE / this.visibilityDist) * PROJECTION_PLAIN_DISTANCE;
            viewRadius = canvas.height/2 - viewRadius/2;

            let drawOffsetY = lightRadius - viewRadius;
            let skyGradient = canvasContext.createRadialGradient(canvas.width/2, -drawOffsetY, lightRadius, canvas.width/2, -drawOffsetY, lightRadius/2);
                skyGradient.addColorStop(0, this.colors.sky);
                skyGradient.addColorStop(0.5, this.colors.ground);
            colorRect(0, 0, canvas.width, canvas.height/2, skyGradient);

            drawOffsetY += canvas.height;
            let gradient = canvasContext.createRadialGradient(canvas.width/2, drawOffsetY, lightRadius, canvas.width/2, drawOffsetY, lightRadius/2);
                gradient.addColorStop(0, this.colors.sky);
                gradient.addColorStop(0.5, this.colors.ground);
            colorRect(0, canvas.height / 2, canvas.width, canvas.height/2, gradient);
        } else {
            colorRect(0, 0, canvas.width, canvas.height, this.colors.sky);
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

        console.log(`Toggled door ${index} = ${this.doorStates[index]}`);
        if(this.doorStates[index] > 0){
            doorOpen.play();
        } else {
            doorClose.play();
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

function getDoorColor(type) {
    switch(type) {
        case 1:
            return 'Blue';
        case 2:
            return 'Red';
        case 3:
            return 'Green';
    }
}

function loadLevel(index) {
    console.log(`Loading level ${index} ...`);
    let data = levelData[index];
    MAP_NUM_ROWS = data.height;
    MAP_NUM_COLS = data.width;
    currentLevel = new Level(index, data);
    currentLevel.index = index;
    currentLevel.stats = {
        startTime: performance.now(),
        itemsCollected: 0,
        enemiesKilled : 0,
        totalItems: 0,
        totalEnemies: 0,
    }

    player.reset();
    player.x = data.start.x;
    player.y = data.start.y;
    player.rotationAngle = data.start.rotation;
    player.keys = [];

    if (data.objects) loadLevelObjects(data);
    else initTestObjects();
    console.log(`Loading level ${index} - DONE`);
}

function loadLevelObjects(levelData) {
    objects.length = 0;
    for (let object of levelData.objects) {
        let newObject;
        let ox = object.x ? object.x : 0;
        let oy = object.y ? object.y : 0;
        let oAngle = object.direction ? object.direction : 0;
        let oHealth = object.health ? object.health : 100;
        let oTimeToShoot = object.timeToShoot ? object.timeToShoot : 96;
        switch(object.type) {
            case 'enemy1':
                newObject = new Character(ox, oy, spriteList['enemy1'], spriteList['enemy1_projectile'], -0.2, 0.8, oAngle, oHealth, oTimeToShoot);
                currentLevel.stats.totalEnemies++;
                break;
            case 'enemy2':
                newObject = new Character(ox, oy, spriteList['enemy2'], spriteList['enemy2_projectile'], -0.2, 0.8, oAngle, oHealth, oTimeToShoot);
                currentLevel.stats.totalEnemies++;
                break;
            case 'health':
                newObject = new Item(ox, oy, -0.6, 0.5, oAngle, 'health');
                currentLevel.stats.totalItems++;
                break;
            case 'armor':
                newObject = new Item(ox, oy, -0.6, 0.5, oAngle, 'armor');
                currentLevel.stats.totalItems++;
                break
            case 'green key':
                newObject = new Item(ox, oy, -0.5, 0.2, oAngle, 'green key');
                currentLevel.stats.totalItems++;
                break;
            case 'red key':
                newObject = new Item(ox, oy, -0.5, 0.2, oAngle, 'red key');
                currentLevel.stats.totalItems++;
                break;
            case 'blue key':
                newObject = new Item(ox, oy, -0.5, 0.2, oAngle, 'blue key');
                currentLevel.stats.totalItems++;
                break;
            case 'boost1':
                newObject = new Item(ox, oy, -0.6, 0.5, oAngle, 'boost1');
                currentLevel.stats.totalItems++;
                break;
            case 'boost2':
                newObject = new Item(ox, oy, -0.6, 0.5, oAngle, 'boost2');
                currentLevel.stats.totalItems++;
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
        objects.push(part);
    }
}

class LevelTransition extends State {
	constructor() {
        super();
        this.name = 'Level Transition'
        this.timer = 0;
        this.music = new BackgroundMusicClass("klaim-avalanche");
    }

	onEnter() {
        this.timer = 0;
        this.animation = 0;
        let levelEndTime = performance.now();
        this.stats = {
            levelName: currentLevel.name ? currentLevel.name : 'Level ' + (currentLevel.index + 1),
            itemPercent: Math.floor(currentLevel.stats.itemsCollected / currentLevel.stats.totalItems * 100),
            enemyPercent: Math.floor(currentLevel.stats.enemiesKilled / currentLevel.stats.totalEnemies * 100),
            playTime: Math.floor((levelEndTime - currentLevel.stats.startTime) / 1000),
        };
        playBGM(this.music, false); // no looping
    }

    run() {
        this.animateAlpha();

        colorRect(0, 0, canvas.width, canvas.height, '#3F3F74');
        canvasContext.fillStyle = 'white';
        if (this.animation === 1) this.drawStats();
        if (this.animation === 2) {
            if (!this.endGame) {
                let newLevel = currentLevel.name ? currentLevel.name : 'Level ' + (currentLevel.index + 1);
                canvasContext.font = '60px Arial';
                canvasContext.textAlign = 'center';
                canvasContext.fillText('Entering ' + newLevel, canvas.width/2, canvas.height/2);
                stopBGM();
            }
        }

        this.updateTimer();
    }

    drawStats() {
        canvasContext.font = '60px Arial';
        canvasContext.textAlign = 'center';
        canvasContext.fillText(this.stats.levelName + ' Completed', canvas.width/2, 120);

        canvasContext.font = '40px Arial';
        canvasContext.textAlign = 'left';
        canvasContext.fillText('Items: ' + Math.floor(lerp(0, this.stats.itemPercent, this.timer/100)) + '%', canvas.width/4, canvas.height/2 - 60);
        canvasContext.fillText('Enemies: ' + Math.floor(lerp(0, this.stats.enemyPercent, this.timer/100)) + '%', canvas.width/4, canvas.height/2);
        canvasContext.fillText('Time: ' + Math.floor(lerp(0, this.stats.playTime, this.timer/100)) + ' seconds', canvas.width/4, canvas.height/2 + 60);
    }

    loadNextLevel() {
        this.timer = 0;
        this.animation = 2;
        player.reset();

        if (currentLevel.index < levelData.length - 1) {
            loadLevel(currentLevel.index + 1);
        } else {
            this.endGame = true;
        }

        moveEverything();
    }

    animateAlpha() {
        let weight = 1;
        switch(this.animation) {
            case 0: //Transition from completed level
                canvasContext.globalAlpha = 1;
                currentLevel.drawBackground();
                render3DProjection();

                weight = this.timer/60;
                hudTransition(1 - weight);
                canvasContext.globalAlpha = smoothStart(weight, 3);
                break;
            case 1: //Counting stats
                canvasContext.globalAlpha = 1;
                break;
            case 2: //Transition to next level
                if (this.endGame) {
                    weight = this.timer/120;
                    colorRect(0, 0, canvas.width, canvas.height, '#0F0F28');
                    canvasContext.globalAlpha = 1 - smoothStart(weight, 3);
                } else if (this.timer > 60) {
                    weight = (this.timer - 60) / 60;
                    canvasContext.globalAlpha = 1;
                    currentLevel.drawBackground();
                    render3DProjection();
                    hudTransition(weight);
                    canvasContext.globalAlpha = 1 - smoothStop(weight, 3);
                }
                break;
            default:
                break;
        }
    }

    updateTimer() {
        this.timer++;
        switch(this.animation) {
            case 0:
                if (this.timer > 60) {
                    this.animation++;
                    this.timer = 0;
                }
                break;
            case 1:
                if (mouseClicked(0)) {
                    if (this.timer < 98 ) {
                        this.timer = 98;
                    }
                    if (this.timer >= 100) {
                        this.loadNextLevel();
                    }
                }
                break;
            default:
                break;
        }
    }

	checkConditions() {
        if (this.animation === 2 && this.timer >= 120) {
            if (!this.endGame) {
                return 'Game Started';
            } else return 'Conclusion'
        }
    }
	onExit() {
        resetMouse();
    }
}