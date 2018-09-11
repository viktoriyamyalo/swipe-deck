import React, {Component} from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
    PanResponder,
    Dimensions,
    UIManager,
    LayoutAnimation
} from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_DURATION = 250;
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';

class Deck extends Component {
    static propTypes = {

    };
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    };

    constructor(props) {
        super(props);
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                this.position.setValue({ x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe(RIGHT)
                } else if (gesture.dx < - SWIPE_THRESHOLD) {
                    this.forceSwipe(LEFT)
                } else {
                    this.resetPosition();
                }
            }
        });
        this.position = position;
        this.panResponder = panResponder;
        this.state = {
            currentIndex: 0
        }
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ currentIndex: 0 });
        }
    }

    forceSwipe = (direction) => {
        const x = direction === RIGHT ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_DURATION
        }).start(() => this.onSwipeComplete(direction))
    };

    onSwipeComplete = (direction) => {
        const { onSwipeRight, onSwipeLeft, data } = this.props;
        const { currentIndex } = this.state;
        const item = data[currentIndex];

        direction === RIGHT ? onSwipeRight(item) : onSwipeLeft(item);
        this.position.setValue({ x: 0, y: 0 });
        this.setState({ currentIndex: this.state.currentIndex + 1 });
    }

    resetPosition = () => {
        Animated.spring(this.position, {
            toValue: { x: 0, y: 0}
        }).start();
    };

    getCardStyle = () => {
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.position.getLayout(),
            transform: [{rotate}]
        }

    };

    renderCards = () => {
        const { data, renderCard, renderNoMoreCards } = this.props;
        const { currentIndex } = this.state;
        if (currentIndex >= data.length) {
            return renderNoMoreCards();
        }
        return data.map((item, i) => {
            if (i < currentIndex) { return null; }
            if (i === currentIndex) {
                return (
                  <Animated.View
                    key={item.id}
                    style={[this.getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
                    {...this.panResponder.panHandlers}
                  >
                      {renderCard(item)}
                  </Animated.View>
                );
            }
            return (
              <Animated.View
                key={item.id}
                style={[styles.cardStyle, {
                    top: 10 * (i - currentIndex),
                    zIndex: 1,
                    left: 3 * (i - currentIndex)}
                    ]}
              >
                  {renderCard(item)}
              </Animated.View>
            );
        }).reverse();
    };

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
})

export default Deck;
