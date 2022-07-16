import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tooltip } from 'antd';
import classnames from 'classnames';

import NodeProperties from './properties/NodeProperties';
import MapProperties from './properties/MapProperties';
import Animations from './animations/Animations';
import Styles from './styles/Styles';
import DataSources from './datasources/DataSources';
import Icon from '../../components/icon/Icon';
import CommonButton from '../../components/common/CommonButton';

class ImageMapConfigurations extends Component {
	static propTypes = {
		canvasRef: PropTypes.any,
		selectedItem: PropTypes.object,
		onChange: PropTypes.func,
		onChangeAnimations: PropTypes.func,
		onChangeStyles: PropTypes.func,
		onChangeDataSources: PropTypes.func,
		animations: PropTypes.array,
		styles: PropTypes.array,
		dataSources: PropTypes.array,
		onEdit: PropTypes.func,
	};

	state = {
		activeKey: 'map',
	};

	handlers = {
		onChangeTab: activeKey => {
			this.setState({
				activeKey,
			});
		},
		onCollapse: () => {
			this.setState({
				collapse: !this.state.collapse,
			});
		},
	};

	render() {
		const {
			onChange,
			selectedItem,
			canvasRef,
			animations,
			styles,
			dataSources,
			onChangeAnimations,
			onChangeStyles,
			onChangeDataSources,
			onEdit,
		} = this.props;
		const { collapse, activeKey } = this.state;
		const { onChangeTab, onCollapse } = this.handlers;
		const className = classnames('rde-editor-configurations', {
			minimize: collapse,
		});
		return (
			<div className={className}>
				<CommonButton
					className="rde-action-btn"
					shape="circle"
					icon={collapse ? 'angle-double-left' : 'angle-double-right'}
					onClick={onCollapse}
					style={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}
				/>
				<Tabs
					tabPosition="right"
					style={{ height: '100%' }}
					activeKey={activeKey}
					onChange={onChangeTab}
					tabBarStyle={{ marginTop: 60 }}
				>
				
					<Tabs.TabPane tab={<Tooltip title={'Ảnh nền'} overlayStyle={{ fontSize: 16 }}><Icon prefix='fa' name="image" /> </Tooltip>} key="map">
						<MapProperties onChange={onChange} canvasRef={canvasRef} onEdit={onEdit}/>
					</Tabs.TabPane>
					<Tabs.TabPane tab={<Tooltip title={'Chỉnh sửa'} overlayStyle={{ fontSize: 16 }}><Icon prefix='fa' name="paint-brush" /> </Tooltip>} key="node">
						<NodeProperties onChange={onChange} selectedItem={selectedItem} canvasRef={canvasRef} />
					</Tabs.TabPane>
			
					{/* <Tabs.TabPane tab={<Icon name="cogs" />} key="node">
						<NodeProperties onChange={onChange} selectedItem={selectedItem} canvasRef={canvasRef} />
					</Tabs.TabPane>
					<Tabs.TabPane tab={<Icon name="vine" prefix="fab" />} key="animations">
						<Animations animations={animations} onChangeAnimations={onChangeAnimations} />
					</Tabs.TabPane>
					<Tabs.TabPane tab={<Icon name="star-half-alt" />} key="styles">
						<Styles styles={styles} onChangeStyles={onChangeStyles} />
					</Tabs.TabPane> */}
					{/* <Tabs.TabPane tab={<Icon name="table" />} key="datasources">
                        <DataSources ref={(c) => { this.dataSourcesRef = c; }} dataSources={dataSources} onChangeDataSources={onChangeDataSources} />
                    </Tabs.TabPane> */}
				</Tabs>
			</div>
		);
	}
}

export default ImageMapConfigurations;
