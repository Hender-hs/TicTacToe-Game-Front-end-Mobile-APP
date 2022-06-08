import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	"body": {
	  "width": '100%',
	  "flex": 1,
	  "backgroundColor": 'green',
	  "alignItems": 'center',
	  "justifyContent": 'center',
	},
	"container": {
	  "width": '90%',
	  "height": '45%',
	  "flexDirection": 'row',
	  "flexWrap": "wrap",
	  // "backgroundColor": 'blue',
	},
	"square": {
	  "width": '33%',
	  "height": '33%',
	  "borderWidth": 5,
	  "borderStyle": 'solid',
	  "borderColor": '#000000',
	  "backgroundColor": "white"
	}
});
