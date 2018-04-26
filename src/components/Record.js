import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'
export default class Record extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{this.props.record.amount}</td>
      </tr>
    );
  }
}
Record.propTypes = {
  id: PropTypes.number,
  date: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number
}