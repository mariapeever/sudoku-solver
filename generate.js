//a function to check if all integers from 1 to n appear in a column of a 2d array where n is the number of rows of the 2d array
function singleColCheck(arr,column) {
	
	var numRows = arr.length;
	var numCols = arr[0].length;

	// first we have a loop to check for all integers from 1 to the length of the column
	for (var i = 1; i <= numRows; i++) {

		// this variable is going to count the number of times the integer i is in the column; if it is ever greater than 1 then we will return false, if it equal to zero after checking all rows then we return false
		var count = 0;
		// this loop is going to SEARCH every column for the integer i
		for (var j = 0; j < numRows; j++) {
			if (arr[j][column] == i) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		// this is to check if the integer is in the column at all; if it is not, then count == 0 and we will return false
		if (count == 0) {
			return false;
		}

	}
	// so if it has gone through all of the checks and passed we return true;
	return true;

}

// a function to check that all integers appear in a square of a 2d array - (x1,y1) is the (row,colum) entry of the top-left element, and (x2,y2) is the bottom-right element of the square
// e.g. singleBlockCheck(arr,0,0,1,1) would check if the 2-by-2 block in the top-left contains all integers from 1 to 4
function singleBlockCheck(arr,x1,y1,x2,y2) {
	// this generates an array square of all the elements inside a particular square of a 2d array
	var square = [];
	for (var i = y1; i <= y2; i++) {
		for (var j = x1; j <= x2; j++) {
			square.push(arr[i][j]);
		}
	}

	// this then checks whether each integer from 1 to the length of the array square is inside the particular square
	var sqSize = square.length;
	for (var i = 1; i <= sqSize; i++) {
		var count = 0;
		for (var j = 0; j < sqSize; j++) {
			if (square[j] == i){
				count++;
			}
			if (count > 1){
				return false;
			}
		}
		if (count == 0){
			return false;
		}
	}

	return true;
}

// a function to randomly select n (row,column) entries of a 2d array with size columns and size rows, where size is assumed to be an integer and n is also assumed to be an integer
function entriesToDel(size,n) {
	if (n <= size ** 2) {

		// this creates an array of all the rows and column indices

		var array = [];
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				array[j+(size * i)] = [i,j];
			}
		}

		// this creates a new array, called array2 to store randomly chose elements of the array that will be removed, and then removes those elements from array

		var num = size ** 2;

		var array2 = [];
		for (var i = 0; i < n; i++) {
			var x = Math.round( (num - i - 1) * Math.random() );
			array2[i] = array[x];
			array.splice(x,1);
		}
		return array2;
	}
	return "Number of elements exceeds size of array!";
}



// WRITE YOUR CODE INTO THE BODY OF THESE FUNCTIONS TO GET THEM WORKING




function genArray(row) {
	

	// this function should return an array
	var numRows = row.length;
	var arr = new Array();
	for (let i = 0; i < numRows; i++) {
		arr.push(row.slice());	
	}
	return arr;
}

function colCheck(arr) {

	// this function should return a Boolean
	var numCols = arr[0].length;
	var count = 0;
	for (let i = 0; i < numCols; i++) {
		if (singleColCheck(arr, i)) {
			count++;
		}
	}
	return (count == numCols) ? true : false;
}

function squCheck(arr) {
	
	// this function should return a Boolean
	var numRows = arr.length;
	var numCols = arr[0].length;

	var squCount;
	for (let i = 0; i < numRows; i++) {
		if (i ** 2 == numRows) {
			squCount = i;
		} 
	}
	var count = 0;
	for (let i = 0; i < numRows/squCount; i++) {
		for (let j = 0; j < numCols/squCount; j++) {
			if (singleBlockCheck(
				arr, 
				i*squCount,
				j*squCount, 
				i*squCount + squCount - 1, 
				j*squCount + squCount - 1)) {
				count++;
			}
		}
	}
	var numSqu = numRows/squCount * numCols/squCount;
	return (count == numSqu) ? true : false;

}

function cyclicPerm(arr,row,n) {
	
	// this function should return an array
	var row = arr[row];
	for (let i = 0; i < n; i++) {
		row.unshift(row.pop());
	}
	return arr;

}

