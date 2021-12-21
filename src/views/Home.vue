<template>
    <div class="home">
		<baidu-map :center="center" :zoom="zoom" @ready="handler" class="bm-view"  :scroll-wheel-zoom="true">

			<bm-driving start="天安门" end="廊坊" @searchcomplete="handleSearchComplete" :panel="false" :autoViewport="true"></bm-driving>
			<!-- 第一条线：整体路线 -->
			<bm-polyline :path="originalPath" :stroke-color="strokeColor[0]" :stroke-opacity="0.4" :stroke-weight="3" :editing="false"></bm-polyline>
			<!-- 第二条线：已通行 -->
			<bm-polyline :path="currentPath" :stroke-color="strokeColor[1]" :stroke-opacity="1" :stroke-weight="3" :editing="false"></bm-polyline>
			<!-- 轨迹动画 -->
			<bml-lushu
				:speed="5000"
				:path="lushuPath"
				:icon="icon"
				:play="play"
				:rotation="true">
			</bml-lushu>
		</baidu-map>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from "vue-property-decorator";
	import { BmlLushu } from 'vue-baidu-map'

	@Component({
		components: {
			BmlLushu
		},
	})
	export default class Home extends Vue {
		private BMap:any = {};
	  	private map:any = {};
		private center = {lng: 0,lat: 0}; // 地图默认展示区域
		private zoom = 10; // 地图默认缩放级别

		private play= true;
		private originalPath:any = []; // 原始路径
		private currentPath = []; // 当前路径
		private lushuPath = []; // 运动轨迹

		private icon= {
			url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
			size: { width: 50, height: 24 },
			opts: { anchor: { width: 27, height:13 } }
		};

		private strokeColor = ['rgb(4, 160, 4)','rgb(4, 160, 4)'];

		mounted(){
			console.log("页面加载完毕")
		}

		private handler (e:any) {
			let { BMap, map } = e;
			console.log(BMap)
			this.BMap = BMap;
      		this.map = map;
			this.center.lng = 116.404;
			this.center.lat = 39.915;

			this.map.setMapStyle({
                features:'light'
            });
		}

    	private handleSearchComplete (res:any) {
			// 设置整体路径
      		this.originalPath = res.getPlan(0).getRoute(0).getPath();
			// 设置已通行的路径
      		this.currentPath = this.originalPath.slice(0,this.originalPath.length/2);
			// 设置移动动画及当前点
			this.lushuPath = this.currentPath.slice(this.currentPath.length-50 , this.currentPath.length);
			
			// 动态设置地图缩放级别
			var view = this.map.getViewport(eval(this.originalPath)); // 返回当前路径点最佳的缩放级别
			this.map.centerAndZoom(view.center,view.zoom);

			this.map.enableScrollWheelZoom();     //开启鼠标滚轮缩放
    	}

	}
</script>
<style>
	.BMap_cpyCtrl {
		display: none;
	}
	.anchorBL {
		display: none !important;
	}
</style>

<style lang="less" scoped>
	.bm-view {
		width: 100%;
		height: 300px;
	}
</style>>
