import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import Tab from '../Tab/Tab';
import LEDstrip from '../LEDstrip/LEDstrip';
import './Main.css';

class TabInfo{
	constructor(name, selected=false){
		this.name = name;
		this.selected = selected
	}
}

class MainPage extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			tabs: [],
		}
		
		this.tabClicked = this.tabClicked.bind(this);
	}
	genTab(tabName, id){
		return new TabInfo(tabName, id === this.props.selectedUrl);
	}
	componentWillMount() {
		let tabs = [];
		tabs = [	this.genTab('LEDs', 				0),
					// this.genTab('Irrigation', 	1),
					// this.genTab('Nila & Pack', 	2)
				 ];
		this.setState({tabs});
   }
   componentDidMount(){
   	window.scrollTo(0, 0);
   }
   tabClicked(id){
   	const tabs = this.state.tabs;
   	tabs.forEach(tab=>{tab.selected = false;});
   	tabs[id].selected = true;
   	this.setState({tabs});
   	
   	const tabName = this.props.urls[id];
   	this.loadTabUrl(tabName);
   }
   loadTabUrl(tabName){
		if (!!window.hist)
		{
			window.hist.push('/' + tabName.replace(' ', ''));
		}
	}
	onRouteChangeBD(){
		console.log('ROUTE CHANGED!!!');
	}
	updateTabs(){
		this.state.tabs.forEach( (tab,id) => {
			tab.selected = (id === this.props.selectedUrl);
		});
	}

	render(){
		this.updateTabs();
		
		return (
		<div>
			<Tab id="MainTab"
				  tabs={this.state.tabs}
				  onClick={this.tabClicked}
			/>
			<div id="BigSeparator">
			</div>
			<div className="MainContent">
				<Switch onChange={this.onRouteChangeBD}>
					<Route exact path='/' 				onChange={this.onRouteChangeBD}	component={LEDstrip}/>
					<Route exact path='/LEDstrip' 	onChange={this.onRonRouteChangeBDouteChange}	component={LEDstrip}/>
				</Switch>
			</div>
		</div>
		);
	}
}

export default MainPage;


