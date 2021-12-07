const chai = require('chai');
const assert = chai.assert;
const puzzlesArray = require("../controllers/puzzle-strings.js").puzzlesAndSolutions;
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
  //validate
  test("Logic handles a valid puzzle string of 81 characters", ()=>{
    assert.equal(solver.validate(puzzlesArray[0][0]), true, "Should be a valid puzzle");
    assert.equal(solver.validate(puzzlesArray[1][0]), true, "Should be a valid puzzle");
    assert.equal(solver.validate(puzzlesArray[2][0]), true, "should be a valid puzzle");
    assert.equal(solver.validate(puzzlesArray[3][0]), true, "should be a valid puzzle");
    assert.equal(solver.validate(puzzlesArray[4][0]), true, "should be a valid puzzle");
  });
  test("Logic handles a puzzles string with invalid characters", ()=>{
    assert.equal(solver.validate([...puzzlesArray[0][0], 0].join("")), false, "should not be valid");
    assert.equal(solver.validate([...puzzlesArray[1][0], 10].join("")), false, "should not be valid");
    assert.equal(solver.validate([...puzzlesArray[2][0], "a"].join("")), false, "should not be valid");
    assert.equal(solver.validate([...puzzlesArray[3][0], " "].join("")), false, "should not be valid");
  });
  test("logic hanldes puzzles string that is not 81 characters in length", ()=>{
    assert.equal(solver.validate(puzzlesArray[0][0].slice(4)), false, "should not be valid");
    assert.equal(solver.validate([...puzzlesArray[1][0], "1"].join("")), false, "should not be valid");
    assert.equal(solver.validate([...puzzlesArray[2][0], "."].join("")), false, "should not be valid");
    assert.equal(solver.validate(["2242.5...2", ...puzzlesArray[3][0], "2..2..576."].join("")), false, "should not be valid");
    assert.equal(solver.validate(""), false, "should not be valid");
  });
  //checkRowPlacement
  test("Logic handles a valid row placement", ()=>{
    assert.equal(solver.checkRowPlacement(puzzlesArray[0][0], "A", 2, 3), true, "should be valid");
    assert.equal(solver.checkRowPlacement(puzzlesArray[0][0], "A", 2, 6), true, "should be valid");
    assert.equal(solver.checkRowPlacement(puzzlesArray[0][0], "A", 2, 7), true, "should be valid");
    assert.equal(solver.checkRowPlacement(puzzlesArray[0][0], "A", 2, 9), true, "should be valid");
    assert.equal(solver.checkRowPlacement(puzzlesArray[0][0], "A", 9, 4), true, "should be valid");
  });
  test("Logic handles an invalid row placement", ()=>{
    assert.equal(solver.checkRowPlacement(puzzlesArray[1][0], "I", 3, 8), false, "should not be valid");
    assert.equal(solver.checkRowPlacement(puzzlesArray[1][0], "I", 3, 5), false, "should not be valid");
    assert.equal(solver.checkRowPlacement(puzzlesArray[1][0], "I", 3, 7), false, "should not be valid");
    assert.equal(solver.checkRowPlacement(puzzlesArray[1][0], "I", 3, 2), false, "should not valid");
    assert.equal(solver.checkRowPlacement(puzzlesArray[1][0], "I", 3, 3), false, "should not valid");
    assert.equal(solver.checkRowPlacement(puzzlesArray[1][0], "I", 1, 2), false, "should not be valid");
  });
  //checkColPlacement
  test("Logic handles a valid column placement", ()=>{
    assert.equal(solver.checkColPlacement(puzzlesArray[2][0], "C", 9, 2), true, "should be valid");
    assert.equal(solver.checkColPlacement(puzzlesArray[2][0], "C", 9, 3), true, "should be valid");
    assert.equal(solver.checkColPlacement(puzzlesArray[2][0], "C", 9, 9), true, "should be valid");
    assert.equal(solver.checkColPlacement(puzzlesArray[2][0], "D", 9, 4), true, "should be valid");
  });
  test("Logic handles an invalid column placement", ()=>{
    assert.equal(solver.checkColPlacement(puzzlesArray[3][0], "A", 1, 5), false, "should not be valid");
    assert.equal(solver.checkColPlacement(puzzlesArray[3][0], "A", 1, 1), false, "should not be valid");
    assert.equal(solver.checkColPlacement(puzzlesArray[3][0], "A", 1, 7), false, "should not be valid");
    assert.equal(solver.checkColPlacement(puzzlesArray[3][0], "A", 1, 6), false, "should not valid");
    assert.equal(solver.checkColPlacement(puzzlesArray[3][0], "A", 1, 2), false, "should not valid");
    assert.equal(solver.checkColPlacement(puzzlesArray[3][0], "H", 1, 3), false, "should not be valid");
  });
  //checkRegionPlacement
  test("Logic handles a valid region placement", ()=>{
    assert.equal(solver.checkRegionPlacement(puzzlesArray[4][0], "B", 6, 2), true, "should be valid");
    assert.equal(solver.checkRegionPlacement(puzzlesArray[4][0], "B", 6, 5), true, "should be valid");
    assert.equal(solver.checkRegionPlacement(puzzlesArray[4][0], "B", 6, 7), true, "should be valid");
    assert.equal(solver.checkRegionPlacement(puzzlesArray[4][0], "B", 6, 9), true, "should be valid");
    assert.equal(solver.checkRegionPlacement(puzzlesArray[4][0], "C", 5, 3), true, "should be valid");
  });
  test("Logic handles an invalid region placement", ()=>{
    assert.equal(solver.checkRegionPlacement(puzzlesArray[0][0], "E", 2, 9), false, "should not be valid");
    assert.equal(solver.checkRegionPlacement(puzzlesArray[0][0], "E", 2, 8), false, "should not be valid");
    assert.equal(solver.checkRegionPlacement(puzzlesArray[0][0], "E", 2, 2), false, "should not be valid");
    assert.equal(solver.checkRegionPlacement(puzzlesArray[0][0], "E", 2, 3), false, "should not valid");
    assert.equal(solver.checkRegionPlacement(puzzlesArray[0][0], "E", 2, 7), false, "should not valid");
    assert.equal(solver.checkRegionPlacement(puzzlesArray[0][0], "F", 3, 2), false, "should not be valid");
  });
  //solve
  test("Valid puzzle strings pass the solver", ()=>{
    assert.isString(solver.solve(puzzlesArray[0][0]), "should pass");
    assert.isString(solver.solve(puzzlesArray[1][0]), "should pass");
    assert.isString(solver.solve(puzzlesArray[2][0]), "should pass");
    assert.isString(solver.solve(puzzlesArray[3][0]), "should pass");
    assert.isString(solver.solve(puzzlesArray[4][0]), "should pass");
  });
  test("Invalid puzzle strings fail the solver", ()=>{
    assert.equal(solver.solve("9" + puzzlesArray[1][0].slice(1)), false, "should not pass");
    assert.equal(solver.solve(puzzlesArray[1][0][0] + "4" + puzzlesArray[1][0].slice(2)), false, "should not pass");
  });
  test("Solver returns the expected solution for an incomplete puzzle", ()=>{
    assert.equal(solver.solve(puzzlesArray[0][0]), puzzlesArray[0][1], "should pass");
    assert.equal(solver.solve(puzzlesArray[1][0]), puzzlesArray[1][1], "should pass");
    assert.equal(solver.solve(puzzlesArray[2][0]), puzzlesArray[2][1], "should pass");
    assert.equal(solver.solve(puzzlesArray[3][0]), puzzlesArray[3][1], "should pass");
    assert.equal(solver.solve(puzzlesArray[4][0]), puzzlesArray[4][1], "should pass");
  });
});
