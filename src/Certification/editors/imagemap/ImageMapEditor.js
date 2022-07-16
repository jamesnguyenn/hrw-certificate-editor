import { Badge, Button, Menu, Popconfirm } from 'antd';
import i18n from 'i18next';
import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import Canvas from '../../canvas/Canvas';
import CommonButton from '../../components/common/CommonButton';
import { Content } from '../../components/layout';
import SandBox from '../../components/sandbox/SandBox';
import '../../libs/fontawesome-5.2.0/css/all.css';
import '../../styles/index.less';
import ImageMapConfigurations from './ImageMapConfigurations';
import ImageMapFooterToolbar from './ImageMapFooterToolbar';
import ImageMapHeaderToolbar from './ImageMapHeaderToolbar';
import ImageMapItems from './ImageMapItems';
import ImageMapPreview from './ImageMapPreview';
import ImageMapTitle from './ImageMapTitle';

const propertiesToInclude = [
	'id',
	'name',
	'locked',
	'file',
	'src',
	'link',
	'tooltip',
	'animation',
	'layout',
	'workareaWidth',
	'workareaHeight',
	'videoLoadType',
	'autoplay',
	'shadow',
	'muted',
	'loop',
	'code',
	'icon',
	'userProperty',
	'trigger',
	'configuration',
	'superType',
	'points',
	'svg',
	'loadType',
];

const defaultOption = {
	stroke: 'rgba(255, 255, 255, 0)',
	strokeUniform: true,
	resource: {},
	link: {
		enabled: false,
		type: 'resource',
		state: 'new',
		dashboard: {},
	},
	tooltip: {
		enabled: true,
		type: 'resource',
		template: '<div>{{message.name}}</div>',
	},
	animation: {
		type: 'none',
		loop: true,
		autoplay: true,
		duration: 1000,
	},
	userProperty: {},
	trigger: {
		enabled: false,
		type: 'alarm',
		script: 'return message.value > 0;',
		effect: 'style',
	},
};

const data = [{charSpacing: 0,
	color: "rgb(0,0,0)",
	fontFamily: "Times New Roman",
	fontSize: 24,
	fontStyle: "normal",
	fontWeight: "normal",
	height: 27.119999999999994,
	id: "name",
	lineHeight: 1.16,
	opacity: 1,
	path: null,
	pathSide: "left",
	pathStartOffset: 0,
	rotate: 0,
	stroke: "rgba(255, 255, 255, 0)",
	styles: {},
	text: "Tên nhân viên",
	textAlign: "left",
	width: 150,
	x: 224.5,
	y: 203.94484506350898}]

class ImageMapEditor extends Component {
	state = {
		selectedItem: null,
		zoomRatio: 1,
		preview: false,
		loading: false,
		progress: 0,
		animations: [],
		styles: [],
		dataSources: [],
		editing: false,
		descriptors: {},
		objects: undefined,
	};

	componentDidMount() {
		this.showLoading(true);
		import('./Descriptors.json').then(descriptors => {
			this.setState(
				{
					descriptors,
				},
				() => {
					this.showLoading(false);
				},
			);
		});
		this.setState({
			selectedItem: null,
		});	
	}

