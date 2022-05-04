const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: ['./reactapp'],
	output: {
		path: path.resolve(__dirname, './tethysapp/my_react_app/public/frontend'),
		filename: '[name].js',
		publicPath: '/static/my_react_app/frontend/',
	},
	resolve: {
		alias: {
			'react-dom': 'react-dom/profiling',
			'scheduler/tracing': 'scheduler/tracing-profiling',
		},
		extensions: ['.jsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
			{
				test: /\.(scss|sass)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg|mp4|mp3)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: '',
						},
					},
				],
			},
		],
	},
	optimization: {
		minimize: true,
	},
	devServer: {
		proxy: {
			'!/static/my_react_app/frontend/**': {
				target: 'http://localhost:8000', // points to django dev server
				changeOrigin: true,
			},
		},
		open: true,
	},
};
