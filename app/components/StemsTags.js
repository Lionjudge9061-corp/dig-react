import React            from 'react';
import Glyph            from './Glyph'; 
import Tags             from './Tags';
import SearchBox        from './SearchBox';

const SelectedTagSection = React.createClass({

  getInitialState: function() {
    return { store:    this.props.store, 
             playlist: this.props.playlist };
  },

  componentWillReceiveProps: function(props) {
    this.setState( { store:    props.store, 
                     playlist: props.playlist });
  },

  render: function() {
    return (
        <div className="selected-tags">
          <Tags.SelectedTags {...this.state}/>
        </div>
      );
  },

});

const TagsLoading = React.createClass({

  render: function() {
    return(
      <div className="tags-loading center-text">{"Loading Tags "}<Glyph icon="spinner" pulse /></div>
      );
  }
});

const StemsTagList = React.createClass({

  getInitialState: function() {
    return { loading: true };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      this.props.store.sampleCategories()
        .then( allTags => {
            this.setState( {
              model: allTags,
              filtered: allTags,
              loading: false });
          });
    }
  },

  filter: function(filter, isIcon, filterCB) {
    if( isIcon ) {
      filterCB('');
      filter = null;
    }
    if( !filter || filter.length === 0 ) {
      this.setState( { filtered: this.state.model } );
    } else {
      var filtered = [];
      var regex = new RegExp(filter);
      this.state.model.forEach( t => {
        if( t.id.match(regex) ) {
          filtered.push(t);
        }
      });
      this.setState( { filtered } );
    }
  },

  render: function() {

    if( global.IS_SERVER_REQUEST ) {
      return null;
    }

    var model = this.state.filtered;
    var store = this.props.store;

    return (
        <div>
            {
              this.state.loading 
                ? <TagsLoading />
                : <div className="stems-tags-widget">
                    <SearchBox icon="times" placeholder="find tag" submitSearch={this.filter} anyKey />
                    <Tags.SelectableTagList store={store} model={model} />
                  </div>
            }
        </div>
      );
  }
});

module.exports = {
  SelectedTagSection,
  TagsLoading,
  StemsTagList
};