function perm(arr,a,b,c) {

	// this function should return an array
	var n = new Array(a,b,c);
	for (let i = 1; i < arr.length; i++) {
		cyclicPerm(arr, i, n[i - 1]);
	}
	return arr;

}

function permArray(arr) {
	
	// this function should return an array or a string saying "There is no solution!"
	var arrnew = new Array();
	var numRows = arr.length;
	for (let i = 1; i <= numRows; i++) {
		for (let j = 1; j <= numRows; j++) {
			for (let k = 1; k <= numRows; k++) {
				arrnew = perm(arr,i,j,k);
				if (colCheck(arrnew) && squCheck(arrnew)) {
					return arrnew;				
				}
			}
		}
	}
	return "There is no solution!";
}

function delEntries(arr,n) {
	
	// this function should return an array
	var entries = entriesToDel(arr.length,n);
	for (let i = 0; i < entries.length; i++) {
		arr[entries[i][0]][entries[i][1]] = " ";
	}
	return arr;
}

function genPseudoku(row,n){
	
	// this function should return an array
	var arr = genArray(row);
	arr = permArray(arr);
	arr = delEntries(arr,n);
	return arr;

}


function visPseudoku(arr) {

	// this function should return a string
	var vis = new String();
	var numRows = arr.length;
	var numCols = arr[0].length;

	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j < numCols; j++) {
			if (j == 0) {
				if (i > 0) {
					vis += "|\n";
				}
				vis += "-";
				for (let k = 0; k < numCols; k++) {
					vis += "----";
				}
				if (i < numRows) {
					vis += "\n";
				}
			}
			vis += "| " + arr[i][j] + " ";
			if (i == numRows - 1 && j == numCols - 1) {
				vis += "|\n";
				vis += "-";
				for(let k = 0; k < numCols; k++) {
					vis += "----";
				}
			}
		}
	}
	return vis;
}

module.exports = {
	genArray : genArray,
	colCheck : colCheck,
	squCheck : squCheck,
	genPseudoku : genPseudoku,
    visPseudoku : visPseudoku
};



// PUT YOUR NON-FUNCTION WORKING BELOW HERE, e.g. function calls, printing to the console, creation of variables
///////////////////////////////////////////////////////////////////////////////////////////////////////

// var row = [1,2,3,4];
// var arr = genArray(row);

// // Task 1 
// console.log(genArray(row));

// // Task 2
// console.log(colCheck(genArray(row)));

// // Task 3
// console.log(squCheck(genArray(row)));

// // Task 4
// console.log(cyclicPerm(genArray(row),2,2));

// // Task 5
// console.log(perm(genArray(row),3,1,0));

// // Task 6
// console.log(permArray(genArray(row)));

// // Task 7
// console.log(delEntries(genArray(row),5));

// // Task 8
// console.log(genPseudoku(row,3));

// // Task 9
// console.log(visPseudoku(genPseudoku(row,5)));

// // Task 10

// // Question 1
// console.log(visPseudoku(genPseudoku([1,3,4,2],7)));
// console.log(visPseudoku(genPseudoku([4,1,3,2],10)));

// Question 3
function permArray10(arr) {
	
	// this function should return an array or a string saying "There is no solution!"
	var arrnew = new Array();
	var numRows = arr.length;
	
	for (let i = 1; i <= numRows; i++) {
		for (let j = 1; j <= numRows; j++) {
			for (let k = 1; k <= numRows; k++) {
				for (let l = 2; l < numRows; l++) {
					arr[l] = arr[l].reverse();
					arrnew = perm(arr,i,j,k);
					if (colCheck(arrnew) && squCheck(arrnew)) {
						return arrnew;				
					}
				}
			}
		}
	}
	return "There is no solution!";
}

function genPseudoku10(row,n){
	
	// this function should return an array
	var arr = genArray(row);
	arr = permArray10(arr);
	arr = delEntries(arr,n);
	return arr;

}

// Question 2
// console.log(visPseudoku(genPseudoku10([1,2,3,4],2)));

