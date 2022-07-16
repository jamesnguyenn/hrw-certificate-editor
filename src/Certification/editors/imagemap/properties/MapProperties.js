import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Collapse } from 'antd';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../../../components/common/Scrollbar';

const { Panel } = Collapse;

class MapProperties extends Component {
	static propTypes = {
		canvasRef: PropTypes.any,
		onEdit: PropTypes.onEdit
	};

	handleDeleteCertificationSaved (e) {
		e.stopPropagation();
		console.log('hello')
	}

	render() {
		const { canvasRef, form,onEdit } = this.props;
		const showArrow = true;
		if (canvasRef) {
			return (
				<Scrollbar>
					<Form layout="horizontal">
						<Collapse bordered={false} defaultActiveKey={'image'}>
							{Object.keys(PropertyDefinition.map).map(key => {
								return (
									<Panel key={key} header={PropertyDefinition.map[key].title} showArrow={showArrow}>
										{PropertyDefinition.map[key].component.render(
											canvasRef,
											form,
											canvasRef.handler.workarea,
										)}
									</Panel>
								);
							})}
						</Collapse>
						<Collapse bordered={false} defaultActiveKey={'certification-example'}>
							<Panel header={'Mẫu đã lưu'} showArrow={showArrow} key={'certification-example'}>
							<div className="certification-image__wrapper">
								<div className="certification-image">
									<img src="https://hrw.hstatic.net/35/200001188373/bd958dbf630c419d96ad3190a364d229_medium.jpg" alt="certification" onClick={()=>onEdit(dataJSON)}/>
									<div className="certification-image__action" onClick={this.handleDeleteCertificationSaved}>
										<svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8 0.333008C7.67037 0.333008 7.34813 0.430756 7.07405 0.613892C6.79997 0.797028 6.58635 1.05733 6.4602 1.36187C6.33406 1.66641 6.30105 2.00152 6.36536 2.32483C6.42967 2.64813 6.5884 2.9451 6.82149 3.17819C7.05458 3.41127 7.35155 3.57001 7.67485 3.63432C7.99815 3.69863 8.33326 3.66562 8.63781 3.53947C8.94235 3.41333 9.20265 3.19971 9.38578 2.92563C9.56892 2.65154 9.66667 2.32931 9.66667 1.99967C9.66667 1.55765 9.49107 1.13372 9.17851 0.821164C8.86595 0.508603 8.44203 0.333008 8 0.333008ZM2.16667 0.333008C1.83703 0.333008 1.5148 0.430756 1.24072 0.613892C0.966635 0.797028 0.753014 1.05733 0.626868 1.36187C0.500722 1.66641 0.467717 2.00152 0.532025 2.32483C0.596334 2.64813 0.755068 2.9451 0.988156 3.17819C1.22124 3.41127 1.51822 3.57001 1.84152 3.63432C2.16482 3.69863 2.49993 3.66562 2.80447 3.53947C3.10902 3.41333 3.36931 3.19971 3.55245 2.92563C3.73559 2.65154 3.83333 2.32931 3.83333 1.99967C3.83333 1.55765 3.65774 1.13372 3.34518 0.821164C3.03262 0.508603 2.6087 0.333008 2.16667 0.333008ZM13.8333 0.333008C13.5037 0.333008 13.1815 0.430756 12.9074 0.613892C12.6333 0.797028 12.4197 1.05733 12.2935 1.36187C12.1674 1.66641 12.1344 2.00152 12.1987 2.32483C12.263 2.64813 12.4217 2.9451 12.6548 3.17819C12.8879 3.41127 13.1849 3.57001 13.5082 3.63432C13.8315 3.69863 14.1666 3.66562 14.4711 3.53947C14.7757 3.41333 15.036 3.19971 15.2191 2.92563C15.4023 2.65154 15.5 2.32931 15.5 1.99967C15.5 1.55765 15.3244 1.13372 15.0118 0.821164C14.6993 0.508603 14.2754 0.333008 13.8333 0.333008Z" fill="#021337"/>
										</svg>
									</div>
								</div>
								<div className="certification-image" onClick={()=>onEdit(dataJSON)}>
									<img src="https://hrw.hstatic.net/35/200001188373/bd958dbf630c419d96ad3190a364d229_medium.jpg" alt="certification" />
									<div className="certification-image__action">
										<svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M8 0.333008C7.67037 0.333008 7.34813 0.430756 7.07405 0.613892C6.79997 0.797028 6.58635 1.05733 6.4602 1.36187C6.33406 1.66641 6.30105 2.00152 6.36536 2.32483C6.42967 2.64813 6.5884 2.9451 6.82149 3.17819C7.05458 3.41127 7.35155 3.57001 7.67485 3.63432C7.99815 3.69863 8.33326 3.66562 8.63781 3.53947C8.94235 3.41333 9.20265 3.19971 9.38578 2.92563C9.56892 2.65154 9.66667 2.32931 9.66667 1.99967C9.66667 1.55765 9.49107 1.13372 9.17851 0.821164C8.86595 0.508603 8.44203 0.333008 8 0.333008ZM2.16667 0.333008C1.83703 0.333008 1.5148 0.430756 1.24072 0.613892C0.966635 0.797028 0.753014 1.05733 0.626868 1.36187C0.500722 1.66641 0.467717 2.00152 0.532025 2.32483C0.596334 2.64813 0.755068 2.9451 0.988156 3.17819C1.22124 3.41127 1.51822 3.57001 1.84152 3.63432C2.16482 3.69863 2.49993 3.66562 2.80447 3.53947C3.10902 3.41333 3.36931 3.19971 3.55245 2.92563C3.73559 2.65154 3.83333 2.32931 3.83333 1.99967C3.83333 1.55765 3.65774 1.13372 3.34518 0.821164C3.03262 0.508603 2.6087 0.333008 2.16667 0.333008ZM13.8333 0.333008C13.5037 0.333008 13.1815 0.430756 12.9074 0.613892C12.6333 0.797028 12.4197 1.05733 12.2935 1.36187C12.1674 1.66641 12.1344 2.00152 12.1987 2.32483C12.263 2.64813 12.4217 2.9451 12.6548 3.17819C12.8879 3.41127 13.1849 3.57001 13.5082 3.63432C13.8315 3.69863 14.1666 3.66562 14.4711 3.53947C14.7757 3.41333 15.036 3.19971 15.2191 2.92563C15.4023 2.65154 15.5 2.32931 15.5 1.99967C15.5 1.55765 15.3244 1.13372 15.0118 0.821164C14.6993 0.508603 14.2754 0.333008 13.8333 0.333008Z" fill="#021337"/>
										</svg>
									</div>
								</div>	
							</div>
							</Panel>
						</Collapse>
					</Form>
				</Scrollbar>
			);
		}
		return null;
	}
}

