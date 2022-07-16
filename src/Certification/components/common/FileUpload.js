import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon } from 'antd';

const { Dragger } = Upload;

class FileUpload extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		limit: PropTypes.number,
		accept: PropTypes.string,
		isBackgroundImage: PropTypes.bool,
	};

	static defaultProps = {
		limit: 30,
		isBackgroundImage:true,
	};

	state = {
		fileList: this.props.value ? [this.props.value] : [],
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			fileList: nextProps.value ? [nextProps.value] : [],
		});
	}

	render() {
		const { accept, limit,isBackgroundImage } = this.props;
        console.log("🚀 ~ isBackgroundImage", isBackgroundImage)
		const { fileList } = this.state;
		const props = {
			accept,
			name: 'file',
			multiple: false,
			onChange: info => {
            console.log("🚀 ~ info", info)
            console.log("🚀 ~ info", info.file)
				const isLimit = info.file.size / 1024 / 1024 < limit;
				if (!isLimit) {
					message.error(`Limited to ${limit}MB or less`);
					return false;
				}
				const { onChange } = this.props;
				onChange(info.file);
                console.log("🚀 ~ onChange", onChange)
			},
			onRemove: file => {
				this.setState(
					({ fileList }) => {
						const index = fileList.indexOf(file);
						const newFileList = fileList.slice();
						newFileList.splice(index, 1);
						return {
							fileList: newFileList,
						};
					},
					() => {
						const { onChange } = this.props;
						onChange(null);
					},
				);
			},
			beforeUpload: file => {
				const isLimit = file.size / 1024 / 1024 < limit;
				if (!isLimit) {
					return false;
				}
				this.setState({
					fileList: [file],
				});
				return false;
			},
			fileList,
		};
		return (
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<Icon type="inbox" />
				</p>
				<p className="ant-upload-text">Kéo thả file hoặc Chọn file từ máy tính</p>
				<p className="ant-upload-hint">{isBackgroundImage?`Chọn ảnh nền (600x450px)` : ''}</p>
			</Dragger>
		);
	}
}

export default FileUpload;
