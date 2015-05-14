/*Copyright (c) 2015 CJ Dvorak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/
var objects = {"Thing":0,"Doodad":0,"Doohickey":0,"Gizmo":0,"Thingamajig":0,"Whatchamacallit":0,"Hoojamaflip":0,"Whoozawhatzit":0};
function start () {
	localStorage.setItem('accepted',true);
}
window.onload=function() {
	if (typeof(Storage) != "undefined") {
		if (localStorage.getItem('accepted')) {
			start();
		} else {
			document.body.innerHTML = "<div id='accept' class='active button'>Accept (+1 Whoozawhatzit)</div>"+
			"<p>Copyright (c) 2015 CJ Dvorak\n</p>"+
			"<p>Permission is hereby granted, free of charge, to any person obtaining a copy\n"+
			"of this software and associated documentation files (the 'Software'), to deal\n"+
			"in the Software without restriction, including without limitation the rights\n"+
			"to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n"+
			"copies of the Software, and to permit persons to whom the Software is\n"+
			"furnished to do so, subject to the following conditions:\n"+
			"The above copyright notice and this permission notice shall be included in\n"+
			"all copies or substantial portions of the Software.</p>\n"+
			"<p>THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n"+
			"IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n"+
			"FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n"+
			"AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n"+
			"LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n"+
			"OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n"+
			"THE SOFTWARE.</p>";
			document.getElementById('accept').onclick=start;
		}
	} else {
	    document.body.innerHTML = "Sorry, your browser does not support Web Storage. Use <a href='http://www.google.com/chrome/'>Chrome</a>!";
	}
};