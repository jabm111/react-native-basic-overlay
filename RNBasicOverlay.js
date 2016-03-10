import React, {
    Component,
    StyleSheet,
    View,
    Animated,
    Dimensions
} from 'react-native';
const WIN = Dimensions.get('window');

export default class CustomCircle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            opacity: new Animated.Value(0)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.animateVisibility(true);
        } else if (this.props.isOpen && !nextProps.isOpen) {
            this.animateVisibility(false);
        }
    }

    animateVisibility = (isOpen) => {
        if (isOpen) {
            this.setState({ isOpen });
        }

        Animated.timing(
            this.state.opacity,
            {
                toValue: isOpen ? 1 : 0,
                duration: 200
            }
        ).start(() => {
            if (!isOpen) {
                this.setState({ isOpen });
            }
        });
    };

    render() {
        if (this.state.isOpen) {
            return (
                <Animated.View style={[
                    styles.container,
                    {
                        backgroundColor: this.props.overlayColor,
                        opacity: this.state.opacity
                    }
                ]}>
                    {this.props.children}
                </Animated.View>
            );
        }

        return null;
    }
}

CustomCircle.defaultProps = {
    duration: 200,
    overlayColor: 'rgba(255, 255, 255, 0.4)'
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: WIN.width,
        height: WIN.height,
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    }
});
