'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let {puzzle, coordinate, value} = req.body;
      if(!puzzle || !coordinate || !value) return res.json({error: "Required field(s) missing"});
      if(!solver.validate(puzzle)){
        if(/[^1-9\.]/.test(puzzle)) return res.json({error: 'Invalid characters in puzzle'});
        return res.json({error: 'Expected puzzle to be 81 characters long'});
      };
      let coordinateLetter = coordinate[0].toUpperCase();
      let coordinateNumber = coordinate[1];
      if(!/[A-I]/.test(coordinateLetter) || !/[1-9]/.test(coordinateNumber) || coordinate.length > 2) return res.json({error: 'Invalid coordinate'})
      if(/\D/.test(value) || !/[1-9]/.test(value) || value.length > 1) return res.json({error: 'Invalid value'});
      coordinateNumber = Number(coordinateNumber);
      value = Number(value);
      let conflict = [];
      if(!solver.checkRowPlacement(puzzle, coordinateLetter, coordinateNumber, value)) conflict.push("row");
      if(!solver.checkColPlacement(puzzle, coordinateLetter, coordinateNumber, value)) conflict.push("column");
      if(!solver.checkRegionPlacement(puzzle, coordinateLetter, coordinateNumber, value)) conflict.push("region");
      if(!conflict.length) return res.json({valid: true});
      return res.json({valid: false, conflict});
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let {puzzle} = req.body;
      console.log(puzzle)
      if(!puzzle) return res.json({error: 'Required field missing'});
      if(!solver.validate(puzzle)){
        console.log(puzzle)
        if(/[^1-9\.]/.test(puzzle))  return res.json({error: 'Invalid characters in puzzle'});
        return res.json({error: 'Expected puzzle to be 81 characters long'});
      }
      let solution = solver.solve(puzzle);
      if(solution) return res.json({solution});
      else return res.json({error: 'Puzzle cannot be solved'});
    });
};
