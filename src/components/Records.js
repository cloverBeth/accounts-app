import React, {
  Component
} from 'react';
import Record from './Record';
import * as RecordsAPI from '../utils/RecordsAPI'
import RecordForm from './RecordForm';
import AmountBox from './AmountBox'
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
    this.setState({
      error: null,
      isLoaded: true,
      records: [
        ...this.state.records,
        record //将this.state数组与record数组连在一起
      ]
    })
  }
  upadateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records: newRecords
    });
  }
  deleteRecord(record) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter((item, index) => index !== recordIndex);
    this.setState({
      records: newRecords
    });
  }
  credits() {
    let credits = this.state.records.filter((record) => {
      return record.amount >= 0;
    })
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }
  deibts() {
    let credits = this.state.records.filter((record) => {
      return record.amount < 0;
    })
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }
  balances() {
    return this.credits() + this.deibts();
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
                <th>Operations</th>
              </tr> 
            </thead>                
            <tbody>
              {records.map((record,i)=>
                  (<Record
                    key={record.id} 
                    record={record} 
                    handleEditRecord={this.upadateRecord.bind(this)} 
                    handleDeleteRecord={this.deleteRecord.bind(this)} />
                  )
                )}
            </tbody>
          </table>
      );

    }
    return (
      <div className="container">
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.credits()}/>
          <AmountBox text="Debit" type="danger" amount={this.deibts()}/>
          <AmountBox text="Balance" type="info" amount={this.balances()}/>
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
        {recordsComponent}
      </div>
    );

  }
}

export default Records;