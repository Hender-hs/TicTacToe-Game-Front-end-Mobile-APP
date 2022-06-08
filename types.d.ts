/**
 * 0 - Represents empty square.
 * 1 - Represents square selected by Player 1.
 * 2 - Represents square selected by Player 2.
 */
 type GameMoviments = {
	"a1": 0 | 1 | 2, 
	"a2": 0 | 1 | 2, 
	"a3": 0 | 1 | 2, 
	"b1": 0 | 1 | 2, 
	"b2": 0 | 1 | 2, 
	"b3": 0 | 1 | 2,
	"c1": 0 | 1 | 2, 
	"c2": 0 | 1 | 2, 
	"c3": 0 | 1 | 2
  }
  
  type squareIndex =
	'a1' | 'a2' | 'a3' | 
	'b1' | 'b2' | 'b3' |
	'c1' | 'c2' | 'c3'
  