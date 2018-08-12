import React, { Component } from 'react';
import {
    View,
    WebView,
    NativeModules,
    Text,
    TouchableOpacity
} from 'react-native';
import VideoView from './VideoView';

export default class VideoPlayScene extends Component {
    constructor(props) {
        super(props);
        this._onPrepared = this._onPrepared.bind(this);
        this.state = {
            time: 0,
            totalTime: 0,
        };
    }
    _onPrepared(duration) {//毫秒
        console.log("JS duration = " + duration);
        this.setState({
            totalTime: duration,
        });
    }

    _onPressPause() {
        this.video.pause();
    }

    _onPressStart() {
        this.video.start();
    }

    _onPressSeekTo() {
        var millSecond = this.state.time + 1000;
        this.video.seekTo(millSecond);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <VideoView
                    ref={(video) => { this.video = video }}
                    style={{ height: 250, width: 380 }}
                    source={
                        {
                            // url: 'http://qiubai-video.qiushibaike.com/A14EXG7JQ53PYURP.mp4',
                            url: 'https://vd3.bdstatic.com/mda-ib2kew9g0vgi3ih6/mda-ib2kew9g0vgi3ih6.mp4',
                            headers: {
                                'refer': 'myRefer'
                            }
                        }
                    }
                    onPrepared={this._onPrepared}
                    onCompletion={() => {
                        console.log("JS onCompletion");
                    }}
                    onError={(e) => {
                        console.log("what=" + e.what + " extra=" + e.extra);
                    }}
                    onBufferUpdate={(buffer) => {
                        console.log("JS buffer = " + buffer);
                    }}
                    onProgress={(progress) => {
                        console.log("JS progress = " + progress);
                        this.setState({
                            time: progress
                        });
                    }}
                />

                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Text style={{ width: 100 }}>{this.state.time}/{this.state.totalTime}</Text>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={this._onPressPause.bind(this)}>
                        <Text>暂停</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={this._onPressStart.bind(this)}>
                        <Text>开始</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={this._onPressSeekTo.bind(this)}>
                        <Text>快进</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}