export default Form.create({
	onValuesChange: (props, changedValues, allValues) => {
		const { onChange, selectedItem } = props;
		onChange(selectedItem, changedValues, { workarea: allValues });
	},
})(MapProperties);


const dataJSON ={
	"objects": [
		{
			"type": "image",
			"version": "4.6.0",
			"originX": "left",
			"originY": "top",
			"left": 185.09,
			"top": 25.84,
			"width": 600,
			"height": 450,
			"fill": "rgb(0,0,0)",
			"stroke": null,
			"strokeWidth": 0,
			"strokeDashArray": null,
			"strokeLineCap": "butt",
			"strokeDashOffset": 0,
			"strokeLineJoin": "miter",
			"strokeUniform": false,
			"strokeMiterLimit": 4,
			"scaleX": 1,
			"scaleY": 1,
			"angle": 0,
			"flipX": false,
			"flipY": false,
			"opacity": 1,
			"shadow": null,
			"visible": true,
			"backgroundColor": "#fff",
			"fillRule": "nonzero",
			"paintFirst": "fill",
			"globalCompositeOperation": "source-over",
			"skewX": 0,
			"skewY": 0,
			"cropX": 0,
			"cropY": 0,
			"id": "workarea",
			"name": "",
			"file": {
				"uid": "rc-upload-1657180189615-2"
			},
			"src": "https://hrw.hstatic.net/35/200001188373/57eadded8f5c46899224dd6b9b01493c.jpg",
			"link": {},
			"tooltip": {
				"enabled": false
			},
			"layout": "fixed",
			"workareaWidth": 600,
			"workareaHeight": 450,
			"crossOrigin": null,
			"filters": []
		},
		{
			"type": "textbox",
			"version": "4.6.0",
			"originX": "left",
			"originY": "top",
			"left": 409.59,
			"top": 226.44,
			"width": 150,
			"height": 27.12,
			"fill": "rgb(0,0,0)",
			"stroke": "rgba(255, 255, 255, 0)",
			"strokeWidth": 1,
			"strokeDashArray": null,
			"strokeLineCap": "butt",
			"strokeDashOffset": 0,
			"strokeLineJoin": "miter",
			"strokeUniform": true,
			"strokeMiterLimit": 4,
			"scaleX": 1,
			"scaleY": 1,
			"angle": 0,
			"flipX": false,
			"flipY": false,
			"opacity": 1,
			"shadow": null,
			"visible": true,
			"backgroundColor": "",
			"fillRule": "nonzero",
			"paintFirst": "fill",
			"globalCompositeOperation": "source-over",
			"skewX": 0,
			"skewY": 0,
			"fontFamily": "Times New Roman",
			"fontWeight": "normal",
			"fontSize": 24,
			"text": "Tên nhân viên",
			"underline": false,
			"overline": false,
			"linethrough": false,
			"textAlign": "left",
			"fontStyle": "normal",
			"lineHeight": 1.16,
			"textBackgroundColor": "",
			"charSpacing": 0,
			"styles": {},
			"direction": "ltr",
			"path": null,
			"pathStartOffset": 0,
			"pathSide": "left",
			"minWidth": 20,
			"splitByGrapheme": false,
			"id": "e597df1f-5d6c-4392-9597-c787db388e72",
			"name": "name",
			"link": {
				"enabled": false,
				"type": "resource",
				"state": "new",
				"dashboard": {}
			},
			"tooltip": {
				"enabled": true,
				"type": "resource",
				"template": "<div>{{message.name}}</div>"
			},
			"animation": {
				"type": "none",
				"loop": true,
				"autoplay": true,
				"duration": 1000
			},
			"userProperty": {},
			"trigger": {
				"enabled": false,
				"type": "alarm",
				"script": "return message.value > 0;",
				"effect": "style"
			},
			"editable": true
		},
		{
			"type": "textbox",
			"version": "4.6.0",
			"originX": "left",
			"originY": "top",
			"left": 284.48,
			"top": 354.16,
			"width": 160,
			"height": 27.12,
			"fill": "rgb(0,0,0)",
			"stroke": "rgba(255, 255, 255, 0)",
			"strokeWidth": 1,
			"strokeDashArray": null,
			"strokeLineCap": "butt",
			"strokeDashOffset": 0,
			"strokeLineJoin": "miter",
			"strokeUniform": true,
			"strokeMiterLimit": 4,
			"scaleX": 1,
			"scaleY": 1,
			"angle": 0,
			"flipX": false,
			"flipY": false,
			"opacity": 1,
			"shadow": null,
			"visible": true,
			"backgroundColor": "",
			"fillRule": "nonzero",
			"paintFirst": "fill",
			"globalCompositeOperation": "source-over",
			"skewX": 0,
			"skewY": 0,
			"fontFamily": "Times New Roman",
			"fontWeight": "normal",
			"fontSize": 24,
			"text": "Vị trí công việc",
			"underline": false,
			"overline": false,
			"linethrough": false,
			"textAlign": "left",
			"fontStyle": "normal",
			"lineHeight": 1.16,
			"textBackgroundColor": "",
			"charSpacing": 0,
			"styles": {},
			"direction": "ltr",
			"path": null,
			"pathStartOffset": 0,
			"pathSide": "left",
			"minWidth": 20,
			"splitByGrapheme": false,
			"id": "07630590-45d7-45fb-b935-5edf0614de82",
			"name": "position",
			"link": {
				"enabled": false,
				"type": "resource",
				"state": "new",
				"dashboard": {}
			},
			"tooltip": {
				"enabled": true,
				"type": "resource",
				"template": "<div>{{message.name}}</div>"
			},
			"animation": {
				"type": "none",
				"loop": true,
				"autoplay": true,
				"duration": 1000
			},
			"userProperty": {},
			"trigger": {
				"enabled": false,
				"type": "alarm",
				"script": "return message.value > 0;",
				"effect": "style"
			},
			"editable": true
		}
	],
	"animations": [],
	"styles": [],
	"dataSources": [],
	"viewUser": [
		{
			"id": "background",
			"file": {
				"uid": "rc-upload-1657180189615-2"
			},
			"width": 600,
			"height": 450
		},
		{
			"x": 224.5,
			"y": 200.6,
			"color": "rgb(0,0,0)",
			"id": "name",
			"stroke": "rgba(255, 255, 255, 0)",
			"fontSize": 24,
			"fontWeight": "normal",
			"fontFamily": "Times New Roman",
			"fontStyle": "normal",
			"lineHeight": 1.16,
			"text": "Tên nhân viên",
			"charSpacing": 0,
			"textAlign": "left",
			"styles": {},
			"path": null,
			"pathStartOffset": 0,
			"pathSide": "left",
			"width": 150,
			"opacity": 1,
			"rotate": 0,
			"height": 27.119999999999994
		},
		{
			"x": 99.38541270557039,
			"y": 328.31503319155,
			"color": "rgb(0,0,0)",
			"id": "position",
			"stroke": "rgba(255, 255, 255, 0)",
			"fontSize": 24,
			"fontWeight": "normal",
			"fontFamily": "Times New Roman",
			"fontStyle": "normal",
			"lineHeight": 1.16,
			"text": "Vị trí công việc",
			"charSpacing": 0,
			"textAlign": "left",
			"styles": {},
			"path": null,
			"pathStartOffset": 0,
			"pathSide": "left",
			"width": 160,
			"opacity": 1,
			"rotate": 0,
			"height": 27.119999999999994
		}
	]
}