import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Deck from './components/Deck';
import { Card, Button } from 'react-native-elements';

const DATA = [
    { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
    { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
    { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
    { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
    { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
    { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
    { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
    { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

export default class App extends Component<Props> {
  renderCard = (item) => {
    return (
      <Card
        title={item.title}
        image={{ uri : item.uri }}
        key={item.id}
      >
        <Text style={{ marginBottom: 10 }}>{item.text}</Text>
        <Button
            backgroundColor={"#227093"}
            color={"#fff"}
            title={"View"}
        />
      </Card>
    );
  };

  renderNoMoreCards = () => {
      return (
        <Card
            title={"No more cards!"}
        >
            <Text style={{ marginBottom: 10 }}>
                Looks like you're out of content
            </Text>
            <Button
                backgroundColor={"#227093"}
                color={"#fff"}
                title={"Load more"}
            />
        </Card>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
            data={DATA}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});
