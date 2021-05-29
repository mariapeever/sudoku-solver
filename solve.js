var generate = require("./generate.js");

var genArray = generate.genArray;
var colCheck = generate.colCheck;
var squCheck = generate.squCheck;
var genPseudoku = generate.genPseudoku;
var visPseudoku = generate.visPseudoku;

//a function to check if all integers from 1 to n appear in a single row of a 2d array where n is the number of columns of the 2d array
function singleRowCheck(arr,row) {
	
	var numCols = arr[row].length;

	// first we have a loop to check for all integers from 1 to the length of the row
	for (var i = 1; i <= numCols; i++) {

		// this variable is going to count the number of times the integer i is in the row; if it is ever greater than 1 then we will return false, if it equal to zero after checking all columns then we return false
		var count = 0;
		// this loop is going to SEARCH every column for the integer i
		for (var j = 0; j < numCols; j++) {
			if (arr[row][j] == i) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		// this is to check if the integer is in the row at all; if it is not, then count == 0 and we will return false
		if (count == 0) {
			return false;
		}

	}
	// so if it has gone through all of the checks and passed we return true;
	return true;

}

// this takes two numbers n and len and returns an array of length len which is the representation of number n in base 4 with as many zeroes at the beginning as necessary
// be careful that len is as big as it needs to be to print n in full
function conversion(n,len) {
	var con = [];
	while (Math.floor(n/4) != 0) {
		con.push(n % 4);
		n = Math.floor(n/4);
	}
	con.push(n % 4);

	// the array con is in the wrong order, so we will create a new array which gives us what we want in the right order
	var out = [];
	for (var i = con.length - 1; i >= 0; i--) {
		out.push(con[i]);
		con.pop();
	}

	// this will add extra zeroes at the beginning of the array so that conversion is at length len
	while (out.length < len) {
		out.splice(0,0,0);
	}

	return out;
}



// WRITE YOUR CODE INTO THE BODY OF THESE FUNCTIONS TO GET THEM WORKING

function rowCheck(array) {
	
	// this function should return a Boolean
	var numRows = array.length;
	var count = 0;
	for (let i = 0; i < numRows; i++) {
		if (singleRowCheck(array, i)) {
			count++;
		}
	}
	return (count == numRows) ? true : false;

}

function blankEntries(array) {

	// this function should return an array
	var numRows = array.length;
    var numCols = array[0].length;
    var blank = new Array();

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (array[i][j] == " ") {
                blank.push([i,j]);
            }
        }
    }
    return blank;

}

function makeCandidate(n,len) {

	// this function should return an array of integers between 1 and 4 of length len
	var candidate = conversion(n, len);
    for (let i = 0; i < candidate.length; i++) {
        candidate[i] += 1;
    }
    return candidate;

}

function checkCandidate(array,candidate) {

	// this function should return a Boolean saying whether a candidate assignment of numbers satisfies the Pseudoku conditions
	var blank = blankEntries(array);
	var numBlank = blank.length;
    for (let i = 0; i < numBlank; i++) {
    	array[blank[i][0]][blank[i][1]] = candidate[i];
    }
    if (rowCheck(array) && colCheck(array) && squCheck(array)) {
    	return true;
	}  
	for (let i = 0; i < numBlank; i++) {
    	array[blank[i][0]][blank[i][1]] = " ";
    }
    return false;

}

function solvePseudoku(array) {

	// this returns an array which is the completed Pseudoku puzzle
	var numBlank = blankEntries(array).length;
	for (let i = 0; i < 4 ** numBlank; i++) {
		if (checkCandidate(array, makeCandidate(i, numBlank))) {
			return array;
		}
	}
	return "No solution!";

}

// WRITE YOUR TESTING CODE BELOW HERE

// Task 12
// var row = [1, 2, 3, 4];
// var arr = genArray(row);
// var sudoku0 = genPseudoku(row,5);

// console.log(rowCheck(arr));
// console.log(rowCheck(sudoku0));

// // Task 13
// var sudoku1 = genPseudoku(row,5);
// var sudoku2 = [[1, " ", " ", 4],[3, 4, 1, " "],[2, 3, 4, " "],[" ", 1, 2, 3]];

// console.log(visPseudoku(sudoku1));
// console.log(blankEntries(sudoku1));
// console.log(visPseudoku(sudoku2));
// console.log(blankEntries(sudoku2));

// // Task 14
// console.log(makeCandidate(5,5));
// console.log(makeCandidate(12,4));

