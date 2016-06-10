import React    from 'react';
import ReactDOM from 'react-dom';
import Glyph    from './Glyph';
import { CloseButton } from './ActionButtons';
import env      from '../services/env';
import events   from '../models/events';

const Modal = React.createClass({

  /*
  propTypes: {
    handleHideModal: React.PropTypes.func.isRequired
  },
  */

  componentDidMount: function() {
    /* globals $ */
    var d = $(ReactDOM.findDOMNode(this));
    d.modal('show');
    d.on ('hidden.bs.modal', () => {
      this.props.handleHideModal && this.props.handleHideModal(...arguments);
      env.emit(events.REQUEST_MODAL);
    });
  },

  render(){
    var title    = this.props.title;
    var subTitle = this.props.subTitle;
    var action   = this.props.action;
    var icon     = this.props.icon || 'share';
    var text     = ' ' + (this.props.buttonText || 'Submit');
    var close    = ' ' + (this.props.closeText || 'Close');
    var disabled = this.props.submitDisabler && this.props.submitDisabler() || false; 

    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
          <div className="modal-header">
            <CloseButton className="close" data-dismiss="modal" />
            <h4 className="modal-title"><span className="light-color">{subTitle}</span> {title}</h4>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">{close}</button>
            {action 
              ? <button disabled={disabled} className="btn btn-primary btn-success" onClick={action}><Glyph icon={icon} />{text}</button>
              : null
            }
          </div>
          </div>
        </div>
      </div>
    );
  },
});

const ModalContainer = React.createClass({

  getInitialState() {
    return { modalComponent: null };
  },

  componentDidMount() {
    env.on(events.REQUEST_MODAL,this.onRequest);
  },

  componentWillUnmount() {
    env.removeListener(events.REQUEST_MODAL,this.onRequest);    
  },

  onRequest(comp,props) {
    // null 'comp' means Modal was closed 
    this.setState( { modalComponent: comp, 
                     componentProps: props } );
  },

  render() { 
    return(
        <div id="modal-container">
          {this.state.modalComponent
            ? React.createElement(this.state.modalComponent,this.state.componentProps)
            : null
          }
        </div>
      );
  }
});

class ModalPopup extends React.Component {
  manualClose() {
    /* globals $ */
    var d = $(ReactDOM.findDOMNode(this));
    d.modal('hide');    
  }
}

ModalPopup.show = function(comp,props) {
  env.showPopup(comp,props);
};


Modal.Container = ModalContainer;
Modal.Popup     = ModalPopup;

module.exports = Modal;

//