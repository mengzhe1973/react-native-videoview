# react-native-videoview
react native中的video组件，现在仅支持android端，可以显示视频
## Install

```shell
npm install --save react-native-videoview
```

## Automatically link

#### With React Native 0.27+

```shell
react-native link react-native-videoview
```

如果上面自动link没起作用，那么请手动配置:

### Android

- in `android/app/build.gradle`:

```diff
dependencies {
    ...
    compile "com.facebook.react:react-native:+"  // From node_modules
+   compile project(':react-native-videoview')
}
```

- in `android/settings.gradle`:

```diff
...
include ':app'
+ include ':react-native-videoview'
+ project(':react-native-videoview').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-videoview/android')
```

#### With React Native 0.29+

- in `MainApplication.java`:

```diff
+ import com.video.module.VideoViewPackage;

  public class MainApplication extends Application implements ReactApplication {
    //......

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
+         new VideoViewPackage(),
      );
    }

    ......
  }
```
##Usage
###基本用法
```diff
import { VideoView } from 'react-native-videoview'

<VideoView
            ref={(video) => { this.video = video }}
            style={{ height: 250, width: 380 }}
            source={
                {
                    url: 'https://your url',
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
```

###视频事件监听
```diff
	//视频预加载
    _onPrepared(duration) {//毫秒
        console.log("JS duration = " + duration);
        this.setState({
            totalTime: duration,
        });
    }
	//视频暂停
    _onPressPause() {
        this.video.pause();
    }
	//视频开始
    _onPressStart() {
        this.video.start();
    }
	//视频快进
    _onPressSeekTo() {
        var millSecond = this.state.time + 1000;
        this.video.seekTo(millSecond);
    }
    
    //视图
    TouchableOpacity style={{ marginLeft: 10 }} onPress={this._onPressPause.bind(this)}>
         <Text>暂停</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ marginLeft: 10 }} onPress={this._onPressStart.bind(this)}>
         <Text>开始</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ marginLeft: 10 }} onPress={this._onPressSeekTo.bind(this)}>
         <Text>快进</Text>
	</TouchableOpacity>
```
以上是所有用法，暂时基本用处可以满足
##keywords

###react-native video videoview 