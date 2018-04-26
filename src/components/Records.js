import React, {
  Component
} from 'react';
import Record from './Record';
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm';
class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    }
  }
  //组件加载完之后
  componentDidMount() {
    RecordsAPI.getAll().then(
      response => this.setState({
        records: response.data,
        isLoaded: true
      })
    ).catch(
      error => this.setState({
        isLoaded: true,
        error
      }),
    )
  }
  addRecord(record) {
    this.state = {
      error: null,
      isLoaded: true,
      records: [
        ...this.state.records,
        record //将this.state数组与record数组连在一起
      ]
    }
  }
  render() {
    //es6语法相当于: const error =this.state.error;//同理后两个
    const {
      error,
      isLoaded,
      records
    } = this.state;
    let recordsComponent;

    if (error) {
      recordsComponent = <div>Error:{error.message}</div>;
    } else if (!isLoaded) {
      recordsComponent = <div>Loading......</div>;
    } else {
      recordsComponent = (
        <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>   
                <th>Title</th>
                <th>Amount</th> 
              </tr> 
            </thead>                
            <tbody>
              {records.map((record,i)=><Record key={record.id} record={record} />)}
            </tbody>
          </table>
      );

    }
    return (
      <div className="container">
        <h2>Records</h2>
        <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
        {recordsComponent}
      </div>
    );

  }
}

export default Records;