// // Task 15
// var candidate1 = [1, 1, 1, 1, 1];
// var candidate2 = [2, 3, 2, 1, 4];

// console.log(checkCandidate(sudoku1,candidate1));
// console.log(sudoku1);
// console.log(checkCandidate(sudoku2,candidate1));
// console.log(sudoku2);
// console.log(checkCandidate(sudoku2,candidate2));
// console.log(sudoku2);

// // Task 16
// var sudoku3 = genPseudoku(row,7);
// console.log(solvePseudoku(sudoku3));
// var sudoku4 = genPseudoku(row,10);
// console.log(solvePseudoku(sudoku4));

// // Task 17 Question 1
// var arr1 = genPseudoku([2,3,4,1],8);
// console.log(visPseudoku(arr1));
// var arr2 = genPseudoku([4,2,3,1],10);
// console.log(visPseudoku(arr2));
// console.log(visPseudoku(solvePseudoku(arr1)));
// console.log(visPseudoku(solvePseudoku(arr2)));

// Task 18 Question 2
function solvePseudoku18(array) {

	// this returns an array which is the completed Pseudoku puzzle

	function singleRowCyclicPerm(array) {

		// single row cyclic permutation
		for (let i = 0; i < 1; i++) {
			array.push(array.shift());
		}
		return array;
	}

	function generateOptions(array) {

		// generate options for blank entries
		var options = new Array();
		for (let i = 1; i <= array.length; i++) {
			options.push(i);
		}
		return options;
	}

	function generateBlankRows(array,blank) {

		// generate options for blank entries by row/column
		var blankArr = new Array();
		for (let i = 0; i < array.length; i++) {
			blankArr.push(new Array());
			for (let j = 0; j < blank.length; j++) {
				if (blank[j][0] == i) {
					blankArr[blankArr.length - 1].push(blank[j]);
				}
			}
		}	
		return blankArr;
	}

	function generateBlankCols(array,blank) {

		// generate options for blank entries by row/column
		var blankArr = new Array();
		for (let i = 0; i < array.length; i++) {
			blankArr.push(new Array());
			for (let j = 0; j < blank.length; j++) {
				if (blank[j][1] == i) {
					blankArr[blankArr.length - 1].push(blank[j]);
				}
			}
		}	
		return blankArr;
	}

	function countSqus(array) {

		// count squares per row/column
		var count;
		for (let i = 0; i < array.length; i++) {
			if (i**2 == array.length) {
				count = i;
			} 
		}
		return count;
	}

	function generateBlankSqus(array,blank) {

		// generate options for blank entries by square
		var blankSqus = new Array();
		var squs = countSqus(array);

		for (let i = 0; i < squs; i++) {
			for (let j = 0; j < squs; j++) {
				let x1 = i*squs;
				let y1 = j*squs;
				let x2 = i*squs + squs - 1;
				let y2 = j*squs + squs - 1;
				blankSqus.push(new Array());
				for (let k = 0; k < blank.length; k++) {
					if (blank[k][0] >= x1 && blank[k][0] <= x2 && 
					   blank[k][1] >= y1 && blank[k][1] <= y2) {
					   blankSqus[blankSqus.length - 1].push(blank[k]);
					}
				}
			}
		}
		return blankSqus;
	}

	function generateCandidateRows(array,blank) {

		// generate candidate entries per row
		var candidate = new Array();
		for (let i = 0; i < array.length; i++) {
			let options = generateOptions(array);
			for (let j = 0; j < array.length; j++) {
				for (let k = 0; k < options.length; k++) {
					if (array[i][j] == options[k]) {
						options.splice(k, 1);
					} 
				}
			}
			for (let j = 0; j < options.length; j++) {
				candidate.push(options[j]);
			}
		}
		for (let i = 0; i < blank.length; i++) {
			candidate.push(candidate.splice(0, blank[i].length));
		}
		return candidate;
	}

	function generateCandidateCols(array,blank) {

		// generate candidate entries per column
		var candidate = new Array();
		for (let i = 0; i < array.length; i++) {
			let options = generateOptions(array);
			for (let j = 0; j < array.length; j++) {
				for (let k = 0; k < options.length; k++) {
					if (array[j][i] == options[k]) {
						options.splice(k, 1);
					}
				}
			}
			for (let j = 0; j < options.length; j++) {
				candidate.push(options[j]);
			}
		}
		for (let i = 0; i < blank.length; i++) {
			candidate.push(candidate.splice(0, blank[i].length));	
		}
		return candidate;
	}

	function generateCandidateSqus(array,blank) {
		
		// generate candidate entries per square
		var squs = countSqus(array);
		var candidate = new Array();
		
		for(var i = 0; i < squs; i++) {
			for(var j = 0; j < squs; j++) {
				var options = generateOptions(array);
				let x1 = i*squs;
				let y1 = j*squs;
				let x2 = i*squs + squs - 1;
				let y2 = j*squs + squs - 1;
				for (var k = y1; k <= y2; k++) {
					for (var l = x1; l <= x2; l++) {
						for(var m = 0; m < options.length; m++) {
							if(array[l][k] == options[m]) {
								options.splice(m,1);
							}
						}
					}
				}
				for(var k = 0; k < options.length; k++) {
					candidate.push(options[k]);
				}
			}

		}
		for(var i = 0; i < blank.length; i++) {
			candidate.push(candidate.splice(0, blank[i].length));
		}	
		return candidate;
	}	

	function generateCombs(array) {

		// generate non-exhaustive combinations
		var combs = new Array();
		for (let i = 0; i < array.length; i++) {
			
			let levels = new Array();
			let ind = 0;
			let numCombs = 1;
			let arrayCopy = array[i].slice();

			while (ind < array[i].length) {
				levels.unshift(numCombs *= ++ind);
			} 

			combs.push(new Array());

			for (var j = 0; j < levels.length; j++) {
				for (var k = 0; k < levels[0]; k++) {
					if (j == 0) {
						combs[i].push(new Array(arrayCopy.length));
					}
					if (k % levels[j+1] == 0 && k > 0) {
						singleRowCyclicPerm(arrayCopy);
					}
					var count = 0;
					for (var l = 0; l < j; l++) {
						for (var m = 0; m < j; m++) {
							if (combs[i][k][m] == arrayCopy[j]) {
								singleRowCyclicPerm(arrayCopy);
								count++;
								break;
							}
						}
						if (l == count) {
							break;
						}
					}
					combs[i][k][j] = arrayCopy[j];
				}
			}
		}
		return combs;
	}

	function checkCols(blankRows,blankCols,rowCombs,colCombs) {

		// check rows and columns
		var spliced;
		var matchRow;
		for(let k = 0; k < rowCombs.length; k++) {
			if(spliced) {
				k--;
			}
			for(let l = 0; l < rowCombs[k].length; l++) {
				if(spliced && l > 0) {
					l--;
				}
				for(let t = 0; t < blankRows[k].length; t++) {
					if(spliced) {
						spliced = false;
						t = 0;
					}
					matchRow = false;
					for(let d = 0; d < blankCols[blankRows[k][t][1]].length; d++) {
						if(blankRows[k][t] == blankCols[blankRows[k][t][1]][d]) {
							for(let b = 0; b < colCombs[blankRows[k][t][1]].length; b++){
								if(rowCombs[k][l] && 
								   rowCombs[k][l][t] == colCombs[blankRows[k][t][1]][b][d]) {

									matchRow = true;
									break;
								}
								if(!matchRow && 
									rowCombs[k][l] && 
									rowCombs[k][l][t] != colCombs[blankRows[k][t][1]][b][d] && 
									b == colCombs[blankRows[k][t][1]].length - 1) {
									spliced = true;
									rowCombs[k].splice(l,1);
								}
							}
						}
					}
				}
			}
		}
		return rowCombs;
	}

	function checkSqus(array,blankRows,blankSqus,rowCombs,squCombs) {

		// check rows and squares
		var squs = countSqus(array);
		var squInd = 0;
		var spliced;
		var matchRow;
		for(let a = 0; a < squs; a++) {
			for(let b = 0; b < squs; b++) {
				squInd++;
				let x1 = a*squs;
				let y1 = b*squs;
				let x2 = a*squs + squs - 1;
				let y2 = b*squs + squs - 1;
				for (let j = x1; j <= x2; j++) {
					for(let t = 0; t < blankRows[j].length; t++) {
						if(spliced) {
							spliced = false;
							t = 0;
						}
						for (let l = 0; l < blankSqus[squInd - 1].length; l++) {
							if(blankRows[j][t] == blankSqus[squInd - 1][l]) {
								for(let c = 0; c < rowCombs[blankRows[j][t][0]].length; c++) {
									matchRow = false;
									for(let d = 0; d < squCombs[squInd - 1].length; d++) {
										if(rowCombs[blankRows[j][t][0]][c][t] == squCombs[squInd - 1][d][l]) {
											matchRow = true;
											break;
										}
										if(!matchRow && 
											rowCombs[blankRows[j][t][0]][c][t] != squCombs[squInd - 1][d][l] && 
											d == squCombs[squInd - 1].length - 1) {
											spliced = true;
											rowCombs[blankRows[j][t][0]].splice(c,1);
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return rowCombs;
	}

	function generateRowLen(rowCombs){

		// generate row lengths
		var rowLen = new Array();
		for(var i = 0; i < rowCombs.length; i++) {
			if(rowCombs[i].length == 0) {
				rowLen.push(1);
			} else {
				rowLen.push(rowCombs[i].length);
			}
		}
		return rowLen;
	}

	function countPerms(array,rowLen) {

		// generate cyclic permutations count
		var permsCount = new Array();
		
		for(var i = 0; i < rowLen[0]; i++) {
			permsCount.push(0);
			for(var j = 0; j < rowLen[1]; j++) {
				permsCount.push(1);
				for(var k = 0; k < rowLen[2]; k++) {
					permsCount.push(2);
					for(var l = 0; l < rowLen[3]; l++) {
						permsCount.push(3);
						for(var l = 0; l < rowLen[4]; l++) {
							permsCount.push(4);
							for(var l = 0; l < rowLen[5]; l++) {
								permsCount.push(5);
								for(var l = 0; l < rowLen[6]; l++) {
									permsCount.push(6);
									for(var l = 0; l < rowLen[7]; l++) {
										permsCount.push(7);
										for(var l = 0; l < rowLen[8]; l++) {
											permsCount.push(8);
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return permsCount;
	}

	function generateSolution(rowCombs) {

		// generate solution
		var solution = new Array();
		for(var i = 0; i < rowCombs.length; i++) {
			if(rowCombs[i][0]){
				for(var j = 0; j < rowCombs[i][0].length; j++) {
					solution.push(rowCombs[i][0][j]);
				}
			} 
		}
		return solution;
	}
	
	function solve(array,permsCount,rowCombs) {

		// solve pseudoku/sudoku
		for(var i = 0; i < permsCount.length; i++) {
			var solution = generateSolution(rowCombs);
			if(checkCandidate(array, solution)) {
				return array;
			}
			if(rowCombs[permsCount[i]].length > 1) {
				singleRowCyclicPerm(rowCombs[permsCount[i]]);
			}
		}
		return "There is no solution!";
	}

	// generate blank entries
	var blank = blankEntries(array);

	// generate blank entries by row, column and square
	var blankRows = generateBlankRows(array,blank);
	var blankCols = generateBlankCols(array,blank);
	var blankSqus = generateBlankSqus(array,blank);

	// generate candidate entries for rows, columns and squares
	var candidateRows = generateCandidateRows(array,blankRows);
	var candidateCols = generateCandidateCols(array,blankCols);
	var candidateSqus = generateCandidateSqus(array,blankSqus);

	// generate non-exhaustive row combinations
	var rowCombs = generateCombs(candidateRows);

	// generate non-exhaustive column and square combinations
	if(blank.length != array.length ** 2) {
		var colCombs = generateCombs(candidateCols);
		var squCombs = generateCombs(candidateSqus);

		rowCombs = checkCols(blankRows,blankCols,rowCombs,colCombs);
		rowCombs = checkSqus(array,blankRows,blankSqus,rowCombs,squCombs);
	}

	// generate cyclic permutations count per row
	var permsCount = countPerms(array,generateRowLen(rowCombs));

	// generate solved pseudoku
	var solvedPseudoku = solve(array,permsCount,rowCombs);

	// return solved pseudoku
	return solvedPseudoku;
}

// console.log(solvePseudoku18(sudoku3));
// console.log(solvePseudoku18(sudoku4));

var sudoku5 = [[' ',' ',' ','1',' ',' ','9',' ',' '],
			   ['6', ' ', ' ', ' ', ' ','9',' ',' ',' '],
			   [' ',' ','7',' ','4', '3', '8', ' ', ' '],
			   ['5',' ',' ','6',' ', ' ', ' ', '3','4'],
			   ['1','4',' ',' ','3','5',' ','6','8'],
			   [' ',' ','3','7',' ','4','2',' ',' '],
			   ['3',' ','4',' ','9',' ','5',' ',' '],
			   [' ','2',' ',' ','8',' ',' ',' ','1'],
			   [' ',' ',' ',' ',' ','1',' ','9',' ']];


console.log(visPseudoku(sudoku5));
console.log(visPseudoku(solvePseudoku18(sudoku5)));