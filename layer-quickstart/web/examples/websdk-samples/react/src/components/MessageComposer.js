import React, { Component } from 'react';
import FileDrop from 'react-file-drop';

const ENTER = 13;

const iconClassNamesByExtension = {
  'text': 'icon-file-text',
  'doc': 'icon-file-word',
  'xls': 'icon-file-excel',
  'xlsx': 'icon-file-excel',
  'pdf': 'icon-file-pdf',
   'default': 'icon-file-text'
}

export default class MessageComposer extends Component {

  /**
   * Any time the input changes, we'll want to send a typing indicator
   * to other participants; this.props.onChange handles that.
   */
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  /**
   * onEnter, send the message using this.props.onSubmit()
   */
  handleKeyDown = (event) => {
    if (event.keyCode === ENTER && !event.shiftKey) {
      event.preventDefault();
      if (this.props.value.length) {
        this.props.onSubmit();
      }
    }
  }

  render() {
    return (
      <div className='message-composer'>
        <FileDrop frame={document} onDrop={this.props.onDragAndDrop}>
          Drop some files here!
        </FileDrop>
        <textarea
          className='message-textarea'
          placeholder='Enter a message...'
          rows='1'
          value={this.props.value}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          />
      </div>
    );
  }
}
