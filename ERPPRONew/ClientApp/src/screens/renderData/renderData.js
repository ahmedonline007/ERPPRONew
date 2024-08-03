import React, { Fragment } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';


const RenderData = (props) => { 
    return (
        <Fragment>
            <ReactTable
                //loading={true}
                data={props.data}
                columns={props.columns}
                resizable={true}
                defaultPageSize={props.defaultPageSize || 10}
                pageSizeOptions={[10,25,50, 100,500,1000]}
                className="-striped -highlight"
                noDataText="لا يوجد بيانات"
                previousText="السابق"
                nextText="التالى"
                loadingText="تحميل البيانات"
                pageText="الصفحة"
                ofText="من"
                rowsText="سطور"
                getTrProps={props.getTrProps}
            />
        </Fragment>
    );
}

export default RenderData;
