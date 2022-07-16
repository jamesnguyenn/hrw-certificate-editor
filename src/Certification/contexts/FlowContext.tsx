import React from 'react';

import { NodeObject } from '../canvas/objects/Node';

export interface IFlowContext {
	selectedFlowNode: NodeObject | null;
	setSelectedFlowNode: (selectedFlowNode: any) => void;
}

const FlowContext = React.createContext<any>(undefined);

export default FlowContext;
