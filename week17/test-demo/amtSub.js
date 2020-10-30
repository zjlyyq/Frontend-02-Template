export default function amtSub(amt1, amt2) {
    var carry = 0;  // 借位
    // decimal part
	var dec_p1 = amt1.split('.')[1], dec_p2 = amt2.split(".")[1];
    // integer part
    var int_p1 = amt1.split('.')[0], int_p2 = amt2.split('.')[0];
	if (dec_p1 == undefined) {
        dec_p1 = "00";
    }
    if (dec_p2 == undefined) {
        dec_p2 = "00";
    }
    
    if (dec_p1.length < 2) {
        dec_p1 += "0";
    }
    if (dec_p2.length < 2) {
        dec_p2 += "0";
    }
	var ans = "";
	var c = 1;
	while(c >= 0) {
		ans = (parseInt(dec_p1[c]) + carry >= parseInt(dec_p2[c]) ? parseInt(dec_p1[c]) + carry - parseInt(dec_p2[c]):
		parseInt(dec_p1[c]) + carry + 10 - parseInt(dec_p2[c])) + ans;
		carry =  parseInt(dec_p1[c]) + carry >= parseInt(dec_p2[c]) ? 0 : -1;
		c -= 1;
	}
	ans = "." + ans;
	c = int_p1.length - int_p2.length;
	while(c --) {
		int_p2 = '0' + int_p2;
	}
	c = int_p1.length-1;
	while(c >= 0) {
		ans = (parseInt(int_p1[c]) + carry >= parseInt(int_p2[c]) ? parseInt(int_p1[c]) + carry - parseInt(int_p2[c]):
		parseInt(int_p1[c]) + carry + 10 - parseInt(int_p2[c])) + ans;
		carry =  parseInt(int_p1[c]) + carry >= parseInt(int_p2[c]) ? 0 : -1;
		c -= 1;
    }
    var offset = 0;
    for(var i = 0;i < ans.length - 2;i ++) {
        if (ans[i] == '0' && ans[i+1] != '.') {
            offset += 1;
        }else {
			break;
		}
    }
    ans = ans.substring(offset);
	return ans[0] == '.'?"0"+ans:ans;
}