	canvasHandlers = {
		onAdd: target => {
			const { editing } = this.state;
			this.forceUpdate();
			if (!editing) {
				this.changeEditing(true);
			}
			if (target.type === 'activeSelection') {
				this.canvasHandlers.onSelect(null);
				return;
			}
			this.canvasRef.handler.select(target);
		},
		onSelect: target => {
 
			const { selectedItem } = this.state;
			if (target && target.id && target.id !== 'workarea' && target.type !== 'activeSelection') {
				if (selectedItem && target.id === selectedItem.id) {
					return;
				}
				this.canvasRef.handler.getObjects().forEach(obj => {
					if (obj) {
						this.canvasRef.handler.animationHandler.resetAnimation(obj, true);
					}
				});
				this.setState({
					selectedItem: target,
				});
				return;
			}
			this.canvasRef.handler.getObjects().forEach(obj => {
				if (obj) {
					this.canvasRef.handler.animationHandler.resetAnimation(obj, true);
				}
			});
			this.setState({
				selectedItem: null,
			});
		},
		onRemove: () => {
			const { editing } = this.state;
			if (!editing) {
				this.changeEditing(true);
			}
			this.canvasHandlers.onSelect(null);
		},
		onModified: debounce(() => {
			const { editing } = this.state;
			this.forceUpdate();
			if (!editing) {
				this.changeEditing(true);
			}
		}, 300),
		onZoom: zoom => {
			this.setState({
				zoomRatio: zoom,
			});
		},
		onChange: (selectedItem, changedValues, allValues) => {
			const { editing } = this.state;
			if (!editing) {
				this.changeEditing(true);
			}
			const changedKey = Object.keys(changedValues)[0];
			const changedValue = changedValues[changedKey];
			if (allValues.workarea) {
				this.canvasHandlers.onChangeWokarea(changedKey, changedValue, allValues.workarea);
				return;
			}
			if (changedKey === 'width' || changedKey === 'height') {
				this.canvasRef.handler.scaleToResize(allValues.width, allValues.height);
				return;
			}
			if (changedKey === 'angle') {
				this.canvasRef.handler.rotate(allValues.angle);
				return;
			}
			if (changedKey === 'locked') {
				this.canvasRef.handler.setObject({
					lockMovementX: changedValue,
					lockMovementY: changedValue,
					hasControls: !changedValue,
					hoverCursor: changedValue ? 'pointer' : 'move',
					editable: !changedValue,
					locked: changedValue,
				});
				return;
			}
			if (changedKey === 'file' || changedKey === 'src' || changedKey === 'code') {
				if (selectedItem.type === 'image') {
					this.canvasRef.handler.setImageById(selectedItem.id, changedValue);
				} else if (selectedItem.superType === 'element') {
					this.canvasRef.handler.elementHandler.setById(selectedItem.id, changedValue);
				}
				return;
			}
			if (changedKey === 'link') {
				const link = Object.assign({}, defaultOption.link, allValues.link);
				this.canvasRef.handler.set(changedKey, link);
				return;
			}
			if (changedKey === 'tooltip') {
				const tooltip = Object.assign({}, defaultOption.tooltip, allValues.tooltip);
				this.canvasRef.handler.set(changedKey, tooltip);
				return;
			}
			if (changedKey === 'animation') {
				const animation = Object.assign({}, defaultOption.animation, allValues.animation);
				this.canvasRef.handler.set(changedKey, animation);
				return;
			}
			if (changedKey === 'icon') {
				const { unicode, styles } = changedValue[Object.keys(changedValue)[0]];
				const uni = parseInt(unicode, 16);
				if (styles[0] === 'brands') {
					this.canvasRef.handler.set('fontFamily', 'Font Awesome 5 Brands');
				} else if (styles[0] === 'regular') {
					this.canvasRef.handler.set('fontFamily', 'Font Awesome 5 Regular');
				} else {
					this.canvasRef.handler.set('fontFamily', 'Font Awesome 5 Free');
				}
				this.canvasRef.handler.set('text', String.fromCodePoint(uni));
				this.canvasRef.handler.set('icon', changedValue);
				return;
			}
			if (changedKey === 'shadow') {
				if (allValues.shadow.enabled) {
					if ('blur' in allValues.shadow) {
						this.canvasRef.handler.setShadow(allValues.shadow);
					} else {
						this.canvasRef.handler.setShadow({
							enabled: true,
							blur: 15,
							offsetX: 10,
							offsetY: 10,
						});
					}
				} else {
					this.canvasRef.handler.setShadow(null);
				}
				return;
			}
			if (changedKey === 'fontWeight') {
				this.canvasRef.handler.set(changedKey, changedValue ? 'bold' : 'normal');
				return;
			}
			if (changedKey === 'fontStyle') {
				this.canvasRef.handler.set(changedKey, changedValue ? 'italic' : 'normal');
				return;
			}
			if (changedKey === 'textAlign') {
				this.canvasRef.handler.set(changedKey, Object.keys(changedValue)[0]);
				return;
			}
			if (changedKey === 'trigger') {
				const trigger = Object.assign({}, defaultOption.trigger, allValues.trigger);
				this.canvasRef.handler.set(changedKey, trigger);
				return;
			}
			if (changedKey === 'filters') {
				const filterKey = Object.keys(changedValue)[0];
				const filterValue = allValues.filters[filterKey];
				if (filterKey === 'gamma') {
					const rgb = [filterValue.r, filterValue.g, filterValue.b];
					this.canvasRef.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						gamma: rgb,
					});
					return;
				}
				if (filterKey === 'brightness') {
					this.canvasRef.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						brightness: filterValue.brightness,
					});
					return;
				}
				if (filterKey === 'contrast') {
					this.canvasRef.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						contrast: filterValue.contrast,
					});
					return;
				}
				if (filterKey === 'saturation') {
					this.canvasRef.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						saturation: filterValue.saturation,
					});
					return;
				}
				if (filterKey === 'hue') {
					this.canvasRef.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						rotation: filterValue.rotation,
					});
					return;
				}
				if (filterKey === 'noise') {
					this.canvasRef.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						noise: filterValue.noise,
					});
					return;
				}
				if (filterKey === 'pixelate') {
					this.canvasRef.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						blocksize: filterValue.blocksize,
					});
					return;
				}
				if (filterKey === 'blur') {
					this.canvasRef.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						value: filterValue.value,
					});
					return;
				}
				this.canvasRef.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey]);
				return;
			}
			if (changedKey === 'chartOption') {
				try {
					const sandbox = new SandBox();
					const compiled = sandbox.compile(changedValue);
					const { animations, styles } = this.state;
					const chartOption = compiled(3, animations, styles, selectedItem.userProperty);
					selectedItem.setChartOptionStr(changedValue);
					this.canvasRef.handler.elementHandler.setById(selectedItem.id, chartOption);
				} catch (error) {
					console.error(error);
				}
				return;
			}
			console.log(changedKey)
			console.log(changedValues)
			console.log(allValues)
			this.canvasRef.handler.set(changedKey, changedValue);
		},
		onChangeWokarea: (changedKey, changedValue, allValues) => {
			if (changedKey === 'layout') {
				this.canvasRef.handler.workareaHandler.setLayout(changedValue);
				return;
			}
			if (changedKey === 'file' || changedKey === 'src') {
				this.canvasRef.handler.workareaHandler.setImage(changedValue);
				return;
			}
			if (changedKey === 'width' || changedKey === 'height') {
				this.canvasRef.handler.originScaleToResize(
					this.canvasRef.handler.workarea,
					allValues.width,
					allValues.height,
				);
				this.canvasRef.canvas.centerObject(this.canvasRef.handler.workarea);
				return;
			}
			this.canvasRef.handler.workarea.set(changedKey, changedValue);
			this.canvasRef.canvas.requestRenderAll();
		},
		onTooltip: (ref, target) => {
			const value = Math.random() * 10 + 1;
			const { animations, styles } = this.state;
			// const { code } = target.trigger;
			// const compile = SandBox.compile(code);
			// const result = compile(value, animations, styles, target.userProperty);
			// console.log(result);
			return (
				<div>
					<div>
						<div>
							<Button>{target.id}</Button>
						</div>
						<Badge count={value} />
					</div>
				</div>
			);
		},
		onClick: (canvas, target) => {
			const { link } = target;
			if (link.state === 'current') {
				document.location.href = link.url;
				return;
			}
			window.open(link.url);
		},
		onContext: (ref, event, target) => {
			if ((target && target.id === 'workarea') || !target) {
				const { layerX: left, layerY: top } = event;
				return (
					<Menu>
						<Menu.SubMenu key="add" style={{ width: 120 }} title={i18n.t('action.add')}>
							{this.transformList().map(item => {
								const option = Object.assign({}, item.option, { left, top });
								const newItem = Object.assign({}, item, { option });
								return (
									<Menu.Item style={{ padding: 0 }} key={item.name}>
										{this.itemsRef.renderItem(newItem, false)}
									</Menu.Item>
								);
							})}
						</Menu.SubMenu>
					</Menu>
				);
			}
			if (target.type === 'activeSelection') {
				return (
					<Menu>
						<Menu.Item
							onClick={() => {
								this.canvasRef.handler.toGroup();
							}}
						>
							{i18n.t('action.object-group')}
						</Menu.Item>
						<Menu.Item
							onClick={() => {
								this.canvasRef.handler.duplicate();
							}}
						>
							{i18n.t('action.clone')}
						</Menu.Item>
						<Menu.Item
							onClick={() => {
								this.canvasRef.handler.remove();
							}}
						>
							{i18n.t('action.delete')}
						</Menu.Item>
					</Menu>
				);
			}
			if (target.type === 'group') {
				return (
					<Menu>
						<Menu.Item
							onClick={() => {
								this.canvasRef.handler.toActiveSelection();
							}}
						>
							{i18n.t('action.object-ungroup')}
						</Menu.Item>
						<Menu.Item
							onClick={() => {
								this.canvasRef.handler.duplicate();
							}}
						>
							{i18n.t('action.clone')}
						</Menu.Item>
						<Menu.Item
							onClick={() => {
								this.canvasRef.handler.remove();
							}}
						>
							{i18n.t('action.delete')}
						</Menu.Item>
					</Menu>
				);
			}
			return (
				<Menu>
					<Menu.Item
						onClick={() => {
							this.canvasRef.handler.duplicateById(target.id);
						}}
					>
						{i18n.t('action.clone')}
					</Menu.Item>
					<Menu.Item
						onClick={() => {
							this.canvasRef.handler.removeById(target.id);
						}}
					>
						{i18n.t('action.delete')}
					</Menu.Item>
				</Menu>
			);
		},
		onTransaction: transaction => {
			this.forceUpdate();
		},
	};

	handlers = {
		onChangePreview: checked => {
			let data;
			if (this.canvasRef) {
				data = this.canvasRef.handler.exportJSON().filter(obj => {
					if (!obj.id) {
						return false;
					}
					return true;
				});
			}
			this.setState({
				preview: typeof checked === 'object' ? false : checked,
				objects: data,
			});
		},
		onProgress: progress => {
			this.setState({
				progress,
			});
		},
		onImport: files => {
			if (files) {
				this.showLoading(true);
				setTimeout(() => {
					const reader = new FileReader();
					reader.onprogress = e => {
						if (e.lengthComputable) {
							const progress = parseInt((e.loaded / e.total) * 100, 10);
							this.handlers.onProgress(progress);
						}
					};
					reader.onload = e => {
						const { objects, animations, styles, dataSources } = JSON.parse(e.target.result);
						this.setState({
							animations,
							styles,
							dataSources,
						});
						if (objects) {
							this.canvasRef.handler.clear(true);
							const data = objects.filter(obj => {
								if (!obj.id) {
									return false;
								}
								return true;
							});
							this.canvasRef.handler.importJSON(data);
						}
					};
					reader.onloadend = () => {
						this.showLoading(false);
					};
					reader.onerror = () => {
						this.showLoading(false);
					};
					reader.readAsText(files[0]);
				}, 500);
			}
		},
		onUpload: () => {
			const inputEl = document.createElement('input');
			inputEl.accept = '.json';
			inputEl.type = 'file';
			inputEl.hidden = true;
			inputEl.onchange = e => {
				console.log(e.target.files)
				this.handlers.onImport(e.target.files);
			};
			document.body.appendChild(inputEl); // required for firefox
			inputEl.click();
			inputEl.remove();
		},
		onSaveJSON: () => {
			const objects = this.canvasRef.handler.exportJSON().filter(obj => {
				if (!obj.id) {
					return false;
				}
				return true;
			});
			const { animations, styles, dataSources } = this.state;
			const exportDatas = {
				objects,
				animations,
				styles,
				dataSources,
			};
		},
		onEdit: (data = dataJSON) => {
			const jsn = JSON.stringify(data);
			const file = new File([jsn], 'test.json', {type: 'application/json'});
			const dt = new DataTransfer();
			dt.items.add(file);
			const file_list = dt.files
			this.handlers.onImport(file_list);
		},
		onDownload: () => {
			this.showLoading(true);
			const objects = this.canvasRef.handler.exportJSON().filter(obj => {
				if (!obj.id) {
					return false;
				}
				return true;
			});
			objects[0].src = "https://hrw.hstatic.net/35/200001188373/57eadded8f5c46899224dd6b9b01493c.jpg"
			const dataViewUser = this.canvasRef?.canvas._objects.map((item,index)=>{
				if(index===0){
					return {
						id: 'background',
						file: item.file,
						width: item.width, 
						height: item.height
					}
				} else{
					return{x: item?.left - this.canvasRef?.canvas._objects[0].left, y: item?.top - this.canvasRef?.canvas._objects[0]?.top, color: item.fill, id:item.name, stroke:item.stroke,  ...item.__dimensionAffectingProps, opacity: item.opacity, rotate: item.rotation, height: item.height}
				}
			})
			const { animations, styles, dataSources } = this.state;
			const exportDatas = {
				objects,
				animations,
				styles,
				dataSources,
				viewUser: dataViewUser,
			};
			const anchorEl = document.createElement('a');
			anchorEl.href = `data:text/json;charset=utf-8,${encodeURIComponent(
				JSON.stringify(exportDatas, null, '\t'),
			)}`;
			anchorEl.download = `${this.canvasRef.handler.workarea.name || 'sample'}.json`;
			document.body.appendChild(anchorEl); // required for firefox
			anchorEl.click();
			anchorEl.remove();
			this.showLoading(false);
		},
		onChangeAnimations: animations => {
			if (!this.state.editing) {
				this.changeEditing(true);
			}
			this.setState({
				animations,
			});
		},
		onChangeStyles: styles => {
			if (!this.state.editing) {
				this.changeEditing(true);
			}
			this.setState({
				styles,
			});
		},
		onChangeDataSources: dataSources => {
			if (!this.state.editing) {
				this.changeEditing(true);
			}
			this.setState({
				dataSources,
			});
		},
		onSaveImage: () => {
			this.canvasRef.handler.saveCanvasImage();
		},
	};

	transformList = () => {
		return Object.values(this.state.descriptors).reduce((prev, curr) => prev.concat(curr), []);
	};

	showLoading = loading => {
		this.setState({
			loading,
		});
	};

	changeEditing = editing => {
		this.setState({
			editing,
		});
	};

	render() {
		const {
			preview,
			selectedItem,
			zoomRatio,
			loading,
			progress,
			animations,
			styles,
			dataSources,
			editing,
			descriptors,
			objects,
		} = this.state;
		const {
			onAdd,
			onRemove,
			onSelect,
			onModified,
			onChange,
			onZoom,
			onTooltip,
			onClick,
			onContext,
			onTransaction,
		} = this.canvasHandlers;
		const {
			onChangePreview,
			onDownload,
			onUpload,
			onChangeAnimations,
			onChangeStyles,
			onChangeDataSources,
			onSaveImage,
		} = this.handlers;
		const action = (
			<React.Fragment>
				{/* <CommonButton
					className="rde-action-btn"
					shape="circle"
					icon="file-download"
					disabled={!editing}
					tooltipTitle={i18n.t('action.download')}
					onClick={onDownload}
					tooltipPlacement="bottomRight"
				/>
				{editing ? (
					<Popconfirm
						title={i18n.t('imagemap.imagemap-editing-confirm')}
						okText={i18n.t('action.ok')}
						cancelText={i18n.t('action.cancel')}
						onConfirm={onUpload}
						placement="bottomRight"
					>
						<CommonButton
							className="rde-action-btn"
							shape="circle"
							icon="file-upload"
							tooltipTitle={i18n.t('action.upload')}
							tooltipPlacement="bottomRight"
						/>
					</Popconfirm>
				) : (
					<CommonButton
						className="rde-action-btn"
						shape="circle"
						icon="file-upload"
						tooltipTitle={i18n.t('action.upload')}
						tooltipPlacement="bottomRight"
						onClick={onUpload}
					/>
				)} */}
				<CommonButton
					className="rde-action-btn"
					shape="circle"
					icon="file-download"
					disabled={!editing}
					tooltipTitle={'Download file JSON Test'}
					onClick={onDownload}
					tooltipPlacement="bottomRight"
				/>
				<CommonButton
					className="rde-action-btn"
					shape="circle"
					icon="file-download"
					tooltipTitle={'Tải chứng nhận'}
					onClick={onSaveImage}
					tooltipPlacement="bottomRight"
				/>
			</React.Fragment>
		);
		const titleContent = (
			<React.Fragment>
				<span>{i18n.t('imagemap.imagemap-editor')}</span>
			</React.Fragment>
		);
		const title = <ImageMapTitle title={titleContent} action={action} />;
		const content = (
			<div className="rde-editor">
				<ImageMapItems
					ref={c => {
						this.itemsRef = c;
					}}
					canvasRef={this.canvasRef}
					descriptors={descriptors}
				/>
				<div className="rde-editor-canvas-container">
					<div className="rde-editor-header-toolbar">
						<ImageMapHeaderToolbar
							canvasRef={this.canvasRef}
							selectedItem={selectedItem}
							onSelect={onSelect}
						/>
					</div>
					<div
						ref={c => {
							this.container = c;
						}}
						className="rde-editor-canvas"
					>
						<Canvas
							ref={c => {
								this.canvasRef = c;
							}}
							className="rde-canvas"
							minZoom={50}
							maxZoom={100}
							objectOption={defaultOption}
							propertiesToInclude={propertiesToInclude}
							onModified={onModified}
							onAdd={onAdd}
							onRemove={onRemove}
							onSelect={onSelect}
							onZoom={onZoom}
							onTooltip={onTooltip}
							onClick={onClick}
							onContext={onContext}
							onTransaction={onTransaction}
							keyEvent={{
								transaction: true,
							}}
							canvasOption={{
								selectionColor: '#2979ff78',
							}}
						/>
					</div>
					<div className="rde-editor-footer-toolbar">
						<ImageMapFooterToolbar
							canvasRef={this.canvasRef}
							preview={preview}
							onChangePreview={onChangePreview}
							zoomRatio={zoomRatio}
						/>
					</div>
				</div>
				<ImageMapConfigurations
					canvasRef={this.canvasRef}
					onChange={onChange}
					selectedItem={selectedItem}
					onChangeAnimations={onChangeAnimations}
					onChangeStyles={onChangeStyles}
					onChangeDataSources={onChangeDataSources}
					animations={animations}
					styles={styles}
					dataSources={dataSources}
					onEdit={this.handlers.onEdit}
				/>
				<ImageMapPreview
					preview={preview}
					onChangePreview={onChangePreview}
					onTooltip={onTooltip}
					onClick={onClick}
					objects={objects}
				/>
			</div>
		);
		console.log(this.canvasRef)
		
		console.log(data);
		return <>
		<Content title={title} content={content} loading={loading} className="" />
		<div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
		<button onClick={this.handlers.onEdit} style={{display:'block', marginLeft:'auto', marginTop:'10px', border:'none', outline:'none',padding:' 8px 12px' , borderRadius:'4px',backgroundColor:'#eee', color:'#000', cursor:'pointer'}}>Chỉnh sửa</button>
		<button onClick={this.handlers.onDownload} style={{display:'block', marginTop:'10px', border:'none', outline:'none',padding:' 8px 12px' , borderRadius:'4px',backgroundColor:'#2979FF', color:'#fff', cursor:'pointer'}}>Lưu lại</button>
		</div>
		</>
	
	}
}

export default ImageMapEditor;
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