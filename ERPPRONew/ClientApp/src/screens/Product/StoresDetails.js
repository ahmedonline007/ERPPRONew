import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { bindActionCreators } from "redux";
import { Button } from 'react-bootstrap'; 
import ReactTable from '../renderData/renderData'; 
import Config from "../../Config/Config";
import toastr from 'toastr';

class StoresDetails extends Component {

    constructor(props) {

        super(props);
        if (!Config.IsAllow(62)) {
            toastr.error("عفوا ليس لديك صلاحية لهذة الصفحة");
            this.props.history.push("/DashBoard");
        }
        // this is columns of Department
        this.cells = [
            {
                Header: <strong> إجمالى العدد </strong>,
                accessor: 'totalQty',
                width: 150,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong> إجمالى سم </strong>,
                //accessor: 'totalCenti',
                accessor: 'totalCentiStr2',
                width: 150,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            },
            {
                Header: <strong> إجمالى المتر </strong>,
                accessor: 'totalMeter',
                width: 150,
                Cell: props => <span style={{ color: "red" }}>{props.value}</span>
            }
        ]; 
    }


    // life cycle of react calling when page is loading
    componentDidMount() {
        this.props.actions.getTotalStore();
    }



    generatePdf = () => {
        
    }

    render() {

        return (
            <Fragment>
                <div className="main_content_container">
                    <div className="page_content">
                        <br />
                        <br />
                        <h1 className="heading_title">مجموع المخزن</h1>
                        {/* Button of Add new Document and delete Row in Grid */}
                        <div className="page-title-actions">
                           
                        </div> 
                        <br />
                        <br />
                        {/* List Of Data */}
                        <ReactTable
                            data={this.props.totalStore}
                            columns={this.cells}
                            defaultPageSize={10}
                        />

                    </div>
                </div>

            </Fragment>
        );
    }
}


const mapStateToProps = (state, ownProps) => ({
    totalStore: state.reduces.totalStore
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StoresDetails);

