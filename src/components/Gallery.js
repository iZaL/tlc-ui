/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableRipple} from 'react-native-paper';
import {View, StyleSheet, Image} from "react-native";
import ImageViewer from "components/ImageViewer";

export default class Gallery extends Component {

  static propTypes = {
    images: PropTypes.array,
  };

  state = {
    slider_visible:false,
    slider_index:0
  };

  static defaultProps= {
    images:[],
  };

  shouldComponentUpdate(nextProps,nextState) {
    return nextProps.images !== this.props.images || nextState !== this.state;
  }

  openSlider = (index) => {
    this.setState({
      slider_index:index,
      slider_visible:true,
    })
  };

  renderImage = (image,index) => {
    let {itemStyle,imageStyle,imageName} = this.props;
    return (
      <TouchableRipple onPress={()=>this.openSlider(index)} style={[styles.itemContainer,itemStyle]} key={`${index}`}>
        <Image
          source={{uri:imageName ? imageName(image) : image}} style={[styles.image,imageStyle]} resizeMode="contain" />
      </TouchableRipple>
    );
  };

  render() {
    let {style, images} = this.props;
    return (
      <View style={[styles.container,style]}>
        {images.map((image,i) => this.renderImage(image,i))}
        <ImageViewer
          index={this.state.slider_index}
          visible={this.state.slider_visible}
          images={images}
          onClose={()=>this.setState({slider_visible:false})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
  },
  itemContainer:{
    padding:5
  },
  image:{
    width:100,
    height:100
  }
});