$(function(){

    //グラフ表示領域設定
		var w = 600; //幅
		var h = 100; //高さ
		var p = 1; //グラフの棒と棒の間隔

		var svg = d3.select("body")
		            .append("svg")
		            .attr("width", w)
		            .attr("height", h);

		//データセット初期化
		var dataset = [];
		for (var i = 1; i < 300; i++){
		  dataset[i] = 0;
		}
    
    //グラフ初期化
		var graph = svg.selectAll("rect")
		               .data(dataset)
		               .enter()
		               .append("rect")
		               .attr("x", 1)
		               .attr("y", 1)
		               .attr("width", 1)
                   .attr("height", 1);

		//データ受信
        var host = location.origin.replace(/^http/, 'ws')
        var ws = new WebSocket(host);
        ws.onmessage = function (event) {
          var li = document.createElement('li');
          var data  = JSON.parse(event.data);
		  console.log(data);
          document.querySelector('#pings').appendChild(data[0]);
        

				graph.data(data)
				     .transition()
				     .attr("x", function(d, i){
					     return i * (w / dataset.length);
				     })
				     .attr("y", 0)
				     .attr("width", w / dataset.length - p)
				     .attr("height", function(d){
					     if (d == 0){
						     return 10
					     }else{
						     return d * 40;
					     }
				     });
		  }
		});

	});
