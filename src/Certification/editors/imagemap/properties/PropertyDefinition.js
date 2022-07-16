import MarkerProperty from './MarkerProperty';
import GeneralProperty from './GeneralProperty';
import StyleProperty from './StyleProperty';
import TooltipProperty from './TooltipProperty';
import ImageProperty from './ImageProperty';
import TextProperty from './TextProperty';
import MapProperty from './MapProperty';
import LinkProperty from './LinkProperty';
import VideoProperty from './VideoProperty';
import ElementProperty from './ElementProperty';
import IframeProperty from './IframeProperty';
import AnimationProperty from './AnimationProperty';
import ShadowProperty from './ShadowProperty';
import UserProperty from './UserProperty';
import TriggerProperty from './TriggerProperty';
import ImageFilterProperty from './ImageFilterProperty';
import ChartProperty from './ChartProperty';

export default {
	map: {
		image: {
			title: 'Ảnh nền giấy chứng nhận',
			component: ImageProperty,
		},
	},
	group: {
		
	},
	'i-text': {
		
		style: {
			title: 'Style',
			component: StyleProperty,
		},
		
	},
	textbox: {
	
		text: {
			title: 'Font Chữ',
			component: TextProperty,
		},
		style: {
			title: 'Màu sắc',
			component: StyleProperty,
		},
		
	},
	image: {
		image: {
			title: 'Cập nhật hình ảnh chọn',
			component: ImageProperty,
		},
	},
	triangle: {
		style: {
			title: 'Style',
			component: StyleProperty,
		},
	},
	rect: {
		style: {
			title: 'Style',
			component: StyleProperty,
		},
	},
	circle: {
		style: {
			title: 'Style',
			component: StyleProperty,
		},
	},
	polygon: {
		general: {
			title: 'General',
			component: GeneralProperty,
		},
		link: {
			title: 'Link',
			component: LinkProperty,
		},
		tooltip: {
			title: 'Tooltip',
			component: TooltipProperty,
		},
		style: {
			title: 'Style',
			component: StyleProperty,
		},
		shadow: {
			title: 'Shadow',
			component: ShadowProperty,
		},
		animation: {
			title: 'Animation',
			component: AnimationProperty,
		},
		trigger: {
			title: 'Trigger',
			component: TriggerProperty,
		},
		userProperty: {
			title: 'User Property',
			component: UserProperty,
		},
	},
	line: {
		general: {
			title: 'General',
			component: GeneralProperty,
		},
		link: {
			title: 'Link',
			component: LinkProperty,
		},
		tooltip: {
			title: 'Tooltip',
			component: TooltipProperty,
		},
		style: {
			title: 'Style',
			component: StyleProperty,
		},
		shadow: {
			title: 'Shadow',
			component: ShadowProperty,
		},
		animation: {
			title: 'Animation',
			component: AnimationProperty,
		},
		trigger: {
			title: 'Trigger',
			component: TriggerProperty,
		},
		userProperty: {
			title: 'User Property',
			component: UserProperty,
		},
	},
	arrow: {
		general: {
			title: 'General',
			component: GeneralProperty,
		},
		link: {
			title: 'Link',
			component: LinkProperty,
		},
		tooltip: {
			title: 'Tooltip',
			component: TooltipProperty,
		},
		style: {
			title: 'Style',
			component: StyleProperty,
		},
		shadow: {
			title: 'Shadow',
			component: ShadowProperty,
		},
		animation: {
			title: 'Animation',
			component: AnimationProperty,
		},
		trigger: {
			title: 'Trigger',
			component: TriggerProperty,
		},
		userProperty: {
			title: 'User Property',
			component: UserProperty,
		},
	},
	video: {
		general: {
			title: 'General',
			component: GeneralProperty,
		},
		video: {
			title: 'Video',
			component: VideoProperty,
		},
	},
	element: {
		general: {
			title: 'General',
			component: GeneralProperty,
		},
		video: {
			title: 'Element',
			component: ElementProperty,
		},
	},
	iframe: {
		general: {
			title: 'General',
			component: GeneralProperty,
		},
		video: {
			title: 'Iframe',
			component: IframeProperty,
		},
	},
	svg: {
		general: {
			title: 'General',
			component: GeneralProperty,
		},
		link: {
			title: 'Link',
			component: LinkProperty,
		},
		tooltip: {
			title: 'Tooltip',
			component: TooltipProperty,
		},
		style: {
			title: 'Style',
			component: StyleProperty,
		},
		shadow: {
			title: 'Shadow',
			component: ShadowProperty,
		},
		animation: {
			title: 'Animation',
			component: AnimationProperty,
		},
		trigger: {
			title: 'Trigger',
			component: TriggerProperty,
		},
		userProperty: {
			title: 'User Property',
			component: UserProperty,
		},
	},
	chart: {
		general: {
			title: 'General',
			component: GeneralProperty,
		},
		chartOption: {
			title: 'Chart Option',
			component: ChartProperty,
		},
	},
};
