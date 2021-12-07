const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzlesArray = require("../controllers/puzzle-strings.js").puzzlesAndSolutions;

chai.use(chaiHttp);

suite('Functional Tests', () => {
  // this.timeout(5000);
  //api/solve
  test("Solve a puzzle with a valid puzzle string: POST request to /api/solve", done=>{
    chai
      .request(server)
      .post("/api/solve")
      .send({puzzle: puzzlesArray[0][0]})
      .end((err, res)=>{
        assert.equal(res.body.solution, puzzlesArray[0][1]);
        done();
      });
  });
  test("Solve a puzzle with missing puzzle string: POST request to /api/solve", done=>{
    chai
      .request(server)
      .post("/api/solve")
      .send({puzzle: undefined})
      .end((err, res)=>{
        assert.equal(res.body.error, "Required field missing");
        done();
      });
  });
  test("solve a puzzle with a invalid characters: POST request to /api/solve", done=>{
    chai
      .request(server)
      .post("/api/solve")
      .send({puzzle: puzzlesArray[0][0] + "a"})
      .end((err, res)=>{
        assert.equal(res.body.error, "Invalid characters in puzzle");
        done();
      });
  });
  test("solve a puzzle with incorrect lenth: POST request to /api/solve", done=>{
    chai
      .request(server)
      .post("/api/solve")
      .send({puzzle: puzzlesArray[0][0].slice(5)})
      .end((err, res)=>{
        assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
        done();
      });
  });
  test("solve a puzzle that cannot be solve: POST request to /api/solve", done=>{
    chai
      .request(server)
      .post("/api/solve")
      .send({puzzle: "5" + puzzlesArray[0][0].slice(1)})
      .end((err, res)=>{
        assert.equal(res.body.error, "Puzzle cannot be solved");
        done();
      });
  });
  //api/check
  test("check a puzzle placement with all fields: POST request to /api/check", done=>{
    chai
      .request(server)
      .post("/api/check")
      .send({puzzle: puzzlesArray[0][0], coordinate: "I9", value: 8})
      .end((err, res)=>{
        assert.equal(res.body.valid, true);
        done();
      });
  });
  test("check a puzzle with one placement conflict: POST request to /api/check", done=>{
    chai
      .request(server)
      .post("/api/check")
      .send({puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "I9", value: 2})
      .end((err, res)=>{
        assert.equal(res.body.valid, false);
        assert.deepEqual(res.body.conflict, ["column"])
        done();
      });
  });
  test("check a puzzle with two placement conflicts: POST request to /api/check", done=>{
    chai
      .request(server)
      .post("/api/check")
      .send({puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "I8", value: 4})
      .end((err, res)=>{
        assert.equal(res.body.valid, false);
        assert.deepEqual(res.body.conflict, ["row", "region"])
        done();
      });
  });
  test("check a puzzle with all placement conflicts: POST request to /api/check", done=>{
    chai
      .request(server)
      .post("/api/check")
      .send({puzzle: "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", coordinate: "I9", value: 3})
      .end((err, res)=>{
        assert.equal(res.body.valid, false);
        assert.deepEqual(res.body.conflict, ["row", "column", "region"])
        done();
      });
  });
  test("check a puzzle placement with missing required fields: POST request to /api/check", done=>{
    chai
      .request(server)
      .post("/api/check")
      .send({})
      .end((err, res)=>{
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });
  test("check a puzzle placement with invalid characters: POST request to /api/solve", done=>{
    chai
      .request(server)
      .post("/api/check")
      .send({puzzle: puzzlesArray[0][0] + "a", coordinate: "I9", value: 3})
      .end((err, res)=>{
        assert.equal(res.body.error, "Invalid characters in puzzle");
        done();
      });
  });
  test("solve a placement with incorrect lenth: POST request to /api/solve", done=>{
    chai
      .request(server)
      .post("/api/check")
      .send({puzzle: puzzlesArray[0][0].slice(5), coordinate: "I9", value: 3})
      .end((err, res)=>{
        assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
        done();
      });
  });
  test("check a puzzle with invalid placement coordinate: POST request to /api/check", done=>{
    chai
      .request(server)
      .post("/api/check")
      .send({puzzle: puzzlesArray[0][0], coordinate: "Z9", value: 8})
      .end((err, res)=>{
        assert.equal(res.body.error, "Invalid coordinate");
        done();
      });
  });
  test("check a puzzle with invalid placement value: POST request to /api/check", done=>{
    chai
      .request(server)
      .post("/api/check")
      .send({puzzle: puzzlesArray[0][0], coordinate: "A9", value: "a"})
      .end((err, res)=>{
        assert.equal(res.body.error, "Invalid value");
        done();
      });
  });
});

