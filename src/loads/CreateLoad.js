/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from 'loads/common/actions';
import {SELECTORS} from 'loads/common/selectors';
import CategoriesList from 'loads/components/CategoriesList';
import PackagesList from 'loads/components/PackagesList';
import ServicesList from 'loads/components/ServicesList';
import Button from 'components/Button';
import I18n from 'common/locale';

type State = {
  activeCategoryID: ?number,
  activePackageID: ?number,
  activeServicesIDs: Array<string>,
};

class CreateLoad extends PureComponent {
  state: State = {
    activeCategoryID: undefined,
    activePackageID: undefined,
    activeServicesIDs: [],
  };

  componentDidMount() {
    this.props.actions.fetchCategories();
  }

  componentDidUpdate() {
    const categories = this.props.categories;
    if (categories.length) {
      if (!this.state.activeCategoryID) {
        this.setState({
          activeCategoryID: categories[0].id,
        });
      }
    }
  }

  onCategoriesListItemPress = (item: object) => {
    let state = {
      activeCategoryID: item.id,
    };
    if (this.state.activeCategoryID !== item.id) {
      state = {
        ...state,
        activePackageID: undefined,
        activeServicesIDs: [],
      };
    }
    this.setState(state);
  };

  onPackagesListItemPress = (item: object) => {
    let state = {
      activePackageID: item.id,
    };
    if (this.state.activePackageID !== item.id) {
      state = {
        ...state,
        activeServicesIDs: [],
      };
    }
    this.setState(state);
  };

  onServicesListItemPress = (item: object) => {
    let index = this.state.activeServicesIDs.indexOf(item.id);
    this.setState({
      activeServicesIDs:
        index > -1
          ? this.state.activeServicesIDs.filter(
              serviceID => serviceID !== item.id,
            )
          : this.state.activeServicesIDs.concat(item.id),
    });
  };

  onAddToCartPress = () => {
    console.log('onAddToCartPress');
  };

  render() {
    const {activeCategoryID, activePackageID, activeServicesIDs} = this.state;
    const {categories} = this.props;

    let activeCategory = activeCategoryID
      ? categories.find(item => item.id === activeCategoryID)
      : categories.length
        ? categories[0]
        : {
            id: undefined,
            packages: [],
          };

    return (
      <View style={{padding: 10}}>
        <CategoriesList
          items={categories}
          onItemPress={this.onCategoriesListItemPress}
          activeItemID={activeCategoryID}
        />

        <PackagesList
          items={activeCategory.packages}
          onItemPress={this.onPackagesListItemPress}
          activeItemID={activePackageID}
        />

        {activePackageID && (
          <ServicesList
            items={
              activeCategory.packages.find(item => item.id === activePackageID)
                .services
            }
            onItemPress={this.onServicesListItemPress}
            activeItemIDs={activeServicesIDs}
          />
        )}

        <Button
          title={I18n.t('add_to_cart')}
          onPress={this.onAddToCartPress}
          disabled={!activePackageID}
        />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS}, dispatch)};
}

function mapStateToProps(state) {
  return {
    categories: SELECTORS.getCategories(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLoad);
