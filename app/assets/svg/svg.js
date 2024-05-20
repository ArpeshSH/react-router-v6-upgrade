const svgConfig = {
	arrows: () => import(/* webpackChunkName: "Arrows.svg" */ './Arrows.svg'),
	loader: () => import(/* webpackChunkName: "Loader.svg" */ './Loader.svg'),
	sendinblueLogo: () => import(/* webpackChunkName: "SendinblueLogo.svg" */ './SendinblueLogo.svg')
};

export default svgConfig;
